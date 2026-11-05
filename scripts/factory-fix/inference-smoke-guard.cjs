'use strict';
// Test-only tripwires, loaded BEFORE the compiled Factory modules. These are
// instrumentation, not an OS sandbox or an operational capability issuer.
const fs = require('node:fs'), path = require('node:path'), { tmpdir } = require('node:os');
const { fileURLToPath, URL } = require('node:url'), { types } = require('node:util');
const { syncBuiltinESMExports } = require('node:module');
const raw = Object.fromEntries(Reflect.ownKeys(fs).map(k => [k, fs[k]]));
const rawPromises = Object.fromEntries(Reflect.ownKeys(fs.promises).map(k => [k, fs.promises[k]]));
const metrics = { networkAttempts: 0, processAttempts: 0, privilegedAttempts: 0,
  forbiddenGuideReads: 0, forbiddenMutations: 0, forbiddenFilesystemCalls: 0, laboratoryMutations: 0 };
const deny = kind => function () { metrics[kind]++; throw Error('OFFLINE_TEST_BOUNDARY_' + kind); };
for (const [name, methods] of [['node:http', ['request', 'get']], ['node:https', ['request', 'get']],
  ['node:http2', ['connect']], ['node:net', ['connect', 'createConnection']], ['node:tls', ['connect']],
  ['node:dns', ['lookup', 'resolve', 'resolve4', 'resolve6', 'reverse']],
  ['node:dns/promises', ['lookup', 'resolve', 'resolve4', 'resolve6', 'reverse']], ['node:dgram', ['createSocket']]]) {
  for (const method of methods) require(name)[method] = deny('networkAttempts');
}
require('node:net').Socket.prototype.connect = deny('networkAttempts');
globalThis.fetch = deny('networkAttempts'); globalThis.WebSocket = deny('networkAttempts');
for (const method of ['spawn', 'spawnSync', 'exec', 'execSync', 'execFile', 'execFileSync', 'fork']) {
  require('node:child_process')[method] = deny('processAttempts');
}
require('node:worker_threads').Worker = class { constructor() { deny('processAttempts')(); } };

const temp = raw.realpathSync.native(tmpdir()), out = raw.realpathSync.native(process.env.FACTORY_FIX_OUT_DIR);
if (path.dirname(out) !== temp || !path.basename(out).startsWith('factory-fix-smoke-entry-')) throw Error('TEST_TEMP_INVALID');
const owned = new Map(), descriptors = new Map();
const identity = s => [s.dev, s.ino, s.birthtimeNs].join(':');
const pathIdentity = p => identity(raw.lstatSync(p, { bigint: true }));
const key = p => process.platform === 'win32' ? p.toLowerCase() : p;
const inside = (root, p) => key(p) === key(root) || key(p).startsWith(key(root + path.sep));
const urlHref = Object.getOwnPropertyDescriptor(URL.prototype, 'href').get;
function localPath(file) {
  // Only Node's local string/UTF-8 Buffer/file: URL path representations.
  // Reject devices, UNC/network paths, ADS and ambiguous Win32 spellings
  // BEFORE any filesystem lookup; never stringify arbitrary caller objects.
  if (file && typeof file === 'object' && types.isProxy(file)) return deny('forbiddenFilesystemCalls')();
  let value;
  if (typeof file === 'string') value = file;
  else if (Buffer.isBuffer(file)) {
    value = file.toString('utf8');
    if (!Buffer.from(value, 'utf8').equals(file)) return deny('forbiddenFilesystemCalls')();
  } else if (file instanceof URL) {
    try { value = fileURLToPath(urlHref.call(file)); }
    catch { return deny('forbiddenFilesystemCalls')(); }
  } else return deny('forbiddenFilesystemCalls')();
  if (!value || /[\x00-\x1f]/.test(value) || /^(?:\\\\|\/\/)/.test(value)) return deny('forbiddenFilesystemCalls')();
  if (process.platform === 'win32') {
    if (/^[A-Za-z]:[^\\/]/.test(value)) return deny('forbiddenFilesystemCalls')();
    const rest = value.replace(/^[A-Za-z]:/, '');
    if (/[<>:"|?*]/.test(rest) || rest.split(/[\\/]/).some(s => s !== '.' && s !== '..'
      && (/[. ]$/.test(s) || /^(?:CON|PRN|AUX|NUL|COM[1-9¹²³]|LPT[1-9¹²³])(?:\.|$)/i.test(s)))) {
      return deny('forbiddenFilesystemCalls')();
    }
  }
  return path.resolve(value);
}
function physical(file) {
  let cursor = file; const tail = [];
  for (;;) {
    try { return path.join(raw.realpathSync.native(cursor), ...tail.reverse()); }
    catch (error) {
      if (!['ENOENT', 'ENOTDIR'].includes(error.code) || path.dirname(cursor) === cursor) throw error;
      tail.push(path.basename(cursor)); cursor = path.dirname(cursor);
    }
  }
}
const projectRoot = path.resolve(__dirname, '../..'), realGuides = path.join(projectRoot, 'src/app/guides');
const physicalGuides = physical(realGuides);
function readPath(file) {
  const p = localPath(file);
  if (inside(realGuides, p) || inside(physicalGuides, physical(p))) return deny('forbiddenGuideReads')();
  // Hardlink aliases do not have a unique canonical pathname. This lab does
  // not need them, so refuse all multiply-linked regular read targets.
  const stat = raw.statSync(p, { bigint: true, throwIfNoEntry: false });
  if (stat?.isFile() && stat.nlink !== 1n) return deny('forbiddenFilesystemCalls')();
  return p;
}
function descriptor(fd, writing) {
  const entry = descriptors.get(fd);
  if (!entry || writing && !entry.writing) return deny(writing ? 'forbiddenMutations' : 'forbiddenFilesystemCalls')();
  if (identity(raw.fstatSync(fd, { bigint: true })) !== entry.identity || pathIdentity(entry.path) !== entry.identity) {
    descriptors.delete(fd); return deny('forbiddenFilesystemCalls')();
  }
  return entry;
}
function read(file) {
  if (typeof file !== 'number') return readPath(file);
  readPath(descriptor(file, false).path); return file;
}
owned.set(out, pathIdentity(out));
function mutation(file) {
  if (typeof file === 'number') {
    mutation(descriptor(file, true).path); return file;
  }
  const p = localPath(file);
  for (const [root, id] of owned) if (inside(root, p)) {
    if (pathIdentity(root) !== id || !inside(root, physical(p)) || key(raw.realpathSync.native(root)) !== key(root)) return deny('forbiddenMutations')();
    let cursor = p;
    while (key(cursor) !== key(root)) {
      if (raw.existsSync(cursor)) {
        const stat = raw.lstatSync(cursor, { bigint: true });
        if (stat.isSymbolicLink() || stat.isFile() && stat.nlink !== 1n) return deny('forbiddenMutations')();
      }
      cursor = path.dirname(cursor);
    }
    metrics.laboratoryMutations++; return p;
  }
  return deny('forbiddenMutations')();
}

// Closed public-API policy: allow only the synchronous operations used by these
// reviewed suites, with path/fd checks. Everything else callable on fs/promises
// is denied, including future public exports, streams, watchers, opendir,
// openAsBlob, link/copy-tree creation and asynchronous IO except checked
// readFile/readdir (also needed by Node's ESM loader) and close. FileHandles
// cannot be issued. This cannot intercept saved references, native bindings/addons,
// a modified host realm or OS races; counters cover these wrappers only.
const inert = new Set(['Dirent', 'Stats', '_toUnixTimestamp']);
for (const name of Reflect.ownKeys(raw)) if (typeof raw[name] === 'function' && !inert.has(name)) {
  fs[name] = deny('forbiddenFilesystemCalls');
}
for (const name of Reflect.ownKeys(rawPromises)) if (typeof rawPromises[name] === 'function') {
  fs.promises[name] = async () => deny('forbiddenFilesystemCalls')();
}
fs.mkdtempSync = (prefix, ...args) => {
  const p = localPath(prefix);
  if (path.dirname(p) !== temp || path.basename(p) !== 'factory-fix-phase9-fixture-') return deny('forbiddenMutations')();
  const created = raw.mkdtempSync(p, ...args); owned.set(created, pathIdentity(created)); metrics.laboratoryMutations++; return created;
};
for (const method of ['writeFileSync', 'appendFileSync', 'mkdirSync', 'unlinkSync', 'rmdirSync', 'rmSync', 'truncateSync',
  'chmodSync', 'chownSync', 'lchmodSync', 'lchownSync', 'utimesSync', 'lutimesSync']) {
  if (typeof raw[method] === 'function') fs[method] = (file, ...args) => raw[method](mutation(file), ...args);
}
for (const method of ['renameSync', 'copyFileSync']) {
  fs[method] = (from, to, ...args) => raw[method](mutation(from), mutation(to), ...args);
}
fs.openSync = (file, flags, ...args) => {
  const p = readPath(file);
  const writing = typeof flags === 'string' ? /[wa+]/.test(flags)
    : (flags & (fs.constants.O_WRONLY | fs.constants.O_RDWR | fs.constants.O_CREAT | fs.constants.O_TRUNC | fs.constants.O_APPEND)) !== 0;
  if (writing) mutation(p);
  const fd = raw.openSync(p, flags, ...args); descriptors.delete(fd);
  try {
    const id = identity(raw.fstatSync(fd, { bigint: true }));
    if (id !== pathIdentity(p)) return deny('forbiddenFilesystemCalls')();
    descriptors.set(fd, { path: p, identity: id, writing }); return fd;
  } catch (error) { raw.closeSync(fd); throw error; }
};
fs.closeSync = fd => { descriptor(fd, false); descriptors.delete(fd); return raw.closeSync(fd); };
// Async close is the only descriptor-release exception: revoke the mapping before
// release so a recycled descriptor can never inherit write authority.
fs.close = (fd, callback) => { descriptor(fd, false); descriptors.delete(fd); return raw.close(fd, callback); };
for (const method of ['writeSync', 'writevSync', 'ftruncateSync', 'fchmodSync', 'fchownSync', 'futimesSync']) {
  if (typeof raw[method] === 'function') fs[method] = (fd, ...args) => raw[method](mutation(fd), ...args);
}
// readFile* is not intrinsically read-only: Node accepts 'w+'/'wx+' and can
// truncate or create targets before reading. Canonicalize accepted options to
// a fresh object; retain only proven read-only modes, never forward caller-owned options.
function readOnlyFileOptions(options) {
  if (options == null) return { flag: 'r' };
  if (typeof options === 'string') return { encoding: options, flag: 'r' };
  if (typeof options !== 'object' || types.isProxy(options)) return deny('forbiddenFilesystemCalls')();
  const proto = Object.getPrototypeOf(options);
  if (proto !== Object.prototype && proto !== null) return deny('forbiddenFilesystemCalls')();
  const descriptors = Object.getOwnPropertyDescriptors(options);
  const safe = { flag: 'r' };
  for (const property of Reflect.ownKeys(descriptors)) {
    if (typeof property !== 'string' || !['flag', 'encoding', 'signal'].includes(property)
      || !Object.hasOwn(descriptors[property], 'value')) return deny('forbiddenFilesystemCalls')();
    const value = descriptors[property].value;
    if (property === 'flag') {
      // 'rs' and its Node 22 alias 'sr' are read-only; numerical O_RDONLY
      // is an exact match only. Never accept OR-combinations with O_CREAT,
      // O_TRUNC, O_RDWR, etc. (even if their access mode bits say read-only).
      if (value !== undefined && value !== 'r' && value !== 'rs' && value !== 'sr'
        && value !== fs.constants.O_RDONLY) return deny('forbiddenMutations')();
      if (value !== undefined) safe.flag = value;
    } else if (property === 'encoding') {
      if (value !== undefined && value !== null && typeof value !== 'string') return deny('forbiddenFilesystemCalls')();
      safe.encoding = value;
    } else {
      if (value !== undefined && (value === null || typeof value !== 'object' || types.isProxy(value)
        || !(value instanceof AbortSignal))) return deny('forbiddenFilesystemCalls')();
      if (value !== undefined) safe.signal = value;
    }
  }
  return safe;
}
fs.readFileSync = (file, options) => raw.readFileSync(read(file), readOnlyFileOptions(options));
for (const method of ['readdirSync', 'statSync', 'lstatSync', 'readlinkSync', 'existsSync', 'statfsSync']) {
  if (typeof raw[method] === 'function') fs[method] = (file, ...args) => raw[method](read(file), ...args);
}
for (const method of ['readSync', 'readvSync', 'fstatSync']) fs[method] = (fd, ...args) => raw[method](read(fd), ...args);
fs.realpathSync = (file, ...args) => raw.realpathSync(read(file), ...args);
fs.realpathSync.native = (file, ...args) => raw.realpathSync.native(read(file), ...args);
for (const method of ['readFile', 'readdir', 'stat', 'lstat', 'readlink', 'realpath', 'access', 'createReadStream', 'openAsBlob', 'opendir']) {
  if (typeof raw[method] === 'function') fs[method] = (file) => { read(file); return deny('forbiddenFilesystemCalls')(); };
  if (typeof fs.promises[method] === 'function') fs.promises[method] = async file => { read(file); return deny('forbiddenFilesystemCalls')(); };
}
fs.readFile = (file, options, callback) => {
  if (typeof options === 'function' && callback === undefined) { callback = options; options = undefined; }
  if (typeof callback !== 'function') return deny('forbiddenFilesystemCalls')();
  return raw.readFile(read(file), readOnlyFileOptions(options), callback);
};
fs.promises.readFile = async (file, options) => rawPromises.readFile(read(file), readOnlyFileOptions(options));
fs.readdir = (file, ...args) => raw.readdir(read(file), ...args);
fs.promises.readdir = async (file, ...args) => rawPromises.readdir(read(file), ...args);
for (const method of ['writeFile', 'appendFile', 'mkdir', 'mkdtemp', 'unlink', 'rmdir', 'rm', 'rename', 'copyFile',
  'link', 'symlink', 'truncate', 'chmod', 'lchmod', 'chown', 'lchown', 'utimes', 'lutimes', 'cp', 'open',
  'write', 'writev', 'ftruncate', 'fchmod', 'fchown', 'futimes', 'createWriteStream']) {
  if (typeof raw[method] === 'function') fs[method] = deny('forbiddenMutations');
  if (typeof fs.promises[method] === 'function') fs.promises[method] = async () => deny('forbiddenMutations')();
}
syncBuiltinESMExports();
for (const [name, method] of [['writer', 'persistPreparedFix'], ['write-readiness', 'inspectWriteReadiness'], ['source-lock', 'acquireSourceLock']]) {
  require(path.join(out, 'scripts/factory-fix', name + '.js'))[method] = deny('privilegedAttempts');
}
process.on('exit', () => {
  const forbidden = Object.entries(metrics).some(([k, n]) => k !== 'laboratoryMutations' && n !== 0);
  if (forbidden) process.exitCode = 1;
  process.stdout.write('# Offline boundary evidence ' + JSON.stringify(metrics) + '\n');
});
module.exports.snapshot = () => Object.freeze({ ...metrics });
