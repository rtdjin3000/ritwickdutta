import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

const input = process.argv[2];
if (!input) throw new Error("Provide the original logo image path.");
const source = resolve(input);
const corner = await sharp(source).rotate().extract({ left: 0, top: 0, width: 1, height: 1 }).removeAlpha().raw().toBuffer();
const background = { r: corner[0], g: corner[1], b: corner[2], alpha: 1 };
const trimmed = await sharp(source).rotate().trim({ threshold: 14 }).png().toBuffer({ resolveWithObject: true });
const logo = await sharp(trimmed.data)
  .extend({ top: 24, bottom: 24, left: 24, right: 24, background })
  .png({ compressionLevel: 9 })
  .toBuffer();
await writeFile(new URL("../src/assets/brand-logo.png", import.meta.url), logo);
const icon = await sharp(trimmed.data)
  .resize(224, 224, { fit: "contain", background })
  .extend({ top: 16, bottom: 16, left: 16, right: 16, background })
  .png({ compressionLevel: 9 })
  .toBuffer();
await writeFile(new URL("../src/assets/brand-icon.png", import.meta.url), icon);

const card = await readFile(new URL("../src/assets/social-card.svg", import.meta.url));
const cardLogo = await sharp(trimmed.data).resize(120, 72, { fit: "contain", background }).png().toBuffer();
const social = await sharp(card)
  .resize(1200, 630)
  .composite([{ input: cardLogo, left: 1008, top: 66 }])
  .png({ compressionLevel: 9 })
  .toBuffer();
await writeFile(new URL("../src/assets/social-card.png", import.meta.url), social);
await mkdir(new URL("../public/font-licenses/", import.meta.url), { recursive: true });
for (const family of ["figtree", "source-serif-4"]) {
  await copyFile(
    new URL(`../node_modules/@fontsource-variable/${family}/LICENSE`, import.meta.url),
    new URL(`../public/font-licenses/${family}.txt`, import.meta.url),
  );
}
console.log(`Prepared the full RD mark (${trimmed.info.width}x${trimmed.info.height} before padding), a 256x256 icon, and a 1200x630 social card. Image metadata was not retained.`);
