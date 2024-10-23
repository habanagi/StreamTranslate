import { defineConfig } from "vite";
import { crx, defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
  manifest_version: 3,
  name: "Reading time",
  description:
    "Add the reading time to Chrome Extension documentation articles",
  version: "1.0",
  content_scripts: [
    {
      js: ["src/index.ts", "src/speechRecognize.ts"], // 拡張子を .ts に変更する
      matches: [
        "https://www.youtube.com/watch*",
        "https://play.sooplive.co.kr/*",
      ],
    },
  ],
  permissions: ["storage", "tabs"],
});

export default defineConfig({
  plugins: [crx({ manifest })],
});
