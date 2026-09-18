import inventory from '../../research/portfolio-inventory.json';
import videoSources from '../../research/videos.json';
const names={
 commercials:["Sainsbury’s","Slimming World","Comfort","Sensodyne","Southern","Boots","Made in Chelsea","Wella","The Guardian","Discover Dogs — The Kennel Club","Arla","Lucozade","Creand","Garnier","ARU Peterborough","Bacardi","Crohn’s & Colitis UK","Sweaty Betty","Jersey Dairy","Hoseasons"],
 corporates:['SAP Litmos','Big','mfl direct','Probation Institute','Essex+ Reward Scheme','KAUST','Squarebook','Ferrer','Barts Health NHS Trust','CGG','Wrike','Prader-Willi Syndrome Association UK','National Energy Action','Juralio'],
 audiobooks:['Dreamscape Publishing','Chatterbox','Tantor Media','Brilliance Audio','Ascent Audio','Bee Audio','Recorded Books','Bolinda Audio','White House Sound','Offbeat','HighBridge Audio','Booktrack','The Audio Café','Ulverscroft Group','ID Audio'],
};
export const clients={commercials:names.commercials.map((name,i)=>({name,image:inventory.commercials[i].file})),corporates:names.corporates.map((name,i)=>({name,image:inventory.corporates[i].file})),audiobooks:names.audiobooks.map((name,i)=>({name,image:inventory.audiobooks[i+12].file}))};
export const books=[
 ['The Little Cornish Kitchen','Jane Linfoot'],['The Unexpected Miss Bennet','Patrice Sarath'],['The Island We Left Behind','Kate Hewitt'],["The World’s Greatest Detective",'Caroline Carlson'],['Do Her No Harm','Naomi Joy'],['Letters to Lincoln','Tracie Podger'],['A Wartime Secret','Helen Yendall'],['A Virtual Affair','Tracie Podger'],['Mastering Communication at Work','Ethan F. Becker & Jon Wortmann'],['Dead Flowers','Nicola Monaghan'],["The Beekeeper’s War",'Deborah Carr'],['The Friendship Fairies Go to School','Lucy Kennedy']
].map(([title,author],i)=>({title,author,image:inventory.audiobooks[i].file}));
export const agents=[{name:'Squawk Voices',image:inventory.contact[0].file},{name:'Wehmann Voice',image:inventory.contact[1].file},{name:'Lori Lins Ltd',image:inventory.contact[2].file}];
const titles=['Clairol Nice’n Easy · Blonde','Clairol Nice’n Easy · Collection','Clairol Nice’n Easy · Brunette','Arla Lacto Free','Sensodyne · Made in Chelsea','Lucozade Alert'];
export const videos=videoSources.map((v,i)=>({...v,title:'title' in v?v.title:titles[i],fallback:'kind' in v&&v.kind==='youtube'?`https://www.youtube.com/watch?v=${'id' in v?v.id:''}`:`https://www.kittykelly.co.uk/${v.page==='home'?'':v.page}`}));
export const accents=['London Estuary','Soft RP','RP','Cockney','Essex','Yorkshire','Soft Northern','Scottish','West Country','Lancashire','Geordie','Liverpool','Heightened RP','Standard American','New York','Southern States','Australian','Eastern European','Southern Irish','Italian','French'];
export const genres=['Romantic comedy','Romance','Historical fiction','Drama','Erotica','Suspense','Psychological thriller','Horror','Murder mystery','Young adult','Children’s books','Non-fiction'];
