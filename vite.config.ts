import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // GitHub Pages serve em /synlua-site/; em domínio próprio use VITE_BASE=/
  base: process.env.VITE_BASE ?? "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    {
      // CSS principal não bloqueia o 1º desenho: a splash (HTML + CSS inline) aparece na hora
      // e só sai depois que o CSS carregou (ver window.__cssOk no index.html).
      name: "async-css",
      apply: "build",
      transformIndexHtml: {
        order: "post",
        handler: (html: string) =>
          html.replace(
            /<link rel="stylesheet" crossorigin href="([^"]+)">/g,
            `<link rel="stylesheet" crossorigin href="$1" media="print" onload="this.media='all';window.__cssOk&&window.__cssOk()"><noscript><link rel="stylesheet" href="$1"></noscript>`,
          ),
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": ["@radix-ui/react-dialog", "@radix-ui/react-toast", "@radix-ui/react-tooltip"],
          "motion-vendor": ["framer-motion"],
          "icons-vendor": ["lucide-react"],
          "form-vendor": ["react-hook-form", "@hookform/resolvers", "zod"],
        },
      },
    },
  },
}));
