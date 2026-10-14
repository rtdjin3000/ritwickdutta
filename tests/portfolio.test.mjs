import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { projectFilters, isProjectFilter, isWritingFilter, matchesProject, matchesSearch, normalizeSearch, resultLabel } from "../src/lib/filters.ts";
import { projects, profile, career } from "../src/data/portfolio.ts";
import { articles, featuredArticles } from "../src/data/articles.ts";
import { earliestYearFromAge } from "../src/lib/dates.ts";
import sharp from "sharp";

test("project filters have the exact advertised counts", () => {
  const counts = Object.fromEntries(projectFilters.map((filter) => [filter.id, projects.filter((project) => matchesProject(project.categories, filter.id)).length]));
  assert.deepEqual(counts, { all: 6, applied: 3, operations: 3, workshops: 2 });
  assert.equal(isProjectFilter("workshops"), true);
  assert.equal(isProjectFilter("invented"), false);
  assert.equal(isWritingFilter("post"), true);
  assert.equal(isWritingFilter("repost"), false);
});

test("search is case/accent insensitive and matches every query term", () => {
  assert.equal(normalizeSearch("  Responsible   AI  "), "responsible ai");
  assert.equal(matchesSearch("RAG and agentic workflows", "AGENTIC rag"), true);
  assert.equal(matchesSearch("Model safety and evaluation", "SAFETY"), true);
  assert.equal(matchesSearch("Model safety and evaluation", "safety deployment"), false);
  assert.equal(matchesSearch("A café for ideas", "cafe"), true);
  assert.equal(matchesSearch("Any entry", "   "), true);
  assert.equal(resultLabel(1, "project"), "1 project");
  assert.equal(resultLabel(3, "project"), "3 projects");
  assert.equal(resultLabel(1, "entry", "entries"), "1 entry");
  assert.equal(resultLabel(2, "entry", "entries"), "2 entries");
});

test("every selected project has unique, source-backed, public evidence", () => {
  assert.equal(new Set(projects.map((project) => project.slug)).size, projects.length);
  assert.equal(new Set(projects.map((project) => project.repository)).size, projects.length);
  for (const project of projects) {
    assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.equal(new URL(project.repository).origin, "https://github.com");
    assert.ok(project.source.startsWith(`${project.repository}/blob/main/`));
    assert.ok(project.status.length > 30);
    assert.ok(project.context && project.demonstrates && project.approach.length > 0);
    assert.equal(project.review.length, 3);
    assert.ok(project.categories.every(isProjectFilter));
  }
  assert.ok(projects.every((project) => profile.github.some((account) => project.repository.startsWith(`${account.url}/`))));
});

test("all 21 recovered articles have distinct original publication links", () => {
  assert.equal(articles.length, 21);
  assert.equal(new Set(articles.map((article) => article.url)).size, 21);
  for (const article of articles) {
    assert.equal(article.kind, "article");
    assert.ok(article.title && article.summary && article.topics.length > 0);
    const url = new URL(article.url);
    assert.equal(url.origin, "https://www.linkedin.com");
    assert.ok(url.pathname.startsWith("/pulse/"));
    assert.ok(article.readTime);
  }
  assert.equal(featuredArticles.length, 3);
  assert.ok(featuredArticles.every((article) => articles.includes(article)));
});

test("the generated post archive contains only clean, unique original-post permalinks", async () => {
  const archive = JSON.parse(await readFile(new URL("../src/data/linkedin-posts.json", import.meta.url), "utf8"));
  assert.equal(archive.posts.length, 130);
  assert.equal(archive.verifiedOn, "2026-10-12");
  assert.equal(archive.startYear, 2017);
  assert.equal(new Set(archive.posts.map((post) => post.url)).size, archive.posts.length);
  for (const post of archive.posts) {
    assert.equal(post.kind, "post");
    assert.match(post.url, /^https:\/\/www\.linkedin\.com\/feed\/update\/urn:li:(?:activity|share|ugcPost):\d+\/$/);
    assert.ok(post.title.trim());
    assert.ok(post.title.length <= 133);
    assert.ok(post.summary.length <= 263);
    assert.ok(Array.isArray(post.topics));
    assert.ok(post.earliestPossibleYear >= 2017);
    assert.equal(post.earliestPossibleYear, earliestYearFromAge(post.ageAtCapture, archive.verifiedOn));
  }
  assert.doesNotMatch(JSON.stringify(archive), /urlhash|campaignmanager|analytics\/post-summary|Drafts/);
});

test("the date window does not admit posts that could predate 2017", () => {
  assert.equal(earliestYearFromAge("8yr", "2026-10-12"), 2017);
  assert.equal(earliestYearFromAge("9yr", "2026-10-12"), 2016);
  assert.ok(earliestYearFromAge("1mo", "2026-10-12") >= 2017);
  assert.ok(earliestYearFromAge("14yr", "2026-10-12") < 2017);
  assert.throws(() => earliestYearFromAge("unknown", "2026-10-12"), /Unsupported capture age/);
  assert.throws(() => earliestYearFromAge("1yr", "2026-02-30"), /Invalid capture date/);
});

test("profile and career content preserve the agreed privacy boundaries", () => {
  assert.equal(profile.email, "rittwick.dutta@gmail.com");
  assert.equal(profile.organization, "Microsoft");
  assert.equal(career.filter((role) => role.current).length, 1);
  const publicContent = JSON.stringify({ profile, career, projects });
  assert.doesNotMatch(publicContent, /647-248|\$3M|\$30M|\$15M|10,000 RGU|Resume\.pdf/i);
});

test("supplied branding assets are correctly sized and contain no original photo metadata", async () => {
  for (const name of ["brand-logo.png", "brand-icon.png", "social-card.png"]) {
    const image = await readFile(new URL(`../src/assets/${name}`, import.meta.url));
    const metadata = await sharp(image).metadata();
    assert.equal(metadata.format, "png");
    assert.equal(metadata.exif, undefined);
    assert.equal(metadata.iptc, undefined);
    assert.equal(metadata.xmp, undefined);
    if (name === "brand-icon.png") assert.deepEqual([metadata.width, metadata.height], [256, 256]);
    if (name === "social-card.png") assert.deepEqual([metadata.width, metadata.height], [1200, 630]);
    if (name === "brand-logo.png") assert.ok(metadata.width > metadata.height && metadata.width >= 700);
  }
});
