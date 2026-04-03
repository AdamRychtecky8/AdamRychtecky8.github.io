# projects.html — Projects

## Overview
Project showcase page. Lite canvas background. A category filter bar above a responsive card grid. Each card links to a GitHub repo and/or a PDF report.

---

## Canvas Background
- **Spec:** Lite (20 particles, 60px connection distance, 70% alpha)

---

## Navigation
Same as all inner pages — 5 centered links, fixed top bar.

---

## Filter Bar
Row of pill-shaped toggle buttons (`.filter-bar` > `.filter-btn`). JavaScript filters the grid by `data-category` attribute on each card.

| Button | Filter value | Matches categories |
|---|---|---|
| All | `all` | Shows everything |
| Machine Learning | `ml` | `ml` |
| Psychology | `psychology` | `psychology` |
| Data Analysis | `data` | `data` |
| Other | `other` | `other` |

Active button: teal fill `#1D9E75`, white text. Inactive: transparent, teal border on hover.  
Cards with `hidden` class are set to `display: none` during filtering.

---

## Project Grid
Responsive CSS grid (`.projects-grid`, `minmax(300px, 1fr)`, gap `1.25rem`). Each card (`.project-card`) is a white bordered flex column with hover lift.

### Current Cards

| Project | Categories | Links | Status |
|---|---|---|---|
| Honors Thesis: Flexible Collective Intelligence in LLMs | `ml psychology` | GitHub → `AdamRychtecky8/Honors_Project` | Live link |
| Dialed — Mental Readiness for Athletes | `other` | GitHub → `AdamRychtecky8/Dialed-App` | Live link |
| Gold, Growth, and Glory: Socioeconomic Drivers of Olympic Success | `ml data` | Report PDF → `assets/PSTAT100_finalproject.pdf` | Live link |
| IMDb Movies: Revenue Prediction Model | `ml data` | Report PDF → `assets/PSTAT126_FinalReport.pdf` | Live link |
| Particulate Matter Systematic Review | `data psychology` | Report PDF → `assets/ParticulateMatterReview.pdf` | Partial placeholder |
| [PROJECT NAME] | `other` | Placeholder | Full placeholder |

### Card Anatomy
Each card contains, top to bottom:
1. **Title** — `h3`, `1.1rem`, weight 500
2. **Description** — `p`, `0.875rem`, secondary color, `flex: 1` (pushes actions to bottom)
3. **Tech stack tags** — `.tags` row of `.tag` chips (teal bg tint, teal text, pill shape)
4. **Action links** — `.card-actions` flex row of `.card-link` buttons (teal outline, fills on hover)

---

## Footer
Same as all pages.

---

## Placeholder Content
- **Particulate Matter Systematic Review** — needs one-line description and tag 1/tag 2 filled in; GitHub link is `#`
- **[PROJECT NAME]** — replace entire card with your next project
- Several GitHub links on existing cards are `#` and need real URLs added
- Live demo links on Honors Thesis and Dialed are `#`
