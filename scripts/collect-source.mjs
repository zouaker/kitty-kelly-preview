import { mkdir, writeFile } from 'node:fs/promises';
const pages=['','commercials','corporates','audiobooks','otherdemos','studio','contact'];
await mkdir('research/raw',{recursive:true});
for(const page of pages){
 const url='https://www.kittykelly.co.uk/'+page;
 const response=await fetch(url);
 if(!response.ok)throw new Error(`${url}: ${response.status}`);
 const html=await response.text();
 await writeFile(`research/raw/${page||'home'}.html`,html);
 const links=[...html.matchAll(/href="([^"]+)"/g)].map(m=>m[1].replaceAll('&amp;','&')).filter(u=>/\.mp3|\.wav|spotlight|audible/.test(u));
 const images=[...html.matchAll(/data-src="([^"]+)"/g)].map(m=>m[1].replaceAll('&amp;','&'));
 const videos=[...html.matchAll(/(?:src|data-html|data-config)="([^"]+)"/g)].map(m=>m[1]).filter(u=>/youtube|vimeo|mp4/.test(u));
 await writeFile(`research/raw/${page||'home'}.json`,JSON.stringify({url,links:[...new Set(links)],images:[...new Set(images)],videos},null,2));
 console.log(page||'home',JSON.stringify({links:[...new Set(links)],images:[...new Set(images)]}));
}
