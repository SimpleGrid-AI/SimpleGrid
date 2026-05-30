# Off-Code Handoff + Follow-Up Specs

Internal doc (excluded from publishing). What was NOT done in code (because it needs a human, an account, a server, or a decision), plus specs for the deferred work.

---

## 0. DEPLOY STATUS — read first
All Tier 1 to Tier 4 work is **committed locally on `main` but NOT pushed**. The live site is unchanged. To go live, review the commits, then `git push origin main` (GitHub Pages publishes in ~1 minute). See section 6 for the full build-and-push sequence.

## 1. CRITICAL: "Demo booked" conversion is not firing (highest-value fix)
The audit confirmed it; nothing in this session changed the booking path (guardrail: do not break booking). **The fix is a real code change that alters the booking UX, so it is left for a deliberate decision.**
- **Today:** "Book a demo" is an outbound link to `cal.com/simplegrid-ai`. The booking completes on cal.com, off-site, with no callback. The GTM Google-Ads conversion tag wired to the `demo_booked` dataLayer event therefore never fires. Only a pre-click `cal_com_clicked` proxy is captured. And all analytics are gated behind cookie-consent Accept.
- **To actually measure booked demos, pick one:**
  1. **Cal.com embed + listener (recommended).** Replace the outbound links with the Cal.com element/popup embed, then add a `bookingSuccessful` listener that pushes `demo_booked` to the dataLayer:
     ```js
     Cal('on', { action: 'bookingSuccessful', callback: () => {
       window.sgTrack && window.sgTrack('demo_booked', { source: 'cal_embed' });
     }});
     ```
     `sgTrack` already fans out to PostHog + GA4 + GTM (see `assets/js/tracking.js`). Test that GTM's `demo_booked` trigger fires, and that the CSP on every page that books allows the Cal.com embed host (add to `script-src`/`frame-src`).
  2. **Cal.com webhook (no UX change).** Configure a `BOOKING_CREATED` webhook in Cal.com to a serverless endpoint that forwards a server-side GA4/Ads conversion. Needs infra SimpleGrid does not have on GitHub Pages.
- **Also:** the consent gate means visitors who never click "Accept" generate zero analytics. Decide if that is acceptable (GDPR-strict) or loosen to a softer gate for US traffic.

## 2. Cloudflare / DNS / dashboard items (from CRITICAL_DASHBOARD_ACTIONS.md — still open)
These cannot be done from the repo:
- **Cloudflare > Security > Bots > AI Bots > OFF.** If on, it silently blocks GPTBot/ClaudeBot/CCBot etc., contradicting `robots.txt` (which explicitly invites them). This directly undermines the AI-citation work.
- Always-Use-HTTPS, Min TLS 1.2, DNSSEC, SPF+DMARC, DKIM, security headers via Transform Rules (GitHub Pages cannot set headers; `_headers` is not honored).

## 3. Entity + authority (see the two packs)
- `ENTITY_SUBMISSION_PACK.md` — paste-ready profiles for Crunchbase, Wikidata, G2, Capterra, GetApp, Software Advice, TrustRadius, Product Hunt. After each, add the profile URL to `index.html` Organization `sameAs` + `llms.txt`.
- `OUTREACH_PACK.md` — tool-as-resource link-building templates + target list.
- **Real reviews:** ask the 2 deployed customers (Apex Apparel, the furniture exporter) for G2/Capterra reviews. NEVER fabricate reviews or `aggregateRating` (left out of schema on purpose).

## 4. Asset cleanup
- `assets/founder-mukund.png` (540KB) is an **orphan** — referenced by no page (about page loads `team_photo.jpeg`, which was optimized 305KB->225KB this session). Either delete `founder-mukund.png` or wire it into the about page. Left in place (do not delete without owner confirmation).

## 5. CONCURRENT CHANGES — important for the build
During this session, another process/session modified these files (NOT touched by this work): `app/privacy.js`, `app/case-furniture-manufacturer.js`, `AUDIT_REPORT.md`, `.DS_Store`. They were deliberately left unstaged/uncommitted.
- This session compiled **only** `components/Footer.jsx -> components/Footer.js` (targeted) to avoid colliding with the in-flight `app/*.js` edits.
- **Before pushing:** run a full `npm run build` once those `app/*` edits are settled, so all `.jsx -> .js` are consistent (this also resolves the prior BUG-015 em-dash staleness in `app/privacy.js` / `app/case-furniture-manufacturer.js`). Then `git diff` the `.js` output and commit.

## 6. Build + deploy sequence (when ready to go live)
```bash
cd /Users/mukundagarwal/Desktop/SimpleGridUI
export PATH="$PWD/.node/bin:$PATH"     # local node (v22) — `node` is not on system PATH
npm run build          # compiles ALL components + app jsx->js, swaps html refs
npm run sitemap:gen    # regenerate sitemap (generator now includes furniture-erp)
# review:
git status
git diff --stat
# then, only when you approve going public:
git push origin main   # GitHub Pages publishes in ~1 min
```
Note: this session already compiled Footer.js and regenerated the sitemap, so a clean `npm run build` should mainly reconcile the concurrent `app/*` files.

---

## 7. DEFERRED CODE WORK — specs for a follow-up session

### 7a. Remaining T1.4 (titles/metas) — see NEEDS_FOUNDER_REVIEW.md
- 7 borderline titles (61-64 chars) left as-is; 27 short metas (<140) need expansion in founder voice (list in `seo-audit-data/onpage_signals.csv`, meta_len < 140).

### 7b. Remaining T4 front-load (25 of 35 tools)
- 10 tools done. The other 25 need a `.tool-lead` paragraph after `<h1>` (formula + benchmark + "enter X"). Reuse vetted facts already in each tool's methodology section. Pattern in `scripts/_t4_frontload.py`.

### 7c. T5 NEW PAGES (the big lift — deferred, fully specced)
Build static-first (offer + H1 + single CTA + form entry in seed HTML), with JSON-LD (WebPage + BreadcrumbList; FAQPage where natural), og + twitter, correct CSP, internal links, added to sitemap, copy logged FOR FOUNDER REVIEW, no em dashes. Include proof set (built-at-our-risk, 30-day free run, Apex 12-day, furniture 21-day) + one demo CTA each.

- **T5.1 Two tool-cluster PILLAR pages** (each links down to its tools, and the tools link up):
  - `/manufacturing-valuation/` — pillar over business-valuation, ebitda, sde, exit-readiness, customer-concentration, revenue-per-employee, lease-vs-buy. Target: owner thinking about selling.
  - `/erp-readiness/` (or `/do-i-need-an-erp/`) — pillar over erp-needs-assessment, erp-readiness-scorecard, digital-maturity, operations-health-score. Target: buyer evaluating ERP.
  - When built: update `scripts/_t3_toollinks.py` PILLAR map so each tool links up to its pillar, rebuild, regen sitemap.
- **T5.2 "Outgrown QuickBooks" hub + 3 clusters:**
  - `/quickbooks-manufacturing-limits/` (hub) + (1) inventory/WIP limits, (2) job-costing limits, (3) multi-location/multi-entity limits. Hub links to clusters + relevant tools (job-cost, reorder-point, bill-of-materials) + a case.
- **T5.3 ERP-replacement page** for the troubled-ERP segment: `/replace-your-erp/` ("your ERP is fighting your floor"). Links to relevant competitor pages + a case.
- **T5.4 Migration-trigger landing:** promote the Dynamics GP Sunset blog into a dedicated landing page (urgent, specific). Scaffold a second angle (QuickBooks Desktop limits) if time.
- **T5.5 Re-angle 2-3 competitor pages** to the narrow uncontested cut "[Incumbent] for [vertical] / under $X revenue" (keep the schema added in T1.2).

### 7d. about.html visible founder byline
Founder is now in schema (homepage + about) + as Article author + llms.txt, but the *visible* about-page founder section renders client-side (React). To put it in crawlable seed HTML, pre-render/SSR the founder section into `about.html`'s `#root` seed (or add a static fallback block).
