import { defineConfig } from "tsup";

export default defineConfig({
  minify: true,
  target: "esnext",
  external: ["react"],
  sourcemap: true,
  dts: false,
  format: ["esm", "cjs"],
});
