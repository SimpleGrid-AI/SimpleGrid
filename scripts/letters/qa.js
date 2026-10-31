#!/usr/bin/env node
/* Tests the letter pages in a real browser. Layout at four widths: no sideways scroll, one h1,
   noindex, the ops panel present, no errors and no broken requests. Then the hero's story by button
   alone, in reduced and in full motion: apart, mess, dosed, done, and back with Start over.

     node scripts/letters/qa.js                     every page in readers.json
     node scripts/letters/qa.js georgia-nut,psw     pages whose path contains any of these
     node scripts/letters/qa.js --layout lifeway    layout only: quick, for new readers on a template
                                                    whose story already passes

   Run it after build.js. It serves the repo itself; see browser.js for the browser it drives. */
'use strict';
const fs = require('fs');
const path = require('path');
const { serve, launch } = require('./browser');

const args = process.argv.slice(2);
const layoutOnly = args.includes('--layout');
const only = (args.find(a => !a.startsWith('--')) || '').split(',');
const readers = JSON.parse(fs.readFileSync(path.join(__dirname, 'readers.json'), 'utf8'));
const pages = [];
for (const [company, entry] of Object.entries(readers)) {
  if (company.startsWith('_')) continue;
  for (const reader of entry.readers) pages.push(`${company}/${reader.slug ? reader.slug + '/' : ''}`);
}
const todo = pages.filter(p => only.some(o => p.includes(o)));
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const server = await serve();
  const base = `http://127.0.0.1:${server.address().port}/`;
  const chrome = await launch();
  let bad = 0;
  try {
    for (const [w, h] of [[1440, 900], [820, 1180], [390, 844], [320, 640]]) {
      for (const p of todo) {
        const page = await chrome.page(w, h, false);
        const errs = [];
        page.on('pageerror', e => errs.push(e.message));
        page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
        page.on('response', r => { if (r.status() >= 400 && !r.url().includes('/og-')) errs.push(r.status() + ' ' + r.url()); });
        await page.goto(base + p, { waitUntil: 'load' });
        await sleep(300);
        const r = await page.evaluate(() => ({
          over: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          h1s: document.querySelectorAll('h1').length,
          robots: (document.querySelector('meta[name=robots]') || {}).content,
          ops: !!document.querySelector('.ops')
        }));
        if (r.over > 0 || r.h1s !== 1 || r.robots !== 'noindex, nofollow, noarchive' || !r.ops || errs.length) {
          bad++;
          console.log('LAYOUT', w, p, JSON.stringify(r), errs.slice(0, 3).join(' | '));
        }
        await page.done();
      }
    }
    if (!layoutOnly) {
      for (const reduce of [true, false]) {
        for (const p of todo) {
          const page = await chrome.page(1280, 860, reduce);
          const errs = [];
          page.on('pageerror', e => errs.push(e.message));
          await page.goto(base + p, { waitUntil: 'load' });
          await sleep(300);
          const seen = [];
          const t0 = Date.now();
          while (Date.now() - t0 < 60000) {
            const s = await page.evaluate(() => [heroBtn.disabled, hero.dataset.story]);
            if (s[1] === 'done') break;
            if (s[0]) { await sleep(120); continue; }
            if (seen[seen.length - 1] !== s[1]) seen.push(s[1]);
            await page.click('#heroBtn');
            await sleep(reduce ? 300 : 500);
          }
          await sleep(reduce ? 400 : 1400);
          const end = await page.evaluate(() => [hero.dataset.story, hero.dataset.theme, !heroReset.hidden]);
          await page.click('#heroReset');
          await sleep(reduce ? 300 : 1300);
          const back = await page.evaluate(() => [hero.dataset.story, hero.dataset.theme, heroReset.hidden, !gapTag.hidden, hero.classList.contains('in-mess')]);
          const ok = end[0] === 'done' && end[1] === 'b' && end[2] && back[0] === 'apart' && back[1] === 'a' && back[2] && back[3] && !back[4] &&
                     !errs.length && seen.join() === 'apart,mess,dosed';
          if (!ok) {
            bad++;
            console.log('STORY', reduce ? 'reduced' : 'full', p, 'seen', seen.join('>'), 'end', JSON.stringify(end), 'back', JSON.stringify(back), errs.slice(0, 2).join(' | '));
          }
          await page.done();
        }
      }
    }
  } finally {
    await chrome.close();
    server.close();
  }
  console.log(bad ? `${bad} problem(s) in ${todo.length} pages` : `all ${todo.length} pages clean`);
  process.exitCode = bad ? 1 : 0;
})().catch(e => { console.error(e); process.exit(1); });
