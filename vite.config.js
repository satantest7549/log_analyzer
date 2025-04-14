import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/cstt-dev": {
        target: "http://cstt-dev.mitchell.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cstt-dev/, ""),
      },
    },
  },
});
