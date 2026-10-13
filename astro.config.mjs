import { defineConfig } from "astro/config";

const siteUrl = new URL(process.env.SITE_URL || "https://ritwickdutta.com/");

if (
  siteUrl.protocol !== "https:" ||
  siteUrl.username ||
  siteUrl.password ||
  siteUrl.search ||
  siteUrl.hash
) {
  throw new Error("SITE_URL must be a public HTTPS URL without credentials, a query, or a fragment.");
}

export default defineConfig({
  site: siteUrl.origin,
  base: siteUrl.pathname.replace(/\/$/, "") || "/",
  trailingSlash: "always",
  output: "static",
  image: { dangerouslyProcessSVG: true },
  devToolbar: { enabled: false },
  server: { host: "127.0.0.1" },
});
