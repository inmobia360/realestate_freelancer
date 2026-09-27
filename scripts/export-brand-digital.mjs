import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const brandDir = path.resolve('public/brand');
const outputDir = path.join(brandDir, 'digital');
const markPath = path.join(brandDir, 'inmobia360-isotipo-original.png');
const markData = (await fs.readFile(markPath)).toString('base64');
const markUri = `data:image/png;base64,${markData}`;
const logoDimensions = { width: 1440, height: 400 };
const colors = {
  light: '#F7F9FC',
  dark: '#111A31',
  navy: '#161E2E',
  orange: '#FF8A00',
};

await fs.mkdir(outputDir, { recursive: true });

function markSvg(variant) {
  const background = variant === 'dark' || variant === 'light'
    ? `<rect width="1024" height="1024" fill="${variant === 'dark' ? colors.dark : colors.light}"/>`
    : '';
  const disk = variant === 'dark' || variant === 'transparent-dark'
    ? '<circle cx="512" cy="512" r="488" fill="#FFFFFF"/>'
    : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">${background}${disk}<image href="${markUri}" x="32" y="32" width="960" height="960" preserveAspectRatio="xMidYMid meet"/></svg>`;
}

function logoSvg(variant) {
  const background = variant === 'dark' || variant === 'light'
    ? `<rect width="${logoDimensions.width}" height="${logoDimensions.height}" fill="${variant === 'dark' ? colors.dark : colors.light}"/>`
    : '';
  const disk = variant === 'dark' || variant === 'transparent-dark'
    ? '<circle cx="240" cy="200" r="196" fill="#FFFFFF"/>'
    : '';
  const wordColor = variant === 'dark' || variant === 'transparent-dark' ? '#FFFFFF' : colors.navy;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${logoDimensions.width}" height="${logoDimensions.height}" viewBox="0 0 ${logoDimensions.width} ${logoDimensions.height}" role="img" aria-labelledby="title desc"><title id="title">Inmobia 360</title><desc id="desc">Logotipo horizontal de Inmobia 360</desc>${background}${disk}<image href="${markUri}" x="40" y="0" width="400" height="400" preserveAspectRatio="xMidYMid meet"/><text x="453" y="268" textLength="630" lengthAdjust="spacingAndGlyphs" fill="${wordColor}" font-family="Arial, Helvetica, sans-serif" font-size="178" font-weight="800" letter-spacing="-7.2">Inmobia</text><text x="1101" y="268" textLength="290" lengthAdjust="spacingAndGlyphs" fill="${colors.orange}" font-family="Arial, Helvetica, sans-serif" font-size="178" font-weight="800" letter-spacing="-4.8">360</text></svg>`;
}

for (const variant of ['transparent', 'transparent-dark', 'light', 'dark']) {
  const logo = Buffer.from(logoSvg(variant));
  const mark = Buffer.from(markSvg(variant));
  await fs.writeFile(path.join(outputDir, `inmobia360-logo-${variant}.svg`), logo);
  await fs.writeFile(path.join(outputDir, `inmobia360-isotipo-${variant}.svg`), mark);
  await sharp(logo)
    .png()
    .toFile(path.join(outputDir, `inmobia360-logo-${variant}.png`));
  await sharp(mark)
    .png()
    .toFile(path.join(outputDir, `inmobia360-isotipo-${variant}.png`));
}

const readme = `# Inmobia 360 · Recursos digitales\n\n` +
  `Variantes de logotipo e isotipo en PNG y SVG.\n\n` +
  `| Variante | Logotipo horizontal | Isotipo | Fondo |\n|---|---|---|---|\n` +
  `| Transparente | inmobia360-logo-transparent.png / .svg | inmobia360-isotipo-transparent.png / .svg | Transparente |\n` +
  `| Transparente oscuro | inmobia360-logo-transparent-dark.png / .svg | inmobia360-isotipo-transparent-dark.png / .svg | Transparente; palabra blanca y disco blanco de contraste |\n` +
  `| Claro | inmobia360-logo-light.png / .svg | inmobia360-isotipo-light.png / .svg | ${colors.light} |\n` +
  `| Oscuro | inmobia360-logo-dark.png / .svg | inmobia360-isotipo-dark.png / .svg | ${colors.dark} |\n\n` +
  `Logotipo: 1440 × 400 px. Isotipo: 1024 × 1024 px. El “360” usa naranja corporativo ${colors.orange}. El lockup tiene un espacio corto visible entre palabras. El isotipo se deriva del máster aprobado. Para fondo oscuro, conserva sus colores originales sobre un disco blanco.\n`;

await fs.writeFile(path.join(outputDir, 'README.md'), readme, 'utf8');

// Build app icons from the approved raster master with generous safe areas.
const sourceMark = await fs.readFile(markPath);
const renderIcon = async (size, innerScale, background = colors.light) => {
  const innerSize = Math.round(size * innerScale);
  const mark = await sharp(sourceMark).resize(innerSize, innerSize, { fit: 'contain' }).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: mark, left: Math.round((size - innerSize) / 2), top: Math.round((size - innerSize) / 2) }])
    .png()
    .toBuffer();
};

const iconSizes = [16, 32, 48];
const icoImages = await Promise.all(iconSizes.map((size) => renderIcon(size, 0.84, { r: 247, g: 249, b: 252, alpha: 1 })));
const header = Buffer.alloc(6 + iconSizes.length * 16);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(iconSizes.length, 4);
let imageOffset = header.length;
icoImages.forEach((image, index) => {
  const offset = 6 + index * 16;
  const size = iconSizes[index];
  header.writeUInt8(size === 256 ? 0 : size, offset);
  header.writeUInt8(size === 256 ? 0 : size, offset + 1);
  header.writeUInt8(0, offset + 2);
  header.writeUInt8(0, offset + 3);
  header.writeUInt16LE(1, offset + 4);
  header.writeUInt16LE(32, offset + 6);
  header.writeUInt32LE(image.length, offset + 8);
  header.writeUInt32LE(imageOffset, offset + 12);
  imageOffset += image.length;
});
const favicon = Buffer.concat([header, ...icoImages]);
await fs.writeFile(path.join('src', 'app', 'favicon.ico'), favicon);
await fs.writeFile(path.join('public', 'favicon.ico'), favicon);
await fs.writeFile(path.join('public', 'favicon.png'), icoImages[2]);
await fs.writeFile(path.join('public', 'brand', 'favicon-16.png'), icoImages[0]);
await fs.writeFile(path.join('public', 'brand', 'favicon-32.png'), icoImages[1]);
await fs.writeFile(path.join('public', 'brand', 'favicon-48.png'), icoImages[2]);

await sharp(await renderIcon(512, 0.78)).toFile(path.join('src', 'app', 'icon.png'));
await sharp(await renderIcon(180, 0.78)).toFile(path.join('src', 'app', 'apple-icon.png'));
for (const size of [192, 512]) {
  const pwa = await renderIcon(size, 0.76);
  const maskable = await renderIcon(size, 0.62);
  await fs.writeFile(path.join(brandDir, `pwa-${size}.png`), pwa);
  await fs.writeFile(path.join(brandDir, `pwa-${size}-maskable.png`), maskable);
}

console.log(`Exported Inmobia 360 digital assets to ${outputDir}`);
