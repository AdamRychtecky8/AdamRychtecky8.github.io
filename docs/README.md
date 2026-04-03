# UI Documentation

Page-by-page reference for the portfolio site. Each file documents structure, components, styles, and remaining placeholder content.

---

## Pages

- [index.md](index.md) — Home (hero, highlights, working-on cards, contact)
- [about.md](about.md) — About (bio, directional cards, closing line, contact)
- [projects.md](projects.md) — Projects (filter bar, project card grid)
- [skills.md](skills.md) — Skills & Courses (skill bars, course cards, currently learning)
- [resume.md](resume.md) — Resume (PDF download, embedded preview, timelines)

---

## Design System Summary

| Token | Value |
|---|---|
| Background | `#f7f5ee` (warm cream) |
| Primary text | `#1a1a18` |
| Secondary text | `#5a5a56` |
| Accent (teal) | `#1D9E75` |
| Secondary accent (blue) | `#378ADD` |
| Card background | `#ffffff` |
| Card border | `rgba(29,158,117,0.15)` |
| Font | Inter (weights 400, 500) via Google Fonts |
| Container max-width | `1100px`, padding `0 2rem` |
| Nav height | `56px` |
| Border radius (cards) | `12px` |

## File Structure

```
/index.html
/about.html
/projects.html
/skills.html
/resume.html
/css/style.css          — shared design system
/css/animations.css     — fade-up, skill bar, filter transitions
/js/background.js       — canvas animation (noise + particles)
/js/nav.js              — active link highlighting
/assets/                — PDFs, resume, transcript
/docs/                  — this documentation
/.github/workflows/deploy.yml — GitHub Actions → GitHub Pages
```

## Canvas Specs

| Page | Particles | Connection distance | Alpha scale |
|---|---|---|---|
| index.html | 110 | 130px | 1.0 |
| All other pages | 20 | 60px | 0.7 |

Override via `data-particles` and `data-maxdist` attributes on the `<canvas>` element. Lite mode via `data-lite`.
