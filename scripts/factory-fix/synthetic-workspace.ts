import * as fs from 'node:fs';
import * as path from 'node:path';
import { tmpdir } from 'node:os';
import { assertRepositoryIdentity, inspectRepositoryRoot } from './path-safety';
import type { RepositoryIdentity } from './workspace-contracts';
import { ExecutionError, type SyntheticExecutionWorkspace } from './execution-contracts';

// Host bootstrap policy, not an argument supplied by a session/request/model. Location and
// spelling alone never authorize an existing repository: only this fresh allocation can.
const boundary = (() => {
  try {
    const root = fs.realpathSync.native(tmpdir()), stat = fs.lstatSync(root, { bigint: true });
    if (!stat.isDirectory() || stat.isSymbolicLink() || stat.ino === 0n) return null;
    return Object.freeze({ root, dev: stat.dev, ino: stat.ino });
  } catch { return null; }
})();
interface WorkspaceState { readonly root: RepositoryIdentity; readonly repo: RepositoryIdentity; active: boolean }
const workspaces = new WeakMap<SyntheticExecutionWorkspace, WorkspaceState>();
function denied(): never { throw new ExecutionError('SYNTHETIC_SCOPE_REQUIRED'); }
function assertBoundary(): string {
  if (!boundary) return denied();
  const stat = fs.lstatSync(boundary.root, { bigint: true });
  if (!stat.isDirectory() || stat.isSymbolicLink() || stat.dev !== boundary.dev || stat.ino !== boundary.ino
    || fs.realpathSync.native(boundary.root) !== boundary.root) denied();
  return boundary.root;
}
// No caller-selected root, registration API, testMode switch, guide content or Git mutator.
// Both directories are created exclusively and their physical identities captured before the
// host populates the fixture. This capability can never adopt a pre-existing repository.
export function allocateSyntheticExecutionWorkspace(): SyntheticExecutionWorkspace {
  if (arguments.length !== 0) throw new ExecutionError('EXECUTION_INPUT_INVALID');
  let ownedRoot: RepositoryIdentity | undefined, ownedRepo: RepositoryIdentity | undefined;
  try {
    const temp = assertBoundary(), root = fs.mkdtempSync(path.join(temp, 'factory-fix-phase9-fixture-'));
    ownedRoot = inspectRepositoryRoot(root);
    const repoRoot = path.join(root, 'repo con espacios ü'); fs.mkdirSync(repoRoot, { mode: 0o700 });
    ownedRepo = inspectRepositoryRoot(repoRoot); assertBoundary(); assertRepositoryIdentity(ownedRoot);
    const workspace = Object.freeze({ root, repoRoot }) as SyntheticExecutionWorkspace;
    workspaces.set(workspace, { root: ownedRoot, repo: ownedRepo, active: true }); return workspace;
  } catch (error) {
    // Empty owned directories only. Never recursively delete or adopt anything after drift.
    try {
      assertBoundary();
      if (ownedRoot) {
        assertRepositoryIdentity(ownedRoot);
        if (ownedRepo) { assertRepositoryIdentity(ownedRepo); fs.rmdirSync(ownedRepo.canonicalRoot); }
        fs.rmdirSync(ownedRoot.canonicalRoot);
      }
    } catch { /* Uncertain/nonempty allocation is left for host inspection, never forced. */ }
    if (error instanceof ExecutionError) throw error;
    throw new ExecutionError('INFRASTRUCTURE_ERROR');
  }
}
// Internal bridge: it verifies a capability, not an arbitrary path supplied for approval.
export function syntheticWorkspaceRepository(workspace: SyntheticExecutionWorkspace): RepositoryIdentity {
  const state = workspace && workspaces.get(workspace); if (!state?.active) return denied();
  try {
    const temp = assertBoundary(); assertRepositoryIdentity(state.root); assertRepositoryIdentity(state.repo);
    if (path.dirname(state.root.canonicalRoot) !== temp || path.dirname(state.repo.canonicalRoot) !== state.root.canonicalRoot) denied();
    return state.repo;
  } catch { return denied(); }
}
// Revocation grants no filesystem operation and remains possible even after physical drift.
export function revokeSyntheticExecutionWorkspace(workspace: SyntheticExecutionWorkspace): Readonly<{
  status: 'REVOKED' | 'ALREADY_REVOKED' }> {
  const state = workspace && workspaces.get(workspace); if (!state) return denied();
  if (!state.active) return Object.freeze({ status: 'ALREADY_REVOKED' });
  state.active = false; return Object.freeze({ status: 'REVOKED' });
}
