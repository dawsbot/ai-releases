# Update policy

This policy exists because a September 2026 update run silently narrowed its own
scope (text-only, existing providers only, "flagship" only) and concluded "no
releases" from partial evidence. It missed Kimi K2.8 Preview (dismissed as a
preview behind an unchanged alias) and Gemini 3.8 Live (dismissed as audio).
None of those exclusion rules were ever policy. Do not reinvent them.

## Scope: what counts as an entry

**In scope** — every *named, publicly announced* AI model release:

- text / coding / reasoning models
- multimodal, audio/voice, image/video models
- previews, experimental and research releases, efficient tiers
- named model upgrades served behind an **unchanged API alias**
  (example: K2.8 Preview stayed on the `kimi-for-coding` alias — still a release)
- releases from **new providers**. New-lab discovery is mandatory on every run;
  the provider list in CLAUDE.md is a set of examples, not a closed whitelist.

There is **no flagship-only threshold** of any kind.

**Out of scope**:

- app / SDK / product / agent-service updates that ship no new model
- rumors and unconfirmed reports
- stealth models whose provider is unknown (no first-party evidence can exist)
- third-party repackagings of another provider's model with no new training:
  quantizations, refusal-stripped rehosts, unchanged-weight hosting variants, and
  pricing tiers. (A substantial post-train released as a distinctly named
  model by the releasing lab — e.g. SWE-2 from Kimi K3 — does count. Named
  distillations and fine-tunes also count; do not silently exclude them because
  they are derivatives. If the new-model claim is unclear, record unverified.)
- later availability events for a model already announced (GA, new API
  surface, new host). Those keep the original announcement date.

## Dates

The date shown is the **first public announcement date**. Do not substitute:

- later API-availability posts (GPT-Live-1's API post is not its announcement)
- an article's "updated" date
- podcast / newsletter coverage dates
- repository or Hugging Face creation timestamps

When only secondary dates exist, the candidate stays **unverified** — it does
not get a guessed date and does not get silently dropped.

## Sources

First-party means **publisher-owned**: the provider's news/blog domain, its API
or product **changelog**, and its **verified** GitHub org, Hugging Face org, or
official social account (verify ownership before trusting). Docs pages count —
K2.8 Preview was announced only in the Kimi Code docs changelog.

Aggregators (OpenRouter, Wikipedia, press, model trackers, ThursdAI,
llm-stats) are **discovery only** — never linked as an announcement.

## Mandatory two-stage discovery

Every update run does both stages; neither substitutes for the other:

1. **Broad independent trackers** (e.g. https://thursdai.news/releases/YYYY-MM,
   https://llm-stats.com/llm-updates) to build the candidate list, including
   labs never seen before.
2. **Per-provider first-party sweep**: official news/blog **AND** API/product
   changelogs **AND** verified GitHub/HF model cards. Blogs alone are not
   enough — K2.8 Preview never appeared on a blog.

Rules of evidence:

- A failed fetch, 403, or empty JS-page extract is **not** evidence of no
  release. 403 from openai.com or x.ai is bot-blocking; verify via web search
  or archives instead. Record the source as `blocked` or `partial`.
- The newest entry already in the timeline is **not** a lower-bound filter on
  discovery.
- Backfilling history does not substitute for auditing the current window.
- No "no releases" conclusion is allowed while any source's coverage is
  partial or any candidate is unverified.

## Candidate reconciliation (required, persisted)

Every discovered candidate must end a run in exactly one state:

| state | meaning |
|---|---|
| `added` | verified and added to `index.html` |
| `already_present` | matched an existing entry |
| `excluded` | out of scope, with the explicit policy reason |
| `unverified` | in scope but a required fact (date, first-party URL, name) is missing — carried to the next run |

Every provider source attempt records URL, retrieval date/time, status
(`checked` / `blocked` / `partial`) and findings.

Persist each run's reconciliation + source coverage as JSON in
`/Users/dawsonbotsford/.hermes/automation/ai-releases-audits/` (outside this
repo), named `YYYY-MM-DD-<label>.json`, including source excerpts proving each
added entry's name, date and status.

## Data requirements per entry

Every row needs: stable kebab slug (never rename — inbound links depend on
them), display name as the provider spells it, company, ISO announcement date,
open/closed flag, first-party announcement URL. Verify links before shipping
(`grep -o 'https://[^"]*' index.html` + curl status checks; treat 403 from
openai.com / x.ai as bot-blocking, verify those by search).

## Tests

`node --test test/data.test.mjs` — dependency-free `node:test` suite that parses the real
`CO` / `MODELS` / `ANN` data out of `index.html` and enforces: required
regression entries, unique slugs, field shape, descending dates, color/link
coverage, no aggregator links, and that previously shipped slugs never change.
Run it before every deploy; add a regression row whenever a missed release is
repaired.
