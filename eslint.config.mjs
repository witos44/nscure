import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals.js";
import nextTs from "eslint-config-next/typescript.js";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override or extend ignores if needed
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Add more if necessary, e.g.:
    // "dist/**",
    // "*.config.js",
  ]),
]);

export default eslintConfig;