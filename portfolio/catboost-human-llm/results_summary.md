# Results Summary

## Performance headline
CatBoost outperformed the GAM across every metric for both agent types.
LLM decisions were substantially more predictable (AUC 0.876) than
human decisions (AUC 0.720), reflecting greater consistency in how LLMs
apply decision rules.

## The single most interesting result
The noise feature (absolute angle difference between the two line
stimuli) produced the sharpest human–LLM divergence in SHAP analysis.
LLMs showed a steep, monotonically increasing SHAP contribution as
noise grew — reliably treating higher angle separation as a "present"
signal. Human SHAP values for noise were nearly flat and highly
variable, indicating inconsistent use of the same informative cue.

This is psychologically meaningful: it suggests LLMs approximate ideal
Bayesian observers while humans exhibit realistic perceptual variability,
particularly on trials where the signal-noise structure should help.

## Interview summary paragraph
"I used data from my ongoing honors thesis — a 2AFC visual detection
task where both humans and LLMs completed the exact same trials — to
model how each type of observer makes decisions. The goal wasn't to
predict the correct answer, but to predict the agent's actual response.
I fit a GAM as an interpretable baseline and CatBoost to capture
interactions the additive model couldn't. SHAP analysis revealed that
the biggest human-LLM gap was in how they use trial clarity — LLMs
treat noise as a reliable cue, humans largely don't. CatBoost gave AUC
of 0.88 on LLM trials and 0.72 on human trials, and the SHAP results
mapped directly onto concepts from perceptual decision-making theory."
