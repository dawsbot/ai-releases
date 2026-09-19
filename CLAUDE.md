# AI Releases

One static `index.html`, no build step. Deployed on Vercel: the GitHub repo is connected, so every push to `main` auto-deploys to production (https://ai-releases.vercel.app). `vercel deploy --prod` also works for manual deploys. Design tokens live in `DESIGN_SYSTEM.md` — read it before any visual change.

**Scope, discovery procedure, and per-run audit requirements live in `docs/update-policy.md` — read it before any data update.** Run `node --test test/data.test.mjs` before every deploy; it validates the data in `index.html` directly.

## Data rules (learned the hard way)

- **Announcement links must be first-party.** Every `ANN` entry links a publisher-owned page. Examples (not a closed whitelist — new providers are welcome and their own domains count): anthropic.com/news, openai.com/index, blog.google, ai.meta.com, x.ai/news, mistral.ai/news, qwen.ai or help.aliyun.com, api-docs.deepseek.com, minimax.io, moonshotai.github.io or kimi.com, z.ai, research.meta.ai, tencent.com. A provider-owned GitHub org, Hugging Face org, docs changelog, or official social post also counts as first-party once ownership is verified. Never aggregators or third parties (OpenRouter, Wikipedia, press coverage, model-tracker blogs). We shipped an OpenRouter link for Qwen3.7 Flash once; that's a data bug, not a link.
- If a model truly has no announcement post (it happens — Qwen3.7 Flash shipped via changelog only), link the provider's own model-info or changelog page instead, still first-party.
- Verify links before shipping: `grep -o 'https://[^"]*' index.html` piped through curl status checks. Treat 403 from openai.com and x.ai as bot-blocking, not breakage; verify those via web search instead.
- Dates are announcement dates, verified against public sources — not guessed from memory. New models get a WebSearch check first.
- Every model row needs: stable kebab slug (never rename — inbound links depend on them), name, company, ISO date, open/closed flag, first-party announcement URL.
- Scope is broad by policy: audio/voice, image/video, previews, efficient tiers, and named upgrades behind unchanged API aliases all count. No text-only or flagship-only filtering. Full rules in `docs/update-policy.md`.
- Only named, verified releases ship. A candidate missing a verified date or first-party URL goes to the run's audit file as `unverified`, not into `index.html` with a guess.
