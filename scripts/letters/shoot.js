#!/usr/bin/env node
/* Screenshots of one letter page at each resting phase of its hero: apart, mess, dosed, done.

     node scripts/letters/shoot.js georgia-nut/john/                 1440 x 900, into a temp folder
     node scripts/letters/shoot.js georgia-nut/john/ shots 390 844   a phone, into ./shots

   It serves the repo itself; see browser.js for the browser it drives. */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { serve, launch } = require('./browser');

const [p, out = path.join(os.tmpdir(), 'letters-shots'), W = '1440', H = '900'] = process.argv.slice(2);
if (!p) { console.error('usage: node scripts/letters/shoot.js <company>/<slug>/ [outdir] [width] [height]'); process.exit(1); }
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = await serve();
  const chrome = await launch();
  try {
    const page = await chrome.page(+W, +H, false);
    await page.goto(`http://127.0.0.1:${server.address().port}/${p.replace(/^\//, '')}`, { waitUntil: 'load' });
    await sleep(800);
    const tag = p.replace(/^\/|\/$/g, '').replace(/\//g, '-') + '-' + W;
    const snap = name => page.screenshot({ path: path.join(out, `${tag}-${name}.png`) });
    await snap('1-apart');
    for (const name of ['2-mess', '3-dosed', '4-done']) {
      await page.click('#heroBtn');
      const t0 = Date.now();
      while (Date.now() - t0 < 30000 && await page.evaluate(() => heroBtn.disabled)) await sleep(150);
      await sleep(name === '4-done' ? 1500 : 500);
      await snap(name);
    }
    await page.done();
    console.log('saved', path.join(out, `${tag}-*.png`));
  } finally {
    await chrome.close();
    server.close();
  }
})().catch(e => { console.error(e); process.exit(1); });
