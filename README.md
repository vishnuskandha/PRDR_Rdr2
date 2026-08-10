# Red Dead Redemption 2 PRDR Converter

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![CI](https://github.com/vishnuskandha/PRDR_Rdr2/actions/workflows/deploy.yml/badge.svg)](https://github.com/vishnuskandha/PRDR_Rdr2/actions/workflows/deploy.yml)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white)](https://vite.dev/)

[Live Demo](https://vishnuskandha.github.io/PRDR_Rdr2/)

Convert Red Dead Redemption 2 Photo Mode files (`.prdr`) to PNG images directly in your browser. All parsing and conversion happens client-side, so your files never leave your device.

## Overview

Red Dead Redemption 2 stores photo mode pictures in a proprietary `PRDR` format that standard image viewers cannot open. This tool reverse-engineers the binary structure of these files, extracts the embedded JPEG stream and the capture timestamp, and renders the image in the browser where you can preview and download it as PNG.

## Features

- **100% client-side**: Files are processed locally with JavaScript and never uploaded anywhere.
- **Batch conversion**: Convert multiple PRDR files at once with per-file progress reporting.
- **High quality**: Extracts the original embedded JPEG data and converts it to PNG without re-encoding loss.
- **Metadata extraction**: Reads the capture date/time from each file's header.
- **Polished UI**: Fluid animations and a responsive layout powered by GSAP, Three.js, and OGL.

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Installation

```bash
git clone https://github.com/vishnuskandha/PRDR_Rdr2.git
cd PRDR_Rdr2
npm install
```

### Available Scripts

| Script            | Description                                         |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Start the Vite development server with HMR          |
| `npm run build`   | Build the production bundle into `dist/`            |
| `npm run lint`    | Run ESLint over the codebase                        |
| `npm run preview` | Preview the production build locally                |

## Usage

1. Open the app in your browser.
2. Drag and drop PRDR files onto the upload area. Files are typically found at `Documents\Rockstar Games\Red Dead Redemption 2\Profiles\<ProfileID>`.
3. Each file is parsed and converted automatically; progress is shown per file.
4. Preview the converted images in the gallery and use "Download All" to save them.

## Project Structure

```
.
├── public/                  # Static assets
├── src/
│   ├── components/          # UI components (uploader, gallery, background)
│   ├── hooks/               # usePRDRConversion (conversion state machine)
│   ├── utils/               # PRDR parser and JPEG-to-PNG converter
│   ├── App.jsx              # Root component
│   └── main.jsx             # Entry point
├── .github/workflows/       # GitHub Pages deployment CI
├── index.html
└── vite.config.js
```

## How It Works

`src/utils/prdrParser.js` implements the reverse-engineered PRDR format:

- Metadata (capture timestamp) is read from bytes 20-54.
- The embedded JPEG stream is located by skipping the known 300-byte header or by searching for the JPEG magic bytes (`FF D8 FF E0 00 10`), with a fallback to the basic `FF D8 FF` signature.
- `src/utils/imageConverter.js` re-encodes the JPEG data to PNG for download.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for the contribution workflow and [SECURITY.md](SECURITY.md) for security guidance.

## License

Distributed under the [MIT License](LICENSE).
