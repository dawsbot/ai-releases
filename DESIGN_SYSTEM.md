# Design System: AI Releases timeline

## Typography
- Display/headings & model names: Charter, Georgia, serif
- Body/UI: system-ui stack
- Dates, labels, chips: ui-monospace (SF Mono/Menlo)

## Color
- Ground: dusk navy `#10141F`, hairlines `#242A3B`, card `#161B2A`
- Ink: warm paper `#E9E7DF`, muted `#8B90A0`
- Accent: amber `#E8A33D` (dates, year markers, hover, focus)
- Linked-row flash: `#2A2438`
- Company dots: Anthropic `#E08D6D`, OpenAI `#74C0A6`, Google `#6E9BF0`, Meta `#B48CE8`, DeepSeek `#5FC9E0`, Alibaba `#E86FA4`, xAI `#C9CDD6`, Mistral `#A6D65E`, Moonshot `#8FB4FF`, MiniMax `#FF9DB0`, Cohere `#D4A276` (light umber, kept apart from Anthropic coral and amber accent), Databricks `#E4625F` (soft red), NVIDIA `#63D84B` (brand green, pushed greener than Mistral's yellow-lime to stay distinct), Z.AI `#E4CE5C` (straw gold — yellower than the amber accent's orange, less green than Mistral's lime), Ornith `#5FDFC0` (bright mint — greener than DeepSeek's cyan, brighter than OpenAI's muted sea green)

## Layout language
- Single 760px column, vertical spine timeline with left border + company dot
- Newest first, grouped by year (mono, letter-spaced, amber, bottom hairline)
- Two-col entry grid: mono date + age on left, serif model name right
- Deliberately dark-committed (single theme); no light variant

## Favicon
- "One amber drop": navy `#10141F` rounded square, hairline `#4A5268` ring, solid amber `#E8A33D` dot
- Shipped as an inline SVG data URI in `index.html`; chosen by Dawson 2026-08-04 over spine-dot, clock, and serif-monogram candidates

## Reference pages already built in this system
- Timeline artifact ("The release clock, newest first"), chosen by Dawson
  2026-08-04 over Registry (light table) and Almanac (per-lab, green paper)
- Artifact URL: https://claude.ai/code/artifact/f2798fb2-0bb8-4b11-8248-a7786fc46c70

## Hard constraints
- URL state lives in the hash: `#<model-slug>&co=<co1>,<co2>` — keep both
  parts round-trippable; deep-linked rows scroll + highlight
- Every entry keeps a stable slug id and a copy-link button
- Must stay cohesive with the timeline; no new aesthetic per view

## Explicitly rejected directions (don't re-propose)
- Registry: light dense filter-table, oxblood accent (fine work, not chosen)
- Almanac: archive-green per-lab card grid (not chosen)
- Generic near-black + acid-green dev-tool look, cream+terracotta editorial
