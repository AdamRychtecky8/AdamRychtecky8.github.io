# CLAUDE.md — adamrychtecky8.github.io

Personal portfolio site for **Adam Rychtecky** — UCSB B.S. Statistics & Data Science + B.S. Psychological & Brain Sciences, now in the M.S. Data Science program at the University of Washington.

**Live:** https://adamrychtecky8.github.io

> **This file is the grounding document for the repo.** It's written so an AI agent (or a future Adam) can read this one file and know exactly what every feature does, where it lives, and how to change it — without re-reading the whole codebase. If the request is *"make the blog tags bigger"* or *"add a project card"*, the answer should be findable here.
>
> [README.md](README.md) is a different thing: a short, human-facing introduction for recruiters, friends, and visitors. It is **not** technical documentation and should not be treated as a source of truth about the code. Keep it short; keep the depth here.

---

## Table of contents

- [1. Stack in one paragraph](#1-stack-in-one-paragraph)
- [2. Repo map](#2-repo-map)
- [3. Design system](#3-design-system)
- [4. Shared chrome (on every page)](#4-shared-chrome-on-every-page)
- [5. Page-by-page functionality](#5-page-by-page-functionality)
- [6. The blog system in depth](#6-the-blog-system-in-depth)
- [7. Common tasks (recipes)](#7-common-tasks-recipes)
- [8. Vocabulary → file/selector map](#8-vocabulary--fileselector-map)
- [9. Local preview & deploy](#9-local-preview--deploy)
- [10. Known issues, placeholders & fragile spots](#10-known-issues-placeholders--fragile-spots)
- [11. Dead scaffolding — do not edit](#11-dead-scaffolding--do-not-edit)

---

## 1. Stack in one paragraph

Hand-written **static HTML/CSS/JS**. No framework, no bundler, no npm, no Gemfile, **no build step** — and specifically **not Jekyll**, despite the leftover scaffolding that makes it look that way ([§11](#11-dead-scaffolding--do-not-edit)). A [.nojekyll](.nojekyll) file at the root tells GitHub Pages to skip Jekyll and serve files verbatim. Pushing to `main` publishes the repo root as-is within about a minute. Everything you edit is the thing that ships.

**External runtime dependencies (only two):**
1. **Google Fonts** — Inter 400/500, `@import`ed at the top of [css/style.css](css/style.css).
2. **marked** (Markdown renderer) — CDN `<script>` in [personalblog.html](personalblog.html), used only by the blog post view. [js/blog.js](js/blog.js) degrades to plain text if it fails to load.

Everything else — the animated background, filtering, tabs, routing, read-time — is vanilla JS written in this repo.

---

## 2. Repo map

```
index.html            Home — hero, highlights, "what I'm working on", contact
about.html            About — photo + bio, direction cards, closing line, contact
projects.html         Projects — filter bar + project card grid
skills.html           Skills — tabbed competencies, language strip, coursework, "building toward"
personalblog.html     Blog — index list AND single-post view (one file, two modes)
resume.html           Resume — embedded PDF, download box, education + experience timelines

css/style.css         Design system + all shared components (937 lines)
css/animations.css    fade-up keyframes, hero entrance, .project-card.hidden (39 lines)
css/blog.css          Blog-only styling: topic hues, log entries, post typography (410 lines)

js/background.js      Canvas particle + noise background (151 lines)
js/nav.js             Active nav-link highlighting (12 lines)
js/blog.js            Blog manifest, routing, filtering, read-time, reading progress (294 lines)

blog/posts/*.md       Blog post bodies, plain Markdown, no frontmatter
assets/               PDFs (resume, transcripts, project reports) + profile-photo.jpg
docs/                 Hand-written UI docs (per-page structure notes) — reference only, not served as a Pages source
.github/workflows/    deploy.yml is the real one; 0-welcome.yml…5-*.yml are inert course leftovers
```

**Not part of the live site:** `_config.yml`, `_data/`, `_posts/`, `_projects/`, `index.md`, `about.md`, `projects.md`, `coursework.md`, `assets/css/main.scss`, `portfolio/`. See [§11](#11-dead-scaffolding--do-not-edit).

---

## 3. Design system

Tokens are CSS custom properties declared in `:root` at the top of [css/style.css](css/style.css):

| Token | Value | Used for |
|---|---|---|
| `--bg` | `#f7f5ee` | Warm cream page background (also hardcoded in [js/background.js](js/background.js) canvas fill) |
| `--text` | `#1a1a18` | Primary text |
| `--text-sec` | `#5a5a56` | Secondary/muted text |
| `--teal` | `#1D9E75` | Primary accent — links, buttons, borders, particles |
| `--blue` | `#378ADD` | Secondary accent — "In Progress" badges, ML Notes hue |
| `--card-bg` | `#ffffff` | Card surfaces |
| `--card-bdr` | `rgba(29,158,117,0.15)` | Hairline card/nav borders |
| `--nav-bg` | `rgba(247,245,238,0.85)` | Translucent nav, backed by `backdrop-filter: blur(12px)` |
| `--mono` | `ui-monospace, Menlo, monospace` | **Blog only** (declared in [css/blog.css](css/blog.css)) — dates and year rules |

**Other constants:** font Inter 400/500 · `.container` max-width `1100px`, padding `0 2rem` · nav height `56px` · card radius `12px` · `line-height: 1.65` · `html { scroll-behavior: smooth }`.

**Responsive breakpoints** live at [css/style.css:639](css/style.css#L639) (`max-width: 700px`), [:913](css/style.css#L913) (`900px`), [:919](css/style.css#L919) (`600px`), and [css/blog.css:391](css/blog.css#L391) (`700px`).

There is **no global `.hidden` class**. Each feature defines its own: `.project-card.hidden` at [css/animations.css:37](css/animations.css#L37), `.log-entry.hidden` at [css/blog.css:169](css/blog.css#L169). If you add a new filterable thing, you must add its own `.hidden { display: none }` rule.

---

## 4. Shared chrome (on every page)

### 4.1 Animated canvas background — [js/background.js](js/background.js)

Every page opens with `<canvas id="bg-canvas">` fixed at `z-index: -1`. The script self-exits if that element is missing.

Each frame it: fills `#f7f5ee` → draws a sine/cosine **noise field** on a 10px grid (teal tint, max alpha `0.06`) → moves particles with drift + per-particle sine wobble, wrapping at edges → draws **connection lines** between any two particles closer than `MAX_DIST` (alpha fades with distance) → draws each particle as a **core dot plus a soft halo** at 3× radius, pulsing via `sin`. Particle color is interpolated between teal `#1D9E75` and blue `#378ADD` by a per-particle `t`. Resizing reinitializes and restarts the loop.

Configured **per page via data attributes on the canvas** — no JS edit needed:

| Attribute | Effect | Default |
|---|---|---|
| `data-particles="110"` | Particle count | 55 full / 20 lite |
| `data-maxdist="130"` | Max px distance for a connection line | 90 full / 60 lite |
| `data-lite` | Lite mode: fewer particles, shorter links, alpha × 0.7 | off |

Current usage: [index.html](index.html) is `data-particles="110" data-maxdist="130"` (dense, hero-worthy). **All five other pages use `data-lite`** (20 particles / 60px / 70% alpha).

> The animation runs continuously via `requestAnimationFrame` with no `prefers-reduced-motion` guard and no pause when the tab is hidden. If motion sensitivity or battery ever comes up, that's the change to make.

### 4.2 Navigation — [js/nav.js](js/nav.js)

The `<nav class="site-nav">` block is **copy-pasted into all six HTML files** — there is no include or template. Order: Home · About · Projects · Skills · Blog · Resume. Adding or renaming a page means editing six files by hand.

`nav.js` reads `location.pathname.split('/').pop()`, falls back to `index.html` when it's empty (the bare `/` root URL), and adds `.active` to the matching link. Styling for `.active` is in [css/style.css](css/style.css).

### 4.3 Footer

Also duplicated per page (present on index, projects, skills, resume, blog — **[about.html](about.html) has no footer**). Hardcoded `© 2026` with inline-styled teal GitHub/LinkedIn links. Changing the year or a link means editing every copy.

### 4.4 Contact section

The `.contact-section` block — label, "Get in Touch", divider, mailto, and LinkedIn/GitHub buttons with inline SVG icons — appears on [index.html](index.html) and [about.html](about.html) only. The two copies are identical and must be kept in sync manually. Email: `adam.rychtecky@outlook.com`.

### 4.5 Entrance animations — [css/animations.css](css/animations.css)

- `.fade-up` — 0.55s fade + 18px rise, staggered by `:nth-child(1..6)` from 0.05s to 0.40s. Applied to cards across every page. **CSS-only and fires on load**, not on scroll — there is no IntersectionObserver, so below-fold cards have already animated by the time you reach them.
- `.hero-animate` with `.delay-1` / `.delay-2` / `.delay-3` — 0.7s hero entrance, used on [index.html](index.html).

---

## 5. Page-by-page functionality

### 5.1 [index.html](index.html) — Home

| Section | What it is |
|---|---|
| Hero | Name, uppercase teal discipline line ("Data Science · Machine Learning · Human-AI Systems"), italic mission line, then two buttons: `.btn-primary` → Projects, `.btn-secondary` → About. Text is inline-styled, not class-driven. |
| Highlights | Three `.stat-card`s in `.stats-grid` — big `.stat-num` ("2+", "UW", "UCSB") over a `.stat-label`. |
| What I'm working on | Three `.card`s — Honors Thesis, Dialed App, Graduate School. |
| Get in Touch | Shared contact block ([§4.4](#44-contact-section)). |

Static — no page-specific JS beyond `background.js` + `nav.js`.

### 5.2 [about.html](about.html) — About

`.about-header` puts `.profile-photo-box` (`assets/profile-photo.jpg`) beside a `.bio` with a "Background" label and two paragraphs (the psych→stats pivot; now at UW). Then three `.work-card`s under "Where I'm Headed" (Systems of Intelligence · AI as Collaborator · Hard Problems, Done Properly), an italic centered closing line about reading, and the contact block. `.about-divider` rules separate the sections. Static; **no footer on this page**.

### 5.3 [projects.html](projects.html) — Projects

**Filter bar → card grid.** Five `.filter-btn`s (`data-filter`): `all` · `ml` · `psychology` · `data` · `other`. Each `.project-card` carries a **space-separated** `data-category`, so a card can belong to several filters (e.g. `data-category="ml psychology"`).

The filter logic is a **~20-line inline `<script>` at the bottom of the page** (not in `js/`): on click it moves `.active` between buttons, then toggles `.hidden` on each card based on `cats.includes(filter)`. `.project-card.hidden { display: none }` lives in [css/animations.css](css/animations.css).

> Matching is a substring test, so filter keys must not be prefixes of one another. The current five are safe; if you add a category, don't name it something like `ml-ops` (it would match `ml`).

**Card anatomy:** optional "In Progress" pill (inline-styled blue) → `<h3>` title → optional small gray subtitle line (role/course context) → description paragraph → `.tags` of `.tag` spans (tech stack) → `.card-actions` with `.card-link` anchors (repo / report / live site).

**Current cards, in order:** Court-Vision · When Human and AI Crowds Agree Too Much · Modeling Perceptual Decisions: Humans vs. LLMs · Dialed · Wavelength · PM2.5 & Alzheimer's Review · Olympics (Gold, Growth, and Glory) · IMDb Revenue · plus a ninth **"Building"** stub card ("Whatever may come next in my building process").

Two cards deliberately have **no `.card-actions` block at all**: **Wavelength** (in progress — no public repo or deployment yet) and the **"Building"** stub. That's intentional, not an omission: an empty `.card-link` renders as an invisible click target, so the block is left out entirely until there's a real URL. Add it back when there is one.

### 5.4 [skills.html](skills.html) — Skills

The most structurally complex page. A `.skills-hero-section` intro, then four sections:

**a) Core Competencies — tabbed.** A `.tabs-bar[role="tablist"]` with four `.tab-btn`s (`data-tab="0..3"`): **ML & Modeling · AI Systems · Research · Human-AI**. Each maps to `#tab-panel-N`. An inline `<script>` at the bottom swaps `.active` and the `hidden` attribute, manages `aria-selected`, and re-triggers the fade with a double `requestAnimationFrame`. Panel 0 is open on load.

Inside a panel: a `.cluster-fwd` narrative paragraph, then `.subgroup-label` headings over `.skill-pills` rows. Pill variants:
- `.skill-pill` — standard
- `.skill-pill.priority` — stronger teal fill/border, weight 500 (the headline skills)
- `.skill-pill.sm` — smaller, used in the coursework cards
- `data-tooltip="…"` — hover tooltip via `.skill-pill[data-tooltip]:hover::after` ([css/style.css:767](css/style.css#L767)), rendered as `content: attr(data-tooltip)` in a white bubble above the pill. It's `white-space: nowrap`, so **long tooltip text will overflow the viewport** — keep it to a short phrase. Hover-only: no keyboard or touch equivalent.

Panels 1 and 3 end with a `.cluster-cta` button (Dialed live demo; Flexible-Wisdom thesis repo).

**b) Languages & Tools strip.** `.lang-badge` spans in three weights: default (Python, R, SQL, TypeScript), `.secondary` (Next.js, PostgreSQL, Supabase, Git/GitHub), `.certified` (Azure AI Fundamentals ✓).

**c) Academic Foundation.** `.academic-grid` of `.academic-card`s, one per course (PSTAT 231 / 126 / 120A-B / 115 / 134 / 175, PBS Core, WRIT W109ST), each a `.course-name` heading over `.skill-pill.sm` topic pills.

**d) Currently Building Toward.** `.building-strip` of three `.building-item`s (UW MS Data Science · Multi-Agent AI Systems · Integrating Agentic Approaches), each a `.building-label` + `.building-sublabel`.

> This page hardcodes `class="active"` on its own nav link *and* `nav.js` adds it — harmless duplication, but it's the only page that does this.

### 5.5 [resume.html](resume.html) — Resume

1. **Embedded PDF** — an `<iframe src="assets/AdamRychtecky-Resume.pdf" height="900px">` in an inline-styled card. Browser-dependent: some mobile browsers won't render a PDF in an iframe, which is why the download box below matters.
2. **Download box** — `.resume-download-box` with a `.btn-primary[download]` pointing at the same PDF.
3. **Education timeline** — `.timeline` of `.timeline-item`s (`.timeline-date` + `.timeline-body` with `<h3>`, `.org`, `<ul>`). UW M.S. Data Science (2026–2028) and UCSB B.S. ×2 (Sept 2022–June 2026, links `assets/FinalTranscript%20-%20AdamRychtecky.pdf`).
4. **Experience timeline** — same markup. UFCW Trust IT Infrastructure intern (June–Sept 2026) · VIU Lab Executive Research Assistant (Jan 2024–Apr 2026) · UFCW Trust IT intern (July–Aug 2024).

Only `AdamRychtecky-Resume.pdf` and `FinalTranscript - AdamRychtecky.pdf` are linked from this page; `AR25_Transcript.pdf` sits in [assets/](assets/) unreferenced.

### 5.6 [personalblog.html](personalblog.html) — Blog

One HTML file that renders **two different views** depending on the URL. Fully covered in the next section.

---

## 6. The blog system in depth

This is the newest and most involved feature, so it gets its own section.

### 6.1 Routing

[js/blog.js](js/blog.js) is an IIFE that reads `?post=` from the query string:

| URL | View |
|---|---|
| `personalblog.html` | **Index** — `#blog-index` shown, `#blog-post` hidden |
| `personalblog.html?post=<slug>` | **Single post** — `#blog-post` shown, `#blog-index` hidden |

Both views' shells are already in the HTML; the JS just flips the `hidden` attribute and injects content. There's no History API / SPA behavior — clicking a post is a normal full page load.

### 6.2 The post manifest — the one place you add posts

Near the top of [js/blog.js](js/blog.js):

```js
const POSTS = [
  {
    slug: 'flexible-wisdom',                    // must match blog/posts/<slug>.md
    title: 'Starting the Thesis: Human vs. LLM Ensembles',
    date: '2026-08-06',                         // ISO; drives sort + year grouping
    excerpt: 'Kicking off a research log…',      // shown on the index only
    tags: ['Research'],                          // must be keys of TAG_HUES
  },
];
```

Post **bodies** are plain Markdown in [blog/posts/](blog/posts/) with **no frontmatter** — `marked` renders the file as-is. Sorting is newest-first by `date`. Currently one post: `flexible-wisdom.md`.

**Read time is deliberately not stored in the manifest.** The post view already fetches the Markdown, so the word count is free there (220 wpm, min 1) and can never drift when a post is edited. The index shows no read time at all, precisely so it doesn't have to fetch every post just to render a list.

### 6.3 Topic taxonomy and hues

Four topics, defined in **two places that must agree**:

| Tag (in `POSTS`) | Hue slug | Color |
|---|---|---|
| `Research` | `research` | teal `#1D9E75` |
| `Build Log` | `build-log` | warm amber `oklch(0.62 0.12 62)` |
| `ML Notes` | `ml-notes` | blue `#378ADD` |
| `Career` | `career` | warm red `oklch(0.62 0.12 20)` |

- `TAG_HUES` in [js/blog.js](js/blog.js) maps tag → slug.
- `[data-hue="…"]` blocks at [css/blog.css:20-59](css/blog.css#L20-L59) define a full ramp per slug (`--hue`, `--hue-ink`, `--hue-wash`, `--hue-soft`, `--hue-tag`, `--hue-mid`, `--hue-rail`, `--hue-bdr`). Any element carrying `data-hue` inherits the whole ramp, so every downstream rule is written once against `--hue-*` instead of once per topic. The warm hues carry a darker `--hue-ink` so small text stays legible on the cream background.
- The **filter bar is static HTML** in [personalblog.html](personalblog.html), with `data-tag` (must match the tag string) and `data-hue` (must match the slug) on each button.

**Adding a fifth topic means editing three places:** `TAG_HUES`, a new `[data-hue="…"]` ramp in `blog.css`, and a new `.filter-btn` in the HTML. Using a tag that isn't in `TAG_HUES` won't error — the chip just renders uncolored and no button can filter to it.

### 6.4 Index view — the dated log

Posts are grouped into **year sections**. Because the list is already newest-first, consecutive runs of the same year *are* the groups — no separate bucketing pass. Each `.log-group` gets a header (`.log-year-num` + `.log-year-rule` + `.log-year-count`, e.g. "1 entry" / "3 entries", correctly singularized), then `.log-entry` anchors:

- `.log-date` — the raw ISO date, set in `--mono` with tabular figures (this is what makes it read as a log rather than a feed)
- `.log-body` — `<h3>` title, excerpt, hue-colored `.tag` chips
- The entry's left rail takes the hue of its **first** tag

**Filtering:** `initFilter()` is wired up *after* injection (the entries don't exist before that). Clicking a `.filter-btn` toggles `.log-entry.hidden`, then **hides any year group whose entries all filtered out** — so you never get an orphan year header — and reveals `#blog-empty` ("No posts under that topic yet — try another filter.") when nothing matches. Same markup contract as the projects filter, but exact tag matching rather than substring.

Empty manifest → the list renders "No posts yet — check back soon."

### 6.5 Single-post view

1. Unknown slug → a "Post not found" header plus a `.placeholder` message, and the document title becomes "Post not found". No fetch is attempted.
2. Known slug → title/date/tags header renders **immediately**, along with prev/next navigation, *then* the Markdown is fetched.
3. **Prev/next is manifest-derived, so it renders up front and survives a failed fetch** — the reader always has somewhere to go. `.post-nav-link.prev` = older, `.next` = newer. At either end the link becomes a `.disabled` span reading "Oldest post — no previous entry" / "Newest post — no next entry".
4. `fetch('blog/posts/<slug>.md')`. On failure the article shows *"Couldn't load this post (<reason>). Try refreshing, or check back later."* and read time is omitted entirely rather than rendered as zero.
5. On success: `marked.parse()` if the CDN loaded; otherwise `.plain-fallback` renders the raw text as plain text — never broken unstyled HTML.
6. Read time appears in `.post-meta` only after the fetch succeeds (the separator is `hidden` until then).
7. `document.title` is set to `<post title> — Adam Rychtecky Blog`.

**Reading progress bar:** `#reading-progress` is `hidden` in the HTML and only unhidden in the post view. It listens to `scroll` + `resize` (both `passive`) and sets `#reading-progress-fill` width to `scrollY / (scrollHeight - innerHeight)`, clamped 0–1. It re-measures once the post body lands, since the page's real height isn't known until then.

**Post typography** is fully styled in [css/blog.css:254-340](css/blog.css#L254-L340) — headings, paragraphs, links, lists, blockquotes, inline `code`, `pre` blocks, `hr`, and images. Markdown output needs no extra classes.

### 6.6 ⚠️ The blog needs a real HTTP server

`fetch()` on a `file://` URL is blocked by browser security. **Opening `personalblog.html` directly from disk shows the index fine but every post fails to load** with the "Couldn't load this post" message. Use a local server ([§9](#9-local-preview--deploy)) when touching blog posts. All other pages work fine from `file://`.

---

## 7. Common tasks (recipes)

### Add a blog post
1. Write `blog/posts/<slug>.md` — plain Markdown body, **no frontmatter**.
2. Add an entry to `POSTS` in [js/blog.js](js/blog.js) with the same `slug`, plus `title`, `date` (ISO), `excerpt`, `tags` (from `TAG_HUES`).
3. Commit both files. It sorts into the index and is live at `personalblog.html?post=<slug>`. No read-time field needed — it's computed.

### Add a project card
Copy an existing `.project-card` block in [projects.html](projects.html). Set `data-category` to one or more of `ml psychology data other` (space-separated). Fill title, optional subtitle line, description, `.tag` spans, and `.card-link` anchors. Replace the "Building" stub card rather than adding a tenth if it's still there.

### Add a skill pill
In the right `#tab-panel-N` in [skills.html](skills.html), under the right `.subgroup-label`, add `<span class="skill-pill" data-tooltip="short context">Name</span>`. Add `priority` to the class for headline skills. Keep the tooltip short — it's `nowrap`.

### Swap the resume PDF
Drop the new file in [assets/](assets/) and update **both** references in [resume.html](resume.html) — the `<iframe src>` and the download `<a href>`. Use a **forward slash** (`assets/Name.pdf`). Same filename = zero edits.

### Add or rename a nav page
Edit the `<nav class="site-nav">` block in **all six** HTML files. `nav.js` picks up highlighting automatically from the filename.

### Change the background density
Edit the `data-particles` / `data-maxdist` attributes on that page's `<canvas>`. Only touch [js/background.js](js/background.js) if you're changing the defaults or the animation itself.

### Change a site-wide color
Edit the `:root` tokens in [css/style.css](css/style.css). **Two places don't read the tokens** and need a matching manual edit: the `#f7f5ee` canvas fill and `rgba(29,158,117,…)` particle/noise colors in [js/background.js](js/background.js), and the teal/blue values duplicated in the `[data-hue]` ramps in [css/blog.css](css/blog.css).

### Update the footer year
It's hardcoded `© 2026` in five files (all but `about.html`).

---

## 8. Vocabulary → file/selector map

When a request names something loosely, this is where it lives.

| If you say… | It means | Where |
|---|---|---|
| "the moving dots / the background" | Canvas particles + noise | [js/background.js](js/background.js), `<canvas id="bg-canvas">` |
| "the top bar / the menu" | Fixed translucent nav | `nav.site-nav` in each HTML file; highlighting in [js/nav.js](js/nav.js) |
| "the big text on the homepage" | Hero | `.hero`, `.hero-animate` in [index.html](index.html) |
| "the three number boxes" | Highlights | `.stat-card` / `.stat-num` / `.stat-label` |
| "the project boxes" | Project cards | `.project-card` in [projects.html](projects.html) |
| "the filter buttons" | Project or blog filters | `.filter-bar` / `.filter-btn`; blog's is `.blog-filter` |
| "the little tech labels" | Tech chips on project cards | `.tags` > `.tag` |
| "the skill bubbles" | Skill pills | `.skill-pill`, `.priority`, `.sm` in [skills.html](skills.html) |
| "the hover text" | Skill tooltip | `data-tooltip` attr + [css/style.css:767](css/style.css#L767) |
| "the tabs" | Core Competencies tabs | `.tabs-bar` / `.tab-btn` / `.tab-panel` + inline script in [skills.html](skills.html) |
| "the course boxes" | Academic Foundation | `.academic-grid` / `.academic-card` |
| "the job/school list" | Resume timelines | `.timeline` / `.timeline-item` in [resume.html](resume.html) |
| "the blog list" | Blog index | `#blog-list`, `.log-group`, `.log-entry` |
| "the colored dots/tags on the blog" | Topic hues | `TAG_HUES` in [js/blog.js](js/blog.js) + `[data-hue]` in [css/blog.css](css/blog.css) |
| "the progress bar at the top" | Reading progress | `#reading-progress` (post view only) |
| "the next/previous links" | Post nav | `.post-nav-link` |
| "the contact part" | Contact block | `.contact-section` in [index.html](index.html) + [about.html](about.html) |
| "the fade-in" | Entrance animation | `.fade-up` / `.hero-animate` in [css/animations.css](css/animations.css) |

---

## 9. Local preview & deploy

**Preview.** No build step. Either open an `.html` file directly, or — **required for the blog** — serve the repo root:

```bash
python -m http.server 8000
# → http://localhost:8000/index.html
```

(The VS Code "Live Server" extension works too.)

**Deploy.** [.github/workflows/deploy.yml](.github/workflows/deploy.yml) runs on every push to `main` (or manual dispatch): checkout → `configure-pages` → `upload-pages-artifact` with `path: '.'` (**the entire repo root, uncompiled**) → `deploy-pages`. Requires Settings → Pages → Source = **GitHub Actions** (not "Deploy from a branch"). Concurrency group `pages`, no cancel-in-progress. Live in roughly a minute. There is nothing to run locally before pushing — whatever is in the repo root gets published verbatim.

[.github/dependabot.yml](.github/dependabot.yml) monitors GitHub Actions versions monthly — the only real dependency surface, since there's no `package.json` or `Gemfile`.

---

## 10. Known issues, placeholders & fragile spots

### Link integrity

**As of the last audit, every internal link on every page resolves, and no placeholder hrefs remain.** To re-check after edits, extract every `href`/`src` from the HTML files and test each non-external one against the filesystem — three separate 404s had accumulated because nothing was verifying this.

External links all resolve too. Note that **LinkedIn returns HTTP 999 to automated checks** — that is their bot-blocking response, not a broken link. Don't "fix" it.

### Structural fragility
- **Nav duplicated across six files**; **footer duplicated across five** (about.html has none) with a hardcoded `© 2026`; **contact block duplicated across two**. No includes, so these drift silently.
- **Heavy inline styling.** Hero text, "In Progress" badges, footer links, the resume iframe wrapper, and several project subtitle lines are styled with `style="…"` attributes rather than classes — a global CSS change won't reach them.
- **Two inline `<script>` blocks** (projects filter, skills tabs) live in the HTML rather than `js/`. Only the blog's logic was extracted into a file.
- **Project filter uses substring matching** on `data-category` — don't add a category name that's a prefix of another.
- **Blog CDN dependency** on jsDelivr for `marked`; there's a graceful plain-text fallback, but formatting is lost when it's blocked.
- **`fetch` means the blog needs HTTP** — see [§6.6](#66-️-the-blog-needs-a-real-http-server).
- **No `prefers-reduced-motion` handling** anywhere (canvas animation, fade-ups).
- **Skill tooltips are hover-only and `nowrap`** — inaccessible by keyboard/touch, and long text overflows.
- **`.fade-up` fires on page load, not on scroll** — below-fold cards have finished animating before they're seen.

### Asset hygiene
- **PDF naming is inconsistent:** `AdamRychtecky-Resume.pdf`, `AR25_Transcript.pdf`, `FinalTranscript - AdamRychtecky.pdf` (space in the filename, URL-encoded as `%20` in the link), `PSTAT100_finalproject.pdf`, `PSTAT126_FinalReport.pdf`, `PSTAT231_FinalReport.pdf`, `ParticulateMatterReview.pdf`, `ai-crowds-report.pdf`, `court-vision-report.pdf`. Course reports follow `PSTAT<N>_FinalReport.pdf`; everything else is ad hoc.
- **Unreferenced asset:** `AR25_Transcript.pdf` (superseded by `FinalTranscript - AdamRychtecky.pdf`, which is the one actually linked).
- **`PSTAT231_FinalReport.pdf` is 4.8 MB** — by far the largest file served, roughly 4× the next biggest (`court-vision-report.pdf`, 1.2 MB). It's image-heavy plot output. Worth recompressing if page weight ever matters.
- **Report PDFs are copied in by hand** from wherever they were authored (`ai-crowds-report.pdf` comes from `Flexible-Wisdom/reports/REPORT.pdf`). Nothing syncs them, so a regenerated report has to be re-copied here manually.

### Resolved (was an issue, now fixed — don't re-report)
- **The resume PDF 404'd on the live site.** Commit `883671c` repointed [resume.html](resume.html) at `AdamRychtecky-Resume.pdf` but **never `git add`ed the file** — it stayed untracked, so the deploy published a page referencing an asset that wasn't in the artifact. The file is committed now. Since the deploy uploads the repo root verbatim, *untracked means absent in production* while everything still looks correct locally; `git status` before pushing is the guard.
- **Backslashes in those same paths** (`assets\AdamRychtecky-Resume.pdf`, from pasting a Windows path). Both are now `assets/…`. Worth knowing: this was **not** what broke the page. The WHATWG URL parser that every major browser uses treats `\` as a path separator for http(s) URLs and silently normalizes it to `/`, so browsers resolved it correctly. It's still wrong — it's a spec validation error, and non-browser consumers (link checkers, crawlers, `curl`, server-side tooling) don't all normalize it — but it is not a live outage on its own.
- The graduate program used to be named inconsistently (skills.html said "USC MS Applied Data Science" while every other page said UW). **All pages now say UW.**
- The `[PROJECT NAME]` / `[ONE LINE DESCRIPTION]` placeholder card was replaced by the "Building" stub, and the `[DESCRIPTION]` / `[TRANSCRIPT LINK]` placeholders in the resume UW timeline entry were filled in.
- **Three 404s in [projects.html](projects.html)**, all now fixed: `assets/ai-crowds-report.pdf` was missing (added from `Flexible-Wisdom/reports/REPORT.pdf`); `Projects-metadata/231/231-AR-FinalVersion.pdf` pointed at a directory that never existed in the repo (the file is now `assets/PSTAT231_FinalReport.pdf`); and the Wavelength card's `[WAVELENGTH GITHUB URL]` / `[WAVELENGTH DEMO URL]` placeholders were removed along with its `.card-actions` block.

---

## 11. Dead scaffolding — do not edit

This repo began as GitHub's *"Skills: GitHub Pages"* course template (Jekyll + Minimal Mistakes remote theme) and was later rewritten as hand-rolled HTML. **The Jekyll scaffolding was never deleted and does nothing** — `.nojekyll` plus the deploy workflow mean none of it is ever built, and nothing on the live site links to it:

- [_config.yml](_config.yml) (pins `mmistakes/minimal-mistakes@4.24.0`; also still contains a placeholder `mailto:your@email.com` that never matched the real address, `adam.rychtecky@outlook.com`), [_data/navigation.yml](_data/navigation.yml), [_posts/](_posts/), [_projects/](_projects/)
- [index.md](index.md), [about.md](about.md), [projects.md](projects.md), [coursework.md](coursework.md) — `about.md` even links a `/assets/transcript.pdf` that doesn't exist (the real file is `assets/FinalTranscript - AdamRychtecky.pdf`; `coursework.md` and the live HTML get it right)
- [assets/css/main.scss](assets/css/main.scss) — Jekyll theme entry point, never compiled
- [portfolio/](portfolio/) — standalone catboost-human-llm scratch notes, unreferenced by any page
- `.github/workflows/0-welcome.yml` … `5-merge-your-pull-request.yml` — every job is gated on `.github/steps/-step.txt`, which now contains `X` (course finished), so none will ever run again

**Editing these files will not change the live site.** They're safe removal candidates if you ever tidy up — confirm with Adam before deleting.

[docs/](docs/) is different: it's **not** a Pages source folder and not dead. It's hand-written per-page UI documentation (design tokens, page-by-page structure) kept for reference — see [docs/README.md](docs/README.md). Note it predates the blog, so it documents five pages, not six.

{
  "attribution": {
    "commit": "",
    "pr": ""
  }
}
