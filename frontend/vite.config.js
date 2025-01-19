import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Use a separate directory for the build output
  },
  publicDir: 'public', // Ensure the `public` directory is used only for static assets
});
