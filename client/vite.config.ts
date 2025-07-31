import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// @ts-ignore
import eslintPlugin from "vite-plugin-eslint";

export default defineConfig({
  plugins: [react(),  eslintPlugin({
    failOnError: false, // prevents build from failing on ESLint errors
  }),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
