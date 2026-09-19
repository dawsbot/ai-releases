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
