import {mkdir,writeFile,readFile} from 'node:fs/promises';
await mkdir('public/fonts',{recursive:true});
const families=[['serif','Bodoni+Moda:ital,wght@0,500;1,500'],['sans','Manrope:wght@400;500;600;700']];
let css='';
for(const [name,family] of families){const r=await fetch(`https://fonts.googleapis.com/css2?family=${family}&display=swap`,{headers:{'User-Agent':'Mozilla/5.0'}});const text=await r.text();let i=0;for(const block of text.matchAll(/@font-face\s*\{[^}]+\}/g)){const fontUrl=block[0].match(/url\(([^)]+)\)/)?.[1];if(!fontUrl)continue;const extension=fontUrl.includes('.woff2')?'woff2':'ttf';const file=`${name}-${i++}.${extension}`;const data=await fetch(fontUrl);await writeFile('public/fonts/'+file,Buffer.from(await data.arrayBuffer()));css+=block[0].replace(fontUrl,'/fonts/'+file)+'\n';}console.log(name,i);}
await writeFile('public/fonts/fonts.css',css);
