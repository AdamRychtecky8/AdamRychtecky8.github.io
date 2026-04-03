# about.html — About

## Overview
Personal about page. Lite canvas background. Structured as a vertical stack of sections: bio, directional cards, closing line, contact.

---

## Canvas Background
- **Spec:** Lite (20 particles, 60px connection distance, 70% alpha)
- Set via `data-lite` attribute on the `<canvas>` element

---

## Navigation
Same as all inner pages — 5 centered links, fixed top bar, no brand name.

---

## Bio Section
Two-column layout (`.about-header`): photo box on the left, text on the right. Collapses to single column below 700px.

**Left — Profile photo box**
- `200x200px`, border-radius `16px`
- Background: `rgba(29,158,117,0.08)`, border: `0.5px solid rgba(29,158,117,0.15)`
- Currently a placeholder — replace with `<img>` tag

**Right — Bio text**
- Heading: `About Me` — `1.75rem`, weight 500
- Two paragraphs, `0.95rem`, primary text color `#1a1a18`

Paragraph 1 (origin story):
> "The brain is the most complex system we know of, and that was enough to pull me in. I started at UCSB studying Psychological and Brain Sciences because I wanted to understand it. What I found instead was that the tools for understanding it, the statistical models, the data pipelines, the AI systems built to mimic it, were just as fascinating as the brain itself. That shift changed everything. By the time I watched a model optimize flawlessly while understanding nothing, I had my real question: how do systems, human or artificial, actually make sense of the world? That gap stuck with me. It still shapes how I think about building things."

Paragraph 2 (current position):
> "I am finishing my degrees at UCSB and heading into the MS in Data Science at UW this fall. Early career, yes, but that just means everything interesting is still ahead of me. The problems I keep gravitating toward are the ones where being technically sharp is not enough on its own, and I am genuinely excited to start proving that out in the real world."

---

## Where I'm Headed Section
3-column responsive card grid (`.work-grid`, `minmax(220px, 1fr)`). Each card uses `.work-card` (white, teal border, 12px radius, hover lift). No icons.

| Card | Headline | Body summary |
|---|---|---|
| 1 | Systems of Intelligence | Designing systems where AI, ML, and human judgment each play to their strengths |
| 2 | AI as Collaborator | AI that makes the human doing the job better, not AI that replaces the job |
| 3 | Hard Problems, Done Properly | Drawn to genuinely difficult problems; satisfaction in working through something until it gives way |

---

## Closing Line
Single centered italic paragraph. No section heading.

> *"Outside of work, I try to read as much as I can; sci-fi mostly for the fun of it, and because imagining what's possible is its own kind of thinking; philosophy because life is confusing and it helps; and ML books for everything the classroom didn't get to."*

Style: `font-style: italic`, `color: #5a5a56`, `font-size: 16px`, `max-width: 720px`, centered with `margin: 0 auto`.

---

## Get in Touch Section
Identical to the section on `index.html`. See [index.md](index.md#get-in-touch-section) for full spec.

---

## Footer
Same as all pages.

---

## Placeholder Content
- Profile photo box — replace `[PROFILE PHOTO]` with an `<img>` tag pointing to your photo in `/assets/`
