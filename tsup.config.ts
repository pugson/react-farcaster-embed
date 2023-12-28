import { defineConfig } from "tsup";

export default defineConfig({
  minify: true,
  target: "es2018",
  external: ["react"],
  sourcemap: true,
  dts: false,
  format: ["esm", "cjs"],
});
