// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [react(), auth()],

  vite: {
    // Tell Vite to use the edge build of React DOM server
    resolve: {
      alias: {
        // Always prefer the edge build when running on Cloudflare
        "react-dom/server": "react-dom/server.edge",
        // Safety net: if the adapter already rewired to `.browser`, point it back
        "react-dom/server.browser": "react-dom/server.edge",
      },
    },
    // Tell Sass where to look for USWDS packages
    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: [
            "node_modules/@uswds/uswds/packages", // <-- lets @use "uswds-core" work
          ],
          quietDeps: true, // suppress deprecation warnings from dependencies
        },
      },
    },
    // Additional Vite optimizations for development
    optimizeDeps: {
      include: ["@uswds/uswds"], // pre-bundle USWDS
    },
    // Cache optimization
    cacheDir: ".vite-cache",
  },
});
