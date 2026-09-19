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
- Company dots added Sep 19 2026: ByteDance `#39D3E6` (lagoon cyan — brighter and more saturated than StepFun's deep teal and DeepSeek's pale cyan), IBM `#4F6DD8` (cobalt — deeper and more saturated than Google's soft blue), Inception `#C7A6FF` (wisteria — paler than Meta's lavender), Inworld `#FF7DE1` (bubblegum magenta — brighter and pinker than Alibaba's magenta), fal `#9D5CFF` (violet — more saturated than Meta's lavender, purpler than TypeSafe's indigo), iFlytek `#8CD6FF` (ice blue — cyaner and lighter than Moonshot's periwinkle), Sarvam AI `#FF9E6B` (apricot — lighter than Cognition's burnt orange, more orange than Anthropic's coral), Swiss AI Initiative `#EF4E7B` (raspberry — brighter than Suno's berry rose), China Telecom `#0FB287` (jade — bluer than NVIDIA's green, deeper than Ornith's mint), Shanghai AI Lab `#7FE08A` (pastel green — lighter than NVIDIA's green), M-A-P `#F5E3A3` (champagne — yellower than Runway's cream, lighter than Z.AI's straw), Agnes AI `#EAA0FF` (pink lilac — lighter and pinker than Tencent's orchid), Convai Innovations `#98A34D` (olive — darker and muddier than Mistral's lime), Knowledgator `#DE8FA8` (dusty rose — grayer than MiniMax's pink)
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
