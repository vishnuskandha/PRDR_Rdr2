# Security Policy

## Supported Versions

Security updates are applied to the latest release on the `main` branch.

## Reporting a Vulnerability

Please report security vulnerabilities by opening a private advisory:

1. Go to https://github.com/vishnuskandha/PRDR_Rdr2/security/advisories/new
2. Describe the vulnerability and, if possible, include a minimal reproduction.

Do not open a public issue for security vulnerabilities.

I aim to acknowledge reports within 48 hours and will keep you updated as the issue is assessed and fixed.

## Security Notes

- All file processing happens client-side; no files are transmitted anywhere.
- The app uses a strict dependency and build pipeline (npm lockfile, CI). If you notice a dependency with a known vulnerability, report it via the process above.
