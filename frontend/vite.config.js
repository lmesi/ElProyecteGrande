import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://192.168.1.5:7777",
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    host: true, // Here
    strictPort: true,
    port: 5555,
  },
})
