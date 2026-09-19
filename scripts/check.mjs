import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const files=[];async function walk(dir){for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())await walk(p);else files.push(p)}}await walk('dist');
const htmlFiles=files.filter(x=>x.endsWith('.html'));assert.equal(htmlFiles.length,10);
const titles=new Set();let images=0;
for(const file of htmlFiles){const h=await fs.readFile(file,'utf8');assert.equal((h.match(/<h1(?:\s|>)/g)||[]).length,1,`${file}: exactly one H1`);const title=h.match(/<title>(.*?)<\/title>/)[1];assert(!titles.has(title),`Duplicate title: ${title}`);titles.add(title);assert(!h.includes('<!--app-->'));JSON.parse(h.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);for(const match of h.matchAll(/(?:src|href)="(\/[^"#?]*)"/g)){const url=match[1];if(url==='/'||url==='/en')continue;const target='dist'+url;const present=files.includes(target)||files.includes(target.replace(/\/$/,'')+'/index.html');assert(present,`${file}: missing local asset/link ${url}`);if(url.startsWith('/images/'))images++}assert(h.includes('contactvenusjourney@gmail.com'));assert(h.includes('https://wa.me/34644656260'));}
console.log(`PASS: ${htmlFiles.length} pre-rendered pages, unique titles, H1s, structured data, local links, ${images} image references and contact destinations.`);
