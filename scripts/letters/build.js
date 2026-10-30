#!/usr/bin/env node
/* Builds the one-reader pages: simplegrid.ai/<company>/<first-name>/

     node scripts/letters/build.js           write every page
     node scripts/letters/build.js --check   exit 1 if any page is out of date

   Each company has one template in this folder. readers.json says who gets a
   copy of it, and the copy is the same page with that reader's name baked in:
   in the <title>, the link preview, the headline and the ask. One link per
   person, so each sees their own name, and the preview a link unfurls into is
   theirs too, which a query string could never do.

   A template is a whole page with two kinds of hole in it:
     <!--#include name-->   the file scripts/letters/parts/name, verbatim
     {{key}}                that reader's value, HTML-escaped
     {{key|url}}            percent-encoded, for mailto: links
   Every reader gets slug, first, full, town and where from readers.json,
   plus company (the folder), url (where the page lives) and og (the name of
   its link preview, og-<slug> unless the reader says otherwise). An empty
   slug puts the page at the company's own folder. A company's
   "values" go to all its readers, and a reader's own entry wins: that's how
   one person gets a different P.S.

   scripts/ never ships (see _config.yml), so templates and readers.json stay
   out of the public site. The built pages are what ships: commit them, and
   edit the template, never the built copy, or the next build undoes it. */
'use strict';
const fs = require('fs');
const path = require('path');

const HERE = __dirname;
const ROOT = path.resolve(HERE, '..', '..');
const SITE = 'https://simplegrid.ai';
const check = process.argv.includes('--check');

const readers = JSON.parse(fs.readFileSync(path.join(HERE, 'readers.json'), 'utf8'));
const escape = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Parts can include parts (the stage carries the grid mark), so this recurses.
const expand = (text, depth = 0) => text.replace(/<!--#include ([\w.-]+)-->/g, (_, name) => {
  if (depth > 5) throw new Error(`includes nest too deep at ${name}`);
  return expand(fs.readFileSync(path.join(HERE, 'parts', name), 'utf8').replace(/\n$/, ''), depth + 1);
});

let stale = 0, written = 0;
for (const [company, entry] of Object.entries(readers)) {
  if (company.startsWith('_')) continue;
  const template = expand(fs.readFileSync(path.join(HERE, entry.template), 'utf8'));

  for (const reader of entry.readers) {
    // An empty slug is the company's own page, simplegrid.ai/<company>/ (Legacy's first reader lives there).
    const dir = reader.slug ? `${company}/${reader.slug}/` : `${company}/`;
    const values = { ...entry.values, ...reader, company, url: `${SITE}/${dir}`, og: reader.og || `og-${reader.slug}` };
    const page = template.replace(/\{\{(\w+)(?:\|(\w+))?\}\}/g, (hole, key, filter) => {
      if (!(key in values)) throw new Error(`${entry.template}: ${hole} has no value for ${reader.slug}`);
      if (filter === 'url') return encodeURIComponent(values[key]);
      if (filter) throw new Error(`${entry.template}: unknown filter in ${hole}`);
      return escape(values[key]);
    });

    const out = path.join(ROOT, dir, 'index.html');
    const rel = path.relative(ROOT, out);
    const before = fs.existsSync(out) ? fs.readFileSync(out, 'utf8') : null;
    if (before === page) continue;
    if (check) { console.error(`out of date: ${rel}`); stale++; continue; }
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, page);
    console.log(`wrote ${rel}`);
    written++;
  }
}

if (check && stale) { console.error(`${stale} page(s) differ from their template. Run: node scripts/letters/build.js`); process.exit(1); }
if (!check) console.log(written ? `${written} page(s) written` : 'everything already up to date');
