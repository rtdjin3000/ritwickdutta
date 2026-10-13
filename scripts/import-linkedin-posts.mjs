import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { earliestYearFromAge } from "../src/lib/dates.ts";

const filename = process.argv[2];
if (!filename) throw new Error("Provide an authorized LinkedIn browser export or an equivalent JSON export.");

async function readExport(path) {
  const raw = await readFile(resolve(path), "utf8");
  const resultLine = raw.split(/\r?\n/).find((line) => line.startsWith("Result: "));
  return JSON.parse(resultLine ? resultLine.slice(8) : raw);
}

const snapshot = await readExport(filename);
if (!Array.isArray(snapshot.items)) throw new Error("The export must contain an items array.");
const verifiedOn = "2026-10-12";
const startYear = 2017;
const resolvedLinks = new Map();
if (process.argv[3]) {
  const additional = await readExport(process.argv[3]);
  if (!Array.isArray(additional)) throw new Error("The supplementary publication links must be an array.");
  for (const link of additional) {
    if (typeof link.key !== "string" || typeof link.url !== "string") throw new Error("A supplementary link is incomplete.");
    if (resolvedLinks.has(link.key)) throw new Error("The supplementary links contain a duplicate publication key.");
    resolvedLinks.set(link.key, link.url);
  }
}

function cleanText(value) {
  return value.normalize("NFKC")
    .replace(/[\u200b-\u200d\ufeff]/g, "")
    .replace(/[^\S\n]+/g, " ")
    .trim();
}

function excerpt(value, length) {
  if (value.length <= length) return value;
  const shortened = value.slice(0, length);
  const boundary = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, boundary > length * 0.6 ? boundary : length).trim()}...`;
}

function sanitizePreview(value) {
  return value
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, "[contact omitted]")
    .replace(/\+?\d[\d ()-]{8,}\d/g, (candidate) => {
      const digits = candidate.replace(/\D/g, "").length;
      return digits >= 10 && digits <= 15 ? "[contact omitted]" : candidate;
    });
}

const topicMatchers = [
  ["Agents", /\bagent(?:ic|s)?\b/i],
  ["Leadership", /\bleadership|leader|team\b/i],
  ["Enterprise AI", /\benterprise|business|adoption\b/i],
  ["Architecture", /\barchitecture|platform|harness\b/i],
  ["Responsible AI", /\bresponsible|safety|governance|guardrail|identity\b/i],
  ["RAG", /\brag|retrieval\b/i],
  ["MLOps", /\bmlops|llmops|mlflow\b/i],
  ["Microsoft Foundry", /\bfoundry\b/i],
  ["Open models", /\bopen.model|open.weight|falcon|llama\b/i],
  ["Learning", /\blearn|workshop|teach|course\b/i],
];

const seen = new Set();
let duplicates = 0;
let excludedOutsideConfirmedWindow = 0;
const posts = [];
for (const item of snapshot.items) {
  if (item.author !== "ritwickdutta" || item.original !== true) {
    throw new Error("The export contains an item that is not verified as Ritwick's original post.");
  }
  if (typeof item.text !== "string" || !item.text.trim() || typeof item.ageAtCapture !== "string") {
    throw new Error("Every original post must have nonempty original text and its visible age at capture.");
  }
  const earliestPossibleYear = earliestYearFromAge(item.ageAtCapture, verifiedOn);
  if (earliestPossibleYear < startYear) {
    excludedOutsideConfirmedWindow++;
    continue;
  }
  const permalink = item.url || resolvedLinks.get(item.key);
  if (typeof permalink !== "string") {
    throw new Error(`A post within the requested date window has no verified permalink: ${item.key}`);
  }
  if (!/^https:\/\/www\.linkedin\.com\/feed\/update\/urn:li:(?:activity|share|ugcPost):\d+\/$/.test(permalink)) {
    throw new Error("Expected a credential-free public LinkedIn publication URL, without a query or fragment.");
  }
  const url = new URL(permalink);
  if (seen.has(url.href)) {
    duplicates++;
    continue;
  }
  seen.add(url.href);
  const text = sanitizePreview(cleanText(item.text));
  const paragraphs = text.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const first = paragraphs[0].replace(/^[^\p{L}\p{N}]+/u, "").trim();
  if (!first) throw new Error(`A post has no usable title: ${url.href}`);
  const summaryText = paragraphs.slice(1).join(" ").replace(/#[\p{L}\p{N}_]+/gu, "").trim();
  const topics = topicMatchers.filter(([, pattern]) => pattern.test(text)).map(([topic]) => topic).slice(0, 3);
  posts.push({
    title: excerpt(first, 130),
    url: url.href,
    kind: "post",
    summary: excerpt(summaryText || first, 260),
    topics,
    ageAtCapture: item.ageAtCapture,
    earliestPossibleYear,
  });
}
if (posts.length === 0) throw new Error("No original posts were recovered; the archive was not changed.");

const archive = {
  verifiedOn,
  startYear,
  source: "User-shared authenticated LinkedIn activity archive",
  loadedFeedCards: snapshot.cards ?? null,
  moreAvailableAtCapture: typeof snapshot.hasMore === "boolean" ? snapshot.hasMore : null,
  excludedOutsideConfirmedWindow,
  coverage: "Supporting original posts whose visible age confirms 2017 or later. Older and uncertain-boundary entries are omitted. This is a snapshot, not a live sync.",
  posts,
};
const json = `${JSON.stringify(archive, null, 2).replace(/[\u007f-\uffff]/g, (character) => `\\u${character.charCodeAt(0).toString(16).padStart(4, "0")}`)}\n`;
await writeFile(new URL("../src/data/linkedin-posts.json", import.meta.url), json, "utf8");
console.log(`Imported ${posts.length} verified original posts within the confirmed ${startYear}+ window; excluded ${excludedOutsideConfirmedWindow} older or uncertain-boundary entries; skipped ${duplicates} duplicate permalinks.`);
