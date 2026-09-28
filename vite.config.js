import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { createServerApp } from './server/app.js';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'orbital26-api-engine',
      configureServer(server) {
        const app = createServerApp();
        server.middlewares.use(app);
      },
    },
  ],
  server: {
    port: 5173,
    host: true,
  },
});
