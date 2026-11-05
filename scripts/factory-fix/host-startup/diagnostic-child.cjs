'use strict';
// Inert local diagnostic. No imports or explicit filesystem/network/subprocess APIs.
// Node itself loads this main file; the supervisor controls its pinned volume path.
// Waiting for stdin is intentional: the supervisor must also test its own deadline.
const allowedNames = ['SystemRoot', 'WINDIR', 'TEMP', 'TMP', 'NODE_DISABLE_COMPILE_CACHE',
  'HOMEDRIVE', 'HOMEPATH', 'LOGONSERVER', 'PATH', 'SYSTEMDRIVE', 'USERDOMAIN', 'USERNAME', 'USERPROFILE'];
// Orphan safety only. Exit 3 must never satisfy the external-kill acceptance check.
setTimeout(() => process.exit(3), 20000).unref();
let input = '', answered = false;
process.stdin.setEncoding('ascii');
process.stdin.on('error', () => process.exit(2));
process.stdin.on('data', chunk => {
  if (answered || input.length + chunk.length > 66) process.exit(2);
  input += chunk;
  if (!input.includes('\n')) return;
  answered = true;
  if (!/^[0-9A-F]{64}\r?\n$/.test(input)) process.exit(2);
  const names = Object.keys(process.env).sort();
  // Never read or print the values of unknown environment variables.
  const knownNamesOnly = names.length === allowedNames.length
    && allowedNames.every(name => names.includes(name));
  const reply = {
    schemaVersion: 1, nonce: input.trim(), pid: process.pid, ppid: process.ppid,
    execPath: process.execPath, version: process.version, argv: process.argv,
    execArgv: process.execArgv, cwd: process.cwd(), knownNamesOnly,
    environment: knownNamesOnly ? Object.fromEntries(allowedNames.map(name => [name, process.env[name]])) : null,
    mainModuleOnly: require.main === module && module.children.length === 0
      && Object.keys(require.cache).length === 1 && Object.hasOwn(require.cache, __filename)
  };
  process.stdout.write(JSON.stringify(reply) + '\n', () => process.exit(0));
});
process.stdin.on('end', () => { if (!answered) process.exit(2); });
