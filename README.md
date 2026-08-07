# AI Releases

A single-page timeline of when major AI models shipped, open and closed weights, from ChatGPT (Nov 2022) through today. Every entry has a stable anchor, its exact age, and a link to the provider's announcement post.

## Linking

State lives in the URL hash, so any view is copy-pasteable:

- `#claude-fable-5` — deep-link a model; all labs are shown and the row scrolls into view highlighted
- `#co=anthropic,openai` — show only those labs
- `#claude-opus-5&co=anthropic` — deep-link within a filtered view
- `#co=all` — every lab
- `#co=none` — start from nothing and build up

An empty hash shows the default view: Anthropic, OpenAI, and Google. A bare model slug with no `co=` implies `co=all`, so outside apps can link any model with just `#<slug>` and it is guaranteed visible.

## Stack

One static `index.html`. No build, no dependencies. Deployed on Vercel.

Dates are announcement dates, verified against public sources August 2026. Design tokens live in `DESIGN_SYSTEM.md`.
