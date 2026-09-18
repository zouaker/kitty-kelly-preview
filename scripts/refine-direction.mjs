import {readFile,writeFile} from 'node:fs/promises';
let css=await readFile('src/styles/global.css','utf8');
css=css.replaceAll('#302330','#173e3b').replaceAll('#f8f7f4','#fbfcf9').replaceAll('#d5ef8e','#cdf2e4').replaceAll('#6c626b','#526c68').replaceAll('#dcd7d9','#d6e4dd').replaceAll('#eeeae6','#edf6f0');
css=css.replace(/font-size:(?:7|8|9|10|11)px/g,'font-size:12px');
css=css.replace(/\.sound-stage[^{}]*\{[^{}]*\}/g,'').replace(/\.sound-fallback[^{}]*\{[^{}]*\}/g,'').replace(/\.stage-toggle[^{}]*\{[^{}]*\}/g,'');
await writeFile('src/styles/global.css',css);
for(const page of ['src/pages/index.astro','src/pages/demos.astro','src/pages/[service].astro']){let text=await readFile(page,'utf8');text=text.replaceAll('import SoundStage from \'../components/SoundStage.astro\';','').replaceAll('<SoundStage/>','').replace('<Layout dark>','<Layout>');await writeFile(page,text);}
