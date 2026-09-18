/** Local routes and public assets work at a domain root or a Pages project path. */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export function withBase(url: string): string {
 if (!url || !url.startsWith('/') || url.startsWith('//')) return url;
 if (base && (url === base || url.startsWith(base + '/'))) return url;
 const [, pathname, suffix] = url.match(/^([^?#]*)(.*)$/s)!;
 const route = !pathname.endsWith('/') && !pathname.split('/').pop()!.includes('.') ? pathname + '/' : pathname;
 return base + route + suffix;
}
export function withBaseSrcset(srcset: string): string {
 return srcset.split(',').map(candidate => {
  const [url, ...descriptor] = candidate.trim().split(/\s+/);
  return [withBase(url), ...descriptor].join(' ');
 }).join(', ');
}
export function routePath(pathname: string): string {
 return (base && pathname.startsWith(base + '/') ? pathname.slice(base.length) : pathname).replace(/\/$/, '') || '/';
}


