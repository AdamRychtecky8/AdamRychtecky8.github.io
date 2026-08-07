# CLAUDE.md — adamrychtecky8.github.io

Personal portfolio site for Adam Rychtecky (UCSB Statistics & Data Science / Psych & Brain Sciences), deployed at https://adamrychtecky8.github.io.

## Stack: plain static HTML/CSS/JS (NOT Jekyll, despite appearances)

The **live site is hand-written HTML/CSS/JS** — no build step, no framework, no npm/Gemfile.

- Pages: [index.html](index.html), [about.html](about.html), [projects.html](projects.html), [skills.html](skills.html), [resume.html](resume.html)
- Styles: [css/style.css](css/style.css) (design system, ~925 lines), [css/animations.css](css/animations.css) (fade-up, skill bars, filter transitions)
- Scripts: [js/background.js](js/background.js) (canvas particle background — configurable via `data-particles`/`data-maxdist`/`data-lite` attrs on `#bg-canvas`), [js/nav.js](js/nav.js) (active nav-link highlighting)
- Assets: [assets/](assets/) — resume/transcript PDFs, project report PDFs

A `.nojekyll` file sits at repo root, which tells GitHub Pages to skip Jekyll processing entirely and serve files as-is.

### ⚠️ Vestigial Jekyll scaffolding — not live, do not assume it does anything
This repo started from GitHub's "Skills: GitHub Pages" course template (Jekyll + Minimal Mistakes remote theme) and was later converted to hand-rolled HTML. The Jekyll scaffolding was never deleted and **is dead weight**:
- [_config.yml](_config.yml), [_data/navigation.yml](_data/navigation.yml), [_posts/](_posts/), [_projects/](_projects/) (Jekyll collection), [index.md](index.md), [about.md](about.md), [projects.md](projects.md), [coursework.md](coursework.md)
- Because of `.nojekyll` + the deploy workflow (below), **none of this is built or rendered**. It's not reachable from the live site's nav and isn't linked from any `.html` page.
- Don't edit these `.md`/`_config.yml` files expecting site changes — edit the `.html`/`.css`/`.js` files instead. If asked to "clean up the repo," these are prime removal candidates (confirm with the user first).
- [portfolio/](portfolio/) (catboost-human-llm notes) is also unreferenced from any page — standalone scratch notes, not part of the site.
- [docs/](docs/) is **not** a GitHub Pages source folder — it's hand-written UI documentation (design tokens, page-by-page structure) for human/Claude reference. See [docs/README.md](docs/README.md).

## Deploy path

GitHub Actions workflow: [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
- Trigger: every push to `main` (or manual `workflow_dispatch`)
- Steps: checkout → `actions/configure-pages` → `actions/upload-pages-artifact` (uploads the **entire repo root** `.` as-is, no build/compile step) → `actions/deploy-pages`
- This requires the repo's Settings → Pages → Source to be set to **"GitHub Actions"** (not "Deploy from a branch").
- **What happens when you push to `main`: whatever is in the repo root gets published verbatim within ~1 minute.** There is nothing to run locally before pushing — HTML/CSS/JS changes go live as committed.

### Other workflows (inert — ignore)
[.github/workflows/0-welcome.yml](.github/workflows/0-welcome.yml) through `5-merge-your-pull-request.yml` are leftover artifacts of the GitHub Skills course template. Each is gated by `if: needs.get_current_step.outputs.current_step == N`, reading [.github/steps/-step.txt](.github/steps/-step.txt), which now contains `X` (course finished). None of their job bodies will ever run again. Safe to delete along with `.github/steps/` if tidying up, but harmless as-is.

[.github/dependabot.yml](.github/dependabot.yml) — monitors GitHub Actions versions monthly (the only "real" dependency surface, since there's no package.json/Gemfile).

## Content vs. structure — where to make edits

| Want to change... | Edit this |
|---|---|
| Home page text/hero/highlights | [index.html](index.html) |
| About Me bio | [about.html](about.html) |
| Project cards, repo/demo links | [projects.html](projects.html) |
| Skills, coursework, "currently learning" | [skills.html](skills.html) |
| Resume page / PDF link | [resume.html](resume.html), swap PDF in [assets/](assets/) |
| Site-wide colors, spacing, card styles | [css/style.css](css/style.css) |
| Animations (fade-up, skill bars) | [css/animations.css](css/animations.css) |
| Nav links (same list is copy-pasted into every page's `<nav>`) | each `.html` file's `<nav class="site-nav">` block individually — **no shared header/include**, so a nav change means editing all 5 files |
| Background canvas behavior | [js/background.js](js/background.js) |

Design tokens (colors, fonts, spacing) are documented in [docs/README.md](docs/README.md) — background `#f7f5ee`, teal accent `#1D9E75`, blue accent `#378ADD`, font Inter 400/500.

## Local preview

No build step required. Either:
- Open any `.html` file directly in a browser, or
- Serve the repo root with any static server, e.g. `python -m http.server 8000` or the VS Code "Live Server" extension, then visit `http://localhost:8000/index.html`.

## Notable issues / fragile spots

- **Duplicated nav markup**: the `<nav>` block is copy-pasted across all 5 HTML pages. Adding/renaming a page means editing 5 files by hand.
- **Duplicated footer markup** and hardcoded copyright year (`© 2026`) repeated across pages.
- **`_config.yml` placeholder email**: `mailto:your@email.com` (line 40) was never updated — inconsistent with the real email (`adam.rychtecky@outlook.com`) used throughout the live HTML pages. Moot for the live site since `_config.yml` isn't built, but worth knowing if the Jekyll scaffolding is ever revived or deleted.
- **Broken link in dead scaffolding**: [about.md](about.md) links to `/assets/transcript.pdf`, but the actual file is [assets/AR25_Transcript.pdf](assets/AR25_Transcript.pdf) (correct filename is used correctly in [coursework.md](coursework.md) and the live HTML). Not live, so not user-facing.
- **PDF asset naming is inconsistent**: `Graduate_School_resume.pdf`, `AR25_Transcript.pdf`, `PSTAT100_finalproject.pdf`, `PSTAT126_FinalReport.pdf`, `ParticulateMatterReview.pdf`, `court-vision-report.pdf` — no consistent naming convention.
- **No image assets** — `logo`/`avatar` fields are intentionally left blank in `_config.yml` (moot, but the convention of "no images" carries over: none of the live pages currently use photos/screenshots either, aside from inline SVG icons).
- **remote_theme in `_config.yml`** pins `mmistakes/minimal-mistakes@4.24.0`, but again this is unused dead config since Jekyll never builds.

{
  "attribution": {
    "commit": "",
    "pr": ""
  }
}
