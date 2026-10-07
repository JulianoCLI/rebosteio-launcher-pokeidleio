// Fase 1 das extensoes: o modal #scOverlay voltou a existir, a shell o alcanca e o motor
// de userscripts (guarda de login, dedupe, teto de 4 MB) continua correto.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { app, BrowserWindow, ipcMain, session } = require('electron');
const { coalesceScriptLoading } = require('../src/main/guest-runtime');

const root = path.resolve(__dirname, '..');
const guestUrl = pathToFileURL(path.join(__dirname, 'fixtures', 'panel.html')).href;
const output = path.join(root, 'scratch', 'userscripts-' + Date.now());
fs.mkdirSync(output, { recursive: true });
app.setPath('userData', path.join(output, 'profile'));
app.commandLine.appendSwitch('log-level', '3');

const errors = [];
app.on('web-contents-created', (_event, contents) => {
  if (contents.getType() === 'webview') coalesceScriptLoading(contents);
});

const fakeAccounts = Array.from({ length: 4 }, (_, i) => ({ name: 'Conta ' + (i + 1), email: 'test' + i, senha: 'test' }));
ipcMain.on('app:version', event => { event.returnValue = 'test'; });
ipcMain.handle('creds:load', () => fakeAccounts);
ipcMain.handle('creds:save', () => true);
ipcMain.handle('errlog:write', (_event, origin, message) => errors.push(origin + ': ' + message));
for (const name of ['awake:set', 'mintray:set', 'notify', 'backup:save', 'proxy:apply', 'auth:cancel-login', 'twitch:creds:save']) ipcMain.handle(name, () => true);
ipcMain.handle('preset:read', () => '');
ipcMain.handle('twitch:creds:load', () => ({ masterEnabled: false, accounts: [] }));
ipcMain.handle('twitch:status:get', () => ({ masterEnabled: false, liveChannels: [], accounts: [] }));
ipcMain.handle('autostart:get', () => ({ on: false, suportado: false }));
ipcMain.handle('window:control', () => ({ maximized: false }));
ipcMain.handle('auth:camoufox-check', () => ({ available: false }));
ipcMain.handle('auth:camoufox-login', () => ({ success: false }));

const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
let win;
const read = async code => {
  try { return await win.webContents.executeJavaScript(code); }
  catch (e) { console.error('READ FALHOU: ' + String(code).slice(0, 240) + '\n  -> ' + e.message); throw e; }
};
const guest = (i, code) => read('webviews[' + i + '].executeJavaScript(' + JSON.stringify(code) + ')');
async function ready() {
  for (let i = 0; i < 80; i++) {
    if (await read('webviews.length === 4 && !!document.getElementById("leafShell")')) return;
    await pause(100);
  }
  throw new Error('Launcher did not initialize: ' + errors.join('\n'));
}
async function until(fn, tries = 60, gap = 50) {
  for (let i = 0; i < tries; i++) { if (await fn()) return; await pause(gap); }
  throw new Error('condition never became true');
}

app.whenReady().then(async () => {
  const denyNetwork = ses => ses.webRequest.onBeforeRequest({ urls: ['http://*/*', 'https://*/*', 'ws://*/*', 'wss://*/*'] }, (_details, callback) => callback({ cancel: true }));
  denyNetwork(session.defaultSession);
  for (let i = 1; i <= 4; i++) denyNetwork(session.fromPartition('persist:conta' + i));

  win = new BrowserWindow({ width: 1600, height: 1000, show: false, webPreferences: { offscreen: true, webviewTag: true, preload: path.join(root, 'preload.js'), backgroundThrottling: false } });
  win.webContents.on('will-attach-webview', (_event, _preferences, params) => { params.src = guestUrl; });
  await win.loadFile(path.join(root, 'index.html'));
  await ready();
  await pause(200); // applyLang roda depois do build da shell

  // 1. O markup existe e a shell nova alcanca o botao legado.
  assert.equal(await read('!!document.getElementById("scOverlay")'), true, 'markup do modal presente');
  assert.equal(await read('!!document.getElementById("scModal") && !!document.getElementById("scList")'), true, 'interior do modal presente');
  assert.equal(await read('!!document.querySelector("#leafToolsMenu [data-old=\'scriptsBtn\']")'), true, 'entrada no menu Ferramentas');

  // 2. Caminho real do usuario: item da shell -> clickOld -> modal abre e lista os presets.
  await read('document.querySelector("#leafToolsMenu [data-old=\'scriptsBtn\']").click()');
  assert.equal(await read('document.getElementById("scOverlay").classList.contains("show")'), true, 'o item da shell abre o modal');
  assert.equal(await read('document.body.classList.contains("leaf-tools-open")'), false, 'o menu de ferramentas fecha ao abrir o modal');
  assert.equal(await read('document.querySelectorAll("#scList .sc-row").length'), 1, 'a lista comeca com o preset justpokedex');
  assert.match(await read('document.querySelector("#scList .sc-row").textContent'), /JustP[oó]k[eé]dex/i);
  assert.equal(await read('document.querySelector("#scList .sc-row .sc-tag").textContent'), 'preset · guilherme-se', 'tag do preset');
  assert.equal(await read('!!document.querySelector("#scList .sc-chk input")'), true, 'linha vem com checkbox');
  assert.equal(await read('document.querySelector("#scList .sc-chk input").checked === !!scriptsOn["justpokedex"]'), true, 'checkbox reflete o estado salvo');

  // 3. i18n aplicada ao modal no boot.
  assert.equal(await read('document.getElementById("scAdd").textContent === t("scAddBtn")'), true, 'botao de adicionar no idioma atual');
  assert.equal(await read('document.getElementById("scClose").textContent === t("closeT")'), true, 'botao de fechar no idioma atual');
  assert.equal(await read('document.getElementById("scUrl").placeholder === t("scUrlPh")'), true, 'placeholder do link no idioma atual');
  assert.equal(await read('document.getElementById("scCode").placeholder === t("scCodePh")'), true, 'placeholder do codigo no idioma atual');
  assert.equal(await read('document.getElementById("scModal").querySelector(".hint").innerHTML === t("scHint")'), true, 'texto de aviso no idioma atual');
  assert.match(await read('document.getElementById("scModal").querySelector(".hint").innerHTML'), /<b>/, 'o aviso de confianca mantem o destaque');

  // 4. Esc e clique fora fecham.
  await read('window.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:true}))');
  assert.equal(await read('document.getElementById("scOverlay").classList.contains("show")'), false, 'Esc fecha o modal');
  await read('document.getElementById("scriptsBtn").click()');
  assert.equal(await read('document.getElementById("scOverlay").classList.contains("show")'), true);
  await read('document.getElementById("scOverlay").click()');
  assert.equal(await read('document.getElementById("scOverlay").classList.contains("show")'), false, 'clique no overlay fecha o modal');

  // 5. Enquanto o modal esta aberto, os atalhos de tecla ficam mudos.
  await read('document.getElementById("scriptsBtn").click()');
  assert.equal(await read('typeof TECLAS_ATALHO'), 'object', 'mapa de atalhos existe');
  const guard = await read(`(() => {
    const antes = document.getElementById('menu').classList.contains('show');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'o', bubbles: true }));
    return { antes, depois: document.getElementById('menu').classList.contains('show') };
  })()`);
  assert.equal(guard.antes, guard.depois, 'atalho nao dispara com o modal aberto');
  await read('window.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:true}))');
  assert.equal(await read('document.getElementById("scOverlay").classList.contains("show")'), false);

  // 6. Regra de seguranca: nenhum userscript em rota de senha e fora dos dominios do jogo.
  const tabela = [
    ['https://pokeidle.io/login', true],
    ['https://pokeidle.io/login?next=/app', true],
    ['https://pokeidle.io/login/painel', true],
    ['https://pokeidle.io/register', true],
    ['https://pokeidle.io/forgot-password', true],
    ['https://pokeidle.io/verify-email', true],
    ['https://poke.idleworld.online/login', true],
    ['https://poke.idleworld.online/register#top', true],
    ['https://pokeidle.io/app', false],
    ['https://pokeidle.io/', false],
    ['https://poke.idleworld.online/app', false],
    ['about:blank', true],
    ['', true],
    ['https://evil.example/app', true],
    ['https://pokeidle.io.evil.tld/app', true]
  ];
  for (const [url, esperado] of tabela) {
    assert.equal(await read('usNoLoginUrl(' + JSON.stringify(url) + ')'), esperado, 'usNoLoginUrl(' + JSON.stringify(url) + ')');
  }

  // 7. injectScripts recusa painel que nao esta no jogo (fixture e file://) e marca para reinjectar depois.
  await read('delete webviews[0].__pgSemScripts; injectScripts(webviews[0])');
  await until(() => read('webviews[0].__pgSemScripts === true'));

  // 8. O executor roda o corpo uma unica vez por documento, por id de script.
  await guest(0, 'window.__usRuns = 0');
  await read('runUS(webviews[0], { id: "t-dedupe", name: "Dedupe" }, "window.__usRuns++");');
  await until(() => guest(0, 'window.__usRuns === 1'));
  await read('runUS(webviews[0], { id: "t-dedupe", name: "Dedupe" }, "window.__usRuns++");');
  await pause(300);
  assert.equal(await guest(0, 'window.__usRuns'), 1, 'segunda chamada com o mesmo id nao reexecuta');
  assert.equal(await guest(0, 'window.__pgUS["t-dedupe"]'), 1, 'marcador gravado na pagina do jogo');

  // 9. Instalacao pelo codigo colado: confirm stubado, script salvo, ligado e marcado para injecao.
  await read('window.__confirm = window.confirm; window.__alert = window.alert; window.confirm = () => true; window.alert = () => {}; 1;');
  await read('instalaCodigo("window.__extBody = 1;", "Script de teste")');
  assert.equal(await read('userScripts.length === 1 && userScripts[0].name === "Script de teste"'), true, 'script guardado');
  assert.equal(await read('scriptsOn[userScripts[0].id] === true'), true, 'script instalado ja vem ligado');
  assert.equal(await read('JSON.parse(lsGet("userScripts")).length'), 1, 'persistido no localStorage');
  assert.equal(await read('userScripts[0].id'), await read('JSON.parse(lsGet("userScripts"))[0].id'), 'id persistido bate');
  assert.match(await read('userScripts[0].id'), /^u\d+$/, 'id gerado no formato u<timestamp>');
  // A fixture e file://, entao o motor nao injeta: so marca o painel para reinjectar quando sair do login.
  for (let i = 0; i < 4; i++) assert.equal(await read('webviews[' + i + '].__pgSemScripts'), true, 'painel ' + i + ' marcado, nao injetado');
  assert.equal(await guest(0, 'window.__extBody === 1'), false, 'nada rodou fora do jogo');

  // 10. Teto de 4 MB: recusa sem perder o que ja esta no disco.
  await read('window.__alerts = 0; window.alert = () => { window.__alerts++; }; 1;');
  const recusou = await read('userScripts = [{ id: "u-big", name: "Gigante", code: "a".repeat(5 * 1024 * 1024) }]; saveScripts()');
  assert.equal(recusou, false, 'payload acima do teto e recusado');
  assert.equal(await read('window.__alerts'), 1, 'usuario avisado');
  assert.equal(await read('userScripts.some(s => s.id === "u-big")'), false, 'o script gigante nao entra na memoria');
  assert.equal(await read('userScripts.length'), 1, 'memoria volta ao que esta no disco');
  assert.match(await read('userScripts[0].id'), /^u\d+$/, 'o script anterior continua la');
  assert.equal(await read('JSON.parse(lsGet("userScripts")).some(s => s.id === "u-big")'), false, 'nada do gigante foi gravado');
  assert.equal(await read('JSON.parse(lsGet("userScripts")).length'), 1, 'o que existia no disco segue intacto');
  assert.equal(await read('(()=>{const on=JSON.parse(lsGet("scriptsOn")||"{}");return on[userScripts[0].id]})()'), true, 'chave de ligacao preservada');

  // 11. Historico de hunts sobrevive: o lsPoda destrutivo nao foi acionado.
  await read('localStorage.setItem("huntLog", JSON.stringify(Array.from({length:40},(_,i)=>({id:i,dados:"x".repeat(200)}))))');
  await read('userScripts = [{ id: "u-big", name: "Gigante", code: "b".repeat(5 * 1024 * 1024) }]; saveScripts()');
  assert.equal(await read('JSON.parse(localStorage.getItem("huntLog")).length'), 40, 'historico nao foi podado');

  // 12. Limpeza, captura com o modal aberto e fechamento final.
  await read('userScripts = []; scriptsOn = {}; saveScripts(); window.confirm = window.__confirm; window.alert = window.__alert; delete window.__usRuns;');
  assert.equal(await read('JSON.parse(lsGet("userScripts")).length'), 0, 'perfil limpo');
  await read('document.querySelector("#leafToolsMenu [data-old=\'scriptsBtn\']").click()');
  await pause(120);
  assert.equal(await read('document.getElementById("scOverlay").classList.contains("show")'), true, 'modal reaberto para a captura');
  await win.webContents.capturePage(undefined, { stayHidden: true, stayAwake: true }).then(image => fs.writeFileSync(path.join(output, 'scripts-modal.png'), image.toPNG()));
  await read('window.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:true}))');
  assert.equal(errors.length, 0, errors.join('\n'));
  console.log('PASS: modal de extensoes acessivel pela shell, i18n, Esc/atalhos, guarda de login, dedupe e teto de 4 MB.');
  console.log('Preview: ' + path.join(output, 'scripts-modal.png'));
  app.exit(0);
}).catch(error => { console.error(error.stack); console.error(errors.join('\n')); app.exit(1); });
setTimeout(() => { console.error('Userscripts test timed out'); app.exit(1); }, 60000);
