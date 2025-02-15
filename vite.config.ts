import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import { reactRouter } from "@react-router/dev/vite";

// Load environment variables
export default defineConfig(({ mode }) => {
  // Load environment variables from .env (or GitHub Actions secrets)
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: true,
      port: 3000,
    },
    plugins: [reactRouter(), svgr(), tsconfigPaths()],
    define: {
      "process.env.VITE_AIRTABLE_API_KEY": JSON.stringify(
        env.VITE_AIRTABLE_API_KEY
      ),
    },
  };
});
