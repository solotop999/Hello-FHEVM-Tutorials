import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // assetsInclude: ["**/*.wasm"], // ép Vite treat .wasm as binary
  // server: {
  //   mimeTypes: {
  //     "application/wasm": ["wasm"],
  //   },
  // },
  define: {
    global: "globalThis",
  },
});
