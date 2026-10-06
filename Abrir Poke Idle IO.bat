@echo off
setlocal enabledelayedexpansion
title PIO Rebosteio - Poke Idle IO
cd /d "%~dp0"

rem ==============================================================================
rem PIO Rebosteio - Inicializador com Auto-Update, Auto-Setup e Dependencias
rem ==============================================================================

rem 0. Auto-update silencioso via Git (nao bloqueia caso falhe ou nao tenha internet)
if exist ".git" (
  where.exe git.exe >nul 2>nul
  if not errorlevel 1 (
    echo Sincronizando atualizacoes do PIO Rebosteio...
    set "GIT_TERMINAL_PROMPT=0"
    git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=5 pull --no-edit >nul 2>nul
    if not errorlevel 1 (
      echo Projeto atualizado com sucesso.
    )
  )
)

set "NODE_CMD="
set "NPM_CMD="

rem 1. Verifica se ja temos o Node portatil baixado localmente
if exist ".runtime\node\node.exe" (
  set "NODE_CMD=%~dp0.runtime\node\node.exe"
  set "NPM_CMD=%~dp0.runtime\node\npm.cmd"
  if exist "%~dp0.runtime\node\node_modules\npm\bin\npm-cli.js" (
    set "NPM_CLI_JS=%~dp0.runtime\node\node_modules\npm\bin\npm-cli.js"
  )
  set "PATH=%~dp0.runtime\node;%PATH%"
) else (
  rem 2. Verifica se o Node.js esta instalado no sistema e se a versao e >= 22.12
  where.exe node.exe >nul 2>nul
  if not errorlevel 1 (
    where.exe npm >nul 2>nul
    if not errorlevel 1 (
      node -e "const [M,m]=process.versions.node.split('.').map(Number);process.exit(M>22||(M===22&&m>=12)?0:1)" >nul 2>nul
      if not errorlevel 1 (
        set "NODE_CMD=node"
        for /f "delims=" %%I in ('node -e "try{console.log(require('path').join(require('path').dirname(process.execPath),'node_modules','npm','bin','npm-cli.js'))}catch(_){}" 2^>nul') do (
          if exist "%%I" set "NPM_CLI_JS=%%I"
        )
        if not defined NPM_CLI_JS (
          for /f "delims=" %%I in ('where.exe npm.cmd 2^>nul') do (
            if not defined NPM_CMD set "NPM_CMD=%%I"
          )
        )
        if not defined NPM_CMD set "NPM_CMD=npm"
      )
    )
  )
)

rem 3. Se nao houver Node compativel, baixa automaticamente o Node.js 22 LTS portatil
if not defined NODE_CMD (
  echo ======================================================================
  echo   Node.js 22 LTS nao foi detectado no computador.
  echo   Baixando versao oficial portatil automaticamente para voce...
  echo ======================================================================
  echo.
  if not exist ".runtime" mkdir ".runtime"

  set "NODE_ZIP=.runtime\node-lts.zip"
  set "NODE_URL=https://nodejs.org/dist/v22.14.0/node-v22.14.0-win-x64.zip"

  where.exe curl.exe >nul 2>nul
  if not errorlevel 1 (
    curl.exe -L "!NODE_URL!" -o "!NODE_ZIP!"
  ) else (
    powershell -NoProfile -ExecutionPolicy Bypass -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object Net.WebClient).DownloadFile('!NODE_URL!', '!NODE_ZIP!')"
  )

  if not exist "!NODE_ZIP!" (
    echo.
    echo Falha ao baixar o Node.js automaticamente.
    echo Baixe e instale a versao LTS em: https://nodejs.org
    echo.
    pause
    exit /b 1
  )

  echo.
  echo Extraindo Node.js portatil...
  where.exe tar.exe >nul 2>nul
  if not errorlevel 1 (
    tar.exe -xf "!NODE_ZIP!" -C ".runtime"
  ) else (
    powershell -NoProfile -ExecutionPolicy Bypass -Command "Expand-Archive -Path '!NODE_ZIP!' -DestinationPath '.runtime' -Force"
  )

  if exist "!NODE_ZIP!" del /f /q "!NODE_ZIP!"

  if exist ".runtime\node-v22.14.0-win-x64" (
    if exist ".runtime\node" rmdir /s /q ".runtime\node"
    move ".runtime\node-v22.14.0-win-x64" ".runtime\node" >nul
  )

  if exist ".runtime\node\node.exe" (
    set "NODE_CMD=%~dp0.runtime\node\node.exe"
    set "NPM_CMD=%~dp0.runtime\node\npm.cmd"
    if exist "%~dp0.runtime\node\node_modules\npm\bin\npm-cli.js" (
      set "NPM_CLI_JS=%~dp0.runtime\node\node_modules\npm\bin\npm-cli.js"
    )
    set "PATH=%~dp0.runtime\node;%PATH%"
    echo Node.js configurado com sucesso.
    echo.
  ) else (
    echo Nao foi possivel extrair o Node.js portatil.
    echo Instale o Node.js LTS manualmente em https://nodejs.org
    pause
    exit /b 1
  )
)

rem 4. Verifica e instala as bibliotecas do projeto (Electron) se faltar
set "PG_FALTA="
if not exist "node_modules\electron\path.txt" set "PG_FALTA=1"
if not exist "node_modules\electron\dist\electron.exe" set "PG_FALTA=1"

if defined PG_FALTA (
  echo Instalando as dependencias do PIO Rebosteio...
  echo Na primeira vez isso pode levar alguns minutos. Nao feche esta janela...
  if defined NPM_CLI_JS (
    "!NODE_CMD!" "!NPM_CLI_JS!" install --no-audit --no-fund
  ) else (
    call "!NPM_CMD!" install --no-audit --no-fund
  )
  echo Baixando o Electron...
  if exist "tools\ensure-electron.js" (
    "!NODE_CMD!" "tools\ensure-electron.js"
  ) else if exist "node_modules\electron\install.js" (
    "!NODE_CMD!" "node_modules\electron\install.js"
  ) else (
    "!NODE_CMD!" -e "require('electron')"
  )
)

if not exist "node_modules\electron\dist\electron.exe" (
  if exist "tools\ensure-electron.js" (
    echo Tentando recuperacao automatica da instalacao...
    "!NODE_CMD!" "tools\ensure-electron.js"
  )
)

if not exist "node_modules\electron\dist\electron.exe" (
  echo.
  echo A instalacao do Electron nao terminou. Confira a conexao com a internet e abra novamente.
  echo.
  pause
  exit /b 1
)

rem 5. Verifica e prepara o Camoufox
if exist ".runtime\camoufox.ready" (
  if exist "%LOCALAPPDATA%\camoufox" goto :pular_camoufox
)

set "PYTHON_CMD="
where.exe python.exe >nul 2>nul
if not errorlevel 1 set "PYTHON_CMD=python"
if not defined PYTHON_CMD (
  where.exe py.exe >nul 2>nul
  if not errorlevel 1 set "PYTHON_CMD=py"
)
if not defined PYTHON_CMD (
  for /d %%D in ("%LOCALAPPDATA%\Programs\Python\Python3*" "%ProgramFiles%\Python3*") do (
    if exist "%%D\python.exe" (
      set "PYTHON_CMD=%%D\python.exe"
      set "PATH=%%D;%%D\Scripts;!PATH!"
    )
  )
)

if not defined PYTHON_CMD goto :tentar_winget_python

echo.
echo ======================================================================
echo   Configurando Camoufox - Resolvedor Cloudflare Turnstile Stealth
echo ======================================================================

"!PYTHON_CMD!" -c "import camoufox" >nul 2>nul
if errorlevel 1 (
  echo Instalando biblioteca Camoufox via pip...
  "!PYTHON_CMD!" -m pip install --quiet --disable-pip-version-check camoufox
)

"!PYTHON_CMD!" -c "import camoufox.pkgman; assert camoufox.pkgman.installed_verstr()" >nul 2>nul
if errorlevel 1 (
  echo Baixando navegador Camoufox - necessario uma unica vez...
  "!PYTHON_CMD!" -m camoufox fetch
)

if exist "tools\turnstile_solver.py" (
  "!PYTHON_CMD!" "tools\turnstile_solver.py" --self-test >nul 2>nul
  if not errorlevel 1 (
    if not exist ".runtime" mkdir ".runtime"
    echo camoufox_ok > ".runtime\camoufox.ready"
    echo Camoufox configurado com sucesso.
  )
)
echo.
goto :pular_camoufox

:tentar_winget_python
where.exe winget.exe >nul 2>nul
if not errorlevel 1 (
  echo.
  echo ======================================================================
  echo   Python nao detectado. Instalando Python 3 para ativar o Camoufox...
  echo ======================================================================
  winget install Python.Python.3.12 --silent --accept-package-agreements --accept-source-agreements
  where.exe python.exe >nul 2>nul
  if not errorlevel 1 (
    set "PYTHON_CMD=python"
    "!PYTHON_CMD!" -m pip install --quiet --disable-pip-version-check camoufox
    "!PYTHON_CMD!" -m camoufox fetch
    if not exist ".runtime" mkdir ".runtime"
    echo camoufox_ok > ".runtime\camoufox.ready"
    echo Camoufox configurado com sucesso.
  )
) else (
  echo [Aviso] Python nao detectado. O launcher abrira normalmente com login padrao.
  echo Para ativar o Camoufox Turnstile Stealth, instale o Python em https://python.org
)

:pular_camoufox

rem 6. Abre o aplicativo
start "" "node_modules\electron\dist\electron.exe" .
