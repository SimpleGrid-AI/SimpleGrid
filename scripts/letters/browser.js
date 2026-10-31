/* A static server for the repo and a browser to drive, shared by qa.js and shoot.js.
   Uses playwright if it's installed, otherwise puppeteer (a devDependency here: npm i).
   Set CHROME_PATH to drive a particular browser, e.g. the system Chrome on a Mac. */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');

const ROOT = path.resolve(__dirname, '..', '..');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2' };

function serve() {
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      let file = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
      if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
      if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
      if (!fs.existsSync(file)) { res.writeHead(404); return res.end(); }
      res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

// page(width, height, reduce) opens a fresh page at that size, with reduced motion on or off; page.done() closes it.
async function launch() {
  const executablePath = process.env.CHROME_PATH || undefined;
  try {
    const { chromium } = require('playwright');
    const b = await chromium.launch({ executablePath });
    return {
      close: () => b.close(),
      async page(width, height, reduce) {
        const ctx = await b.newContext({ viewport: { width, height }, reducedMotion: reduce ? 'reduce' : 'no-preference' });
        const p = await ctx.newPage();
        p.done = () => ctx.close();
        return p;
      }
    };
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') throw e;
    const puppeteer = require('puppeteer');
    const b = await puppeteer.launch({ executablePath, args: ['--no-sandbox'] });
    return {
      close: () => b.close(),
      async page(width, height, reduce) {
        const p = await b.newPage();
        await p.setViewport({ width, height });
        await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: reduce ? 'reduce' : 'no-preference' }]);
        p.done = () => p.close();
        return p;
      }
    };
  }
}

module.exports = { ROOT, serve, launch };
