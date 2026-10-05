@echo off
setlocal enabledelayedexpansion
title PIO Rebosteio - Poke Idle IO
cd /d "%~dp0"

rem ==============================================================================
rem PIO Rebosteio - Inicializador com Auto-Setup de Node.js e Dependencias
rem ==============================================================================

set "NODE_CMD="
set "NPM_CMD="

rem 1. Verifica se ja temos o Node portatil baixado localmente
if exist ".runtime\node\node.exe" (
  set "NODE_CMD=%~dp0.runtime\node\node.exe"
  set "NPM_CMD=%~dp0.runtime\node\npm.cmd"
  set "PATH=%~dp0.runtime\node;%PATH%"
) else (
  rem 2. Verifica se o Node.js esta instalado no sistema e se a versao e >= 22.0
  where node >nul 2>nul
  if not errorlevel 1 (
    where npm >nul 2>nul
    if not errorlevel 1 (
      node -e "const [a]=process.versions.node.split('.').map(Number);process.exit(a>=22?0:1)" >nul 2>nul
      if not errorlevel 1 (
        set "NODE_CMD=node"
        set "NPM_CMD=npm"
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
    set "PATH=%~dp0.runtime\node;%PATH%"
    echo Node.js configurado com sucesso!
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
  call "!NPM_CMD!" install --no-audit --no-fund
  echo Baixando o Electron...
  "!NODE_CMD!" -e "require('electron')"
)

if not exist "node_modules\electron\dist\electron.exe" (
  echo.
  echo A instalacao nao terminou. Confira a conexao com a internet e abra novamente.
  pause
  exit /b 1
)

rem 5. Abre o aplicativo
start "" "node_modules\electron\dist\electron.exe" .
