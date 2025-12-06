// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // forward /api -> your Apps Script endpoint
      '/api/submit': {
        target: 'https://script.google.com/macros/s/AKfycbyJtiv8nxS8IwqkZaRCDAtTuYhVGD0YGlT53IieHU7UZH7EFyGldhqvj9GIgP_QHNZi/exec',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // optional: strips /api prefix
      },
    },
  },
});
