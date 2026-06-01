@echo off
cd /d "%~dp0"
echo Instalando dependencias...
call npm install
if errorlevel 1 (
  echo Error en npm install. Revisa tu conexion a internet.
  pause
  exit /b 1
)
echo.
echo Iniciando servidor en http://localhost:5173
call npm run dev
pause
