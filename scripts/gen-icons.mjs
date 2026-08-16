/**
 * Generates favicon / app-icon / OG assets from the official school crest
 * (public/logo.jpg). Run once with `node scripts/gen-icons.mjs`.
 *
 * The crest sits on white with uneven margins, so we trim the surrounding
 * white, pad it back to a square, and lay it on a brand-navy rounded field —
 * the mark stays recognisable even at 16px in a browser tab.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const LOGO = path.join(ROOT, "public", "logo.jpg");
const APP = path.join(ROOT, "src", "app");
const PUBLIC = path.join(ROOT, "public");

const NAVY = { r: 11, g: 43, b: 92, alpha: 1 };

/** Trim white border, then letterbox to a transparent square. */
async function squareCrest(size, padRatio = 0.08) {
  const inner = Math.round(size * (1 - padRatio * 2));
  const crest = await sharp(LOGO)
    .trim({ threshold: 40 })
    .resize(inner, inner, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  const pad = Math.round((size - inner) / 2);
  return sharp({
    create: { width: size, height: size, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 0 } },
  })
    .composite([{ input: crest, top: pad, left: pad }])
    .png()
    .toBuffer();
}

/** Crest on a rounded navy tile — used for the tab favicon and PWA icons. */
async function tiledIcon(size) {
  const radius = Math.round(size * 0.22);
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" ry="${radius}"/></svg>`,
  );
  const tile = await sharp({
    create: { width: size, height: size, channels: 4, background: NAVY },
  })
    .composite([{ input: await squareCrest(size, 0.16), top: 0, left: 0 }])
    .png()
    .toBuffer();

  return sharp(tile)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
}

async function main() {
  await mkdir(path.join(PUBLIC, "icons"), { recursive: true });

  // App Router conventions: these become the tab favicon + Apple touch icon.
  await sharp(await tiledIcon(64)).toFile(path.join(APP, "icon.png"));
  await sharp(await tiledIcon(180)).toFile(path.join(APP, "apple-icon.png"));

  // PWA manifest icons.
  await sharp(await tiledIcon(192)).toFile(path.join(PUBLIC, "icons", "icon-192.png"));
  await sharp(await tiledIcon(512)).toFile(path.join(PUBLIC, "icons", "icon-512.png"));

  // Maskable (safe-zone padded) icon for Android.
  await sharp(await tiledIcon(512)).toFile(path.join(PUBLIC, "icons", "maskable-512.png"));

  // Plain trimmed crest on transparent — reused in the UI where we want no tile.
  await sharp(await squareCrest(512, 0.04)).toFile(path.join(PUBLIC, "crest.png"));

  // Open Graph card: crest + name on a navy field (1200x630).
  const W = 1200;
  const H = 630;
  const crest = await squareCrest(300, 0.02);
  const label = Buffer.from(
    `<svg width="${W}" height="${H}">
       <style>
         .n{ font-family:Georgia,'Times New Roman',serif; fill:#ffffff; font-weight:700 }
         .s{ font-family:Arial,Helvetica,sans-serif; fill:#f5b301; letter-spacing:6px }
         .t{ font-family:Arial,Helvetica,sans-serif; fill:#cbd5e1 }
       </style>
       <text x="140" y="300" class="n" font-size="72">New Horizon</text>
       <text x="140" y="376" class="n" font-size="52">Higher Secondary School</text>
       <text x="142" y="440" class="s" font-size="26">TANSEN · PALPA · NEPAL</text>
       <text x="142" y="500" class="t" font-size="28">Admissions Open — Grade XI, 2083</text>
     </svg>`,
  );
  await sharp({ create: { width: W, height: H, channels: 4, background: NAVY } })
    .composite([
      { input: label, top: 0, left: 0 },
      { input: crest, top: 165, left: 820 },
    ])
    .png()
    .toFile(path.join(PUBLIC, "og-image.png"));

  console.log("Icons + OG image generated.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
