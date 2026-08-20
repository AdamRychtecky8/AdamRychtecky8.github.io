# Hi, I'm Adam Rychtecky 👋

**Data Science · Machine Learning · Human-AI Systems**

*I want to design AI systems that work with people, not past them.*

🌐 **[adamrychtecky8.github.io](https://adamrychtecky8.github.io)** — the full portfolio
📄 [Resume](https://adamrychtecky8.github.io/resume.html) · 💼 [LinkedIn](https://www.linkedin.com/in/adam-rychtecky-4a360130a) · ✉️ [adam.rychtecky@outlook.com](mailto:adam.rychtecky@outlook.com)

> **Currently seeking Summer 2027 data science / ML internships.** Also happy to talk about research collaborations, or anything at the intersection of cognitive science and AI evaluation.

---

## How I got here

I went to UCSB to study the brain, because it's the most complex system we know of and that was enough to pull me in. What I found was that the tools built to *understand* it — statistical models, data pipelines, the AI systems designed to mimic it — were just as interesting as the thing itself.

The moment that stuck: watching a model optimize flawlessly while understanding nothing. That gap became my actual question — **how do systems, human or artificial, actually make sense of the world?** It's still what I'm chasing.

I graduated in June 2026 with a **B.S. in Statistics & Data Science** and a **B.S. in Psychological & Brain Sciences**, and I'm now in the **M.S. Data Science program at the University of Washington**. Early career, sure — which mostly means the interesting parts are still ahead.

---

## What I'm working on

### 🔬 When Human and AI Crowds Agree Too Much
**Honors thesis · UCSB Vision & Image Understanding Lab** · [repo](https://github.com/AdamRychtecky8/Flexible-Wisdom)

LLM ensembles are everywhere right now, built on the assumption that more agents means more wisdom. I wanted to test that against the same benchmark we hold human groups to.

I ran groups of humans and groups of LLMs through an identical target-detection task, scored both against the Bayesian ideal observer, measured individual sensitivity with Signal Detection Theory, then built majority-vote ensembles and computed error correlation across every agent pair.

**The finding:** adding agents stops helping after about five. Their errors are correlated, so twelve agents are worth far less than twelve independent votes.

`Python` · `Signal Detection Theory` · `Bootstrap` · `scikit-learn` · `LLM APIs`

### 🏀 Court-Vision
**[repo](https://github.com/AdamRychtecky8/court-vision)** · [read the report](https://adamrychtecky8.github.io/assets/court-vision-report.pdf)

Was the NBA's three-point revolution actually justified by the math? I went looking across **4.2 million shot records and 21 seasons**, processed with PySpark on Google Cloud Dataproc — zone efficiency analysis, a LASSO-regularized shot-make classifier, season-level time series, and PCA + K-Means clustering of player profiles.

**The finding:** the mid-range carries a built-in efficiency penalty, and the mid-range specialist archetype collapsed from 37% of player-seasons to under 8% as the balanced modern scorer took over.

`PySpark` · `Apache Spark` · `Google Cloud Dataproc` · `Spark MLlib` · `Python` · `Parquet`

**Also on the site:** [Dialed](https://dialed-web-hub.vercel.app/#how-it-works), a mental performance platform for golfers I built solo and shipped to alpha (Next.js, TypeScript, Supabase, OpenAI TTS) · Wavelength, an emotion-aware quote retriever where an LLM trains its own cheaper replacement · plus applied stats work on Olympic medal counts, box office revenue, and a systematic review on PM2.5 and Alzheimer's. → **[See all projects](https://adamrychtecky8.github.io/projects.html)**

---

## Where I'm headed

**Systems of intelligence.** The problems worth solving are too complex for any single approach. I'm drawn to designing systems where AI, ML, and human judgment each play to their strengths.

**AI as collaborator.** The goal isn't AI that does the job — it's AI that makes the human doing the job better than either could be alone. That distinction shapes everything I build.

**Hard problems, done properly.** I care about solving things correctly, not just quickly. There's a specific satisfaction in working through something difficult until it finally gives way, and I chase that feeling.

---

## Toolkit

**Languages** — Python · R · SQL · TypeScript
**ML & Stats** — CatBoost · SHAP · GAMs · regression (linear, logistic, Poisson/ZINB) · PCA · K-Means · Bayesian inference · survival analysis
**Building** — Next.js · PostgreSQL · Supabase · Vercel · Git
**Research** — psychophysics experiment design · signal detection theory · eye-tracking · systematic review
**Certified** — Microsoft Azure AI Fundamentals

Two years in a university vision lab taught me something coursework alone doesn't: how to *design* experiments, not just analyze data. It's why I think hypothesis-first about ML problems too.

---

## Off the clock

I read as much as I can — sci-fi mostly for the fun of it, and because imagining what's possible is its own kind of thinking; philosophy because life is confusing and it helps; and ML books for everything the classroom didn't get to.

I also write up what I'm working through — including the parts that don't go according to plan, which is usually where the interesting stuff is. → **[Blog](https://adamrychtecky8.github.io/personalblog.html)**

---

## About this repo

This repo *is* the site — hand-written static HTML, CSS, and vanilla JS, no framework and no build step. Push to `main` and GitHub Pages serves it verbatim about a minute later. The moving dots in the background are a little canvas particle system I wrote; it seemed like a good excuse to write one.

Want to run it locally? `python -m http.server 8000`, then open `http://localhost:8000`.

Technical documentation lives in [CLAUDE.md](CLAUDE.md) and [docs/](docs/).

---

<div align="center">

**I'm always open to interesting conversations.**

[adam.rychtecky@outlook.com](mailto:adam.rychtecky@outlook.com) · [LinkedIn](https://www.linkedin.com/in/adam-rychtecky-4a360130a) · [GitHub](https://github.com/AdamRychtecky8)

</div>
