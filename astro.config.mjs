// @ts-check
import { defineConfig } from "astro/config";

// Static output, no adapter. Served from the root of a subdomain, so base
// stays "/". `site` is left unset until DNS and the certificate are verified.
export default defineConfig({
  output: "static",
  base: "/",
});
