/**
 * Generates the admission poster as a real image file (public/announcement.jpg)
 * so the pop-up can display a photo rather than live HTML. Composites the school
 * crest onto a navy/gold SVG poster. Re-run after editing the details below.
 */
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC = path.join(ROOT, "public");

const W = 900;
const H = 1150;

const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b2b5c"/>
      <stop offset="55%" stop-color="#0c2550"/>
      <stop offset="100%" stop-color="#071a3a"/>
    </linearGradient>
    <radialGradient id="glow" cx="85%" cy="8%" r="45%">
      <stop offset="0%" stop-color="#f5b301" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#f5b301" stop-opacity="0"/>
    </radialGradient>
    <style>
      .serif { font-family: Georgia, 'Times New Roman', serif; }
      .sans  { font-family: 'Segoe UI', Arial, Helvetica, sans-serif; }
    </style>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect x="18" y="18" width="${W - 36}" height="${H - 36}" rx="28"
        fill="none" stroke="#f5b301" stroke-opacity="0.35" stroke-width="2"/>

  <!-- white disc behind the crest (crest PNG composited on top) -->
  <circle cx="${W / 2}" cy="150" r="86" fill="#ffffff"/>
  <circle cx="${W / 2}" cy="150" r="86" fill="none" stroke="#f5b301" stroke-width="4"/>

  <text x="${W / 2}" y="300" text-anchor="middle" class="sans" fill="#f7c948"
        font-size="30" font-weight="700" letter-spacing="7">ADMISSIONS OPEN · 2083</text>

  <text x="${W / 2}" y="392" text-anchor="middle" class="serif" fill="#ffffff"
        font-size="86" font-weight="900" letter-spacing="2">GRADE</text>

  <!-- XI badge -->
  <rect x="${W / 2 - 70}" y="420" width="140" height="96" rx="14" fill="#f5b301"/>
  <text x="${W / 2}" y="493" text-anchor="middle" class="serif" fill="#071a3a"
        font-size="70" font-weight="900" letter-spacing="3">XI</text>

  <text x="${W / 2}" y="565" text-anchor="middle" class="sans" fill="#dbe4f5"
        font-size="27" font-weight="600">New Horizon Awasiya Secondary School</text>
  <text x="${W / 2}" y="600" text-anchor="middle" class="sans" fill="#9fb2d6"
        font-size="23">Tansen-7, Palpa · Nepal</text>

  <!-- Science card -->
  <rect x="70" y="650" width="360" height="230" rx="18" fill="#ffffff" fill-opacity="0.08"
        stroke="#ffffff" stroke-opacity="0.16"/>
  <text x="100" y="708" class="serif" fill="#f7c948" font-size="34" font-weight="700">Science</text>
  <text x="100" y="758" class="sans" fill="#e6ecfa" font-size="24">✓  Biology</text>
  <text x="100" y="800" class="sans" fill="#e6ecfa" font-size="24">✓  Computer Science</text>

  <!-- Management card -->
  <rect x="470" y="650" width="360" height="230" rx="18" fill="#ffffff" fill-opacity="0.08"
        stroke="#ffffff" stroke-opacity="0.16"/>
  <text x="500" y="708" class="serif" fill="#f7c948" font-size="34" font-weight="700">Management</text>
  <text x="500" y="758" class="sans" fill="#e6ecfa" font-size="24">✓  Hotel Management</text>
  <text x="500" y="800" class="sans" fill="#e6ecfa" font-size="24">✓  Computer Science</text>

  <!-- gold apply band -->
  <rect x="70" y="930" width="760" height="86" rx="43" fill="#f5b301"/>
  <text x="${W / 2}" y="985" text-anchor="middle" class="sans" fill="#071a3a"
        font-size="30" font-weight="800" letter-spacing="1">APPLY NOW · 075-522626 · 9857028244</text>

  <text x="${W / 2}" y="1075" text-anchor="middle" class="sans" fill="#9fb2d6"
        font-size="22" font-style="italic">Quality Education, Our Commitment — Children are our future.</text>
</svg>`;

async function main() {
  const crest = await sharp(path.join(PUBLIC, "crest.png"))
    .resize(150, 150, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  await sharp(Buffer.from(svg))
    .composite([{ input: crest, top: 75, left: Math.round(W / 2 - 75) }])
    .jpeg({ quality: 90 })
    .toFile(path.join(PUBLIC, "announcement.jpg"));

  console.log("Poster written to public/announcement.jpg");
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
