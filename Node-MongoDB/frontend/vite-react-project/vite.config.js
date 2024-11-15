import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/submit': {
        target: 'http://mynode:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/submit/, '/submit'),
      },
    },
  },
})
