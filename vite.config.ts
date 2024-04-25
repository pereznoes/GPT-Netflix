import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const cherryPickedKeys = [
  "REACT_APP_TMDB_API_READ_ACCESS_TOKEN",
  "REACT_APP_TMDB_API_KEY",
  "REACT_APP_OPENAI_API_KEY",
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const processEnv: Record<string, string> = {};
  cherryPickedKeys.forEach((key) => (processEnv[key] = env[key]));

  return {
    define: {
      "process.env": processEnv,
    },
    plugins: [react()],
  };
});
