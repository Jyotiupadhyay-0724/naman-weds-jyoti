// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // forward /api -> your Apps Script endpoint
      '/api': {
        target: 'https://script.google.com/macros/s/AKfycbx2fGHQY8r4agQVxpHB7iQaC9HcFWJcMEdZmEWFRDOleHwR252cR6LEv0MZzxk1sP-D/exec',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // optional: strips /api prefix
      },
    },
  },
});
