import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig({
  server: {
    host: true,
    port: 3000,
  },
  plugins: [reactRouter(), svgr(), tsconfigPaths()],
  define: {
    "process.env.VITE_AIRTABLE_API_KEY": JSON.stringify(process.env.VITE_AIRTABLE_API_KEY),
  },
});
