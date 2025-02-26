import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      strategies: "generateSW",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Fix Finder",
        short_name: "FF",
        description: "Find your perfect fixer",
        start_url: "./",
        display: "standalone",
        background_color: "#FFFFFF",
        theme_color: "#FFFFFF",
        icons: [
          {
            src: "/assets/pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "/assets/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/assets/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return url.pathname.includes("assets");
            },
            handler: "CacheFirst",
            method: "GET",
            options: {
              cacheName: "static-assets",
              expiration: {
                maxAgeSeconds: 60 * 60 * 24,
                maxEntries: 100,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: ({ url }) => {
              return url.pathname.includes("Home");
            },
            handler: "NetworkFirst",
            method: "GET",
            options: {
              cacheName: "fixfinder-api",
              expiration: {
                maxAgeSeconds: 60 * 60 * 24,
                maxEntries: 100,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
