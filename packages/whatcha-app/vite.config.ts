import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      {
        name: "html-transform",
        transformIndexHtml(html) {
          const scriptPath = env.VITE_NAVER_CLIENT_ID || "";
          return html.replace("<<VITE_NAVER_CLIENT_ID>>", scriptPath);
        },
      },
    ],
    server: {
      proxy: {
        "/map-direction": {
          target: "https://naveropenapi.apigw.ntruss.com",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    resolve: {
      alias: {
        "@": "/src",
        "@common": path.resolve(__dirname, "../common"),
        "@assets": "/src/assets",
        "@app": "/src/app",
        "@pages": "/src/pages",
        "@widgets": "/src/widgets",
        "@features": "/src/features",
        "@entities": "/src/entities",
        "@shared": "/src/shared",
      },
    },
  };
});
