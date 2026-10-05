const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function ensureElectron() {
  const rootDir = path.resolve(__dirname, '..');
  const electronDir = path.join(rootDir, 'node_modules', 'electron');
  const electronExe = path.join(electronDir, 'dist', 'electron.exe');

  if (fs.existsSync(electronExe)) {
    return true;
  }

  console.log('[PIO] Inicializando instalacao do Electron...');

  // 1. Tentar primeiro o instalador padrao do Electron
  const installJs = path.join(electronDir, 'install.js');
  if (fs.existsSync(installJs)) {
    try {
      execSync(`"${process.execPath}" "${installJs}"`, { stdio: 'inherit' });
      if (fs.existsSync(electronExe)) {
        return true;
      }
    } catch (_) {
      console.warn('[PIO] Extrator padrao falhou (falta de C++ Redistributable ou erro de binding).');
    }
  }

  // 2. Contingencia: Baixar e extrair nativamente via Windows (tar.exe ou PowerShell)
  console.log('[PIO] Executando instalacao de contingencia sem dependencias nativas C++...');
  try {
    const { downloadArtifact } = require('@electron/get');
    const { version } = require(path.join(electronDir, 'package.json'));

    console.log(`[PIO] Baixando/verificando cache do Electron v${version}...`);
    const zipPath = await downloadArtifact({
      version,
      artifactName: 'electron',
      platform: 'win32',
      arch: 'x64'
    });

    const distPath = path.join(electronDir, 'dist');
    if (!fs.existsSync(distPath)) {
      fs.mkdirSync(distPath, { recursive: true });
    }

    let extracted = false;
    try {
      console.log('[PIO] Extraindo arquivos via tar do Windows...');
      execSync(`tar.exe -xf "${zipPath}" -C "${distPath}"`, { stdio: 'inherit' });
      if (fs.existsSync(electronExe)) {
        extracted = true;
      }
    } catch (_) {}

    if (!extracted) {
      console.log('[PIO] Extraindo arquivos via PowerShell Expand-Archive...');
      const psCmd = `Expand-Archive -LiteralPath '${zipPath.replace(/'/g, "''")}' -DestinationPath '${distPath.replace(/'/g, "''")}' -Force`;
      execSync(`powershell -NoProfile -ExecutionPolicy Bypass -Command "${psCmd}"`, { stdio: 'inherit' });
    }

    // Mover electron.d.ts se necessario
    const srcDts = path.join(distPath, 'electron.d.ts');
    const targetDts = path.join(electronDir, 'electron.d.ts');
    if (fs.existsSync(srcDts)) {
      try {
        fs.renameSync(srcDts, targetDts);
      } catch (_) {}
    }

    // Gravar path.txt
    fs.writeFileSync(path.join(electronDir, 'path.txt'), 'electron.exe', 'utf-8');

    if (fs.existsSync(electronExe)) {
      console.log('[PIO] Electron configurado com sucesso via contingencia!');
      return true;
    }
  } catch (err) {
    console.error('[PIO] Erro na instalacao de contingencia:', err && err.message ? err.message : err);
  }

  return false;
}

ensureElectron().then(ok => {
  process.exit(ok ? 0 : 1);
});
