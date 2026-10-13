import type { APIContext } from "astro";
import { projects } from "../data/portfolio";

export function GET({ site }: APIContext): Response {
  if (!site) throw new Error("A public site URL is required to generate the sitemap.");
  const base = import.meta.env.BASE_URL;
  const paths = [base, `${base}writing/`, ...projects.map((project) => `${base}work/${project.slug}/`)];
  const urls = paths.map((path) => new URL(path, site).href.replaceAll("&", "&amp;"));
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}\n</urlset>\n`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
