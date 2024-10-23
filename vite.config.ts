import { defineConfig } from "vite";
import { crx, defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
  manifest_version: 3,
  name: "Reading time",
  description:
    "Add the reading time to Chrome Extension documentation articles",
  version: "1.0",
  web_accessible_resources: [
    {
      resources: ["src/public/*"],
      matches: ["<all_urls>"],
    },
  ],
  content_scripts: [
    {
      js: ["src/index.ts", "src/speechRecognize.ts"], // 拡張子を .ts に変更する
      matches: [
        "https://www.youtube.com/watch*",
        "https://play.sooplive.co.kr/*",
        "https://chzzk.naver.com/live/*",
      ],
    },
  ],
  permissions: ["storage", "tabs"],
  host_permissions: ["https://script.google.com/macros/s/*"],
});

export default defineConfig({
  plugins: [crx({ manifest })],
});
