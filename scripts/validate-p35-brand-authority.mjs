import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const DIST = fileURLToPath(new URL("../dist/", import.meta.url));

const expectations = [
  {
    path: "fa/products/neveshtyar.html",
    markers: ["NeveshtYar", "4.9.2", "v4.9.2", "f47f64dbb504a87fa768e8ec119aa783b7ba7385", "اصلاح دوطرفه چیدمان کیبورد", "Farsio"],
  },
  {
    path: "en/products/neveshtyar.html",
    markers: ["NeveshtYar", "4.9.2", "v4.9.2", "f47f64dbb504a87fa768e8ec119aa783b7ba7385", "Bidirectional Persian/English keyboard-layout recovery", "Farsio"],
  },
  {
    path: "fa/products/avayar.html",
    markers: ["AvaYar", "0.6.0", "avayar-v0.6.0", "20d9da845c32e9873d332fb12192b38521d21232", "پخش تدریجی صدا", "Sulafat", "Iapetus", "Farsio"],
  },
  {
    path: "en/products/avayar.html",
    markers: ["AvaYar", "0.6.0", "avayar-v0.6.0", "20d9da845c32e9873d332fb12192b38521d21232", "Progressive audio playback", "Sulafat", "Iapetus", "Farsio"],
  },
  {
    path: "fa.html",
    markers: ["Farsio", "فارسیو", "#product-family", "/fa/products/neveshtyar", "/fa/products/avayar"],
  },
  {
    path: "en.html",
    markers: ["Farsio", "#product-family", "/en/products/neveshtyar", "/en/products/avayar"],
  },
];

for (const item of expectations) {
  const html = await readFile(join(DIST, item.path), "utf8");

  for (const marker of item.markers) {
    if (!html.includes(marker)) throw new Error(`${item.path} missing required P35 authority marker: ${marker}`);
  }

  const match = html.match(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  if (!match) throw new Error(`${item.path} missing JSON-LD`);

  const json = JSON.parse(match[1]);
  if (!Array.isArray(json?.["@graph"])) throw new Error(`${item.path} JSON-LD missing @graph`);
  if (!json["@graph"].some((entry) => entry?.["@id"] === "https://farsio.ir/#brand")) {
    throw new Error(`${item.path} missing Farsio Brand entity`);
  }
}

for (const path of ["fa/products/avayar.html", "en/products/avayar.html"]) {
  const html = await readFile(join(DIST, path), "utf8");
  if (/0\.6\.0\s+preview-3/i.test(html)) throw new Error(`${path} regressed to AvaYar preview-3`);
  if (/AvaYar[^\n<]{0,80}(In development|در حال توسعه)/i.test(html)) throw new Error(`${path} regressed to development status`);
}

console.log("P35 brand/product authority validation PASS.");
