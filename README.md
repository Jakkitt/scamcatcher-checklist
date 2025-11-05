# ScamCatcher – Git Bootstrap Patch

This patch adds useful repo files.

## Files
- `.gitignore` – Node/Vite/React ignores
- `.gitattributes` – normalize line endings
- `.env.example` – env template
- `CONTRIBUTING.md` – git workflow
- `.vscode/extensions.json` – editor recommendations

## Usage
```bash
cp .env.example .env
git init
git add .
git commit -m "chore: add repo bootstrap files"
git branch -M main
git remote add origin <YOUR_REPO_URL>
git push -u origin main
```
