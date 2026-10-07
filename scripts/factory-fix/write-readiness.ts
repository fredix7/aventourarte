import { hasExactKeys } from './validation';
import { isHostPreparedFixResult } from './prepared-result';
import { resolvedIdentityRepository, resolveFactoryGuideSourceIdentity } from './source-identity';
import { classifyFixError } from './result-classification';
import { freezeResult, type PreparedFixResult } from './result-contracts';
import { inspectRepositoryRoot, observeSourcePath, assertSameFilesystem, hashBytes } from './path-safety';
import { inspectGitTargetState } from './git-inspection';
import { acquireSourceLock, releaseSourceLock, isSourceLockHeld, assertSourceLockOwned } from './source-lock';
import { WORKSPACE_CLASSIFICATION, WORKSPACE_LIMITS, environmentFail, WorkspaceError, type ReadyPreparedResult,
  type SourceLockHandle, type PreparedWriteLease, type WriteReadinessResult, type WriteReadinessFailure,
  type WriteReadinessReport, type LockReleaseResult } from './workspace-contracts';
import type { SourceIdentity } from './contracts';

interface LeaseState { readonly lock: SourceLockHandle; readonly prepared: ReadyPreparedResult;
  readonly report: WriteReadinessReport; active: boolean }
const leases = new WeakMap<object, LeaseState>();
function revalidate(repoRoot: string, prepared: ReadyPreparedResult): SourceIdentity {
  const fresh = resolveFactoryGuideSourceIdentity({ repoRoot, guidePath: prepared.guidePath });
  const expected = prepared.sourceIdentity;
  if (fresh.catalogBinding.catalogHash !== expected.catalogBinding.catalogHash) environmentFail('CATALOG_STALE');
  if (fresh.sourceHash !== prepared.sourceHash) environmentFail('WRITE_PRECONDITION_FAILED');
  if (JSON.stringify(fresh) !== JSON.stringify(expected)) environmentFail('WRITE_PRECONDITION_FAILED');
  return fresh;
}
export function inspectWriteReadiness(input: { readonly repoRoot: string; readonly preparedResult: PreparedFixResult }): WriteReadinessResult {
  if (!hasExactKeys(input, ['repoRoot', 'preparedResult']) || ![null, Object.prototype].includes(Object.getPrototypeOf(input))
    || Object.values(Object.getOwnPropertyDescriptors(input)).some(d => !d.enumerable || !('value' in d))) {
    throw new TypeError('Invalid inspectWriteReadiness API envelope.');
  }
  let lock: SourceLockHandle | undefined, stage = 'INPUT';
  const prepared = isHostPreparedFixResult(input.preparedResult) ? input.preparedResult : null;
  try {
    if (!prepared || prepared.status !== 'READY_TO_WRITE') environmentFail('READINESS_INPUT_INVALID');
    const ready = prepared as ReadyPreparedResult;
    if (hashBytes(ready.candidateText) !== ready.candidateHash || ready.candidateHash === ready.sourceHash) environmentFail('READINESS_INPUT_INVALID');
    stage = 'REPOSITORY'; const repo = inspectRepositoryRoot(input.repoRoot);
    if (resolvedIdentityRepository(ready.sourceIdentity) !== repo.canonicalRoot) environmentFail('REPO_IDENTITY_MISMATCH');
    stage = 'PATH'; const firstPath = observeSourcePath(repo, ready.sourceIdentity.sourcePath);
    if (firstPath.sourceHash !== ready.sourceHash) environmentFail('WRITE_PRECONDITION_FAILED');
    stage = 'IDENTITY'; revalidate(repo.canonicalRoot, ready);
    stage = 'GIT'; const firstGit = inspectGitTargetState(repo, ready.sourceIdentity.sourcePath);
    stage = 'LOCK'; lock = acquireSourceLock(repo, ready.sourceIdentity.sourcePath);
    stage = 'POST_LOCK';
    const identity = revalidate(repo.canonicalRoot, ready);
    const secondPath = observeSourcePath(repo, ready.sourceIdentity.sourcePath);
    if (secondPath.sourceHash !== ready.sourceHash) environmentFail('WRITE_PRECONDITION_FAILED');
    assertSameFilesystem(firstPath, secondPath);
    const secondGit = inspectGitTargetState(repo, ready.sourceIdentity.sourcePath);
    if (JSON.stringify(firstGit) !== JSON.stringify(secondGit)) environmentFail('GIT_STATE_DRIFT');
    // A final source/catalog/path check narrows races during Git inspection. No lease TTL
    // can substitute for Phase 7 revalidation immediately before a future replace.
    const finalIdentity = revalidate(repo.canonicalRoot, ready);
    const finalPath = observeSourcePath(repo, ready.sourceIdentity.sourcePath);
    assertSameFilesystem(secondPath, finalPath);
    if (JSON.stringify(identity) !== JSON.stringify(finalIdentity)) environmentFail('WRITE_PRECONDITION_FAILED');
    assertSourceLockOwned(lock);
    const report: WriteReadinessReport = freezeResult({ schemaVersion: 1, status: 'WRITE_READY',
      requestId: ready.requestId, requestDigest: ready.requestDigest, candidateHash: ready.candidateHash,
      sourceHash: ready.sourceHash, guidePath: ready.guidePath, sourcePath: ready.sourceIdentity.sourcePath, repository: repo,
      preconditions: { sourceIdentity: finalIdentity, git: secondGit, filesystem: finalPath },
      diagnostics: { lock: 'COOPERATIVE_HELD', sourceWrite: false, candidatePersisted: false,
        qaExecuted: false, revalidateBeforeReplace: true, toctouEliminated: false } });
    const lease = Object.freeze(Object.defineProperty(Object.create(null), 'toJSON', {
      value() { throw new TypeError('Prepared write lease is runtime-only.'); }, enumerable: false
    })) as PreparedWriteLease;
    leases.set(lease, { lock, prepared: ready, report, active: true });
    return Object.freeze({ report, lease });
  } catch (error) {
    const cleanup = lock ? releaseSourceLock(lock) : null;
    let code: string, status: 'BLOCKED' | 'FAILED';
    if (error instanceof WorkspaceError) { code = error.code; status = WORKSPACE_CLASSIFICATION[error.code]; }
    else { const classified = classifyFixError(error); code = classified.code; status = classified.status; }
    const diagnostics = [{ code, stage, message: `Factory write readiness ${status}: ${code}.` }];
    if (cleanup?.status === 'BLOCKED' || cleanup?.status === 'FAILED') {
      diagnostics.push({ code: cleanup.code, stage: 'LOCK_RELEASE', message: `Factory lock release: ${cleanup.code}.` });
      if (cleanup.status === 'FAILED') status = 'FAILED';
    }
    if (diagnostics.length > WORKSPACE_LIMITS.maxDiagnostics
      || diagnostics.some(d => [d.code, d.stage, d.message].some(t => t.length > WORKSPACE_LIMITS.maxDiagnosticText))) {
      throw new TypeError('Write readiness diagnostic budget exceeded.');
    }
    const report: WriteReadinessFailure = freezeResult({ schemaVersion: 1, status,
      requestId: prepared?.requestId ?? null, requestDigest: prepared?.requestDigest ?? null, diagnostics });
    return Object.freeze({ report });
  }
}
export function isPreparedWriteLeaseActive(lease: PreparedWriteLease): boolean {
  // Local lifecycle/provenance only. This is never a substitute for fresh filesystem/Git checks.
  const state = lease && leases.get(lease);
  return !!state?.active && isSourceLockHeld(state.lock);
}
export function releaseWriteLease(lease: PreparedWriteLease): LockReleaseResult {
  const state = lease && leases.get(lease);
  if (!state) return freezeResult({ status: 'BLOCKED', code: 'LOCK_INVALID' });
  if (!state.active) return freezeResult({ status: 'ALREADY_RELEASED' });
  state.active = false; return releaseSourceLock(state.lock);
}
