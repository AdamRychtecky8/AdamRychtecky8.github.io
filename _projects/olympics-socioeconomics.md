---
title: "Gold, Growth, and Glory: Socioeconomic Drivers of Olympic Success"
excerpt: "Do GDP, GDP per capita, and population predict medal counts? ZINB modeling + clustering (k=3) on 2024 Paris data."
date: 2024-12-02
tags: [R, Modeling, ZINB, Clustering, Sports Analytics, PSTAT 100]
# optional manual ordering—bigger weight shows higher on /projects/
weight: 12
---

**What:** Team project analyzing how **GDP, GDP per capita, population, and demographics** relate to **Olympic medal counts** (Paris 2024).

**How:**  
- **Count modeling:** Poisson, NB, ZIP, **ZINB**; ZINB chosen for overdispersion + excess zeros.  
- **Clustering:** Standardized features → **K-Means (k=3)** via elbow + silhouette (≈0.48); PCA for visualization.  
- **Diagnostics:** Residual checks, outlier sensitivity, AIC/BIC comparisons.

**Key findings:**  
- **GDP** positively associated with total medals; **population** less predictive than assumed.  
- Distinct clusters emerge (high-GDP/high-medals; mid; low).  
- Outliers highlight nations outperforming peers via specialization or strategy.

📄 **Report PDF:** [Open](/assets/PSTAT100_finalproject.pdf)
