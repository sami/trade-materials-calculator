import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import astro from "eslint-plugin-astro";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

const boundaryMessage =
  "The engine never imports interface code. Move the logic into the engine or the markup out of it.";

export default defineConfig([
  globalIgnores(["dist/", ".astro/"]),
  js.configs.recommended,
  tseslint.configs.recommended,
  astro.configs["flat/recommended"],
  astro.configs["flat/jsx-a11y-strict"],
  {
    files: ["src/engine/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            { name: "astro", message: boundaryMessage },
            { name: "react", message: boundaryMessage },
            { name: "react-dom", message: boundaryMessage },
          ],
          patterns: [
            {
              group: [
                "**/pages/**",
                "**/layouts/**",
                "**/components/**",
                "**/ui/**",
              ],
              message: boundaryMessage,
            },
            {
              group: ["*.astro", "**/*.astro", "*.tsx", "**/*.tsx"],
              message: boundaryMessage,
            },
            {
              group: ["astro:*", "astro/*", "react/*", "react-dom/*"],
              message: boundaryMessage,
            },
          ],
        },
      ],
    },
  },
  eslintConfigPrettier,
]);
