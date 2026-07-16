/* ============================================================================
   One-time authoring helper (NOT a live-site build step).

   Generates the per-integration landing pages under /integrations/ plus the
   shared /integrations.css, from the data table below. Run locally with:

       node scripts/gen-integrations.js

   The OUTPUT is plain static HTML/CSS — exactly what you'd hand-write — so the
   deployed site still has no build step. Re-run this whenever you want to
   restyle or re-copy all integration pages at once. Safe to ignore otherwise.
   ========================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'integrations');

// --- logos: copied verbatim from syncs.html so the brand marks match --------
const LOGOS = {
  'quickbooks': `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#2CA01C"/><path d="M10.2 7.4a4.6 4.6 0 1 0 0 9.2" fill="none" stroke="#fff" stroke-width="1.7"/><line x1="10.2" y1="6.2" x2="10.2" y2="19.2" stroke="#fff" stroke-width="1.7" stroke-linecap="round"/><path d="M13.8 16.6a4.6 4.6 0 1 0 0-9.2" fill="none" stroke="#fff" stroke-width="1.7"/><line x1="13.8" y1="17.8" x2="13.8" y2="4.8" stroke="#fff" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  'xero': `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#13B5EA"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="13">X</text></svg>`,
  'tally': `<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="6" fill="#263238"/><text x="20" y="26" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="16">T</text></svg>`,
  'zoho-books': `<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="6" fill="#D0312D"/><text x="20" y="26" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="12">ZOHO</text></svg>`,
  'bill-com': `<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#006FFF"/><text x="12" y="15" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="9">BILL</text></svg>`,
  'excel': `<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#107C41"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="11">XL</text></svg>`,
  'google-sheets': `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" fill="#0F9D58"/><path d="M14 2v6h6" fill="#0B7B47"/><rect x="7" y="11" width="10" height="8" rx="1" fill="#fff"/><line x1="7" y1="14" x2="17" y2="14" stroke="#0F9D58" stroke-width="0.8"/><line x1="7" y1="17" x2="17" y2="17" stroke="#0F9D58" stroke-width="0.8"/><line x1="10.5" y1="11" x2="10.5" y2="19" stroke="#0F9D58" stroke-width="0.8"/><line x1="14" y1="11" x2="14" y2="19" stroke="#0F9D58" stroke-width="0.8"/></svg>`,
  'shopify': `<svg viewBox="-7.5 0 124.5 124.5" aria-hidden="true"><path fill="#95BF47" d="M95.9 23.9c-.1-.6-.6-1-1.1-1-.5 0-9.3-.2-9.3-.2s-7.4-7.2-8.1-7.9c-.7-.7-2.2-.5-2.7-.3 0 0-1.4.4-3.7 1.1-.4-1.3-1-2.8-1.8-4.4-2.6-5-6.5-7.7-11.1-7.7-.3 0-.6 0-1 .1-.1-.2-.3-.3-.4-.5C53.7 1.5 51.1.4 48 .5c-6 .2-12 4.5-16.8 12.2-3.4 5.4-6 12.2-6.7 17.5-6.9 2.1-11.7 3.6-11.8 3.7-3.5 1.1-3.6 1.2-4 4.5C8.3 40.9 0 105.6 0 105.6l69.4 12 30.1-7.5S96 24.5 95.9 23.9zM68.2 17.1c-1.7.5-3.7 1.1-5.8 1.8 0-3-.4-7.2-1.8-10.8 4.5.8 6.7 5.9 7.6 9zm-9.7 3c-3.9 1.2-8.2 2.5-12.5 3.8 1.2-4.6 3.5-9.2 6.3-12.2 1-1.1 2.5-2.3 4.2-3 1.7 3.5 2.1 8.4 2 11.4zM48.2 4.5c1.4 0 2.6.3 3.6.9-1.6.8-3.2 2.1-4.7 3.7-3.7 4-6.5 10.2-7.7 16.2-3.6 1.1-7.1 2.2-10.3 3.2C31.4 19.3 39.2 4.8 48.2 4.5z"/><path fill="#5E8E3E" d="M94.8 22.9c-.5 0-9.3-.2-9.3-.2s-7.4-7.2-8.1-7.9c-.3-.3-.6-.4-1-.5l-5.2 106.3 30.1-7.5S96 24.5 95.9 23.9c-.1-.6-.6-1-1.1-1z"/><path fill="#fff" d="M58.4 38.4l-3.5 13.1s-3.9-1.8-8.5-1.5c-6.8.4-6.8 4.7-6.8 5.7.4 5.7 15.4 7 16.3 20.4.7 10.5-5.6 17.7-14.6 18.3-10.9.6-16.9-5.8-16.9-5.8l2.3-9.8s6 4.6 10.9 4.3c3.2-.2 4.3-2.8 4.2-4.6-.5-7.5-12.7-7.1-13.5-19.4-.7-10.3 6.1-20.7 21-21.6 5.8-.4 8.8 1.1 8.8 1.1z"/></svg>`,
  'woocommerce': `<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#7F54B3"/><text x="12" y="15" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="9">WC</text></svg>`,
  'amazon': `<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#fff"/><text x="12" y="13" text-anchor="middle" fill="#232F3E" font-family="Arial, sans-serif" font-weight="700" font-size="6.2" letter-spacing="-0.4">amazon</text><path d="M5 16.4c4.2 2.8 9.8 2.8 14 .2" fill="none" stroke="#FF9900" stroke-width="1.7" stroke-linecap="round"/><path d="M19 16.6l-2.7-.5 1.4 2.4z" fill="#FF9900"/></svg>`,
  'tiktok-shop': `<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#000"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="11">TT</text></svg>`,
  'stripe': `<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#635BFF"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="13">S</text></svg>`,
  'gmail': `<svg viewBox="0 -31.5 256 256" aria-hidden="true"><path fill="#4285F4" d="M58.18 192.05V93.14L27.5 65.08 0 49.5v125.1c0 9.66 7.83 17.45 17.45 17.45z"/><path fill="#34A853" d="M197.82 192.05h40.73c9.66 0 17.45-7.83 17.45-17.45V49.5l-31.16 17.84-27.02 25.8z"/><path fill="#FBBC04" d="M197.82 17.5v75.64L256 49.5V26.23c0-21.58-24.64-33.89-41.89-20.94z"/><path fill="#C5221F" d="M0 49.5l58.18 43.64V17.5L41.89 5.29C24.61-7.66 0 4.65 0 26.23z"/><path fill="#EA4335" d="M58.18 93.14L128 145.5l69.82-52.36v-75.64L128 69.87 58.18 17.5z"/></svg>`,
  'outlook': `<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#0078D4"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="13">O</text></svg>`,
  'whatsapp': `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#25D366" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/></svg>`,
  'slack': `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4A154B" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>`,
  'mailchimp': `<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#FFE01B"/><text x="12" y="16" text-anchor="middle" fill="#241C15" font-family="sans-serif" font-weight="700" font-size="13">M</text></svg>`,
  'klaviyo': `<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#000"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="13">K</text></svg>`,
  'braze': `<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#FE5832"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="13">B</text></svg>`,
  'shipstation': `<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#0099FF"/><path d="M6 9 L12 6.5 L18 9 L18 15.5 L12 18 L6 15.5 Z" fill="none" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/><line x1="6" y1="9" x2="12" y2="11.5" stroke="#fff" stroke-width="1.4"/><line x1="18" y1="9" x2="12" y2="11.5" stroke="#fff" stroke-width="1.4"/><line x1="12" y1="11.5" x2="12" y2="18" stroke="#fff" stroke-width="1.4"/></svg>`,
  'postgresql': `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#336791"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="10">Pg</text></svg>`,
  'sftp': `<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#4A5568"/><text x="12" y="15" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="9">SFTP</text></svg>`,
};

// --- the integration catalog -------------------------------------------------
const CATS = {
  accounting:   'Accounting & books',
  spreadsheets: 'Spreadsheets',
  commerce:     'Sales & e-commerce',
  messaging:    'Messaging & marketing',
  shipping:     'Shipping & logistics',
  data:         'Data & files',
};

const ITEMS = [
  { slug:'quickbooks', name:'QuickBooks', cat:'accounting', accent:'#2CA01C',
    lead:"Your books stay in QuickBooks. SimpleGrid is the operations layer that feeds them - invoices, bills and journal entries post as work clears the floor, with no double entry.",
    flowsIn:["Customers, vendors and items matched to your existing chart of accounts","Opening balances and tax codes read in once during setup"],
    flowsBack:["Invoices, bills and journal entries posted as work clears the floor","Books kept current with no re-keying at month-end"],
    detail:"Invoices, bills, and journal entries post to QuickBooks as work clears the floor, so the books stay current without anyone re-keying. Customers, vendors, and items are matched to your existing chart of accounts to avoid duplicates." },
  { slug:'xero', name:'Xero', cat:'accounting', accent:'#13B5EA',
    lead:"Invoices, payments and your chart of accounts stay mirrored with Xero, so finance never re-keys a number.",
    flowsIn:["Existing Xero contacts and items matched to floor records","Chart of accounts and tax rates read in once"],
    flowsBack:["Invoices and payments posted automatically","Records reconciled before finance ever opens them"],
    detail:"Invoices, payments, and your chart of accounts stay mirrored with Xero, and records created on the floor are matched to existing Xero contacts and items. Finance works from numbers that are already reconciled." },
  { slug:'tally', name:'Tally', cat:'accounting', accent:'#263238',
    lead:"Export vouchers and ledgers to Tally and reconcile production costs against your books - your accountant keeps working in Tally exactly as they do today.",
    flowsIn:["Ledger heads and cost centres mapped during setup","Masters aligned so nothing duplicates"],
    flowsBack:["Vouchers and ledgers exported on your schedule","Production costs mapped to the right ledger heads"],
    detail:"Vouchers and ledgers export into Tally and production costs map against the right ledger heads. Your accountant keeps working in Tally exactly as they do today." },
  { slug:'zoho-books', name:'Zoho Books', cat:'accounting', accent:'#D0312D',
    lead:"A two-way sync keeps invoices, bills and customer / vendor records aligned with Zoho Books, with payment status flowing back to the floor.",
    flowsIn:["Customer and vendor records kept aligned both ways","Payment status pulled back so the floor sees the real money position"],
    flowsBack:["Invoices and bills created from floor activity","Records matched to existing Zoho Books entries"],
    detail:"A two-way sync keeps invoices, bills, and customer and vendor records aligned with Zoho Books. Payment status flows back so the floor sees the real money position." },
  { slug:'bill-com', name:'Bill.com', cat:'accounting', accent:'#006FFF',
    lead:"Send approved payables to Bill.com for payment and pull status back automatically - the approvals you set in SimpleGrid carry through, so nothing pays without sign-off.",
    flowsIn:["Payment status synced back to each payable","Paid, pending and failed states visible on the floor"],
    flowsBack:["Approved payables pushed for payment","Your SimpleGrid approval chain enforced before anything pays"],
    detail:"Approved payables flow into Bill.com for payment and the payment status syncs back automatically. The approvals you set in SimpleGrid carry through, so nothing pays without sign-off." },
  { slug:'excel', name:'Excel', cat:'spreadsheets', accent:'#107C41',
    lead:"Bring BOMs, item masters and orders in from any Excel layout - we map your columns once during setup - and export any view back out on demand.",
    flowsIn:["BOMs, item masters and orders imported from any layout","Your columns mapped once, then reused"],
    flowsBack:["Any SimpleGrid view exported to Excel on demand","Formatted for the reports your team already uses"],
    detail:"Bring BOMs, item masters, and orders in from any Excel layout; we map your columns once during setup. Any SimpleGrid view exports back to Excel on demand." },
  { slug:'google-sheets', name:'Google Sheets', cat:'spreadsheets', accent:'#0F9D58',
    lead:"A live two-way link with Sheets: edits update SimpleGrid, and SimpleGrid pushes reports into a sheet that refreshes on its own. No add-ons, no copy-paste.",
    flowsIn:["Edits in Sheets update SimpleGrid live","No add-ons to install"],
    flowsBack:["Reports pushed into a sheet that refreshes itself","Always-current data for the views your team builds"],
    detail:"A live two-way link: edits in Sheets update SimpleGrid, and SimpleGrid pushes reports into a sheet that refreshes on its own. No add-ons and no copy-paste." },
  { slug:'shopify', name:'Shopify', cat:'commerce', accent:'#95BF47',
    lead:"Orders and SKUs pull in from Shopify the moment they're placed, and inventory and fulfillment status push back. Multiple stores roll into one floor view.",
    flowsIn:["Orders and SKUs imported as they're placed","Multiple stores rolled into one pipeline"],
    flowsBack:["Inventory and fulfillment status pushed back","Stock kept honest across every channel"],
    detail:"Orders and SKUs pull in from Shopify the moment they are placed, and inventory and fulfillment status push back. Multiple stores roll into one floor view." },
  { slug:'woocommerce', name:'WooCommerce', cat:'commerce', accent:'#7F54B3',
    lead:"WooCommerce orders and stock levels stay in sync with the floor in real time, and fulfillment and tracking flow back to each order automatically.",
    flowsIn:["Orders imported in real time","Stock levels reconciled against the floor"],
    flowsBack:["Fulfillment and tracking written back to each order","Inventory kept accurate automatically"],
    detail:"WooCommerce orders and stock levels stay in sync with the floor in real time. Fulfillment and tracking flow back to each order automatically." },
  { slug:'amazon', name:'Amazon', cat:'commerce', accent:'#FF9900',
    lead:"Orders import from Amazon and available-to-sell quantities stay accurate across channels, so you never oversell.",
    flowsIn:["Orders imported into the same pipeline as every channel","Available-to-sell kept accurate"],
    flowsBack:["Inventory updated to prevent overselling","Fulfillment status reflected back"],
    detail:"Orders import from Amazon and available-to-sell quantities stay accurate across channels so you do not oversell. They land in the same pipeline as every other channel." },
  { slug:'tiktok-shop', name:'TikTok Shop', cat:'commerce', accent:'#111111',
    lead:"TikTok Shop orders drop into the same pipeline as every other channel, with inventory kept honest against your total stock.",
    flowsIn:["Orders pulled into one unified pipeline","Inventory checked against total stock"],
    flowsBack:["Fulfillment status synced back to the platform","Stock kept honest across channels"],
    detail:"TikTok Shop orders drop into the same pipeline as every other channel, with inventory kept honest against your total stock. Fulfillment status syncs back to the platform." },
  { slug:'stripe', name:'Stripe', cat:'commerce', accent:'#635BFF',
    lead:"Stripe payments match to the right sales order and invoice automatically, so applied cash is never a guess.",
    flowsIn:["Payments matched to the right order and invoice","Applied cash reconciled automatically"],
    flowsBack:["Refunds and failed payments flow back to the order","Payment state visible on every order"],
    detail:"Stripe payments match to the right sales order and invoice automatically, so applied cash is never a guess. Refunds and failed payments flow back to the order record." },
  { slug:'gmail', name:'Gmail', cat:'messaging', accent:'#EA4335',
    lead:"Turn inbound emails into orders and actions, and send confirmations from your own inbox.",
    flowsIn:["Inbound emails turned into orders or actions","Attached order documents read in during setup"],
    flowsBack:["Confirmations sent from your own inbox","Every message tracked against the order"],
    detail:"Inbound emails become orders or actions, and confirmations send from your own inbox. Order documents attached to an email can be read into the order during setup." },
  { slug:'outlook', name:'Outlook', cat:'messaging', accent:'#0078D4',
    lead:"Capture orders from Microsoft inboxes and send updates straight from Outlook - shared mailboxes can feed one order pipeline for the whole team.",
    flowsIn:["Orders captured from Microsoft inboxes","Shared mailboxes feed a single pipeline"],
    flowsBack:["Updates and confirmations sent from Outlook","Every message logged against the order"],
    detail:"Capture orders from Microsoft inboxes and send updates straight from Outlook. Shared mailboxes can feed a single order pipeline for the whole team." },
  { slug:'whatsapp', name:'WhatsApp', cat:'messaging', accent:'#25D366',
    lead:"Your floor and customers update or ask SimpleGrid in plain language over WhatsApp, and it logs the update or answers on the spot.",
    flowsIn:["Plain-language updates and questions over WhatsApp","Logged against the right order automatically"],
    flowsBack:["Confirmations and status updates sent back","Answers delivered on the spot"],
    detail:"Your floor and customers update or ask SimpleGrid in plain language over WhatsApp, and it logs the update or answers on the spot. Confirmations and status updates go back the same way." },
  { slug:'slack', name:'Slack', cat:'messaging', accent:'#4A154B',
    lead:"Approvals, alerts and ledger answers post into the Slack channels your team already watches - approve a request or ask what shipped today without leaving Slack.",
    flowsIn:["Approve requests right from Slack","Ask the ledger questions in plain language"],
    flowsBack:["Alerts and approvals pushed to your channels","Answers posted where the team already works"],
    detail:"Approvals, alerts, and ledger answers post into the Slack channels your team already watches. Approve a request or ask what shipped today without leaving Slack." },
  { slug:'mailchimp', name:'Mailchimp', cat:'messaging', accent:'#FFE01B',
    lead:"Sync customer and order data to Mailchimp so your audiences stay current without manual exports.",
    flowsIn:["Audience membership kept current both ways","No manual CSV exports"],
    flowsBack:["Customer and order data synced to Mailchimp","New customers and purchases ready to trigger campaigns"],
    detail:"Customer and order data sync to Mailchimp so your audiences stay current without manual exports. New customers and purchases are ready to trigger campaigns." },
  { slug:'klaviyo', name:'Klaviyo', cat:'messaging', accent:'#111111',
    lead:"Order and customer events stream to Klaviyo to power segmented flows like post-purchase and win-back, updating as orders move through the floor.",
    flowsIn:["Audiences kept current as orders change","Profiles enriched with real order history"],
    flowsBack:["Order and customer events streamed to Klaviyo","Powers post-purchase and win-back flows"],
    detail:"Order and customer events stream to Klaviyo to power segmented flows like post-purchase and win-back. The data updates as orders move through the floor." },
  { slug:'braze', name:'Braze', cat:'messaging', accent:'#FE5832',
    lead:"Customer lifecycle events stream to Braze for cross-channel messaging - order and fulfillment milestones trigger the right message at the right time.",
    flowsIn:["Lifecycle stage kept current","Profiles updated as orders progress"],
    flowsBack:["Order and fulfillment milestones streamed to Braze","Triggers the right message at the right time"],
    detail:"Customer lifecycle events stream to Braze for cross-channel messaging. Order and fulfillment milestones can trigger the right message at the right time." },
  { slug:'shipstation', name:'ShipStation', cat:'shipping', accent:'#0099FF',
    lead:"Fulfilled orders become ShipStation shipments automatically, and tracking numbers pull back onto each order.",
    flowsIn:["Tracking numbers pulled back onto each order","Shipping status visible to team and customers"],
    flowsBack:["Fulfilled orders pushed as shipments","Labels created without re-entering details"],
    detail:"Fulfilled orders become ShipStation shipments automatically, and tracking numbers pull back onto each order. Your team and customers see shipping status in one place." },
  { slug:'postgresql', name:'PostgreSQL', cat:'data', accent:'#336791',
    lead:"A direct database connection for live, high-volume pipelines - read from or write to your Postgres instance on a schedule or in near real time.",
    flowsIn:["Read floor data into BI tools and internal apps","Scheduled or near-real-time pulls"],
    flowsBack:["Write to your Postgres instance directly","Built for high-volume pipelines"],
    detail:"A direct database connection for live, high-volume pipelines, reading from or writing to your Postgres instance on a schedule or in near real time. Useful for BI tools and internal apps that need floor data." },
  { slug:'sftp', name:'SFTP', cat:'data', accent:'#4A5568',
    lead:"Scheduled, secure file drops and pickups for partners and legacy systems that only exchange files - we set the layout and cadence during onboarding.",
    flowsIn:["Partner and legacy files picked up on a schedule","Layout mapped during onboarding"],
    flowsBack:["Secure file drops generated automatically","Cadence and format set to match each partner"],
    detail:"Scheduled, secure file drops and pickups for partners and legacy systems that only exchange files. We set the layout and cadence during onboarding." },
];

const bySlug = Object.fromEntries(ITEMS.map(i => [i.slug, i]));

// --- per-integration distinction: sync direction, a one-line "what it is",
//     three concrete use cases, and a short FAQ. Keyed by slug. -------------
const EXTRA = {
  'quickbooks': { dir: 'Two-way sync',
    what: "QuickBooks is the accounting software most small and mid-size businesses keep their books in.",
    uses: ["Post invoices and bills the moment work clears the floor", "Match floor records to your existing chart of accounts", "Close the month with zero re-keying"],
    faq: [{q:"Do we keep using QuickBooks?", a:"Yes. QuickBooks stays your book of record - SimpleGrid runs operations on top and feeds it, so finance never re-keys."},
          {q:"Will it create duplicate customers or items?", a:"No. Records are matched to your existing QuickBooks customers, vendors and items during setup."}] },
  'xero': { dir: 'Two-way sync',
    what: "Xero is cloud accounting software for small and growing businesses.",
    uses: ["Sync invoices, payments and your chart of accounts", "Match floor records to existing Xero contacts and items", "Hand finance numbers that are already reconciled"],
    faq: [{q:"Do we keep using Xero?", a:"Yes - Xero stays your book of record. SimpleGrid feeds and reads it so nothing is entered twice."},
          {q:"Is it really two-way?", a:"Yes. Invoices and payments post to Xero, and contact and item changes flow back to the floor."}] },
  'tally': { dir: 'Export to Tally',
    what: "Tally is the accounting and compliance software most Indian manufacturers run on.",
    uses: ["Export vouchers and ledgers without manual entry", "Map production costs to the right ledger heads", "Let your accountant keep working in Tally as-is"],
    faq: [{q:"Does my accountant change anything?", a:"No. They keep working in Tally exactly as today - SimpleGrid just delivers clean vouchers and ledgers."},
          {q:"Will it fit our ledger structure?", a:"Yes. We map to your Tally setup during onboarding, including custom ledger heads."}] },
  'zoho-books': { dir: 'Two-way sync',
    what: "Zoho Books is the cloud accounting app in the Zoho suite.",
    uses: ["Keep invoices and bills aligned both ways", "Sync customer and vendor records automatically", "See real payment status back on the floor"],
    faq: [{q:"Do we keep using Zoho Books?", a:"Yes. It stays your book of record; SimpleGrid keeps it and the floor in sync."},
          {q:"Does payment status come back?", a:"Yes - paid and pending status flows back so the floor sees the real money position."}] },
  'bill-com': { dir: 'Push & status',
    what: "Bill.com automates accounts payable and bill payments.",
    uses: ["Send approved payables straight to Bill.com", "Pull payment status back automatically", "Enforce your approval chain before anything pays"],
    faq: [{q:"Can a bill pay without approval?", a:"No. Your SimpleGrid approvals carry through, so nothing pays without sign-off."},
          {q:"Does paid status sync back?", a:"Yes - payment status flows back onto each payable automatically."}] },
  'excel': { dir: 'Import & export',
    what: "Excel is where most factory data - BOMs, item masters, orders - still lives.",
    uses: ["Import BOMs, item masters and orders from any layout", "Map your columns once during setup", "Export any SimpleGrid view back to Excel"],
    faq: [{q:"Do I have to reformat my files?", a:"No. We map your existing columns once - bring your Excel files exactly as they are."},
          {q:"Can I still get Excel reports out?", a:"Yes. Any SimpleGrid view exports back to Excel on demand."}] },
  'google-sheets': { dir: 'Live two-way',
    what: "Google Sheets is the shared spreadsheet your team already edits together.",
    uses: ["Edit in Sheets and update SimpleGrid live", "Push reports into a sheet that refreshes itself", "Skip add-ons and copy-paste entirely"],
    faq: [{q:"Do I need a plugin?", a:"No add-ons required - the link is live and two-way out of the box."},
          {q:"Will my reports stay current?", a:"Yes. SimpleGrid refreshes the sheet on its own as data changes."}] },
  'shopify': { dir: 'Two-way sync',
    what: "Shopify powers your online storefront, orders and SKUs.",
    uses: ["Pull orders and SKUs in as they are placed", "Push inventory and fulfillment status back", "Roll multiple stores into one floor view"],
    faq: [{q:"Can I run multiple stores?", a:"Yes - multiple Shopify stores roll into one order pipeline and inventory view."},
          {q:"Does stock stay accurate?", a:"Yes. Inventory pushes back so you never oversell across channels."}] },
  'woocommerce': { dir: 'Two-way sync',
    what: "WooCommerce is the e-commerce plugin that runs on WordPress.",
    uses: ["Sync orders and stock in real time", "Write fulfillment and tracking back to each order", "Keep WooCommerce inventory accurate automatically"],
    faq: [{q:"Is the sync real-time?", a:"Yes - orders and stock levels stay in sync with the floor as they change."},
          {q:"Does tracking reach the customer?", a:"Yes. Fulfillment and tracking write back to each WooCommerce order."}] },
  'amazon': { dir: 'Orders in, stock out',
    what: "Amazon is a major marketplace and sales channel for many makers.",
    uses: ["Import Amazon orders into one pipeline", "Keep available-to-sell quantities accurate", "Reflect fulfillment status back to Amazon"],
    faq: [{q:"Will I oversell?", a:"No - inventory updates keep available-to-sell accurate across every channel."},
          {q:"Where do Amazon orders go?", a:"Into the same pipeline as every other channel, not a separate silo."}] },
  'tiktok-shop': { dir: 'Orders in, stock out',
    what: "TikTok Shop is the in-app commerce channel for social sellers.",
    uses: ["Pull TikTok Shop orders into one pipeline", "Check inventory against your total stock", "Sync fulfillment status back to the platform"],
    faq: [{q:"Is it a separate workflow?", a:"No - TikTok Shop orders join the same pipeline as your other channels."},
          {q:"Does stock stay honest?", a:"Yes. Inventory is checked against total stock so you do not oversell."}] },
  'stripe': { dir: 'Payments in',
    what: "Stripe processes your online and card payments.",
    uses: ["Match payments to the right order and invoice", "Reconcile applied cash automatically", "Flow refunds and failures back to the order"],
    faq: [{q:"How are payments matched?", a:"Stripe payments are matched to the right sales order and invoice automatically."},
          {q:"What about refunds?", a:"Refunds and failed payments flow back to the order record."}] },
  'gmail': { dir: 'Inbound & outbound',
    what: "Gmail is where many of your order emails arrive.",
    uses: ["Turn inbound emails into orders or actions", "Read attached order documents during setup", "Send confirmations from your own inbox"],
    faq: [{q:"Do confirmations come from us?", a:"Yes - they send from your own Gmail inbox, not a generic address."},
          {q:"Can it read order attachments?", a:"Yes. Attached order documents can be read into the order during setup."}] },
  'outlook': { dir: 'Inbound & outbound',
    what: "Outlook and Microsoft 365 are your team's inbox and calendar.",
    uses: ["Capture orders from Microsoft inboxes", "Feed a shared mailbox into one pipeline", "Send updates straight from Outlook"],
    faq: [{q:"Does it work with shared mailboxes?", a:"Yes - a shared mailbox can feed a single order pipeline for the whole team."},
          {q:"Are messages logged?", a:"Yes. Every message is logged against the order."}] },
  'whatsapp': { dir: 'Two-way chat',
    what: "WhatsApp is how your floor and customers actually communicate.",
    uses: ["Let the floor update SimpleGrid in plain language", "Answer status questions on the spot", "Send confirmations and updates over WhatsApp"],
    faq: [{q:"Does the floor need training?", a:"No - they type in plain language, like a normal chat, and SimpleGrid logs it."},
          {q:"Can customers ask about orders?", a:"Yes. They can query status and get an answer over WhatsApp."}] },
  'slack': { dir: 'Alerts & actions',
    what: "Slack is the channel your team already watches all day.",
    uses: ["Push approvals and alerts to your channels", "Approve requests without leaving Slack", "Ask the ledger what shipped today"],
    faq: [{q:"Can I approve from Slack?", a:"Yes - approve a request or query the ledger right inside Slack."},
          {q:"Which channels get alerts?", a:"You choose - alerts post to the channels your team already uses."}] },
  'mailchimp': { dir: 'Sync to Mailchimp',
    what: "Mailchimp runs your email marketing and audiences.",
    uses: ["Sync customer and order data to Mailchimp", "Keep audiences current without manual exports", "Trigger campaigns off new customers and purchases"],
    faq: [{q:"Do I still export CSVs?", a:"No - customer and order data sync automatically, so audiences stay current."},
          {q:"Can purchases trigger campaigns?", a:"Yes. New customers and orders are ready to trigger Mailchimp flows."}] },
  'klaviyo': { dir: 'Events to Klaviyo',
    what: "Klaviyo powers e-commerce email and SMS flows.",
    uses: ["Stream order and customer events to Klaviyo", "Enrich profiles with real order history", "Power post-purchase and win-back flows"],
    faq: [{q:"What events are sent?", a:"Order and customer events stream over as orders move through the floor."},
          {q:"Does it update in real time?", a:"Yes - profiles and events update as the data changes."}] },
  'braze': { dir: 'Events to Braze',
    what: "Braze runs cross-channel customer messaging.",
    uses: ["Stream lifecycle events to Braze", "Trigger messages on order and fulfillment milestones", "Keep customer profiles current"],
    faq: [{q:"What triggers a message?", a:"Order and fulfillment milestones can trigger the right message at the right time."},
          {q:"Is it cross-channel?", a:"Yes - Braze handles the channel; SimpleGrid supplies the events."}] },
  'shipstation': { dir: 'Orders out, tracking in',
    what: "ShipStation creates shipping labels and manages shipments.",
    uses: ["Turn fulfilled orders into ShipStation shipments", "Pull tracking numbers back onto each order", "Show shipping status in one place"],
    faq: [{q:"Do I re-enter shipment details?", a:"No - fulfilled orders become shipments automatically, no re-keying."},
          {q:"Where does tracking go?", a:"Tracking pulls back onto each order so team and customers can see it."}] },
  'postgresql': { dir: 'Read & write',
    what: "PostgreSQL is the database behind your BI tools and internal apps.",
    uses: ["Read floor data into BI tools and internal apps", "Write to your Postgres on a schedule or near real time", "Power high-volume data pipelines"],
    faq: [{q:"Read-only or read-write?", a:"Either - SimpleGrid can read from or write to your Postgres instance."},
          {q:"How fresh is the data?", a:"On a schedule or near real time, depending on your pipeline."}] },
  'sftp': { dir: 'Scheduled files',
    what: "SFTP is the secure file channel for partners and legacy systems.",
    uses: ["Pick up partner and legacy files on a schedule", "Generate secure file drops automatically", "Match each partner's layout and cadence"],
    faq: [{q:"What file formats?", a:"We set the layout and cadence to match each partner during onboarding."},
          {q:"Is it secure?", a:"Yes - scheduled, secure drops and pickups over SFTP."}] },
};

// --- helpers -----------------------------------------------------------------
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function li(arr) { return arr.map(x => `            <li>${esc(x)}</li>`).join('\n'); }

function relatedCards(item) {
  const sibs = ITEMS.filter(i => i.cat === item.cat && i.slug !== item.slug);
  // if a category is tiny, top up with a couple from anywhere so the row isn't bare
  let pool = sibs;
  if (pool.length < 3) {
    const extra = ITEMS.filter(i => i.slug !== item.slug && i.cat !== item.cat).slice(0, 3 - pool.length);
    pool = pool.concat(extra);
  }
  return pool.slice(0, 4).map(i =>
`        <a class="intg-rel-card" href="${i.slug}.html">
          <span class="intg-rel-logo">${LOGOS[i.slug]}</span>
          <span class="intg-rel-name">${esc(i.name)}</span>
        </a>`).join('\n');
}

function page(item) {
  const catLabel = CATS[item.cat];
  const title = `${item.name} integration | SimpleGrid`;
  const desc = `${item.name} + SimpleGrid: ${item.lead}`.replace(/\s+/g, ' ').slice(0, 230);
  const url = `https://simplegrid.ai/integrations/${item.slug}.html`;
  const x = EXTRA[item.slug] || {};
  const uses = (x.uses || []).map(u => `        <div class="intg-use">${esc(u)}</div>`).join('\n');
  const faq = (x.faq || []).map(f => `        <div class="intg-faq-item"><p class="intg-q">${esc(f.q)}</p><p class="intg-a">${esc(f.a)}</p></div>`).join('\n');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<!-- Security meta (GitHub Pages can't set HTTP headers; these are the next-best-thing) -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://unpkg.com https://us-assets.i.posthog.com https://www.googletagmanager.com https://www.clarity.ms; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self' https://d1i6y7ff3hcohx.cloudfront.net https://us.i.posthog.com https://us-assets.i.posthog.com https://formsubmit.co https://www.google-analytics.com https://www.googletagmanager.com https://googleads.g.doubleclick.net https://*.clarity.ms; frame-ancestors 'self'; base-uri 'self'; form-action 'self' https://formsubmit.co; object-src 'none'; upgrade-insecure-requests">
<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">

<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#3461E0">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${url}">
<link rel="icon" type="image/svg+xml" href="../assets/simplegrid-logomark.svg">
<link rel="apple-touch-icon" href="../assets/simplegrid-logomark.svg">
<link rel="stylesheet" href="../colors_and_type.css">
<link rel="stylesheet" href="../styles.css">
<link rel="stylesheet" href="../integrations.css">

<meta property="og:site_name" content="SimpleGrid">
<meta property="og:type" content="website">
<meta property="og:locale" content="en_US">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="https://simplegrid.ai/assets/og-card.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@simplegridai">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="https://simplegrid.ai/assets/og-card.jpg">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "${url}#webpage",
      "url": "${url}",
      "name": ${JSON.stringify(title)},
      "isPartOf": { "@id": "https://simplegrid.ai/#website" },
      "publisher": { "@id": "https://simplegrid.ai/#org" },
      "description": ${JSON.stringify(desc)},
      "inLanguage": "en"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://simplegrid.ai/" },
        { "@type": "ListItem", "position": 2, "name": "Syncs", "item": "https://simplegrid.ai/syncs.html" },
        { "@type": "ListItem", "position": 3, "name": ${JSON.stringify(item.name)}, "item": "${url}" }
      ]
    }
  ]
}
</script>

<!-- Analytics (PostHog + GA4) - deferred to first user interaction. -->
<script src="../assets/js/analytics-init.js" defer></script>
<script src="../assets/js/tracking.js" defer></script>
<script src="../assets/js/cookie-consent.js" defer></script>
</head>
<body class="intg-page" style="--intg-accent: ${item.accent};">
<!-- Top navigation rendered by the shared component (components/site-nav.js). -->
<div id="sg-nav" data-page="syncs"></div>

<main id="main">
  <section class="intg-hero">
    <a class="intg-back" href="../syncs.html">&larr; All syncs</a>
    <div class="intg-hero-marks">
      <span class="intg-logo-big">${LOGOS[item.slug]}</span>
      <span class="intg-plus">+</span>
      <span class="intg-logo-big intg-logo-sg"><img src="../assets/simplegrid-logomark.svg" alt="SimpleGrid" width="34" height="34"></span>
    </div>
    <div class="intg-badges">
      <span class="tag">${esc(catLabel)}</span>
      <span class="intg-dir">${esc(x.dir || 'Two-way sync')}</span>
    </div>
    <h1>SimpleGrid&nbsp;+&nbsp;${esc(item.name)}</h1>
    <p class="lead">${esc(item.lead)}</p>
    ${x.what ? `<p class="intg-what">${esc(x.what)}</p>` : ''}
    <div class="intg-hero-cta">
      <a href="https://cal.com/simplegrid-ai" target="_blank" rel="noopener noreferrer" class="intg-cta" data-cta="intg_${item.slug}_demo">Book a demo</a>
      <a href="../syncs.html" class="intg-cta-ghost">See all syncs &rarr;</a>
    </div>
  </section>

  <section class="intg-section">
    <div class="intg-inner">
      <div class="tag">What syncs</div>
      <h2>Data moves both ways - automatically.</h2>
      <div class="intg-flows">
        <div class="intg-col">
          <p class="intg-col-h"><span class="intg-arrow">&rarr;</span> Into SimpleGrid</p>
          <ul>
${li(item.flowsIn)}
          </ul>
        </div>
        <div class="intg-col">
          <p class="intg-col-h"><span class="intg-arrow">&larr;</span> Back to ${esc(item.name)}</p>
          <ul>
${li(item.flowsBack)}
          </ul>
        </div>
      </div>
      <p class="intg-detail">${esc(item.detail)}</p>
    </div>
  </section>

  <section class="intg-section intg-alt">
    <div class="intg-inner">
      <div class="tag">Use it to</div>
      <h2>What teams do with ${esc(item.name)} &amp; SimpleGrid</h2>
      <div class="intg-uses">
${uses}
      </div>
    </div>
  </section>

  <section class="intg-section">
    <div class="intg-inner">
      <div class="tag">How it works</div>
      <h2>Live with the rest of your floor.</h2>
      <ol class="intg-steps">
        <li><span class="intg-step-n">1</span><div><p class="intg-step-h">Connect once</p><p>We link ${esc(item.name)} during your setup - you authorise it, we handle the wiring.</p></div></li>
        <li><span class="intg-step-n">2</span><div><p class="intg-step-h">Map to your floor</p><p>Your fields, codes and naming are mapped to SimpleGrid one time, so records match instead of duplicating.</p></div></li>
        <li><span class="intg-step-n">3</span><div><p class="intg-step-h">Runs on its own</p><p>From then on the sync runs in the background - no exports, no re-keying, nothing for your team to remember.</p></div></li>
      </ol>
      <p class="intg-note">Don't see a field you need? We build the connector around how you actually work - it goes live with the rest of your floor, not as an upgrade later.</p>
    </div>
  </section>

  <section class="intg-section intg-alt">
    <div class="intg-inner">
      <div class="tag">FAQ</div>
      <h2>${esc(item.name)} &amp; SimpleGrid, in short</h2>
      <div class="intg-faq">
${faq}
      </div>
    </div>
  </section>

  <section class="intg-section">
    <div class="intg-inner">
      <div class="tag">More integrations</div>
      <h2>Works with the rest of your stack</h2>
      <div class="intg-rel-grid">
${relatedCards(item)}
      </div>
      <a class="intg-rel-all" href="../syncs.html">View all integrations &rarr;</a>
    </div>
  </section>

  <section class="intg-final">
    <div class="intg-final-inner">
      <h2>Connect ${esc(item.name)} to your floor.</h2>
      <p>Book a demo and we'll show SimpleGrid wired into ${esc(item.name)} with your data, not a sample set.</p>
      <a href="https://cal.com/simplegrid-ai" target="_blank" rel="noopener noreferrer" class="intg-cta" data-cta="intg_${item.slug}_final">Book a demo</a>
    </div>
  </section>
</main>

<!-- Footer rendered by the shared component (components/site-footer.js). -->
<div id="sg-footer"></div>
<script src="../components/site-nav.js" defer></script>
<script src="../components/site-footer.js" defer></script>
<script src="../components/BookDemoModal.js" defer></script><script src="../components/TryErpModal.js" defer></script>
</body>
</html>
`;
}

const CSS = `/* ============================================================================
   Per-integration landing pages (/integrations/*.html). Generated content, but
   this stylesheet is hand-maintainable. Uses the site tokens from
   colors_and_type.css (--fg1/2/3, --sg-blue, --border, --font-heading).
   --intg-accent is set per page (the brand colour of that integration).
   ========================================================================== */
.intg-hero { max-width: 1080px; margin: 0 auto; padding: 60px 32px 8px; }
.intg-back { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 600; color: var(--fg3); text-decoration: none; margin: 0 0 26px; }
.intg-back:hover { color: var(--sg-blue); }
.intg-hero-marks { display: flex; align-items: center; gap: 16px; margin: 0 0 22px; }
.intg-logo-big { width: 58px; height: 58px; border-radius: 14px; background: #fff; border: 1px solid var(--border); box-shadow: 0 6px 18px rgba(20,28,46,0.08); display: inline-flex; align-items: center; justify-content: center; overflow: hidden; }
.intg-logo-big svg { width: 34px; height: 34px; display: block; }
.intg-logo-sg { border-color: color-mix(in srgb, var(--sg-blue) 26%, var(--border)); }
.intg-plus { font-family: var(--font-heading); font-size: 24px; font-weight: 400; color: var(--fg3); }
.intg-badges { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
.intg-badges .tag { margin: 0; }
.intg-dir { display: inline-flex; align-items: center; gap: 7px; font-size: 12px; font-weight: 700; letter-spacing: 0.02em; padding: 6px 13px; border-radius: 999px; color: var(--intg-accent, var(--sg-blue)); background: color-mix(in srgb, var(--intg-accent, var(--sg-blue)) 10%, #fff); border: 1px solid color-mix(in srgb, var(--intg-accent, var(--sg-blue)) 30%, transparent); }
.intg-dir::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: var(--intg-accent, var(--sg-blue)); }
.intg-hero h1 { font-family: var(--font-heading); font-size: clamp(34px, 5.4vw, 54px); font-weight: 700; letter-spacing: -0.03em; line-height: 1.04; color: var(--fg1); margin: 0 0 18px; }
.intg-hero .lead { font-size: 19px; line-height: 1.55; color: var(--fg2); margin: 0 0 14px; max-width: 720px; }
.intg-what { font-size: 14.5px; line-height: 1.6; color: var(--fg3); margin: 0 0 26px; max-width: 660px; }
.intg-hero-cta { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
.intg-cta { display: inline-flex; align-items: center; gap: 8px; background: var(--sg-blue); color: #fff; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px; }
.intg-cta:hover { filter: brightness(0.95); }
.intg-cta-ghost { color: var(--fg2); text-decoration: none; font-weight: 600; font-size: 15px; }
.intg-cta-ghost:hover { color: var(--sg-blue); }

.intg-section { border-top: 1px solid var(--border); background: rgba(250,251,252,0.5); }
.intg-section.intg-alt { background: rgba(248,250,253,0.7); }
.intg-inner { max-width: 1080px; margin: 0 auto; padding: 54px 32px; }
.intg-inner .tag { margin-bottom: 14px; }
.intg-inner h2 { font-family: var(--font-heading); font-size: clamp(24px, 3.2vw, 32px); font-weight: 700; letter-spacing: -0.02em; line-height: 1.12; color: var(--fg1); margin: 0 0 28px; }

.intg-flows { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin: 0 0 24px; }
.intg-col { background: #fff; border: 1px solid var(--border); border-radius: 16px; padding: 24px 24px 22px; }
.intg-col-h { display: flex; align-items: center; gap: 9px; font-family: var(--font-heading); font-size: 15px; font-weight: 700; color: var(--fg1); margin: 0 0 14px; letter-spacing: -0.01em; }
.intg-arrow { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 7px; font-size: 14px; font-weight: 700; color: var(--intg-accent, var(--sg-blue)); background: color-mix(in srgb, var(--intg-accent, var(--sg-blue)) 12%, #fff); }
.intg-col ul { list-style: none; margin: 0; padding: 0; }
.intg-col li { position: relative; padding: 0 0 0 24px; font-size: 14.5px; line-height: 1.5; color: var(--fg2); margin: 0 0 11px; }
.intg-col li:last-child { margin-bottom: 0; }
.intg-col li::before { content: ""; position: absolute; left: 4px; top: 8px; width: 7px; height: 7px; border-radius: 2px; background: var(--intg-accent, var(--sg-blue)); }
.intg-detail { font-size: 15px; line-height: 1.65; color: var(--fg2); margin: 0; max-width: 820px; }

.intg-steps { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.intg-steps li { display: flex; gap: 14px; background: #fff; border: 1px solid var(--border); border-radius: 16px; padding: 22px 22px 20px; }
.intg-step-n { flex: 0 0 auto; width: 30px; height: 30px; border-radius: 999px; background: color-mix(in srgb, var(--sg-blue) 10%, transparent); border: 1px solid color-mix(in srgb, var(--sg-blue) 22%, transparent); color: var(--sg-blue); font-family: var(--font-mono); font-size: 13px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; }
.intg-step-h { font-family: var(--font-heading); font-size: 15.5px; font-weight: 700; color: var(--fg1); margin: 3px 0 6px; letter-spacing: -0.01em; }
.intg-steps p { font-size: 13.5px; line-height: 1.55; color: var(--fg2); margin: 0; }
.intg-note { font-size: 14.5px; line-height: 1.6; color: var(--fg2); margin: 24px 0 0; padding: 16px 18px; border: 1px dashed color-mix(in srgb, var(--sg-blue) 34%, var(--border)); border-radius: 12px; background: rgba(74,123,247,0.04); max-width: 820px; }

.intg-uses { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.intg-use { position: relative; background: #fff; border: 1px solid var(--border); border-radius: 14px; padding: 20px 20px 20px 50px; font-size: 14.5px; line-height: 1.5; color: var(--fg1); font-weight: 500; }
.intg-use::before { content: '\\2713'; position: absolute; left: 18px; top: 18px; width: 22px; height: 22px; border-radius: 7px; background: color-mix(in srgb, var(--intg-accent, var(--sg-blue)) 14%, #fff); color: var(--intg-accent, var(--sg-blue)); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; }

.intg-faq { display: flex; flex-direction: column; gap: 12px; max-width: 820px; }
.intg-faq-item { background: #fff; border: 1px solid var(--border); border-radius: 14px; padding: 18px 22px; }
.intg-q { font-family: var(--font-heading); font-size: 15.5px; font-weight: 700; color: var(--fg1); margin: 0 0 6px; letter-spacing: -0.01em; }
.intg-a { font-size: 14px; line-height: 1.6; color: var(--fg2); margin: 0; }

.intg-rel-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin: 0 0 22px; }
.intg-rel-card { display: flex; align-items: center; gap: 12px; background: #fff; border: 1px solid var(--border); border-radius: 14px; padding: 14px 16px; text-decoration: none; transition: border-color .15s ease, box-shadow .15s ease, transform .15s ease; }
.intg-rel-card:hover { border-color: color-mix(in srgb, var(--sg-blue) 38%, var(--border)); box-shadow: 0 6px 18px rgba(20,28,46,0.07); transform: translateY(-2px); }
.intg-rel-logo { flex: 0 0 36px; width: 36px; height: 36px; border-radius: 9px; background: #fff; border: 1px solid var(--border); display: inline-flex; align-items: center; justify-content: center; overflow: hidden; }
.intg-rel-logo svg { width: 22px; height: 22px; display: block; }
.intg-rel-name { font-family: var(--font-heading); font-size: 14.5px; font-weight: 700; color: var(--fg1); }
.intg-rel-all { font-size: 15px; font-weight: 600; color: var(--sg-blue); text-decoration: none; }
.intg-rel-all:hover { text-decoration: underline; }

.intg-final { border-top: 1px solid var(--border); background: rgba(250,251,252,0.4); }
.intg-final-inner { max-width: 760px; margin: 0 auto; padding: 68px 32px; text-align: center; }
.intg-final h2 { font-family: var(--font-heading); font-size: clamp(26px, 3.6vw, 34px); font-weight: 700; letter-spacing: -0.02em; color: var(--fg1); margin: 0 0 12px; }
.intg-final p { font-size: 17px; line-height: 1.6; color: var(--fg2); margin: 0 auto 24px; max-width: 560px; }

@media (max-width: 820px) {
  .intg-flows { grid-template-columns: 1fr; }
  .intg-steps { grid-template-columns: 1fr; }
  .intg-uses { grid-template-columns: 1fr; }
  .intg-rel-grid { grid-template-columns: 1fr 1fr; }
  .intg-inner { padding: 40px 24px; }
}
@media (prefers-reduced-motion: reduce) {
  .intg-rel-card { transition: none; }
}
`;

// --- write the pages + stylesheet -------------------------------------------
fs.mkdirSync(OUT_DIR, { recursive: true });
let n = 0;
for (const item of ITEMS) {
  fs.writeFileSync(path.join(OUT_DIR, item.slug + '.html'), page(item));
  n++;
}
fs.writeFileSync(path.join(ROOT, 'integrations.css'), CSS);
console.log('Wrote ' + n + ' integration pages to /integrations/ and integrations.css');

// expose the name->slug map for the syncs.html linker (sibling script)
module.exports = { ITEMS, bySlug, CATS };
