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
- Company dots: Anthropic `#E08D6D`, OpenAI `#74C0A6`, Google `#6E9BF0`, Meta `#B48CE8`, DeepSeek `#5FC9E0`, Alibaba `#E86FA4`, xAI `#C9CDD6`, Mistral `#A6D65E`, Moonshot `#8FB4FF`, MiniMax `#FF9DB0`, Cohere `#D4A276` (light umber, kept apart from Anthropic coral and amber accent), Databricks `#E4625F` (soft red), NVIDIA `#63D84B` (brand green, pushed greener than Mistral's yellow-lime to stay distinct), Z.AI `#E4CE5C` (straw gold — yellower than the amber accent's orange, less green than Mistral's lime), Ornith `#5FDFC0` (bright mint — greener than DeepSeek's cyan, brighter than OpenAI's muted sea green), Tencent `#CF7BE3` (orchid — redder than Meta's lavender, bluer than Alibaba's magenta)
- Company dots added Sep 20 2026: ElevenLabs `#F4A9BA` (blush — paler than MiniMax pink), Salesforce `#2E9BD6` (azure — deeper than ByteDance cyan, grayer than Google blue), Yandex `#C4453A` (brick red — darker than Databricks soft red, browner than Sakana vermilion), Liquid AI `#2EC4B6` (turquoise — greener than StepFun teal, darker than DeepSeek cyan), OpenBMB `#3D8B37` (forest — much darker than NVIDIA green), Knowledgator `#946B2D` (bronze — more olive than Desert Ant brown), Agnes AI `#FF6F91` (watermelon — brighter than MiniMax pink, lighter than Suno berry), China Telecom AI `#1B6CA8` (lake blue — darker than Google blue, cyaner than IBM indigo), Cua `#8B2FC9` (royal violet — darker than fal violet), Inference.net `#C0CA33` (olive lime — yellower and darker than Mistral lime), Sarvam AI `#FF9933` (saffron — yellower than Cognition burnt orange), QuiverAI `#D94F70` (raspberry — deeper than Agnes watermelon, pinker than Databricks red), H Company `#5A5DF0` (ultramarine — bluer than TypeSafe indigo, deeper than Google blue)
- Company dots added Sep 2026: TypeSafe AI `#7B78F0` (indigo — deeper than Meta's lavender, purpler than Google's blue), StepFun `#40B8C4` (deep teal — darker and greener than DeepSeek's pale cyan), Cognition `#F08A4B` (burnt orange — oranger than Anthropic coral, deeper than the amber accent), Suno `#C25E77` (berry rose — darker than MiniMax pink), Desert Ant Labs `#A8845C` (desert brown — darker than Cohere umber), Ant Group `#3E9E6E` (emerald — deeper than OpenAI sea green), Microsoft AI `#7A93B8` (steel blue — grayer than Google blue, darker than xAI silver), Runway `#EDE7D1` (warm cream — warmer than xAI's cool silver), World Labs `#B83280` (deep magenta — darker than Alibaba's pink), Sakana AI `#FF5A36` (vermilion — hotter than Cognition's burnt orange, more saturated than Databricks' soft red)

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
