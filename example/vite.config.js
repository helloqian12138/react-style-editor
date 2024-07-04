import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  logLevel: 'info',
  server: {
    host: 'local.m.jd.com',
    port: 8080,
    open: true,
    hmr: true
  }
})
