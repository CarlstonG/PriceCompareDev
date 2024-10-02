import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // This allows it to be accessible via your local network
    port: 3000,        // Specify the port (you can change it as needed)
  },
});
