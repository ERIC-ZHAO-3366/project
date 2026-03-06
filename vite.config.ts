import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        404: resolve(__dirname, '404.html'),
        generate_collage: resolve(__dirname, 'project/generate_collage.html'),
        imagecloud: resolve(__dirname, 'project/imagecloud.html')
      }
    }
  }
});
