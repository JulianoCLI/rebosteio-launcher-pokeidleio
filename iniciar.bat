@echo off
setlocal enabledelayedexpansion
title PIO Rebosteio - Poke Idle IO (Console)
cd /d "%~dp0"

if exist ".runtime\node\node.exe" (
  set "PATH=%~dp0.runtime\node;%PATH%"
) else (
  where node >nul 2>nul || (
    call "Abrir Poke Idle IO.bat"
    exit /b
  )
)

set "PG_FALTA="
if not exist "node_modules\electron\path.txt" set "PG_FALTA=1"
if not exist "node_modules\electron\dist\electron.exe" set "PG_FALTA=1"
if defined PG_FALTA (
  echo Instalando dependencias do PIO Rebosteio...
  call npm install --no-audit --no-fund
)

echo Abrindo o PIO Rebosteio...
call npm start
if errorlevel 1 (
  echo.
  echo O PIO Rebosteio fechou com erro. Tire um print desta janela para relatar.
  pause
)
