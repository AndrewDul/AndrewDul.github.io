# Web Portfolio — Andrzej Dul

A static, dependency-free portfolio site designed for later GitHub Pages publication.

## Run locally

Open `index.html` in a browser, or use a static server from this folder:

```powershell
python -m http.server 4173
```

Then visit `http://localhost:4173`.

## Publish to GitHub Pages later

1. Create an empty GitHub repository.
2. Copy the contents of this folder to that repository, including `assets` and `projects`.
3. Commit and push to the default branch.
4. In GitHub: **Settings → Pages → Deploy from a branch**, then choose the default branch and `/ (root)`.

The site uses only relative file paths and needs no build step or installed dependencies.

## Important implementation notes

- The AI portfolio assistant is a clearly labelled visual prototype. No model, backend or private-repository access exists yet.
- The contact form submits name, email and message to FormSubmit, which delivers it to `dulandrew.dev@gmail.com`. FormSubmit sends a one-time recipient activation email after the first submission; delivery starts after that link is confirmed. Its hosted thank-you page appears after a submission until a portfolio URL is chosen for a custom thank-you page.
- Project pages include only claims verified from the CV and public project documentation. They can be expanded with screenshots and fuller case studies later.
- This folder has not been published or connected to GitHub by this work.
