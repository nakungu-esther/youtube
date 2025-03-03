// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.', // Ensure Vite knows the correct root
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html'
    }
  }
});
