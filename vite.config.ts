import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { hppRequestMiddleware } from './server/hppRequest'
import { paymentInfoMiddleware } from './server/paymentInfo'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'payment-apis',
      configureServer(server) {
        server.middlewares.use(paymentInfoMiddleware())
        server.middlewares.use(hppRequestMiddleware())
      },
      configurePreviewServer(server) {
        server.middlewares.use(paymentInfoMiddleware())
        server.middlewares.use(hppRequestMiddleware())
      },
    },
  ],
  server: {
    port: 3000,
    strictPort: true,
  },
})
