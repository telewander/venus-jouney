export const SITE_URL = 'https://www.venusjourney.com';

export function originFrom(value = SITE_URL) {
  if (!/^https:\/\//i.test(value)) throw new Error('SITE_URL must be an HTTPS URL.');
  const url = new URL(value);
  if (url.hostname === 'venusjourney.com' || url.hostname === 'www.venusjourney.com') return SITE_URL;
  return url.origin;
}

export function pagePath(route = '/') {
  if (route === '/' || route === '') return '/';
  return `/${String(route).replace(/^\/+|\/+$/g, '')}/`;
}

export function pageUrl(route = '/', origin = SITE_URL) {
  return new URL(pagePath(route), `${originFrom(origin)}/`).href;
}

export function assetUrl(pathname, origin = SITE_URL) {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return new URL(path, `${originFrom(origin)}/`).href;
}
