import {withBase} from '../lib/urls';
type Track={id:string;title:string;detail:string;file:string;group:string};
const audio=document.querySelector<HTMLAudioElement>('#voice-audio')!;
const trackList:Track[]=JSON.parse(document.querySelector('#track-data')!.textContent!);
let current:Track|undefined;
const filmCleanups:Array<()=>void>=[];
function stopFilms(){filmCleanups.splice(0).forEach(cleanup=>cleanup());document.querySelectorAll<HTMLVideoElement>('.film-player video').forEach(v=>v.pause());document.querySelectorAll<HTMLElement>('.film-player[data-original]').forEach(container=>{container.innerHTML=container.dataset.original!;delete container.dataset.original;});}
const byId=(id:string)=>document.getElementById(id)!;
const time=(value:number)=>`${Math.floor((value||0)/60)}:${String(Math.floor((value||0)%60)).padStart(2,'0')}`;
function reflect(){
 const playing=!!current&&!audio.paused;
 document.querySelectorAll<HTMLButtonElement>('[data-track]').forEach(button=>{const selected=button.dataset.track===current?.id;button.classList.toggle('is-playing',playing&&selected);button.setAttribute('aria-pressed',String(playing&&selected));const track=trackList.find(t=>t.id===button.dataset.track);button.setAttribute('aria-label',`${playing&&selected?'Pause':'Play'} ${track?.title||'demo'}`);});
 const toggle=byId('player-toggle');toggle.classList.toggle('is-playing',playing);toggle.setAttribute('aria-label',playing?'Pause demo':'Play demo');
 document.body.classList.toggle('player-open',!byId('sticky-player').hidden);
 document.querySelectorAll('[data-reel]').forEach(row=>row.classList.toggle('active-track',(row as HTMLElement).dataset.reel===current?.id));
}
async function playTrack(id:string){
 const track=trackList.find(t=>t.id===id);if(!track)return;
 stopFilms();
 if(current?.id===id&&!audio.paused){audio.pause();return;}
 if(current?.id!==id){audio.pause();current=track;audio.src=withBase('/media/'+track.file);byId('player-title').textContent=track.title;const link=byId('player-download') as HTMLAnchorElement;link.href=audio.src;link.setAttribute('aria-label',`Download ${track.title} MP3`);}
 byId('sticky-player').hidden=false;byId('audio-status').textContent='Loading demo…';reflect();
 try{await audio.play();byId('audio-status').textContent='';}catch{byId('audio-status').textContent='Playback could not start. Try Play again or download the MP3.';}reflect();
}
audio.addEventListener('playing',()=>{byId('audio-status').textContent='';reflect();});
audio.addEventListener('pause',reflect);audio.addEventListener('ended',reflect);
audio.addEventListener('error',()=>{byId('audio-status').textContent='This demo could not load. Please try again or use the download link.';reflect();});
audio.addEventListener('loadedmetadata',()=>{byId('duration').textContent=time(audio.duration);});
audio.addEventListener('timeupdate',()=>{const seek=byId('seek') as HTMLInputElement;byId('elapsed').textContent=time(audio.currentTime);seek.value=String(audio.duration?audio.currentTime/audio.duration*100:0);seek.setAttribute('aria-valuetext',`${time(audio.currentTime)} of ${time(audio.duration)}`);});
document.addEventListener('input',event=>{if((event.target as HTMLElement).id==='seek'&&Number.isFinite(audio.duration))audio.currentTime=Number((event.target as HTMLInputElement).value)/100*audio.duration;});
document.addEventListener('click',event=>{
 const target=event.target as Element;const trackButton=target.closest<HTMLElement>('[data-track]');if(trackButton){void playTrack(trackButton.dataset.track!);return;}
 const button=target.closest('button');if(button?.id==='player-toggle'&&current)void playTrack(current.id);
 if(button?.id==='close-player'){audio.pause();byId('sticky-player').hidden=true;reflect();document.querySelector<HTMLButtonElement>(`[data-track="${current?.id}"]`)?.focus({preventScroll:true});}
 if(button?.id==='next-track'||button?.id==='previous-track'){const index=trackList.findIndex(t=>t.id===current?.id);const next=(index+(button.id==='next-track'?1:-1)+trackList.length)%trackList.length;void playTrack(trackList[next].id);}
 const film=target.closest<HTMLButtonElement>('[data-film]');if(film){void loadFilm(film);}
 if(target.closest('a'))document.querySelectorAll<HTMLDetailsElement>('.mobile-menu[open],.service-menu[open]').forEach(menu=>menu.open=false);
});
document.addEventListener('keydown',event=>{if(event.key==='Escape')document.querySelectorAll<HTMLDetailsElement>('details[open]').forEach(menu=>{menu.open=false;menu.querySelector('summary')?.focus();});});
document.addEventListener('submit',event=>{
 const form=event.target as HTMLFormElement;if(form.id!=='brief-form')return;event.preventDefault();
 if(!form.reportValidity())return;const data=new FormData(form);
 const subject=`${data.get('service')} enquiry — ${data.get('name')}`;
 const body=`Hello Kitty,\n\nI'm ${data.get('name')}.\n\nProject type: ${data.get('service')}\nEmail: ${data.get('email')}\n\n${data.get('brief')}\n\nTimings, usage & territories: ${data.get('timing')||'To discuss'}\n\nThank you!`;
 const href=`mailto:kittykellyvo@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
 location.href=href;
 const status=byId('form-status');status.textContent='Your email app should open with the brief. Review it and send it there. If it doesn’t open, email kittykellyvo@outlook.com directly.';
});
async function loadFilm(button:HTMLButtonElement){
 const container=button.closest<HTMLElement>('.film-player')!,card=button.closest('.film-card')!,status=card.querySelector('.film-status')!;
 const kind=button.dataset.kind!,source=button.dataset.film!,title=button.dataset.title!;
 stopFilms();audio.pause();container.dataset.original=container.innerHTML;status.textContent='Loading video…';
 if(kind==='youtube'){const frame=document.createElement('iframe');frame.src=`https://www.youtube-nocookie.com/embed/${source}?autoplay=1`;frame.title=title;frame.allow='autoplay; encrypted-media; picture-in-picture';frame.allowFullscreen=true;frame.addEventListener('load',()=>status.textContent='');container.replaceChildren(frame);return;}
 const video=document.createElement('video');video.controls=true;video.playsInline=true;video.preload='none';video.setAttribute('aria-label',title);container.replaceChildren(video);
 const fail=()=>{status.textContent='This video could not load. Use “Watch at source” below.';};video.addEventListener('error',fail);video.addEventListener('playing',()=>status.textContent='');
 const start=()=>{if(!video.isConnected)return;void video.play().catch(()=>{status.textContent='Video ready. Press play in the player to begin.';});};

 try{const {default:Hls}=await import('hls.js');if(!video.isConnected)return;if(!Hls.isSupported()){if(video.canPlayType('application/vnd.apple.mpegurl')){video.src=source;start();}else{fail();}return;}const hls=new Hls({maxBufferLength:20,maxMaxBufferLength:30});filmCleanups.push(()=>hls.destroy());hls.attachMedia(video);hls.loadSource(source);hls.on(Hls.Events.MANIFEST_PARSED,start);hls.on(Hls.Events.ERROR,(_,data)=>{if(data.fatal)fail();});}catch{fail();}
}
document.addEventListener('astro:before-swap',stopFilms);
document.addEventListener('astro:page-load',reflect);reflect();

