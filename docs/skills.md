# skills.html — Skills & Courses

## Overview
Technical skills and academic background page. Lite canvas background. Three sections: animated skill bars, a course card grid, and a "currently learning" card.

---

## Canvas Background
- **Spec:** Lite (20 particles, 60px connection distance, 70% alpha)

---

## Navigation
Same as all inner pages — 5 centered links, fixed top bar.

---

## Technical Skills Section
Three skill groups, each with a small uppercase category label and a list of labeled progress bars.

### Bar anatomy
Each row (`.skill-bar-row`) contains:
- Label (`width: 130px`, fixed, `0.875rem`)
- Track (`.skill-track`) — `5px` tall, `rgba(29,158,117,0.12)` background
- Fill (`.skill-fill`) — teal→blue gradient, animates from 0 to target width on page load via JS

### Groups and values

**Languages**
| Skill | Width |
|---|---|
| Python | 88% |
| R | 85% |
| SQL | 65% |
| [LANGUAGE 4] | 50% |

**ML / AI**
| Skill | Width |
|---|---|
| Regression / GLMs | 90% |
| Classification | 80% |
| Clustering / PCA | 82% |
| NLP | 68% |
| Deep Learning | 60% |
| Time Series | 72% |

**Tools & Platforms**
| Skill | Width |
|---|---|
| Git / GitHub | 80% |
| Jupyter / RStudio | 88% |
| Azure AI (Fundamentals) | 55% |
| [TOOL 4] | 50% |

---

## Courses & Certifications Section
Responsive card grid (`.courses-grid`, `minmax(280px, 1fr)`). Each card (`.course-card`) shows:
1. **Platform label** — `0.75rem`, uppercase, teal, letter-spacing `0.06em`
2. **Course name** — `h3`, `0.95rem`, weight 500
3. **Description** — `p`, `0.82rem`, secondary color
4. **Date** — `0.78rem`, secondary color
5. **Certificate link** (optional) — small teal link

### Current Courses

| Platform | Course | Date |
|---|---|---|
| UCSB | PSTAT 120A/B — Probability & Statistics | 2023–2024 |
| UCSB | PSTAT 100 — Data Science Concepts & Analysis | Fall 2024 |
| UCSB | PSTAT 126 — Regression Analysis | Winter 2025 |
| UCSB | PSTAT 160A/B — Stochastic Processes | 2024–2025 |
| UCSB — Math | MATH 4A — Linear Algebra | 2023 |
| UCSB — CS | CMPSC 8/9 — Intro & Intermediate Python | 2022–2023 |
| Microsoft | Azure AI Fundamentals | [DATE placeholder] |
| [PLATFORM] | [COURSE NAME] | [DATE placeholder] |

---

## Currently Learning Section
Single `.card` with a paragraph and a bulleted list. All content is placeholder.

---

## Footer
Same as all pages.

---

## Placeholder Content
- **[LANGUAGE 4]** — replace label and `data-width` value
- **[TOOL 4]** — replace label and `data-width` value
- **Azure AI Fundamentals** — fill in date and certificate link
- **[PLATFORM] / [COURSE NAME]** — replace entire card with a real course
- **Currently Learning** — replace paragraph and all three `[TOPIC]` list items
