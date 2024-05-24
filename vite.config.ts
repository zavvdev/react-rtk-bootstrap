import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default ({ mode }: { mode: any }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react()],
    server: {
      port: 3000,
    },
    resolve: {
      alias: {
        "~": "/src",
      },
    },
  });
};
