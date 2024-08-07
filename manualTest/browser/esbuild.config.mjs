import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/script.ts"],
  bundle: true,
  sourcemap: true,
  outdir: "dist/",
});
