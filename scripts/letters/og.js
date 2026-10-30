#!/usr/bin/env node
/* Draws the link preview for every built letter page: <company>/og-<slug>.jpg,
   1200 x 630, the page's own hero with the reader's name on it, so a link
   unfurls into what they'll see when they open it.

     node scripts/letters/og.js            every reader in readers.json
     node scripts/letters/og.js doumak     one company

   Run it after build.js. It serves the repo itself on a spare local port and
   drives Chrome with puppeteer (a devDependency here), or with playwright if
   that's what's installed. Set CHROME_PATH to use a particular browser. */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');

const ROOT = path.resolve(__dirname, '..', '..');
const readers = JSON.parse(fs.readFileSync(path.join(__dirname, 'readers.json'), 'utf8'));
const only = process.argv[2];

// The card is the hero exactly as the reader first sees it, like legacy-foods/og-jar.jpg. Only motion is stopped.
const CARD_CSS = `
  .hero-caption{visibility:hidden}
  *,*::before,*::after{animation:none!important;transition:none!important}
`;

function serve() {
  const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2' };
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      let file = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
      if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
      if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
      if (!fs.existsSync(file)) { res.writeHead(404); return res.end(); }
      res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

async function browser() {
  const executablePath = process.env.CHROME_PATH || undefined;
  try {
    const puppeteer = require('puppeteer');
    const b = await puppeteer.launch({ executablePath, args: ['--no-sandbox'] });
    return { close: () => b.close(), page: async () => { const p = await b.newPage(); await p.setViewport({ width: 1200, height: 630 }); return p; } };
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') throw e;
    const { chromium } = require('playwright');
    const b = await chromium.launch({ executablePath });
    const ctx = await b.newContext({ viewport: { width: 1200, height: 630 }, reducedMotion: 'reduce' });
    return { close: () => b.close(), page: () => ctx.newPage() };
  }
}

(async () => {
  const server = await serve();
  const base = `http://127.0.0.1:${server.address().port}`;
  const chrome = await browser();
  try {
    for (const [company, entry] of Object.entries(readers)) {
      if (company.startsWith('_') || (only && company !== only)) continue;
      for (const reader of entry.readers) {
        const page = await chrome.page();
        await page.goto(`${base}/${company}/${reader.slug}/`, { waitUntil: 'load' });
        await page.addStyleTag({ content: CARD_CSS });
        await page.evaluate(() => document.fonts.ready);
        await new Promise(r => setTimeout(r, 400));
        const out = path.join(ROOT, company, `og-${reader.slug}.jpg`);
        await page.screenshot({ path: out, type: 'jpeg', quality: 84, clip: { x: 0, y: 0, width: 1200, height: 630 } });
        await page.close();
        console.log(`wrote ${path.relative(ROOT, out)}`);
      }
    }
  } finally {
    await chrome.close();
    server.close();
  }
})().catch(e => { console.error(e); process.exit(1); });
