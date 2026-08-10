# Contributing to PRDR Rdr2

Thanks for taking the time to contribute! This project is a browser-based converter for Red Dead Redemption 2 PRDR photo files.

## Getting Started

1. Fork the repository.
2. Clone your fork:
   ```bash
   git clone https://github.com/<your-username>/PRDR_Rdr2.git
   cd PRDR_Rdr2
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a feature branch:
   ```bash
   git checkout -b feat/your-feature
   ```

## Development

- Run the dev server with `npm run dev`.
- Keep code style consistent with the existing codebase (ESLint config included).
- Before committing, run:

  ```bash
  npm run lint
  npm run build
  ```

## Pull Request Process

1. Write clear, descriptive commit messages (e.g. `feat: add drag-and-drop for folders`).
2. Update the README if your change affects usage or setup.
3. Ensure the build and lint pass locally.
4. Open a pull request against `main`. CI runs lint and build automatically on every PR.

## Reporting Bugs

Open an issue and include:

- Steps to reproduce
- Expected vs. actual behavior
- Browser and OS versions
- A sample PRDR file if the bug involves conversion (obscure any personal data first)

## License

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE).
