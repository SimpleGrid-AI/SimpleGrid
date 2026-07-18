/* One-time helper: turn the syncs.html cards into links to the new
   /integrations/<slug>.html pages, and drop the old expand-on-click script.
   Run: node scripts/link-syncs.js   (idempotent - safe to re-run) */
'use strict';
const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '..', 'syncs.html');

const SLUG = {
  'QuickBooks':'quickbooks','Xero':'xero','Tally':'tally','Zoho Books':'zoho-books','Bill.com':'bill-com',
  'Excel':'excel','Google Sheets':'google-sheets','Shopify':'shopify','WooCommerce':'woocommerce',
  'Amazon':'amazon','TikTok Shop':'tiktok-shop','Stripe':'stripe','Gmail':'gmail','Outlook':'outlook',
  'WhatsApp':'whatsapp','Slack':'slack','Mailchimp':'mailchimp','Klaviyo':'klaviyo','Braze':'braze',
  'ShipStation':'shipstation','PostgreSQL':'postgresql','SFTP':'sftp',
};

let html = fs.readFileSync(FILE, 'utf8');

const cardRe = /<div class="sync-card">\s*\n(\s*<span class="sync-logo">[\s\S]*?<\/span>)\s*\n(\s*<div><p class="sync-name">([^<]+)<\/p>[\s\S]*?<\/div>)\s*\n\s*<\/div>/g;
let count = 0, missing = [];
html = html.replace(cardRe, function (m, logo, body, name) {
  const slug = SLUG[name.trim()];
  if (!slug) { missing.push(name.trim()); return m; }
  count++;
  return '<a class="sync-card" href="integrations/' + slug + '.html" aria-label="' + name.trim() +
    ' integration">\n' + logo + '\n' + body + '\n          <span class="sync-go" aria-hidden="true">&rarr;</span>\n        </a>';
});

// remove the old expand-detail script block (keeps the category-jump script)
html = html.replace(/\s*<!-- Make each software card expand to show its integration detail\. -->\s*\n\s*<script>[\s\S]*?<\/script>/, '');

fs.writeFileSync(FILE, html);
console.log('Linked ' + count + ' sync cards to integration pages.');
if (missing.length) console.log('NO SLUG for: ' + missing.join(', '));
