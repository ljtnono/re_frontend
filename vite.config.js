import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@v": fileURLToPath(new URL("./src/view", import.meta.url)),
      "@c": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@a": fileURLToPath(new URL("./src/assets", import.meta.url))
    }
  },
  server: {
    host: "0.0.0.0",
    port: 8081,
    proxy: {
      // Artalk 评论系统：同源代理，避免跨域问题（生产环境由 nginx 代理）
      "/artalk": {
        target: "http://127.0.0.1:30610",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/artalk/, "")
      }
    }
  }
});
