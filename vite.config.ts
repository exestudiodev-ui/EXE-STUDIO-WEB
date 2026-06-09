import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from "kimi-plugin-inspect-react"

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [
    react(),
    // kimi-plugin-inspect-react is a dev-only tool — never include in production
    ...(mode === 'development'
      ? [inspectAttr()]
      : []
    ),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    // Minification settings
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes('node_modules/')) return; // app code → per-section chunks via React.lazy

          // Animation libraries — independent, parallel-loadable
          if (id.includes('node_modules/gsap/') || id.includes('node_modules/framer-motion/')) {
            return 'vendor-animation';
          }

          // Radix UI primitives (only sheet + dropdown-menu + popover remain)
          if (id.includes('node_modules/@radix-ui/')) {
            return 'vendor-radix';
          }

          // React core — keep together to avoid circular ref issues
          return 'vendor-react';
        },
      },
    },
  },
}));
