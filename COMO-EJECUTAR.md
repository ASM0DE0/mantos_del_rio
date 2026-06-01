# Cómo ver el sitio (importante)

## No uses Live Server

Este proyecto es **React + Vite + TypeScript**.  
Live Server solo abre HTML estático y **no compila** `.tsx`. Por eso ves la pantalla en blanco.

## Pasos correctos en VS Code

1. Abre la carpeta: `Escritorio\cursor\mantos del rio`
2. Terminal → **Nueva terminal** (Ctrl + Ñ o Ctrl + `)
3. Ejecuta:

```powershell
npm install
npm run dev
```

4. Abre en el navegador la URL que muestra la terminal, normalmente:

**http://localhost:5173**

## Atajo en Windows

Doble clic en `iniciar.bat` dentro de la carpeta del proyecto.

## Si `npm install` falla (certificado SSL)

Si ves `UNABLE_TO_VERIFY_LEAF_SIGNATURE` o `unable to verify the first certificate`:

**Opción 1 (Node 22+, recomendada):** en PowerShell, antes de instalar:

```powershell
$env:NODE_OPTIONS="--use-system-ca"
npm install
npm run dev
```

**Opción 2:** en la misma carpeta del proyecto, crea o edita `.npmrc` con:

```
strict-ssl=false
```

Luego `npm install` de nuevo. (Úsalo solo si la opción 1 no funciona, por ejemplo con antivirus o red corporativa.)

**Importante:** ejecuta `npm install` en la terminal de Windows o VS Code **fuera de Live Server**, en:

`C:\Users\Usuario\Desktop\cursor\mantos del rio`

Sin `node_modules` la página no puede cargar (pantalla en blanco incluso con `npm run dev`).

## Si sigue en blanco

- Revisa la terminal: debe decir `VITE v6.x ready`
- Abre las herramientas de desarrollador (F12) → pestaña **Consola** y mira si hay errores en rojo
- No abras `index.html` directamente con Live Server ni con doble clic
