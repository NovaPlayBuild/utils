import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { externals as nodeExternals } from "rollup-plugin-node-externals";
import { Plugin } from "vite";

function externals(): Plugin {
  return {
    ...nodeExternals({
      // Options here if needed
    }),
    name: "node-externals",
    enforce: "pre", // The key is to run it before Vite's default dependency resolution plugin
    apply: "build",
  };
}

export default defineConfig({
  publicDir: "public",
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    minify: "esbuild",
    lib: {
      entry: resolve("src", "index.ts"),
      name: "HyperplayExtensionHelper",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
  },
  plugins: [externals(), dts()],
});
