Every honors thesis starts with a question that won't leave you alone. Mine is this: when you put a group of large language models together and ask them to make a decision, are they actually *reasoning together* — or just quietly agreeing with each other?

## Why this question

I spent two years in UCSB's Vision & Image Understanding Lab running human psychophysics experiments — the classic two-alternative forced-choice paradigm, where a person has to decide whether a faint signal is present or absent in a noisy image. It's a clean, well-understood way to measure how individuals and groups make perceptual decisions under uncertainty, and it comes with a strong theoretical benchmark: the Bayesian ideal observer.

LLM ensembles are everywhere now — multiple models or multiple calls, voted or averaged into a single answer, on the assumption that more agents means more wisdom. That assumption is basically untested against the same rigorous benchmark we use for human groups. So the plan is simple to state and hard to execute: run the *same* detection task past human ensembles and LLM ensembles, score both against the Bayesian ideal, and see where they actually land.

## What I expect to find

Two hypotheses I'm carrying in:

1. LLM ensembles will track the Bayesian ideal more tightly than human ensembles do, at least on average.
2. The gains from adding more agents — human or LLM — will saturate well before the ensemble is "large," because errors within a group are correlated rather than independent. Twelve correlated votes are worth a lot less than twelve independent ones.

## What's next

Right now I'm finalizing the experimental pipeline: stimulus generation, the LLM-calling harness, and the analysis code that will let me compute sensitivity (d′) and inter-agent error correlation for both populations on equal footing. Once data collection is running, I'll post updates here — including the parts that don't go according to plan, which is usually where the interesting stuff is.

*More soon.*
