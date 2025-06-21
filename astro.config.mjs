// @ts-check
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

import react from "@astrojs/react";

import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  integrations: [react(), auth()],

  // Tell Sass where to look for USWDS packages
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: [
            "node_modules/@uswds/uswds/packages", // <-- lets @use "uswds-core" work
          ],
          quietDeps: true, // suppress deprecation warnings from dependencies
          // Development optimizations
          style: "compressed", // use compressed output for faster processing
        },
      },
    },
    // Additional Vite optimizations for development
    optimizeDeps: {
      include: ["@uswds/uswds"], // pre-bundle USWDS
    },
    // Faster development builds
    build: {
      sourcemap: false, // disable source maps in dev
    },
    // Cache optimization
    cacheDir: ".vite-cache",
  },
});
