# 🌿 Carta de Disculpa — Te Doy una Canción

Una landing page interactiva de scrollytelling inspirada en el álbum *Mujeres* de Silvio Rodríguez.

## 📂 Estructura del proyecto

```
carta-disculpa/
├── public/
│   └── assets/
│       ├── cover.jpg      ← 🖼  COLOCA AQUÍ la imagen de la carátula
│       └── song.mp3       ← 🎵  COLOCA AQUÍ el archivo de audio
├── src/
│   ├── components/
│   │   ├── BotanicalBackground.jsx
│   │   ├── HeroSection.jsx
│   │   ├── LetterSection.jsx
│   │   └── LyricsOverlay.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🚀 Instalación y ejecución

### 1. Instala Node.js (si no lo tienes)

Descarga desde: https://nodejs.org (versión LTS recomendada)

### 2. Instala pnpm (gestor de paquetes)

```bash
npm install -g pnpm
```

### 3. Instala las dependencias del proyecto

```bash
cd carta-disculpa
pnpm install
```

### 4. Ejecuta en desarrollo

```bash
pnpm dev
```

Abre http://localhost:5173 en tu navegador (preferiblemente en modo móvil con DevTools).

### 5. Build para producción

```bash
pnpm build
```

## 🎨 Personalización

### Colores
Edita `tailwind.config.js` → sección `colors` para ajustar la paleta.

### Texto de la carta
Edita el array `PARAGRAPHS` en `src/components/LetterSection.jsx`.

### Letras de la canción
Edita el array `LYRICS` en `src/components/LyricsOverlay.jsx`.  
Ajusta los valores `start` y `end` (en segundos) para sincronizarlos con tu mp3.

## 🔊 Audio

El archivo de audio debe llamarse `song.mp3` y ubicarse en:
```
public/assets/song.mp3
```

La imagen de la carátula debe llamarse `cover.jpg` y ubicarse en:
```
public/assets/cover.jpg
```

> **Nota**: El botón "Toca para comenzar" es el gate del AudioContext del navegador.
> Sin esa interacción inicial, el audio no puede reproducirse en móviles modernos.
