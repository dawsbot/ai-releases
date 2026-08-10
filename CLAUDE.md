# AI Releases

One static `index.html`, no build step. Deployed on Vercel: the GitHub repo is connected, so every push to `main` auto-deploys to production (https://ai-releases.vercel.app). `vercel deploy --prod` also works for manual deploys. Design tokens live in `DESIGN_SYSTEM.md` — read it before any visual change.

## Data rules (learned the hard way)

- **Announcement links must be first-party.** Every `ANN` entry links the provider's own domain: anthropic.com/news, openai.com/index, blog.google, ai.meta.com, x.ai/news, mistral.ai/news, qwen.ai or help.aliyun.com, api-docs.deepseek.com, minimax.io, moonshotai.github.io. Never aggregators or third parties (OpenRouter, Wikipedia, press coverage, model-tracker blogs). We shipped an OpenRouter link for Qwen3.7 Flash once; that's a data bug, not a link.
- If a model truly has no announcement post (it happens — Qwen3.7 Flash shipped via changelog only), link the provider's own model-info or changelog page instead, still first-party.
- Verify links before shipping: `grep -o 'https://[^"]*' index.html` piped through curl status checks. Treat 403 from openai.com and x.ai as bot-blocking, not breakage; verify those via web search instead.
- Dates are announcement dates, verified against public sources — not guessed from memory. New models get a WebSearch check first.
- Every model row needs: stable kebab slug (never rename — inbound links depend on them), name, company, ISO date, open/closed flag, first-party announcement URL.
