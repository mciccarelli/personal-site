import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const sharp = require('sharp');
import { readFileSync, writeFileSync } from 'fs';

const data = JSON.parse(readFileSync('./data.json', 'utf8'));
const out = {};
for (const p of data.photos) {
  const buf = await sharp('./public' + p.src)
    .resize(20, null, { fit: 'inside' })
    .jpeg({ quality: 45 })
    .toBuffer();
  out[p.src] = 'data:image/jpeg;base64,' + buf.toString('base64');
}
writeFileSync('./photo-blur.json', JSON.stringify(out, null, '\t') + '\n');
console.log('wrote', Object.keys(out).length, 'placeholders; total', readFileSync('./photo-blur.json').length, 'bytes; sample len', out[data.photos[0].src].length);
