import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // base: process.env.NODE_ENV === 'production' ? '/UI_Paris/':'/',

  base: '/', // for Render deployment
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        chunkSizeWarningLimit: 1000,
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react-vendor';
            }
            if (id.includes('lodash')) {
              return 'lodash-vendor';
            }
          }
        },
      },
    },
  },
})

