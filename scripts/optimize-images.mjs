import sharp from 'sharp';
for(const [file,widths] of [['portrait',[600,1000]],['studio',[750]]]){for(const w of widths){await sharp(`public/media/${file}.jpg`).resize(w).webp({quality:83}).toFile(`public/media/${file}-${w}.webp`);console.log(`${file}-${w}.webp`);}}
