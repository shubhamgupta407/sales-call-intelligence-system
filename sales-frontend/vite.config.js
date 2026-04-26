import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/analyze': {
        target: 'https://sales-ai-backend-d14w.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
