import {readFile,writeFile,mkdir} from 'node:fs/promises';
import sharp from 'sharp';
await mkdir('public/media/portfolio',{recursive:true});await mkdir('research/sheets',{recursive:true});
const manifest=JSON.parse(await readFile('research/asset-manifest.json','utf8'));
const inventory={};
for(const page of ['home','commercials','corporates','audiobooks','otherdemos','studio','contact']){
 const data=JSON.parse(await readFile(`research/raw/${page}.json`,'utf8'));const selected=data.images.filter(u=>!u.includes('2b8a07de-7668'));
 inventory[page]=[];const tiles=[];
 for(let i=0;i<selected.length;i++){
  const source=selected[i];const file=`/media/portfolio/${page}-${i}.webp`;const r=await fetch(source+'?format=750w');if(!r.ok)throw Error(source+' '+r.status);const bytes=Buffer.from(await r.arrayBuffer());const optimized=await sharp(bytes).resize({width:750,height:750,fit:'inside',withoutEnlargement:true}).webp({quality:85}).toBuffer();await writeFile('public'+file,optimized);
  inventory[page].push({file,source,index:i});manifest.push({file,source,temporary:true});
  const thumb=await sharp(bytes).resize(200,150,{fit:'contain',background:'#ffffff'}).png().toBuffer();const label=Buffer.from(`<svg width="220" height="25"><rect width="220" height="25" fill="white"/><text x="10" y="18" font-family="Arial" font-size="14">${page}-${i}</text></svg>`);tiles.push({input:thumb,top:Math.floor(i/5)*190,left:(i%5)*220+10},{input:label,top:Math.floor(i/5)*190+150,left:(i%5)*220});
 }
 await sharp({create:{width:1100,height:Math.ceil(selected.length/5)*190,channels:3,background:'#f4f4f4'}}).composite(tiles).png().toFile(`research/sheets/${page}.png`);
 const html=await readFile(`research/raw/${page}.html`,'utf8');const hrefs=[...html.matchAll(/href="([^"]+)"/g)].map(m=>m[1].replaceAll('&amp;','&')).filter(x=>/^http/.test(x)&&!x.includes('squarespace'));
 console.log(page,selected.length,'images',JSON.stringify([...new Set(hrefs)]));
}
await writeFile('research/portfolio-inventory.json',JSON.stringify(inventory,null,2));await writeFile('research/asset-manifest.json',JSON.stringify(manifest,null,2));
