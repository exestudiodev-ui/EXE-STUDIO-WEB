import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Silence the 500kB warning — we are manually chunking below
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes('node_modules/')) return; // app code stays in index
          // Animation libraries — truly independent, load in parallel
          if (id.includes('node_modules/gsap/') || id.includes('node_modules/framer-motion/')) {
            return 'vendor-animation';
          }
          // Radix UI — large, independent, load in parallel
          if (id.includes('node_modules/@radix-ui/')) {
            return 'vendor-radix';
          }
          // Charts — only loaded on demand, isolate for future lazy loading
          if (id.includes('node_modules/recharts/') || id.includes('node_modules/d3')) {
            return 'vendor-charts';
          }
          // React core + everything else that may depend on it (avoids circular refs)
          return 'vendor-react';
        },
      },
    },
  },
});
