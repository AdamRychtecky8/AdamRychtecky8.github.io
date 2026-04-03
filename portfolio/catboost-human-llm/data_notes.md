# Dataset Notes

## Source
Honors thesis research data from the Vision and Image Understanding Lab,
UCSB. Not publicly available — contains trial-level human participant
data.

## Structure
Two matched datasets:
- human_master: trial-level responses from human observers, including
  1–6 confidence rating and binarized decision variable
- model_master: trial-level responses from LLMs run on identical stimuli

Both share: stimID, condition (cue validity: 50/50, 80/20, 100/0),
cue_points, valid_cue, TP (target presence), agent identity,
line1_angle, line2_angle.

## Engineered features
- evidence_strength: max(line1_angle, line2_angle)
- evidence_diff: line1_angle - line2_angle
- noise: |line1_angle - line2_angle|
- cue_consistency: whether cue points toward higher-evidence side

## Split strategy
70/30 train/test split by stimID (not by row) to prevent agent-level
leakage — all observations from a given stimulus go to the same split.
