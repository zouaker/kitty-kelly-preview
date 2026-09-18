import {preview,origin} from '../data/site';
export function GET(){return new Response(preview?'User-agent: *\nDisallow: /\n':`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,{headers:{'Content-Type':'text/plain'}});}
