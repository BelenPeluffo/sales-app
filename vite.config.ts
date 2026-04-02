import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@common": path.resolve(__dirname, "./src/modules/common"),
    },
  },
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
