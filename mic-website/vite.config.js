import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5173, open: true },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 2048,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('/motion/') || id.includes('/motion-dom/')) return 'motion'
          if (id.includes('/react/') || id.includes('/react-dom/')) return 'react'
          if (id.includes('/react-router')) return 'react-router'
          return 'vendor'
        },
      },
    },
  },
})