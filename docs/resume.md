# resume.html — Resume

## Overview
Resume page with a PDF download button, an embedded PDF preview, and HTML timeline sections for education and experience. Lite canvas background.

---

## Canvas Background
- **Spec:** Lite (20 particles, 60px connection distance, 70% alpha)

---

## Navigation
Same as all inner pages — 5 centered links, fixed top bar.

---

## Download Box
`.resume-download-box` — white card, centered, `2.5rem` padding, `16px` border-radius.

- Subtext: *"Download the full PDF version of my resume."* — `0.9rem`, secondary color
- Button: **Download Resume (PDF)** — primary teal button, `download` attribute, links to `assets/Graduate_School_resume.pdf`

---

## PDF Preview
Embedded `<iframe>` wrapped in a card-styled container (white background, teal border, 12px radius).

- Source: `assets/Graduate_School_resume.pdf`
- Height: `900px`, width: `100%`
- Border: none (border is on the wrapper div, not the iframe)

---

## Education Timeline
`.timeline` — vertical stack of `.timeline-item` rows.

Each item is a 2-column grid: date column (`160px`) on the left, content on the right. Collapses to 1 column below 700px.

| Dates | Degree | Institution |
|---|---|---|
| Sept 2022 — June 2026 | B.S. Statistics & Data Science + B.S. Psychological and Brain Sciences | University of California, Santa Barbara |

Bullet points:
- Honors thesis on flexible collective intelligence in LLMs
- Coursework: probability & inference, regression, stochastic processes, data science, machine learning, linear algebra, OOP, data structures
- Link to transcript PDF: `assets/AR25_Transcript.pdf`

---

## Experience Timeline
Same `.timeline` layout as education.

### Executive Research Assistant
- **Org:** Vision and Image Understanding Lab — Goleta, CA
- **Dates:** Jan 2024 — Present
- Led large-scale psychophysics experiments (prosthetic vision, AI-human decision comparisons)
- Managed fellow RAs: scheduling, quality control, deadline tracking
- Implemented gaze-contingent and phosphene-rendered stimuli; reliable eye-tracking data collection
- Collaborated with graduate researchers on experimental protocols and publications
- Organized and quality-checked datasets for statistical and ML analysis

### IT Intern
- **Org:** UFCW Trust — Concord, CA
- **Dates:** July 2024 — Aug 2024
- Oversaw upgrade of 150+ company laptops via Windows Autopilot
- Optimized workflow, shortening the project by 3 weeks
- Documented hardware serial numbers; ensured HIPAA-compliant data wipe procedures

### [ROLE] — Placeholder
- Empty timeline item for a future additional role

---

## Footer
Same as all pages.

---

## Placeholder Content
- **[ROLE] / [COMPANY] / [DATE RANGE]** — replace the third timeline item with any additional experience, or delete it if not needed
