import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import type { Plugin } from 'vite';

// Hero başlığı fontunu (Antonio 700, latin + latin-ext: İ Ş Ğ) önceden yükle → font swap kayması azalır
const preloadDisplayFont = (): Plugin => ({
  name: 'preload-display-font',
  apply: 'build',
  transformIndexHtml: {
    order: 'post',
    handler(_html, ctx) {
      return Object.keys(ctx.bundle ?? {})
        .filter((f) => /antonio-latin(-ext)?-700-normal-[\w-]+\.woff2$/.test(f))
        .map((f) => ({
          tag: 'link',
          attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: `/${f}`, crossorigin: '' },
          injectTo: 'head' as const,
        }));
    },
  },
});

export default defineConfig({
  plugins: [react(), tailwindcss(), preloadDisplayFont()],
});
