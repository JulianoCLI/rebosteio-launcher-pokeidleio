// Integration check in Electron with blank guests, fake accounts and an isolated profile.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { app, BrowserWindow, ipcMain, session } = require('electron');

const root = path.resolve(__dirname, '..');
const guestUrl = pathToFileURL(path.join(__dirname, 'fixtures', 'panel.html')).href;
const output = path.join(root, 'scratch', 'panel-controls-' + Date.now());
fs.mkdirSync(output, { recursive: true });
app.setPath('userData', path.join(output, 'profile'));
app.commandLine.appendSwitch('log-level', '3');
const errors = [];
const fakeAccounts = Array.from({ length: 4 }, (_, i) => ({ name: 'Conta ' + (i + 1), email: 'test' + i, senha: 'test' }));
ipcMain.on('app:version', event => { event.returnValue = 'test'; });
ipcMain.handle('creds:load', () => fakeAccounts);
ipcMain.handle('creds:save', () => true);
ipcMain.handle('errlog:write', (_event, origin, message) => errors.push(origin + ': ' + message));
for (const name of ['awake:set', 'mintray:set', 'notify', 'backup:save', 'proxy:apply', 'auth:cancel-login']) ipcMain.handle(name, () => true);
ipcMain.handle('autostart:get', () => ({ on: false, suportado: false }));
ipcMain.handle('window:control', () => ({ maximized: false }));
ipcMain.handle('auth:camoufox-check', () => ({ available: false }));
ipcMain.handle('auth:camoufox-login', () => ({ success: false }));

const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
let win;
const read = code => win.webContents.executeJavaScript(code);
async function settle() { await read('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))'); }
async function ready() {
  for (let i = 0; i < 80; i++) {
    if (await read('webviews.length === 4 && !!document.getElementById("leafShell") && webviews.every(w => { try { return w.getURL() === ' + JSON.stringify(guestUrl) + '; } catch { return false; } })')) return;
    await pause(100);
  }
  throw new Error('Launcher did not initialize: ' + errors.join('\n'));
}
async function rectangles() {
  await settle();
  return read('[...grid.children].map(p => { const r=p.getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height}; })');
}
async function checkLayout(n, selected) {
  await read(`setCount(${n});updateFeatureRatio(68);toggleFeature(${selected})`);
  const rects = await rectangles();
  assert.equal(rects.length, n);
  const main = rects[selected], rest = rects.filter((_, i) => i !== selected);
  assert.ok(main.width > rest[0].width, 'highlighted account is wider: ' + JSON.stringify({n,selected,rects,state:await read('({featuredIndex,featureRatio,classes:grid.className,columns:getComputedStyle(grid).gridTemplateColumns})')}));
  assert.ok(rest.every(r => r.x > main.right && r.width > 0 && r.height > 0), 'remaining accounts stay visible on the right');
  for (let i = 1; i < rest.length; i++) assert.ok(rest[i].y >= rest[i - 1].bottom, 'secondary accounts do not overlap');
  assert.equal(await read('featureSplit.classList.contains("show")'), true);
  assert.equal(await read('document.querySelectorAll(".feature[aria-pressed=true]").length'), 1);
  await read(`toggleFeature(${selected})`);
}

app.whenReady().then(async () => {
  const denyNetwork = ses => ses.webRequest.onBeforeRequest({ urls: ['http://*/*', 'https://*/*', 'ws://*/*', 'wss://*/*'] }, (_details, callback) => callback({ cancel: true }));
  denyNetwork(session.defaultSession);
  for (let i = 1; i <= 4; i++) denyNetwork(session.fromPartition('persist:conta' + i));
  win = new BrowserWindow({ width: 1600, height: 1000, show: false, webPreferences: { offscreen: true, webviewTag: true, preload: path.join(root, 'preload.js'), backgroundThrottling: false } });
  win.webContents.on('will-attach-webview', (_event, _preferences, params) => { params.src = guestUrl; });
  await win.loadFile(path.join(root, 'index.html'));
  await ready();
  const ids = await read('webviews.map(w => w.getWebContentsId())');
  await checkLayout(4, 0);
  await checkLayout(4, 3);
  await read('toggleFeature(0);dragFeature(-1000)');
  assert.equal(await read('featureRatio'), 50);
  await read('dragFeature(10000)');
  assert.equal(await read('featureRatio'), 82);
  await read('featureSplit.ondblclick()');
  assert.equal(await read('featureRatio'), 68);
  await read('featureSplit.dispatchEvent(new KeyboardEvent("keydown",{key:"ArrowRight",bubbles:true}))');
  assert.equal(await read('featureRatio'), 69);

  await read('featureSplit.dispatchEvent(new PointerEvent("pointerdown",{button:0,pointerId:7,clientX:800,bubbles:true}));window.dispatchEvent(new PointerEvent("pointermove",{pointerId:7,clientX:900}));window.dispatchEvent(new PointerEvent("pointercancel",{pointerId:7}))');
  assert.equal(await read('featureDragShield.classList.contains("show")'), false);
  assert.equal(await read('Number(lsGet("featureRatio")) === featureRatio'), true);

  await read('toggleExpand(1)'); await settle();
  assert.equal(await read('featureSplit.classList.contains("show")'), false);
  await read('toggleExpand(1)'); await settle();
  assert.equal(await read('featureSplit.classList.contains("show")'), true);
  await read('layoutMode="col";applyLayout()'); await settle();
  assert.equal(await read('featureSplit.classList.contains("show")'), false);
  await read('toggleFeature(2)'); await settle();
  assert.equal(await read('layoutMode'), 'grid');
  await read('document.querySelector("[data-view=list]").click()'); await settle();
  assert.equal(await read('featureSplit.classList.contains("show")'), false);
  await read('document.querySelector("[data-view=windows]").click()'); await settle();
  assert.equal(await read('featureSplit.classList.contains("show")'), true);
  await read('cardsOn=true;applyCards()'); await settle();
  assert.equal(await read('featureSplit.classList.contains("show")'), false);
  await read('cardsOn=false;applyCards();toggleFeature(2)');
  assert.deepEqual(await read('webviews.map(w => w.getWebContentsId())'), ids, 'feature, list, simple and expansion preserve all guests');
  await checkLayout(3, 2);
  await checkLayout(2, 1);
  await read('setCount(1)'); await settle();
  assert.equal(await read('featuredIndex'), -1);
  assert.equal(await read('grid.querySelector(".feature").disabled'), true);
  assert.equal(await read('zoomers.length'), 1);
  await read('setCount(4)'); await ready();
  await pause(200);

  await read('zoomTodos("reset")');
  win.webContents.send('hotkey', 'zoomIn'); await pause(100);
  assert.deepEqual(await read('webviews.map(w => w.getZoomFactor())'), [1.1, 1.1, 1.1, 1.1]);
  await read('grid.children[1].querySelector(".zi").click()');
  assert.equal(await read('webviews[1].getZoomFactor()'), 1.2);
  await read('zoomTodos("in")');
  assert.deepEqual(await read('webviews.map(w => w.getZoomFactor())'), [1.2, 1.3, 1.2, 1.2]);
  win.webContents.send('hotkey', 'zoomOut'); await pause(100);
  assert.equal(await read('webviews[1].getZoomFactor()'), 1.2);
  win.webContents.send('hotkey', 'zoomReset'); await pause(100);
  assert.deepEqual(await read('webviews.map(w => w.getZoomFactor())'), [1, 1, 1, 1]);
  await read('window.dispatchEvent(new WheelEvent("wheel",{ctrlKey:true,deltaY:-100,cancelable:true}))');
  assert.equal(await read('webviews[0].getZoomFactor()'), 1.1);
  const guestWheel = "dispatchEvent(new WheelEvent('wheel',{ctrlKey:true,deltaY:100,cancelable:true}))";
  await read('webviews[0].executeJavaScript(' + JSON.stringify(guestWheel) + ')'); await pause(100);
  assert.equal(await read('webviews[0].getZoomFactor()'), 1);
  await read('off[3]=true;zoomTodos("in")');
  assert.equal(await read('webviews[3].getZoomFactor()'), 1, 'disabled accounts do not receive global zoom');
  await read('off[3]=false;for(let i=0;i<30;i++)zoomTodos("in")');
  assert.deepEqual(await read('webviews.map(w => w.getZoomFactor())'), [2, 2, 2, 2]);
  await read('for(let i=0;i<30;i++)zoomTodos("out")');
  assert.deepEqual(await read('webviews.map(w => w.getZoomFactor())'), [0.5, 0.5, 0.5, 0.5]);
  await read('zoomTodos("reset");grid.children[1].querySelector(".zi").click();toggleFeature(0)'); await settle();
  await pause(250);
  await win.webContents.capturePage(undefined, { stayHidden: true, stayAwake: true }).then(image => fs.writeFileSync(path.join(output, 'panels.png'), image.toPNG()));
  await win.loadFile(path.join(root, 'index.html')); await ready(); await settle();
  assert.equal(await read('featuredIndex'), 0, 'panel zero restores correctly');
  assert.equal(await read('webviews[1].getZoomFactor()'), 1.1, 'individual zoom survives reopening');
  assert.equal(await read('featureSplit.classList.contains("show")'), true);
  assert.equal(errors.length, 0, errors.join('\n'));
  console.log('PASS: layouts with 1–4 accounts, resizing, visibility, preserved sessions, global/individual zoom and persistence.');
  console.log('Preview: ' + path.join(output, 'panels.png'));
  app.exit(0);
}).catch(error => { console.error(error.stack); console.error(errors.join('\n')); app.exit(1); });
setTimeout(() => { console.error('Integration test timed out'); app.exit(1); }, 60000);
