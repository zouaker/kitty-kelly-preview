import {readdir,readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve('dist');
const base=(process.env.PUBLIC_BASE_PATH||'').replace(/\/$/,'');
async function walk(dir){const entries=await readdir(dir,{withFileTypes:true});return(await Promise.all(entries.map(e=>e.isDirectory()?walk(path.join(dir,e.name)):path.join(dir,e.name)))).flat();}
const files=await walk(root),htmlFiles=files.filter(f=>f.endsWith('.html'));const errors=[];
const routes=['commercials','corporates','audiobooks','otherdemos','studio','contact','demos','audioguides','characters','narration'];
for(const route of routes)assert(files.includes(path.join(root,route,'index.html')),`Missing ${route}`);
for(const file of htmlFiles){const html=await readFile(file,'utf8');const label=path.relative(root,file);if((html.match(/<h1(?:\s|>)/g)||[]).length!==1)errors.push(label+': expected one H1');if(!html.includes('name="description"'))errors.push(label+': missing description');if(!html.includes('noindex, nofollow'))errors.push(label+': review site must be noindex');if(/<canvas|sound-stage|three-dimensional/i.test(html))errors.push(label+': 3D remains');
 for(const match of html.matchAll(/(?:href|src)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)){const target=decodeURIComponent(match[1]);if(target.startsWith('//'))continue;if(base && !target.startsWith(base+'/'))errors.push(`${label}: unprefixed project URL ${target}`);const relative=base&&target.startsWith(base+'/')?target.slice(base.length):target;const resolved=path.join(root,relative);const possible=[resolved,path.join(resolved,'index.html'),resolved+'.html'];if(!(await Promise.all(possible.map(p=>stat(p).then(s=>s.isFile()).catch(()=>false)))).some(Boolean))errors.push(`${label}: broken local reference ${target}`);}
 for(const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){try{JSON.parse(match[1]);}catch{errors.push(label+': invalid structured data');}}
}
const pages={};for(const route of routes)pages[route]=await readFile(path.join(root,route,'index.html'),'utf8');
const expected={commercials:['Sainsbury','Hoseasons','Sensodyne','Arla','Paw Patrol','data-film'],corporates:['SAP Litmos','Barts Health','Juralio','Mango','data-film'],audiobooks:['The Dead Children','The Unexpected Miss Bennet','Tracie Podger','Amy Beashel','Bolinda','Chatterbox','The Little Cornish Kitchen'],otherdemos:['audioguide','character','documentary','Sheldon Collins','Spanish','Cockney'],studio:['Lewitt','Scarlett','Beyerdynamic','SessionLink','Valencia','London'],contact:['Squawk Voices','Wehmann Voice','Lori Lins','+34625628893','brief-form']};
for(const [route,terms] of Object.entries(expected))for(const term of terms)if(!pages[route].includes(term))errors.push(`${route}: missing preserved content ${term}`);
const source=await readFile('src/data/site.ts','utf8');const audioFiles=[...source.matchAll(/file:'([^']+\.mp3)'/g)].map(m=>m[1]);assert.equal(audioFiles.length,12);for(const file of audioFiles)assert((await stat(path.join(root,'media',file))).size>1000,file+' empty');
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log(`PASS: ${htmlFiles.length} HTML pages, ${audioFiles.length} audio files, local links/assets, structured data, review indexing and preserved content.`);

