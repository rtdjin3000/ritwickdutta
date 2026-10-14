import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { projects } from "../src/data/portfolio.ts";
import { articles } from "../src/data/articles.ts";

const root = fileURLToPath(new URL("../dist/", import.meta.url));
const configured = new URL(process.env.SITE_URL || "https://ritwickdutta.com/");
const base = `${configured.pathname.replace(/\/$/, "")}/`;
const origin = configured.origin;
const routes = [base, `${base}writing/`, ...projects.map((project) => `${base}work/${project.slug}/`)];

function decode(value) {
  return value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#39;", "'");
}

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}=(["'])(.*?)\\1`, "i"))?.[2];
}

function meta(html, name) {
  const tag = [...html.matchAll(/<meta\b[^>]*>/gi)]
    .map((match) => match[0])
    .find((tag) => attribute(tag, "name") === name || attribute(tag, "property") === name);
  assert.ok(tag, `Missing metadata: ${name}`);
  const value = attribute(tag, "content");
  assert.ok(value, `Empty metadata: ${name}`);
  return decode(value);
}

function routeFile(pathname) {
  assert.ok(pathname.startsWith(base), `Internal path is outside the configured base: ${pathname}`);
  const local = decodeURIComponent(pathname.slice(base.length));
  assert.ok(!local.split("/").includes(".."), "A generated route must not escape dist.");
  return join(root, local, pathname.endsWith("/") ? "index.html" : "");
}

const pages = new Map();
for (const route of routes) {
  const html = await readFile(routeFile(route), "utf8");
  pages.set(route, html);
  assert.equal((html.match(/<h1\b/gi) || []).length, 1, `${route} must have exactly one h1.`);
  assert.equal(meta(html, "robots"), "index, follow");
  assert.ok(meta(html, "description").length > 30);
  assert.ok(meta(html, "og:title").length > 5);
  assert.equal(meta(html, "og:url"), new URL(route, origin).href);
  const canonicalTag = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]).find((tag) => attribute(tag, "rel") === "canonical");
  assert.ok(canonicalTag, `Missing canonical: ${route}`);
  assert.equal(attribute(canonicalTag, "href"), new URL(route, origin).href);
  const image = new URL(meta(html, "og:image"));
  assert.equal(image.origin, origin);
  assert.ok(image.pathname.startsWith(`${base}_astro/`));
  assert.ok(image.pathname.endsWith(".png"));
  assert.equal(meta(html, "og:image:width"), "1200");
  assert.equal(meta(html, "og:image:height"), "630");
  const brandImages = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0])
    .filter((tag) => attribute(tag, "class") === "brand-logo");
  assert.equal(brandImages.length, 2, `Header and footer logos are required in ${route}`);
  for (const image of brandImages) {
    const src = attribute(image, "src");
    assert.ok(src?.startsWith(base));
    assert.ok((await stat(routeFile(new URL(src, origin).pathname))).size > 0);
  }
  for (const [relation, expectedSize] of [["icon", 32], ["apple-touch-icon", 180]]) {
    const iconTag = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]).find((tag) => attribute(tag, "rel") === relation);
    assert.ok(iconTag, `Missing ${relation} in ${route}`);
    const iconHref = attribute(iconTag, "href");
    assert.ok(iconHref);
    const icon = await readFile(routeFile(new URL(iconHref, origin).pathname));
    assert.equal(icon.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
    assert.equal(icon.readUInt32BE(16), expectedSize);
    assert.equal(icon.readUInt32BE(20), expectedSize);
  }

  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, `Duplicate IDs in ${route}`);
  const structured = html.match(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i)?.[1];
  assert.ok(structured, `Missing structured data in ${route}`);
  const schema = JSON.parse(structured);
  assert.equal(schema.url, new URL(route, origin).href);
}

for (const [route, html] of pages) {
  for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
    const href = attribute(match[0], "href");
    if (!href || href.startsWith("mailto:")) continue;
    const url = new URL(decode(href), new URL(route, origin));
    if (url.origin !== origin) {
      if (attribute(match[0], "target") === "_blank") {
        assert.ok(attribute(match[0], "rel")?.includes("noopener"), "New-tab links need noopener.");
      }
      continue;
    }
    const target = pages.get(url.pathname);
    assert.ok(target, `Broken internal route ${url.pathname} linked from ${route}`);
    if (url.hash) {
      const id = decodeURIComponent(url.hash.slice(1));
      assert.ok(target.includes(`id="${id}"`), `Broken fragment ${href} linked from ${route}`);
    }
  }
}

const home = pages.get(base);
const writing = pages.get(`${base}writing/`);
assert.ok(home && writing);
assert.equal((home.match(/\bdata-project-card\b/g) || []).length, projects.length);
assert.ok(home.indexOf('id="writing"') < home.indexOf('id="work"'), "Articles must precede projects on the homepage.");
assert.ok(home.includes("Read my articles"), "The primary homepage action must feature articles.");
const archive = JSON.parse(await readFile(new URL("../src/data/linkedin-posts.json", import.meta.url), "utf8"));
assert.equal((writing.match(/\bdata-writing-card\b/g) || []).length, articles.length + archive.posts.length);
assert.equal(archive.startYear, 2017);
assert.ok(archive.posts.every((post) => post.earliestPossibleYear >= 2017));
const articleFilter = [...writing.matchAll(/<button\b[^>]*>/gi)].map((match) => match[0]).find((tag) => attribute(tag, "data-writing-filter") === "article");
assert.ok(articleFilter);
assert.equal(attribute(articleFilter, "aria-pressed"), "true", "Articles must be selected by default.");
assert.doesNotMatch(home, /647-248-6485|Ritwick_Dutta_Resume\.pdf/);
const schema = JSON.parse(home.match(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i)[1]);
assert.equal(schema["@type"], "ProfilePage");
assert.equal(schema.mainEntity.name, "Ritwick Dutta");
assert.equal(schema.mainEntity.worksFor.name, "Microsoft");

const pngUrl = new URL(meta(home, "og:image"));
const pngPath = routeFile(pngUrl.pathname);
const png = await readFile(pngPath);
assert.equal(png.subarray(0, 8).toString("hex"), "89504e470d0a1a0a", "The social preview must be a real PNG.");
assert.equal(png.readUInt32BE(16), 1200);
assert.equal(png.readUInt32BE(20), 630);

const sitemap = await readFile(join(root, "sitemap.xml"), "utf8");
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decode(match[1]));
assert.deepEqual(new Set(locations), new Set(routes.map((route) => new URL(route, origin).href)));
const robots = await readFile(join(root, "robots.txt"), "utf8");
assert.ok(robots.includes(`Sitemap: ${new URL(`${base}sitemap.xml`, origin).href}`));
const notFound = await readFile(join(root, "404.html"), "utf8");
assert.equal(meta(notFound, "robots"), "noindex, nofollow");
for (const route of routes) assert.ok((await stat(routeFile(route))).size > 0);

console.log(`Verified ${routes.length} indexable pages, ${projects.length} projects, ${articles.length} articles, ${archive.posts.length} original posts, every internal link/fragment, sitemap, robots, structured data, and a real 1200x630 PNG (${relative(root, pngPath)}).`);
