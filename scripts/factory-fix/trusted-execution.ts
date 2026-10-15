import { types } from 'node:util';
import { resolveFactoryGuideSourceIdentity } from './source-identity';
import { buildGuideSnapshot } from './snapshot';
import { inspectRepositoryRoot, readSourcePath, hashBytes } from './path-safety';
import { syntheticWorkspaceRepository } from './synthetic-workspace';
import { createFixRequest, isHostFixRequest, invalidateFixRequest, launchFixer, prepareFixerHandoff,
  getFixerRuntimeStatus } from './fixer-launcher';
import { fixerFingerprint } from './fixer-json';
import { isHostPreparedFixResult } from './prepared-result';
import { inspectWriteReadiness, isPreparedWriteLeaseActive, releaseWriteLease } from './write-readiness';
import { persistPreparedFix } from './writer';
import { freezeResult, type PreparedFixResult } from './result-contracts';
import { FixerError, type FixRequest } from './fixer-contracts';
import { WorkspaceError, WORKSPACE_CLASSIFICATION, type RepositoryIdentity, type PreparedWriteLease,
  type LockReleaseResult, type FileIdentity } from './workspace-contracts';
import { SourceIdentityError } from './errors';
import { classifyFixError } from './result-classification';
import { hasExactKeys } from './validation';
import { ExecutionError, type TrustedFixSession, type TrustedFixContext, type SessionRequestInput,
  type RunSyntheticFixInput, type TrustedFixExecutionResult, type ExecutionObservation,
  type IndependentReadback, type PersistedQaHandoff, type SyntheticExecutionWorkspace } from './execution-contracts';

export type { TrustedFixSession, TrustedFixContext, SessionRequestInput, RunSyntheticFixInput,
  TrustedFixExecutionResult, SyntheticExecutionWorkspace } from './execution-contracts';

type Phase = 'CREATED' | 'REQUEST_READY' | 'RUNNING' | 'WRITING' | 'FINISHED' | 'CANCELLED';
interface SessionState {
  readonly repository: RepositoryIdentity; readonly context: TrustedFixContext;
  readonly observations: ExecutionObservation[]; phase: Phase; request?: FixRequest; workspace?: SyntheticExecutionWorkspace;
}
const sessions = new WeakMap<TrustedFixSession, SessionState>();
function fail(code: ConstructorParameters<typeof ExecutionError>[0]): never { throw new ExecutionError(code); }
function exact(value: unknown, keys: readonly string[]): void {
  if (types.isProxy(value) || !hasExactKeys(value, keys) || ![null, Object.prototype].includes(Object.getPrototypeOf(value))
    || Object.values(Object.getOwnPropertyDescriptors(value)).some(d => !d.enumerable || !('value' in d))) fail('EXECUTION_INPUT_INVALID');
}
function state(session: TrustedFixSession): SessionState {
  const found = session && sessions.get(session); if (!found) return fail('SESSION_INVALID'); return found;
}
function syntheticScope(host: SessionState): void {
  if (!host.workspace) fail('SYNTHETIC_SCOPE_REQUIRED');
  const allowed = syntheticWorkspaceRepository(host.workspace);
  if (allowed.digest !== host.repository.digest) fail('SYNTHETIC_SCOPE_REQUIRED');
}
function active(host: SessionState): void { if (host.phase !== 'RUNNING') fail('EXECUTION_CANCELLED'); }
export function getTrustedFixExecutionPolicy() {
  return freezeResult({ schemaVersion: 1, mode: 'SYNTHETIC_TEMP_ONLY', productionPersistenceEnabled: false,
    operational: false, runtime: getFixerRuntimeStatus(), modelReceivesExecutionApi: false,
    experimentalGrant: 'HOST_FRESH_ALLOCATION_ONLY' });
}
// Read-only host entrypoint: this never grants experimental persistence, even for TEMP paths.
// Authentic catalog resolution and snapshot precede every target selection.
// The context is host-only; only Phase 8's serialized selected data reaches the simulator.
export function createTrustedFixSession(input: { readonly repoRoot: string; readonly guidePath: string }): TrustedFixContext {
  exact(input, ['repoRoot', 'guidePath']);
  const repository = inspectRepositoryRoot(input.repoRoot);
  const sourceIdentity = resolveFactoryGuideSourceIdentity({ repoRoot: repository.canonicalRoot, guidePath: input.guidePath });
  const snapshot = buildGuideSnapshot({ repoRoot: repository.canonicalRoot, sourceIdentity });
  const session = Object.freeze(Object.create(null)) as TrustedFixSession;
  const context = Object.freeze({ session, sourceIdentity, snapshot });
  sessions.set(session, { repository, context, phase: 'CREATED', observations: [
    { stage: 'SOURCE_IDENTITY', status: 'RESOLVED', code: null }, { stage: 'SNAPSHOT', status: 'BUILT', code: null }
  ] }); return context;
}
export function createSyntheticFixSession(input: { readonly workspace: SyntheticExecutionWorkspace;
  readonly guidePath: string }): TrustedFixContext {
  exact(input, ['workspace', 'guidePath']);
  const repository = syntheticWorkspaceRepository(input.workspace);
  const context = createTrustedFixSession({ repoRoot: repository.canonicalRoot, guidePath: input.guidePath });
  const host = state(context.session); host.workspace = input.workspace; syntheticScope(host); return context;
}
export function createSessionFixRequest(input: SessionRequestInput): FixRequest {
  exact(input, ['session', 'authorization', 'task', 'contextTargets', 'editorialConstraints', 'timeoutMs']);
  const host = state(input.session); if (host.phase !== 'CREATED') fail('SESSION_INACTIVE');
  const { session: _session, ...requestInput } = input;
  const request = createFixRequest({ ...requestInput, snapshot: host.context.snapshot });
  if (host.phase !== 'CREATED') { invalidateFixRequest(request); fail('EXECUTION_CANCELLED'); }
  host.request = request; host.phase = 'REQUEST_READY';
  host.observations.push({ stage: 'TARGETS', status: 'VERIFIED_BY_PHASE_8', code: null },
    { stage: 'FIX_REQUEST', status: 'CREATED', code: null }); return request;
}
export function cancelTrustedFixSession(session: TrustedFixSession): Readonly<{ status: 'CANCELLED' | 'TOO_LATE' | 'ALREADY_FINISHED' }> {
  const host = state(session);
  // Once the synchronous writer has started, do not claim that cancellation undid bytes.
  if (host.phase === 'WRITING') return Object.freeze({ status: 'TOO_LATE' });
  if (host.phase === 'FINISHED') return Object.freeze({ status: 'ALREADY_FINISHED' });
  host.phase = 'CANCELLED'; if (host.request) invalidateFixRequest(host.request);
  return Object.freeze({ status: 'CANCELLED' });
}
function independentReadback(host: SessionState, prepared: Extract<PreparedFixResult, { status: 'READY_TO_WRITE' }>,
  persistedFile: FileIdentity | null): IndependentReadback {
  try {
    syntheticScope(host);
    const identity = resolveFactoryGuideSourceIdentity({ repoRoot: host.repository.canonicalRoot, guidePath: prepared.guidePath });
    const observed = readSourcePath(host.repository, prepared.sourceIdentity.sourcePath);
    if (!persistedFile || fixerFingerprint(observed.observation.file) !== fixerFingerprint(persistedFile)
      || fixerFingerprint(identity) !== fixerFingerprint({ ...prepared.sourceIdentity, sourceHash: prepared.candidateHash })
      || observed.observation.sourceHash !== prepared.candidateHash || hashBytes(observed.bytes) !== prepared.candidateHash
      || !observed.bytes.equals(Buffer.from(prepared.candidateText, 'utf8'))) throw new Error();
    // Re-resolve after the independent physical read as well; no implicit identity rebase.
    const final = resolveFactoryGuideSourceIdentity({ repoRoot: host.repository.canonicalRoot, guidePath: prepared.guidePath });
    const last = readSourcePath(host.repository, prepared.sourceIdentity.sourcePath);
    if (fixerFingerprint(final) !== fixerFingerprint(identity)
      || fixerFingerprint(last.observation) !== fixerFingerprint(observed.observation) || !last.bytes.equals(observed.bytes)) throw new Error();
    return freezeResult({ status: 'VERIFIED', sourceIdentity: final, readbackHash: observed.observation.sourceHash });
  } catch { return Object.freeze({ status: 'FAILED', code: 'INDEPENDENT_READBACK_FAILED' }); }
}
// Privileged host orchestration. It accepts neither a prepared result, handoff nor lease
// supplied by the caller. Those capabilities arise only from the original bound request.
export async function runSyntheticFix(input: RunSyntheticFixInput): Promise<TrustedFixExecutionResult> {
  let host: SessionState | undefined, ownsRun = false, lease: PreparedWriteLease | undefined;
  let result: TrustedFixExecutionResult = { schemaVersion: 1, mode: 'SYNTHETIC_TEMP_ONLY', status: 'BLOCKED',
    code: null, operational: false, runtimeStatus: 'RUNTIME_NOT_ISOLATED', e2eVerification: 'NOT_VERIFIED',
    requestId: null, sourceIdentity: null, snapshotId: null, observations: [], fixer: null, preparation: null,
    readiness: null, persistence: null, independentReadback: null, lockRelease: null, qaHandoff: null };
  try {
    exact(input, ['session', 'request', 'transport']); host = state(input.session);
    if (host.phase !== 'REQUEST_READY') fail('SESSION_INACTIVE');
    if (!isHostFixRequest(input.request) || host.request !== input.request) fail('SESSION_BINDING_MISMATCH');
    host.phase = 'RUNNING'; ownsRun = true;
    result = { ...result, requestId: input.request.requestId, sourceIdentity: host.context.sourceIdentity,
      snapshotId: host.context.snapshot.snapshotId };
    syntheticScope(host); active(host);
    const fixer = await launchFixer({ request: input.request, transport: input.transport }); result = { ...result, fixer };
    host.observations.push({ stage: 'FIXER', status: fixer.status, code: 'code' in fixer ? fixer.code : null });
    active(host);
    if (fixer.status !== 'PROPOSAL_VALID') { result = { ...result, status: fixer.status === 'FAILED' ? 'FAILED' : 'BLOCKED', code: fixer.code }; }
    else {
      const preparation = prepareFixerHandoff({ request: input.request, handoff: fixer.handoff }); result = { ...result, preparation };
      host.observations.push({ stage: 'PREPARATION', status: preparation.status === 'PREPARED' ? preparation.preparedResult.status
        : preparation.status, code: 'code' in preparation ? preparation.code : null }); active(host);
      if (preparation.status !== 'PREPARED') result = { ...result, status: preparation.status === 'FAILED' ? 'FAILED' : 'BLOCKED', code: preparation.code };
      else {
        const prepared = preparation.preparedResult;
        if (!isHostPreparedFixResult(prepared)) fail('SESSION_BINDING_MISMATCH');
        if (prepared.status === 'NO_CHANGE') result = { ...result, status: 'NO_CHANGE' };
        else if (prepared.status !== 'READY_TO_WRITE') fail('SESSION_BINDING_MISMATCH');
        else {
          syntheticScope(host); active(host);
          const ready = inspectWriteReadiness({ repoRoot: host.repository.canonicalRoot, preparedResult: prepared });
          result = { ...result, readiness: ready.report }; if (ready.lease) lease = ready.lease;
          host.observations.push({ stage: 'WRITE_READINESS', status: ready.report.status,
            code: ready.report.status === 'WRITE_READY' ? null : ready.report.diagnostics[0]?.code ?? null }); active(host);
          if (!lease || ready.report.status !== 'WRITE_READY') result = { ...result,
            status: ready.report.status === 'FAILED' ? 'FAILED' : 'BLOCKED', code: ready.report.status === 'WRITE_READY'
              ? 'INFRASTRUCTURE_ERROR' : ready.report.diagnostics[0]?.code ?? 'INFRASTRUCTURE_ERROR' };
          else {
            syntheticScope(host); active(host); host.phase = 'WRITING';
            const persistence = persistPreparedFix({ repoRoot: host.repository.canonicalRoot, preparedResult: prepared, lease });
            result = { ...result, persistence, status: persistence.status, lockRelease: persistence.lockRelease,
              code: persistence.diagnostics[0]?.code ?? null };
            host.observations.push({ stage: 'WRITER', status: persistence.status, code: result.code });
            if (persistence.status === 'APPLIED' && (!persistence.persistenceVerified || !persistence.replaceCompleted)) {
              fail('QA_HANDOFF_INCONSISTENT');
            }
            if (persistence.status === 'APPLIED' && persistence.persistenceVerified) {
              const readback = independentReadback(host, prepared, persistence.fileIdentity); result = { ...result, independentReadback: readback };
              host.observations.push({ stage: 'INDEPENDENT_READBACK', status: readback.status,
                code: readback.status === 'FAILED' ? readback.code : null });
              if (readback.status === 'FAILED') result = { ...result, status: 'FAILED', code: readback.code };
              else {
                const review = persistence.qaHandoff;
                if (!review || !persistence.sourceIdentity || persistence.requestId !== prepared.requestId || persistence.requestDigest !== prepared.requestDigest
                  || persistence.sourceHash !== prepared.sourceHash || persistence.guidePath !== prepared.guidePath
                  || fixerFingerprint(persistence.sourceIdentity) !== fixerFingerprint(readback.sourceIdentity)
                  || persistence.candidateHash !== prepared.candidateHash || persistence.readbackHash !== readback.readbackHash
                  || review.guidePath !== prepared.guidePath || review.expectedSourceHashAfterWrite !== prepared.candidateHash
                  || fixerFingerprint(review.changedOperationIds) !== fixerFingerprint(prepared.candidateOperationIds)
                  || fixerFingerprint(persistence.persistedOperationIds) !== fixerFingerprint(prepared.candidateOperationIds)
                  || fixerFingerprint(review) !== fixerFingerprint(prepared.qaHandoff)) fail('QA_HANDOFF_INCONSISTENT');
                const qaHandoff: PersistedQaHandoff = freezeResult({ status: 'READY_FOR_QA', requestId: prepared.requestId,
                  requestDigest: prepared.requestDigest, sourceIdentity: readback.sourceIdentity, originalSourceHash: prepared.sourceHash,
                  candidateHash: prepared.candidateHash, readbackHash: readback.readbackHash,
                  persistedOperationIds: persistence.persistedOperationIds, review, qaExecuted: false });
                result = { ...result, qaHandoff, e2eVerification: 'VERIFIED' };
                host.observations.push({ stage: 'QA_HANDOFF', status: 'READY_FOR_QA', code: null });
              }
            }
          }
        }
      }
    }
  } catch (error) {
    const code = error instanceof ExecutionError || error instanceof FixerError || error instanceof WorkspaceError
      || error instanceof SourceIdentityError ? error.code : 'INFRASTRUCTURE_ERROR';
    const technical = error instanceof WorkspaceError ? WORKSPACE_CLASSIFICATION[error.code] === 'FAILED'
      : error instanceof SourceIdentityError ? classifyFixError(error).status === 'FAILED'
      : code === 'INFRASTRUCTURE_ERROR' || code === 'QA_HANDOFF_INCONSISTENT';
    result = { ...result, status: result.persistence?.replaceCompleted || technical ? 'FAILED' : 'BLOCKED',
      code, qaHandoff: null, e2eVerification: 'NOT_VERIFIED' };
  } finally {
    if (lease && isPreparedWriteLeaseActive(lease)) {
      // The writer releases after claim. This path owns only a pre-writer/unclaimed lease.
      let released: LockReleaseResult;
      try { released = releaseWriteLease(lease); } catch { released = { status: 'FAILED', code: 'LOCK_RELEASE_FAILED' }; }
      result = { ...result, lockRelease: released };
      if (released.status === 'FAILED' || released.status === 'BLOCKED') result = { ...result, status: 'FAILED', code: released.code,
        qaHandoff: null, e2eVerification: 'NOT_VERIFIED' };
    }
    if (host && ownsRun) {
      if (host.request) invalidateFixRequest(host.request);
      if (host.phase !== 'CANCELLED') host.phase = 'FINISHED';
      result = { ...result, observations: [...host.observations] };
    }
  }
  return freezeResult(result);
}
