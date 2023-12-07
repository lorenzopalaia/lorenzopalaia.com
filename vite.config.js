import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true
  },
  base: '/Personal-Portfolio/',
  build: {
    assetsDir: 'assets',
    outDir: 'dist',
    assetsInlineLimit: 0,
    rollupOptions: {
      input: 'src/main.js',
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      },
    },
    assetsInclude: ['favicon.ico', 'robots.txt', 'sitemap.xml']
  }
})
