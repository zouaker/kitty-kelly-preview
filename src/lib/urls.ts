/** Local routes and public assets work at a domain root or a Pages project path. */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const release = import.meta.env.PUBLIC_RELEASE_ID || 'structure-20260929';
export function withBase(url: string): string {
 if (!url || !url.startsWith('/') || url.startsWith('//')) return url;
 if (base && (url === base || url.startsWith(base + '/'))) return url;
 const [, pathname, suffix] = url.match(/^([^?#]*)(.*)$/s)!;
 const route = !pathname.endsWith('/') && !pathname.split('/').pop()!.includes('.') ? pathname + '/' : pathname;
 // Version HTML navigation on the review site as well as its entry URL. GitHub
 // Pages can otherwise restore an older cached document during client routing.
 if (route.endsWith('/') && import.meta.env.PUBLIC_INDEXABLE !== 'true') {
  const [query, hash] = suffix.split('#');
  const params = new URLSearchParams(query.replace(/^\?/, ''));
  params.set('v', release);
  return base + route + '?' + params + (hash === undefined ? '' : '#' + hash);
 }
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


