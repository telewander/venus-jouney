import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {SITE_URL, pageUrl} from '../src/site.js';

const files=[];
async function walk(dir){
  for(const e of await fs.readdir(dir,{withFileTypes:true})){
    const p=path.join(dir,e.name);
    if(e.isDirectory())await walk(p);
    else files.push(p.replaceAll('\\','/'));
  }
}
await walk('dist');

const htmlFiles=files.filter(x=>x.endsWith('.html'));
assert.equal(htmlFiles.length,10);
const titles=new Set();
let images=0;
const forbiddenHosts=/localhost|127\.0\.0\.1|amplifyapp\.com|tilda\.ws/i;

for(const file of htmlFiles){
  const h=await fs.readFile(file,'utf8');
  assert.equal((h.match(/<h1(?:\s|>)/g)||[]).length,1,`${file}: exactly one H1`);
  const title=h.match(/<title>(.*?)<\/title>/)[1];
  assert(!titles.has(title),`Duplicate title: ${title}`);
  titles.add(title);
  assert(!h.includes('<!--app-->'));
  const data=JSON.parse(h.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  const is404=file.endsWith('404.html');
  const route=is404?'/404':file==='dist/index.html'?'/':'/'+file.replace(/^dist\//,'').replace(/\/index\.html$/,'');
  const canonical=h.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const ogUrl=h.match(/<meta property="og:url" content="([^"]+)"/)?.[1];
  const ogImage=h.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
  const expected=is404?pageUrl('/'):pageUrl(route);
  assert.equal(canonical,expected,`${file}: canonical`);
  assert.equal(ogUrl,expected,`${file}: og:url`);
  assert.match(ogImage,/^https:\/\/www\.venusjourney\.com\/images\//,`${file}: og:image`);
  assert.equal(data.url,pageUrl('/'),`${file}: JSON-LD url`);
  assert.match(data.image,/^https:\/\/www\.venusjourney\.com\//);
  assert.equal(data.logo,`${SITE_URL}/images/logo.png`);
  const robots=h.match(/<meta name="robots" content="([^"]+)"/)[1];
  if(is404)assert.match(robots,/^noindex/);
  else assert.match(robots,/^index,follow/);
  if(route==='/'||route==='/en'){
    assert(h.includes(`hreflang="es" href="${pageUrl('/')}"`));
    assert(h.includes(`hreflang="en" href="${pageUrl('/en')}"`));
    assert(h.includes(`hreflang="x-default" href="${pageUrl('/')}"`));
  }else{
    assert(!h.includes('hreflang="en" href="https://www.venusjourney.com/en/family'),`${file}: invented English alternate`);
  }
  for(const match of h.matchAll(/(?:src|href)="(\/[^"#?]*)"/g)){
    const url=match[1];
    if(url==='/'||url==='/en')continue;
    const target='dist'+url;
    const present=files.includes(target)||files.includes(target.replace(/\/$/,'')+'/index.html');
    assert(present,`${file}: missing local asset/link ${url}`);
    if(url.startsWith('/images/'))images++;
  }
  assert(h.includes('contactvenusjourney@gmail.com'));
  assert(h.includes('https://wa.me/34644656260'));
}

const sitemap=await fs.readFile('dist/sitemap.xml','utf8');
assert.match(sitemap,/^<\?xml version="1\.0" encoding="UTF-8"\?>/);
assert(sitemap.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'));
assert(sitemap.trim().endsWith('</urlset>'));
const rawLocs=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
assert.equal(rawLocs.length,9,'sitemap should list all public pages');
assert.equal(new Set(rawLocs).size,rawLocs.length,'sitemap contains duplicate loc values');
for(const loc of rawLocs){
  assert.equal(loc.startsWith('/'),false,`relative loc is invalid: ${loc}`);
  assert.match(loc,/^https:\/\/www\.venusjourney\.com\//,`loc must use ${SITE_URL}: ${loc}`);
  assert(!loc.includes('#'),`fragment in loc: ${loc}`);
  assert(!loc.includes('?'),`query in loc: ${loc}`);
  assert(!loc.includes('http://'),`http loc: ${loc}`);
  assert(!forbiddenHosts.test(loc),`disallowed host in loc: ${loc}`);
  const url=new URL(loc);
  assert.equal(url.protocol,'https:');
  assert.equal(url.hostname,'www.venusjourney.com');
  assert(!url.pathname.includes('//'),`double slash in loc: ${loc}`);
}
const locs=rawLocs.map(l=>new URL(l).pathname);
const expectedPaths=['/','/en/','/fotografia-familiar/','/fotografia-embarazo/','/fotografia-recien-nacido/','/video-familiar-bautizo/','/olgayadelina/','/javieraysergio/','/garaziaitoramets/'];
assert.deepEqual([...locs].sort(),[...expectedPaths].sort());
assert(!rawLocs.some(l=>l.includes('/404')),'sitemap must not include the 404 page');

const robots=await fs.readFile('dist/robots.txt','utf8');
assert.equal(robots.replaceAll('\r\n','\n'),`User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log(`PASS: ${htmlFiles.length} pre-rendered pages, 9 absolute www sitemap URLs, unique titles, H1s, structured data, local links, ${images} image references and contact destinations.`);
