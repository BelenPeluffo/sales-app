import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // PARA LOCAL: Esto es necesario para evitar error de CORS sin necesidad de agregar localhost en BE como origen válido
      "/api": {
        target: "https://sales-app-be.onrender.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
