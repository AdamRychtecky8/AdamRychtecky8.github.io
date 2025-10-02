---
title: "Regression Analysis of the IMDb Movies Dataset"
excerpt: "Multiple regression study on blockbuster success (budget, votes, ratings) and trends in movie length by genre, using IMDb data 1960–2024."
date: 2025-03-05
tags: [R, Regression, Movies, IMDb, PSTAT 126]
weight: 10
---

**What:** Project investigating **predictors of movie revenue** and **genre-based duration trends** using IMDb data (1960–2024).  

**Methods:**  
- Cleaned large IMDb dataset → focused on U.S.-made films (≈7,000 obs).  
- Built **multiple linear regression models** with stepwise selection and Box-Cox transformation.  
- Tested assumptions: normality, homoscedasticity, multicollinearity (VIF).  
- Outlier detection via Cook’s Distance; re-fit models after removing ~6% influential points.  

**Key Findings:**  
- **Budget** and **Votes** were significant predictors of gross worldwide revenue.  
- **Rating** was weaker (not significant at α=0.05).  
- Adjusted R² ≈ 0.47, robust after assumption checks.  
- **Hypothesis 2:** Movie duration increased over time, with **Action** growing faster than **Drama**. By the 1990s, action movies surpassed dramas in average length.  

**Significance:**  
Provides insight into **economic drivers of box office success** and **evolving genre patterns**, demonstrating regression modeling + diagnostics on real-world data.  

📄 **Full Report PDF:** [Download](/assets/PSTAT126_FinalReport.pdf)
