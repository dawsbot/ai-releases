// Data regression tests for index.html — dependency-free, run with: node --test test/data.test.mjs
// Parses the real CO / MODELS / ANN constants out of index.html with node:vm.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const start = html.indexOf("const CO=");
const end = html.indexOf("function age");
assert.ok(start > -1 && end > start, "index.html must contain CO/MODELS/ANN before function age()");
const ctx = {};
vm.runInNewContext(
  html.slice(start, end) + ";this.CO=CO;this.MODELS=MODELS;this.ANN=ANN;",
  ctx,
);
const { CO, MODELS, ANN } = ctx;
const bySlug = new Map(MODELS.map((m) => [m[0], m]));

// --- Regression: releases the Sep 2026 updater wrongly skipped ---------------
// Each was verified against the provider's own page (first-party, exact date).
const REQUIRED_ENTRIES = [
  {
    slug: "kimi-k2-8-preview",
    co: "Moonshot AI",
    date: "2026-09-11",
    open: 0,
    ann: "https://www.kimi.com/code/docs/en/kimi-code/whats-new.html#k2-8-preview-september-11-2026",
  },
  {
    slug: "gemini-3-8-live",
    co: "Google",
    date: "2026-09-15",
    open: 0,
    ann: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-gemini-3-8-live-extended-thinking/",
  },
  {
    slug: "gemini-3-8-live-extended-thinking",
    co: "Google",
    date: "2026-09-15",
    open: 0,
    ann: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-gemini-3-8-live-extended-thinking/",
  },
  {
    slug: "jev",
    co: "TypeSafe AI",
    date: "2026-09-15",
    open: 0,
    ann: "https://typesafe.ai/blog/introducing-system-one-models-and-jev",
  },
  // Repaired by the 2026-09-19 run: released in or before the audited window
  // but absent from the timeline until then.
  {
    slug: "minimax-h3",
    co: "MiniMax",
    date: "2026-07-31",
    open: 1,
    ann: "https://www.minimax.io/blog/minimax-h3",
  },
  {
    slug: "granite-4-2",
    co: "IBM",
    date: "2026-08-25",
    open: 1,
    ann: "https://research.ibm.com/blog/introducing-granite-4-2",
  },
  {
    slug: "spark-x2-5-4b",
    co: "iFlytek",
    date: "2026-09-01",
    open: 1,
    ann: "https://huggingface.co/XHToken/Spark-X2.5-4B",
  },
  // Repaired by the 2026-09-21 run: Intern-S2 was the top carried candidate
  // for three runs (announced Sep 13, Pujiang Innovation Forum, dated by
  // InternLM's own WeChat article), and the Inworld Flash row had shipped
  // with the Sep 2 press-beat date instead of Inworld's own release-notes
  // date of Aug 9 (proven via an Aug 29 archive.org snapshot).
  {
    slug: "intern-s2",
    co: "Shanghai AI Lab",
    date: "2026-09-13",
    open: 1,
    ann: "https://mp.weixin.qq.com/s/EZghVJB13rJTRfBv2_U0Xw",
  },
  {
    slug: "realtime-tts-2-flash",
    co: "Inworld",
    date: "2026-08-09",
    open: 0,
    ann: "https://inworld.ai/resources/tts-2-vs-tts-2-flash",
  },
  // Repaired by the 2026-09-29 catch-up run: two releases missing from the
  // timeline (never reconciled in any audit), plus the Hy Image3.5 preview
  // carry from 2026-09-22 resolved via Hunyuan's own X post (snowflake
  // decodes to 2026-09-22T02:40:42Z).
  {
    slug: "grok-voice-think-fast-2",
    co: "xAI",
    date: "2026-07-29",
    open: 0,
    ann: "https://x.ai/news/grok-voice-think-fast-2",
  },
  {
    slug: "paddleocr-vl-1-6",
    co: "Baidu",
    date: "2026-05-28",
    open: 1,
    ann: "https://x.com/PaddlePaddle/status/2059990434827661769",
  },
  {
    slug: "hy-image3-5-preview",
    co: "Tencent",
    date: "2026-09-22",
    open: 0,
    ann: "https://x.com/TencentHunyuan/status/2102226552310419473",
  },
  // Repaired by the 2026-09-30 run: in-window releases the Sep 29 catch-up
  // missed (FLUX 3 Action, Nemotron 3 Diarization, AliceAI Foundation,
  // decision-model-preview, Eleven v4) plus the Qwen3.8-LiveTranslate carry,
  // which an earlier run had wrongly dismissed as a tracker error (real:
  // @Alibaba_Qwen status 2101206705111757253, snowflake 2026-09-19T07:08Z).
  {
    slug: "flux-3-action",
    co: "Black Forest Labs",
    date: "2026-09-23",
    open: 1,
    ann: "https://bfl.ai/blog/flux-3-action",
  },
  {
    slug: "nemotron-3-diarization",
    co: "NVIDIA",
    date: "2026-09-23",
    open: 1,
    ann: "https://huggingface.co/blog/nvidia/nemotron-diarization",
  },
  {
    slug: "aliceai-foundation-80b-a3b",
    co: "Yandex",
    date: "2026-09-21",
    open: 1,
    ann: "https://ir.yandex/press-releases?year=2026&id=2026-09-21",
  },
  {
    slug: "decision-model-preview",
    co: "Alibaba",
    date: "2026-09-24",
    open: 0,
    ann: "https://www.alibabacloud.com/help/en/model-studio/newly-released-models",
  },
  {
    slug: "eleven-v4",
    co: "ElevenLabs",
    date: "2026-09-28",
    open: 0,
    ann: "https://elevenlabs.io/blog/eleven-v4",
  },
  {
    slug: "qwen3-8-livetranslate",
    co: "Alibaba",
    date: "2026-09-19",
    open: 0,
    ann: "https://x.com/Alibaba_Qwen/status/2101206705111757253",
  },
  // Repaired by the 2026-10-01 run: carried candidates resolved or releases
  // missed by earlier sweeps of their windows.
  {
    slug: "d1",
    co: "Liquid AI",
    date: "2026-09-29",
    open: 0,
    ann: "https://x.com/liquidai/status/2105003472332693869",
  },
  {
    slug: "kumo-tabular",
    co: "NVIDIA",
    date: "2026-09-28",
    open: 1,
    ann: "https://huggingface.co/blog/nvidia/kumo-tabular",
  },
  {
    slug: "mimo-v2-6-mopd",
    co: "Xiaomi",
    date: "2026-09-27",
    open: 1,
    ann: "https://mimo.xiaomi.com/blog/mimo-v2-6-tool-call-repetition",
  },
  {
    slug: "ming-image-0-1-design",
    co: "Ant Group",
    date: "2026-09-23",
    open: 1,
    ann: "https://mp.weixin.qq.com/s/VGdtxfM8kbHIQJw50VD_Sw",
  },
  {
    slug: "hemmingway-1",
    co: "Hemmingway",
    date: "2026-09-22",
    open: 1,
    ann: "https://hemmingway.io/blog/what-is-hemmingway/",
  },
  {
    slug: "solar-mini-4",
    co: "Upstage",
    date: "2026-09-22",
    open: 0,
    ann: "https://www.upstage.ai/blog/en/solar-mini-4",
  },
];

for (const want of REQUIRED_ENTRIES) {
  test(`regression: ${want.slug} is present with exact date and first-party source`, () => {
    const row = bySlug.get(want.slug);
    assert.ok(row, `missing MODELS entry ${want.slug}`);
    const [, , co, date, open] = row;
    assert.equal(co, want.co, `${want.slug} company`);
    assert.equal(date, want.date, `${want.slug} announcement date`);
    assert.equal(open, want.open, `${want.slug} open flag`);
    assert.equal(ANN[want.slug], want.ann, `${want.slug} announcement URL`);
  });
}

// --- Structure ---------------------------------------------------------------
test("every row has slug, name, company, ISO date, 0/1 open flag", () => {
  for (const row of MODELS) {
    assert.equal(row.length, 5, `row ${row[0]} must have 5 fields`);
    const [slug, name, co, date, open] = row;
    assert.match(slug, /^[a-z0-9]+(-[a-z0-9]+)*$/, `bad slug ${slug}`);
    assert.ok(typeof name === "string" && name.length, `empty name for ${slug}`);
    assert.ok(typeof co === "string" && co.length, `empty company for ${slug}`);
    assert.match(date, /^\d{4}-\d{2}-\d{2}$/, `bad date for ${slug}`);
    const d = new Date(date + "T00:00:00Z");
    assert.ok(!Number.isNaN(d.getTime()), `invalid date for ${slug}`);
    assert.ok(date >= "2018-01-01", `date too old for ${slug}`);
    assert.ok(open === 0 || open === 1, `open flag for ${slug} must be 0 or 1`);
  }
});

test("slugs are unique", () => {
  assert.equal(bySlug.size, MODELS.length, "duplicate slug in MODELS");
});

test("dates are sorted newest-first", () => {
  for (let i = 1; i < MODELS.length; i++) {
    assert.ok(
      MODELS[i - 1][3] >= MODELS[i][3],
      `${MODELS[i - 1][0]} (${MODELS[i - 1][3]}) must not sort below ${MODELS[i][0]} (${MODELS[i][3]})`,
    );
  }
});

test("every company used by a model has a legend color, and vice versa", () => {
  const used = new Set(MODELS.map((m) => m[2]));
  for (const co of used) assert.ok(CO[co], `company ${co} missing from CO color map`);
  for (const co of Object.keys(CO)) assert.ok(used.has(co), `CO color ${co} has no models`);
});

test("every model has an announcement link and every link maps to a model", () => {
  for (const [slug] of MODELS) assert.ok(ANN[slug], `missing ANN link for ${slug}`);
  for (const slug of Object.keys(ANN)) assert.ok(bySlug.has(slug), `ANN key ${slug} has no MODELS row`);
});

test("announcement links are https and reject known aggregators (ownership checked manually)", () => {
  const banned = ["openrouter.ai", "wikipedia.org", "thursdai.news", "llm-stats.com"];
  for (const [slug, url] of Object.entries(ANN)) {
    assert.match(url, /^https:\/\//, `ANN for ${slug} must be https`);
    const host = new URL(url).hostname;
    for (const b of banned) {
      assert.ok(!host.endsWith(b), `ANN for ${slug} points at aggregator ${host}`);
    }
  }
});

// --- Slug stability: inbound links depend on these; never rename or drop -----
const FROZEN_SLUGS = ["deepseek-v4-1-flash","gpt-6-astra","gemini-3-8-flash","gemini-3-8-flash-cyber","muse-spark-1-3","claude-fable-5-1","hy4-preview","qwen3-8-flash","glm-5-3-flash","deepseek-v4-flash-vision-exp","ornith-1-5","glm-5-3","qwen3-8-27b","deepseek-v4-pro-0813","gemini-3-7-flash","grok-4-6","nemotron-3-5-lightning","gpt-5-6-cyber","muse-glimmer","muse-spark-1-2","qwen3-8-max","deepseek-v4-flash","qwen3-7-flash","claude-opus-5","gemini-3-6-flash","gemini-3-5-flash-lite","gemini-3-5-flash-cyber","kimi-k3","muse-spark-1-1","gpt-5-6","grok-4-5","claude-sonnet-5","glm-5-2","claude-fable-5","minimax-m3","grok-build-0-1","claude-opus-4-8","qwen3-7-max","command-a-plus","mistral-medium-3-5","deepseek-v4-preview","gpt-5-5","qwen3-6-27b","claude-opus-4-7","qwen3-6-35b-a3b","glm-5-1","muse-spark","gemma-4","minimax-m2-7","mistral-small-4","grok-4-20","gpt-5-4","gemini-3-1-pro","claude-sonnet-4-6","qwen3-5","minimax-m2-5","glm-5","claude-opus-4-6","gpt-5-3-codex","kimi-k2-5","glm-4-7","gemini-3-flash","gpt-5-2","mistral-large-3","deepseek-v3-2","claude-opus-4-5","grok-4-1-fast","gemini-3-pro","grok-4-1","gpt-5-1","kimi-k2-thinking","minimax-m2","claude-haiku-4-5","glm-4-6","claude-sonnet-4-5","deepseek-v3-2-exp","deepseek-v3-1-terminus","grok-4-fast","qwen3-next","grok-code-fast-1","deepseek-v3-1","gpt-5","claude-opus-4-1","gpt-oss","glm-4-5","kimi-k2","grok-4","minimax-m1","deepseek-r1-0528","claude-opus-4","qwen-3","o3","gpt-4-1","llama-4","gemini-2-5-pro","deepseek-v3-0324","command-a","gpt-4-5","claude-3-7-sonnet","grok-3","o3-mini","deepseek-r1","deepseek-v3","gemini-2-0-flash","o1","claude-3-5-haiku","qwen-2-5","o1-preview","grok-2","mistral-large-2","llama-3-1","gpt-4o-mini","claude-3-5-sonnet","gpt-4o","deepseek-v2","llama-3","mixtral-8x22b","command-r-plus","grok-1-5","dbrx","grok-1","command-r","claude-3","gemini-1-5-pro","qwen1-5","glm-4","mixtral-8x7b","gemini-1","deepseek-llm-67b","gpt-4-turbo","grok-beta","mistral-7b","llama-2","claude-2","gpt-4","claude-1","chatglm-6b","llama-1","chatgpt-gpt-3-5","gpt-3","gpt-2","gpt-1"];

test("all previously shipped slugs still exist (never rename/remove)", () => {
  for (const slug of FROZEN_SLUGS) {
    assert.ok(bySlug.has(slug), `previously shipped slug ${slug} was renamed or removed`);
  }
});
