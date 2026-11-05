import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Trusted supervisor only: children deliberately exercise denied calls, so their
// guards must exit nonzero. No child receives a real guide, network callback or
// credential. Every target is freshly allocated in controlled TEMP.
const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const temp = fs.realpathSync.native(tmpdir()), out = fs.realpathSync.native(process.env.FACTORY_FIX_OUT_DIR);
assert.equal(path.dirname(out), temp); assert.match(path.basename(out), /^factory-fix-smoke-entry-/);
const root = fs.mkdtempSync(path.join(temp, 'factory-fix-smoke-guard-tests-'));
assert.equal(path.dirname(fs.realpathSync.native(root)), temp);
const guardSource = fs.readFileSync(path.join(project, 'scripts/factory-fix/inference-smoke-guard.cjs'));
const env = { NODE_DISABLE_COMPILE_CACHE: '1', NODE_PATH: path.join(project, 'node_modules'), FACTORY_FIX_OUT_DIR: out,
  TEMP: temp, TMP: temp, PATH: process.env.PATH ?? process.env.Path,
  SystemRoot: process.env.SystemRoot, WINDIR: process.env.WINDIR };
const body = String.raw`
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{pathToFileURL}=require('node:url');
const [kind,guardFile,file,sibling,alias,ownedFile]=process.argv.slice(2);
let unknownRan=false,untracked;const futureSymbol=Symbol('futureIoProbe');
if(kind==='future') for(const target of [fs,fs.promises]) for(const name of ['futureIoProbe',futureSymbol]) {
 Object.defineProperty(target,name,{configurable:true,writable:true,value:()=>{unknownRan=true;}});
}
if(kind==='untracked-fd') untracked=fs.openSync(sibling,'r');
const guard=require(guardFile);
const reject=async(operation,counter)=>{const before=guard.snapshot()[counter];await assert.rejects(async()=>operation(),/OFFLINE_TEST_BOUNDARY_/);assert.equal(guard.snapshot()[counter],before+1);};
(async()=>{
 if(kind.startsWith('read:')) {
  const [method,form]=kind.slice(5).split(':');
  const target=form==='url'?pathToFileURL(file):form==='buffer'?Buffer.from(file):form==='case'?file.toUpperCase():form==='alias'?alias:file;
  await reject(()=>method==='openSync'?fs.openSync(target,'r'):method.startsWith('promises.')?fs.promises[method.slice(9)](target):method==='createReadStream'?fs.createReadStream(target):fs[method](target,()=>{}),'forbiddenGuideReads');
 } else if(kind.startsWith('metadata:')) {
  const method=kind.slice(9);
  await reject(()=>method.startsWith('promises.')?fs.promises[method.slice(9)](sibling,new Date(0),new Date(0))
   :fs[method](sibling,new Date(0),new Date(0),()=>{}),'forbiddenMutations');
 } else if(kind.startsWith('async:')) {
  const method=kind.slice(6);
  await reject(()=>method.startsWith('promises.')?fs.promises[method.slice(9)](sibling,'TEMP_ONLY')
   :fs[method](sibling,'TEMP_ONLY',()=>{}),'forbiddenMutations');
 } else if(kind.startsWith('fd:')) {
  const method=kind.slice(3),fd=fs.openSync(sibling,'r');
  try { await reject(()=>fs[method](fd,Buffer.from('X'),0,1,0),'forbiddenMutations'); } finally { fs.closeSync(fd); }
 } else if(kind==='recycled-fd') {
  const fd=fs.openSync(ownedFile,'w+');
  await new Promise((ok,fail)=>fs.close(fd,e=>e?fail(e):ok()));
  const next=fs.openSync(sibling,'r');
  try { await reject(()=>fs.futimesSync(next,new Date(0),new Date(0)),'forbiddenMutations'); }
  finally { fs.closeSync(next); }
 } else if(kind==='untracked-fd') {
  await reject(()=>fs.readFileSync(untracked),'forbiddenFilesystemCalls');
 } else if(kind==='hardlink') {
  await reject(()=>fs.readFileSync(alias),'forbiddenFilesystemCalls');
 } else if(kind==='namespace'||kind==='ads') {
  await reject(()=>fs.readFileSync(kind==='namespace'?path.toNamespacedPath(file):file+':stream'),'forbiddenFilesystemCalls');
 } else if(kind==='non-file-url') {
  await reject(()=>fs.readFileSync(new URL('https://invalid.example/not-contacted')),'forbiddenFilesystemCalls');
 } else if(kind.startsWith('readflags:')) {
  const [,method,mode]=kind.split(':');
  const create=mode==='wx+' || mode==='numeric-create';
  const target=create?sibling+'.new':sibling;
  const input=create?pathToFileURL(target):target;
  const flag=mode==='numeric' ? fs.constants.O_WRONLY|fs.constants.O_TRUNC
   :mode==='numeric-create' ? fs.constants.O_RDONLY|fs.constants.O_CREAT
   :mode==='numeric-readwrite' ? fs.constants.O_RDWR : mode;
  const options={encoding:'utf8',flag};
  await reject(()=>method==='readFileSync'?fs.readFileSync(input,options)
   :method==='readFile'?fs.readFile(input,options,()=>{})
   :fs.promises.readFile(input,options),'forbiddenMutations');
  assert.equal(fs.readFileSync(sibling,'utf8'),'OUTSIDE_OWNED_TEMP_ONLY');
  assert.equal(fs.existsSync(sibling+'.new'),false);
 } else if(kind.startsWith('readoptions:')) {
  const [,method,form]=kind.split(':');
  let options;
  if(form==='accessor') options={get flag(){throw Error('READ_FLAG_GETTER_MUST_NOT_RUN');}};
  else if(form==='proxy') options=new Proxy({flag:'r'},{});
  else options={flag:'r',unexpected:'not allowed'};
  await reject(()=>method==='readFileSync'?fs.readFileSync(sibling,options)
   :method==='readFile'?fs.readFile(sibling,options,()=>{})
   :fs.promises.readFile(sibling,options),'forbiddenFilesystemCalls');
  assert.equal(fs.readFileSync(sibling,'utf8'),'OUTSIDE_OWNED_TEMP_ONLY');
 } else if(kind.startsWith('readflags-safe:')) {
  const [,method,mode]=kind.split(':');
  const flag=mode==='O_RDONLY' ? fs.constants.O_RDONLY : mode;
  const options={encoding:'utf8',flag};
  const expected='OUTSIDE_OWNED_TEMP_ONLY';
  const actual=method==='readFileSync' ? fs.readFileSync(sibling,options)
   :method==='readFile' ? await new Promise((ok,fail)=>fs.readFile(sibling,options,(err,v)=>err?fail(err):ok(v)))
   :await fs.promises.readFile(sibling,options);
  assert.equal(actual,expected);
  assert.equal(guard.snapshot().forbiddenGuideReads,0);
  assert.equal(guard.snapshot().forbiddenMutations,0);
  assert.equal(guard.snapshot().forbiddenFilesystemCalls,0);
 } else if(kind==='readflags-positive') {
  const expected='OUTSIDE_OWNED_TEMP_ONLY';
  assert.equal(fs.readFileSync(sibling,'utf8'),expected);
  assert.equal(fs.readFileSync(Buffer.from(sibling),{flag:'r',encoding:'utf8'}),expected);
  assert.equal(fs.readFileSync(sibling).toString('utf8'),expected);
  assert.equal(await fs.promises.readFile(pathToFileURL(sibling),'utf8'),expected);
  assert.equal(await fs.promises.readFile(sibling,{flag:'r',encoding:'utf8'}),expected);
  assert.equal(await new Promise((ok,fail)=>fs.readFile(sibling,(e,v)=>e?fail(e):ok(v))).then(v=>v.toString('utf8')),expected);
  assert.equal(await new Promise((ok,fail)=>fs.readFile(sibling,{flag:'r',encoding:'utf8'},(e,v)=>e?fail(e):ok(v))),expected);
  const esm=await import('node:fs/promises');
  assert.equal((await esm.readFile(sibling,{flag:'r'})).toString('utf8'),expected);
  assert.equal(fs.existsSync(sibling+'.new'),false);
  assert.equal(guard.snapshot().forbiddenMutations,0);
 } else if(kind==='future') {
  await reject(()=>fs.futureIoProbe(),'forbiddenFilesystemCalls');
  await reject(()=>fs.promises.futureIoProbe(),'forbiddenFilesystemCalls'); assert.equal(unknownRan,false);
  await reject(()=>fs[futureSymbol](),'forbiddenFilesystemCalls');
  await reject(()=>fs.promises[futureSymbol](),'forbiddenFilesystemCalls'); assert.equal(unknownRan,false);
 } else if(kind.startsWith('unsupported:')) {
  const method=kind.slice(12);
  await reject(()=>['ReadStream','WriteStream'].includes(method)?new fs[method](sibling)
   :fs[method](sibling,ownedFile),'forbiddenFilesystemCalls');
 } else if(kind==='esm') {
  const esm=await import('node:fs');await reject(()=>esm.lutimesSync(sibling,new Date(0),new Date(0)),'forbiddenMutations');
 } else if(kind==='positive') {
  fs.writeFileSync(pathToFileURL(ownedFile),'ALLOWED');
  const fd=fs.openSync(Buffer.from(ownedFile),'r+');fs.writeSync(fd,Buffer.from('X'),0,1,0);fs.closeSync(fd);
  assert.equal(fs.readFileSync(Buffer.from(ownedFile),'utf8'),'XLLOWED');
  assert.equal(await fs.promises.readFile(pathToFileURL(ownedFile),'utf8'),'XLLOWED');
  assert.equal(await new Promise((ok,fail)=>fs.readFile(Buffer.from(ownedFile),'utf8',(e,v)=>e?fail(e):ok(v))),'XLLOWED');
  fs.utimesSync(ownedFile,new Date(0),new Date(0));fs.unlinkSync(ownedFile);
 } else throw Error('UNKNOWN_TEST');
 for(const name of ['networkAttempts','processAttempts','privilegedAttempts'])assert.equal(guard.snapshot()[name],0);
 console.log('GUARD_CASE_PASS '+JSON.stringify({kind,metrics:guard.snapshot()}));
})().catch(e=>{console.error(e);process.exitCode=2;});
`;
let serial = 0;
function check(kind, options = {}) {
  test('AVA-76 filesystem guard: ' + kind, t => {
    if (options.windows && process.platform !== 'win32') { t.skip('Windows path representation'); return; }
    const dir = path.join(root, String(++serial)), fakeProject = path.join(dir, 'project');
    const scripts = path.join(fakeProject, 'scripts/factory-fix'), guides = path.join(fakeProject, 'src/app/guides');
    fs.mkdirSync(scripts, { recursive: true }); fs.mkdirSync(guides, { recursive: true });
    const file = path.join(guides, 'sentinel.guide.ts'), sibling = path.join(dir, 'outside-owned.txt');
    fs.writeFileSync(file, 'FAKE_GUIDE_TEMP_ONLY'); fs.writeFileSync(sibling, 'OUTSIDE_OWNED_TEMP_ONLY');
    const guardFile = path.join(scripts, 'inference-smoke-guard.cjs'), program = path.join(dir, 'probe.cjs');
    fs.writeFileSync(guardFile, guardSource); fs.writeFileSync(program, body);
    let alias = path.join(dir, 'alias.guide.ts');
    if (options.link) {
      try {
        if (options.link === 'hard') fs.linkSync(file, alias);
        else {
          const link = path.join(dir, 'junction');
          fs.symlinkSync(guides, link, process.platform === 'win32' ? 'junction' : 'dir');
          alias = path.join(link, path.basename(file));
        }
      } catch (error) {
        if (!['EPERM', 'EACCES', 'ENOTSUP'].includes(error.code)) throw error;
        t.skip('TEMP link unavailable: ' + error.code); return;
      }
    }
    const before = fs.statSync(sibling).mtimeMs, ownedFile = path.join(out, 'guard-positive-' + serial + '.txt');
    const r = spawnSync(process.execPath, ['--preserve-symlinks', '--preserve-symlinks-main', program,
      kind, guardFile, file, sibling, alias, ownedFile], { cwd: project, env, shell: false, windowsHide: true,
      encoding: 'utf8', timeout: 15000, maxBuffer: 1024 * 1024 });
    assert.equal(r.error, undefined); assert.equal(r.status, ['positive', 'readflags-positive'].includes(kind)
      || kind.startsWith('readflags-safe:') ? 0 : 1, r.stdout + r.stderr);
    assert.equal(r.stderr, '', r.stderr);
    assert.equal(r.stdout.split(/\r?\n/).filter(s => s.startsWith('GUARD_CASE_PASS ')).length, 1, r.stdout);
    assert.equal(r.stdout.split(/\r?\n/).filter(s => s.startsWith('# Offline boundary evidence ')).length, 1, r.stdout);
    assert.equal(fs.readFileSync(file, 'utf8'), 'FAKE_GUIDE_TEMP_ONLY');
    assert.equal(fs.readFileSync(sibling, 'utf8'), 'OUTSIDE_OWNED_TEMP_ONLY');
    assert.equal(fs.existsSync(sibling + '.new'), false);
    assert.equal(fs.statSync(sibling).mtimeMs, before);
  });
}
for (const form of ['string', 'buffer', 'url']) for (const method of ['readFileSync', 'openSync', 'statSync', 'createReadStream', 'readFile', 'promises.readFile', 'openAsBlob']) {
  check(`read:${method}:${form}`);
}
check('read:readFileSync:case', { windows: true });
check('read:readFileSync:alias', { link: 'directory' });
check('hardlink', { link: 'hard' });
for (const method of ['lutimesSync', 'utimesSync', 'chmodSync', 'chownSync', 'lchownSync', 'lutimes', 'lchown', 'promises.lutimes', 'promises.chown']) check('metadata:' + method);
for (const method of ['writeFile', 'open', 'write', 'writev', 'createWriteStream', 'promises.writeFile', 'promises.open']) check('async:' + method);
for (const method of ['writeSync', 'writevSync', 'ftruncateSync', 'fchmodSync', 'fchownSync', 'futimesSync']) check('fd:' + method);
for (const method of ['cpSync', 'linkSync', 'symlinkSync', 'watch', 'opendirSync', 'ReadStream', 'WriteStream']) check('unsupported:' + method);
check('recycled-fd'); check('untracked-fd'); check('future'); check('esm'); check('positive'); check('non-file-url');
check('namespace', { windows: true }); check('ads', { windows: true });
// Regressions: the readFile* family must never forward mutating open flags,
// including through the ESM loader's asynchronous readFile exception.
for (const method of ['readFileSync', 'readFile', 'promises.readFile']) {
  for (const flag of ['w', 'w+', 'wx', 'wx+', 'a', 'a+', 'ax+', 'r+', 'rs+', 'sr+',
    'numeric', 'numeric-create', 'numeric-readwrite']) {
    check('readflags:' + method + ':' + flag);
  }
  for (const flag of ['rs', 'sr', 'O_RDONLY']) check('readflags-safe:' + method + ':' + flag);
  for (const form of ['accessor', 'proxy', 'extra']) check('readoptions:' + method + ':' + form);
}
check('readflags-positive');
