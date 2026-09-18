import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const desktopPointer = window.matchMedia('(min-width: 851px) and (pointer: fine)');
let smooth: Lenis | undefined;
let revealObserver: IntersectionObserver | undefined;
let chapterObserver: IntersectionObserver | undefined;
let frame = 0;

function updateProgress() {
 const distance = document.documentElement.scrollHeight - window.innerHeight;
 const progress = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
 document.querySelector<HTMLElement>('.reading-progress')?.style.setProperty('transform', `scaleX(${progress})`);
 frame = 0;
}
function onScroll() { if (!frame) frame = requestAnimationFrame(updateProgress); }
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll, { passive: true });

function cleanup() {
 smooth?.destroy(); smooth = undefined;
 revealObserver?.disconnect(); chapterObserver?.disconnect();
 document.querySelectorAll('.motion-pending').forEach(el => el.classList.remove('motion-pending'));
}
function setupMotion() {
 cleanup();
 if (!reduceMotion.matches && desktopPointer.matches) {
  smooth = new Lenis({ autoRaf: true, duration: .9, smoothWheel: true, syncTouch: false, anchors: true, prevent: node => ['TEXTAREA','SELECT'].includes(node.tagName) });
 }
 if (!reduceMotion.matches && 'IntersectionObserver' in window) {
  revealObserver = new IntersectionObserver(entries => {
   entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver?.unobserve(entry.target); } });
  }, { threshold: .08, rootMargin: '0px 0px -35px 0px' });
  const items = document.querySelectorAll<HTMLElement>('.section-heading, .section-intro, .reel-row, .featured-commercial, .feature-book, .work-notes>a, .about-side, .about-photo, .testimonial-grid>figure, .home-studio>*, .recognition>a, .film-grid>.film-card, .book-grid>figure, .destination-grid>*, .studio-grid>*, .contact-grid>*');
  items.forEach((item,index) => {
   // Keep above-fold content and focus targets visible on first render.
   if (item.getBoundingClientRect().top < window.innerHeight - 30) return;
   item.style.setProperty('--reveal-delay', `${Math.min(index % 3 * 55,110)}ms`);
   item.classList.add('motion-pending');
   revealObserver?.observe(item);
  });
 }
 chapterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (!entry.isIntersecting) return;
   document.querySelectorAll<HTMLAnchorElement>('.chapter-nav a[href^="#"]').forEach(link => {
    const active = link.hash === '#'+entry.target.id;
    link.classList.toggle('is-current',active);
    if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
   });
  });
 }, { rootMargin:'-15% 0px -60% 0px', threshold:0 });
 document.querySelectorAll('#demos,#work,#about,#studio').forEach(section => chapterObserver?.observe(section));
 updateProgress();
}
document.addEventListener('focusin', event => { const element = event.target as Element; element.closest('.motion-pending')?.classList.add('is-visible'); });
document.addEventListener('astro:before-swap', cleanup);
document.addEventListener('astro:page-load', setupMotion);
reduceMotion.addEventListener('change', setupMotion);
desktopPointer.addEventListener('change', setupMotion);
setupMotion();


