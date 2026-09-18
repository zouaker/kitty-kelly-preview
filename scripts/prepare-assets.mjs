import { mkdir, readFile, writeFile } from 'node:fs/promises';
await mkdir('public/media',{recursive:true});
const data={};for(const p of ['home','studio','commercials','corporates','otherdemos','audiobooks','contact'])data[p]=JSON.parse(await readFile(`research/raw/${p}.json`,'utf8'));
const selections=[['portrait.jpg',data.home.images[2]+'?format=1500w'],['studio.jpg',data.studio.images[0]+'?format=1000w'],['studio-mic.jpg',data.studio.images[2]+'?format=750w'],['the-friendship-fling.jpg',data.home.images[6]+'?format=750w'],['the-perfect-stranger.jpg',data.home.images[5]+'?format=750w']];
for(const p of ['commercials','corporates','otherdemos','audiobooks'])for(const link of data[p].links.filter(l=>l.endsWith('.mp3')))selections.push([link.split('/').pop(),'https://www.kittykelly.co.uk'+link]);
const manifest=[];
for(const [name,url] of selections){const r=await fetch(url);if(!r.ok)throw Error(`${r.status} ${url}`);const b=Buffer.from(await r.arrayBuffer());await writeFile('public/media/'+name,b);manifest.push({file:'/media/'+name,source:url,bytes:b.length,temporary:true});console.log(name,b.length);}
await writeFile('research/asset-manifest.json',JSON.stringify(manifest,null,2));
for(const p of ['home','commercials','corporates']){const html=await readFile(`research/raw/${p}.html`,'utf8');const videos=[...html.matchAll(/data-config-video="([^"]+)"/g)].map(m=>JSON.parse(m[1].replaceAll('&quot;','"').replaceAll('&amp;','&')));await writeFile(`research/raw/${p}-videos.json`,JSON.stringify(videos,null,2));console.log(p,'videos',JSON.stringify(videos));}
