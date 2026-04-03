# index.html — Home

## Overview
The landing page. Full-viewport hero with the animated canvas at full intensity, followed by below-fold content sections.

---

## Canvas Background
- **Spec:** Full (110 particles, 130px connection distance)
- Set via `data-particles="110" data-maxdist="130"` on the `<canvas>` element
- Sine-harmonic noise field breathes slowly across the cream background
- Particles drift, pulse in size, and connect with teal lines when within range
- All other pages use the lite spec (20 particles, 60px distance) via `data-lite`

---

## Navigation
- Fixed top bar, `height: 56px`
- Background: `rgba(247,245,238,0.85)` with `backdrop-filter: blur(12px)`
- Border-bottom: `0.5px solid rgba(29,158,117,0.15)`
- 5 centered links: Home · About · Projects · Skills · Resume
- No brand name — links only, horizontally centered via `justify-content: center` in `style.css`
- Active link highlighted in teal `#1D9E75`

---

## Hero Section
Full-viewport (`min-height: 100vh`), vertically and horizontally centered flex column.

| Element | Style |
|---|---|
| Name `Adam Rychtecky` | `clamp(2.2rem, 5vw, 3.5rem)`, weight 500, letter-spacing `-0.02em` |
| Discipline line | `15px`, weight 500, uppercase, letter-spacing `0.06em`, teal `#1D9E75` |
| Tagline | `17px`, weight 400, italic, secondary color `#5a5a56` |
| CTA buttons | "View My Work" (primary) → `projects.html` · "About Me" (secondary) → `about.html` |

Discipline line text: `DATA SCIENCE · MACHINE LEARNING · HUMAN-AI SYSTEMS`  
Tagline text: *Aspiring to design AI systems that work with people, not past them*

All three elements animate in with `fadeUp` staggered via `.hero-animate` delay classes.

---

## Highlights Section
3-column responsive stat card grid (`.stats-grid`, `minmax(220px, 1fr)`).

| Card | Stat | Label |
|---|---|---|
| 1 | `2+` | Years of active AI & vision research |
| 2 | `UW` | MS Data Science — admitted, starting soon |
| 3 | `UCSB` | B.S. Statistics & Data Science · B.S. Psychological & Brain Sciences |

Stat number: `2rem`, teal. Label: `0.85rem`, secondary color.

---

## What I'm Working On Section
3-column card grid (`.stats-grid`). Each card uses the `.card` class (white, teal border, 12px radius, hover lift).

| Card | Content |
|---|---|
| Honors Thesis | LLM collective intelligence study — GPT/Gemini replication of visual perception paradigm |
| Dialed App | React Native AI mental readiness coaching app for athletes |
| Graduate School | MS Data Science preparation |

---

## Get in Touch Section
Centered vertical stack inside `.contact-section` > `.contact-inner` (max-width 480px, flex column, align-items center).

Elements top to bottom:
1. `CONTACT` — 11px, uppercase, teal, letter-spacing `0.08em`
2. `Get in Touch` — 26px, weight 500
3. Teal divider — 40px wide, 1.5px tall, `rgba(29,158,117,0.25)`
4. Subtext — *"I'm always open to interesting conversations."* — 15px, secondary color
5. Email link — `adam.rychtecky@outlook.com` — teal, underline-border on hover
6. Button row — LinkedIn (primary, teal fill + SVG icon) · GitHub (secondary, teal outline + SVG icon)

---

## Footer
Centered, `0.8rem`, secondary color. GitHub and LinkedIn plain teal links.

---

## Placeholder Content
None — all content on this page is real.
