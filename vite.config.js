import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // GitHub Pages serves the project from /Dregeup/. Absolute, not './', because
  // deep routes like /exams/cat would resolve a relative base against the route.
  base: '/Dregeup/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router')) return 'router'
            if (id.includes('react')) return 'react'
          }
        },
      },
    },
  },
})
