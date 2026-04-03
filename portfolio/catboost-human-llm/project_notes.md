# Project: Modeling Human vs. LLM Perceptual Decisions with CatBoost

## One-line description
A machine learning study comparing how humans and LLMs make decisions
on identical visual stimuli using CatBoost, GAM, and SHAP analysis.

## What it does / problem it solves
Uses trial-level data from a 2AFC visual detection task — where both
human observers and LLMs completed the exact same stimuli — to model
and compare their decision behavior. The goal is not to predict the
correct answer, but to predict each agent's actual response, revealing
structural differences in how humans and AI systems integrate sensory
evidence.

## Adam's role
Sole analyst. Designed the feature engineering pipeline, chose and
justified both modeling approaches, ran all training and evaluation,
produced all SHAP analyses, and wrote the full paper. The dataset came
from his ongoing honors thesis research at the Vision and Image
Understanding Lab, UCSB.

## Context
Final project for PSTAT 231 (Machine Learning in Data Science) at UCSB.
Uses real experimental data from the Flexible Wisdom / honors thesis
project — this is not a toy dataset.

## Methods and techniques
- Feature engineering from raw stimulus angles: evidence_strength,
  evidence_diff, noise, cue_consistency
- Stimulus-ID-level train/test split (70/30) to prevent data leakage
  across agents seeing the same trial
- Generalized Additive Model (GAM) with spline smooths (k=6) as
  interpretable baseline
- CatBoost classifier: depth 6, 400 iterations, lr 0.6, early stopping,
  logistic loss, AUC evaluation metric
- SHAP global feature importance, SHAP value distributions by agent,
  SHAP dependence plots
- Model comparison via AUC, log loss, accuracy, and ROC curves

## Key results (exact numbers)
CatBoost performance on held-out test set:
- Human trials: AUC 0.720, log loss 0.607, accuracy 67.7% (n=10,800)
- LLM trials:   AUC 0.876, log loss 0.439, accuracy 80.0% (n=11,700)

GAM performance for comparison:
- Human trials: AUC 0.702, log loss 0.619, accuracy 66.7% (n=10,548)
- LLM trials:   AUC 0.858, log loss 0.466, accuracy 78.4% (n=11,427)

CatBoost feature importance ranking:
1. agent (28.6) — human vs LLM identity matters most
2. evidence_strength (26.8)
3. noise (16.3)
4. cue_consistency (11.9)
5. evidence_diff (10.1)
6. condition (4.9)
7. TP (1.4) — correctly near zero since TP is metadata, not a predictor

## Single most interesting finding
Noise (absolute angle difference between lines) was the feature that
most sharply separated humans and LLMs. LLMs showed a strong, monotonic
positive SHAP relationship — treating trial clarity as a reliable
"present" cue. Humans showed almost no sensitivity to this feature.
LLMs behave more like ideal observers; humans show realistic cognitive
variability. CatBoost revealed this; the GAM could not.

## What makes it unusual
- Real experimental data from ongoing thesis research (not Kaggle)
- Decision target is agent behavior, not ground truth — a deliberate
  and non-obvious modeling choice
- Dual-model strategy (GAM + CatBoost) with principled justification
  for each
- SHAP used not just for model explanation but for cognitive science
  interpretation — linking ML output to psychophysics concepts
- Connects to a modern ML paper (Prokhorenkova et al., 2018 CatBoost)

## Tech stack
R · mgcv (GAM) · catboost · SHAPforxgboost · ggplot2 · dplyr

## Category
Machine Learning / Psychology (spans both)

## Status
Complete — submitted as PSTAT 231 final project

## Written component
Full 14-page academic paper with figures, tables, SHAP plots, ROC
curves, and discussion. Rmd source available.

## GitHub
Private (contains thesis data — not public)

## Live demo
None
