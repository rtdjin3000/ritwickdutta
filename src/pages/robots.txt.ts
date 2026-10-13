import type { APIContext } from "astro";

export function GET({ site }: APIContext): Response {
  if (!site) throw new Error("A public site URL is required to generate robots.txt.");
  const sitemap = new URL(`${import.meta.env.BASE_URL}sitemap.xml`, site).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
