import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

import path from "path"
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig(() => {
  return {
    plugins: [react()],
    define: {
      'process.env.REACT_APP_CLAUDE_API_KEY': JSON.stringify(process.env.REACT_APP_CLAUDE_API_KEY),
    },
    server: {
      port: 3000,
      host: true  // Add this to allow external connections
    },
    preview: {  // Add preview configuration
      port: 3000,
      host: true
    },
    resolve: {
      alias: {
        app: resolve(__dirname, "src", "app"),
        components: resolve(__dirname, "src", "components"),
        hooks: resolve(__dirname, "src", "hooks"),
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
