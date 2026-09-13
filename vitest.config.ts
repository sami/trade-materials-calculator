import { defineConfig } from "vitest/config";

// Deliberately not Astro's getViteConfig: the suite runs against engine
// modules only, with no Astro or interface plugins loaded.
export default defineConfig({
  test: {
    include: ["src/engine/**/*.test.ts"],
    environment: "node",
  },
});
