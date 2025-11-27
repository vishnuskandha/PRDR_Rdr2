# Red Dead Redemption 2 PRDR Converter

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white)

A high-performance, privacy-focused web application for converting Red Dead Redemption 2 Photo Mode (PRDR) files to high-quality PNG images. Built with modern web technologies to ensure speed, security, and a premium user experience.

## Overview

The **Red Dead Redemption 2 PRDR Converter** solves the problem of accessing and sharing in-game photos captured in Red Dead Redemption 2. The game stores these photos in a proprietary `PRDR` format that is not recognized by standard image viewers. This tool parses the binary structure of these files and extracts the embedded JPEG data, converting it to widely compatible PNG format directly in your browser.

## Key Features

*   **100% Private & Secure**: All processing is performed client-side using WebAssembly and JavaScript. Your files never leave your device.
*   **Lightning Fast**: Optimized for performance, capable of batch processing multiple files simultaneously.
*   **High Fidelity**: Extracts the maximum quality image available within the PRDR file without re-compression artifacts.
*   **Modern UI**: Features a responsive, interactive interface with fluid animations powered by GSAP and Three.js.

## Technology Stack

*   **Frontend Framework**: React 19
*   **Build Tool**: Vite
*   **Animation**: GSAP (GreenSock Animation Platform)
*   **Graphics**: Three.js / OGL
*   **Styling**: CSS3 with modern variables and layout techniques

## Installation

To run this project locally, follow these steps:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/vishnuskandha/PRDR_Rdr2.git
    cd PRDR_Rdr2
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## Usage

1.  Open the application in your web browser.
2.  Drag and drop your `PRDR` files (usually found in `Documents\Rockstar Games\Red Dead Redemption 2\Profiles\<ProfileID>`) onto the upload area.
3.  The application will automatically parse and convert the files.
4.  Preview the images in the gallery and click "Download All" to save them to your device.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Built by [Vishnu Skandha](https://github.com/vishnuskandha)**
