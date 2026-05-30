# Entity Submission Pack (ready to paste)

Internal doc (excluded from publishing). Purpose: establish SimpleGrid as a recognized entity and fix the brand-collision + zero-listing problem the audit found. **You (or Karan) paste these into each directory.** Claude cannot create accounts or submit. Keep every field IDENTICAL across sites (consistent NAP is the whole point).

## Canonical NAP (use verbatim everywhere)
- **Product name:** SimpleGrid
- **Legal entity / operator:** Valaya AI Technologies Pvt. Ltd.
- **Category:** ERP Software / Manufacturing ERP / AI ERP
- **Website:** https://simplegrid.ai
- **Email:** hello@simplegrid.ai
- **HQ:** Bengaluru, India (serving US manufacturers)
- **Founded:** 2025
- **Founder:** Mukund Agarwal (Founder)
- **LinkedIn (company):** https://www.linkedin.com/company/simplegridai
- **LinkedIn (founder):** https://www.linkedin.com/in/mdagarwal/
- **X / Twitter:** https://x.com/simplegridai
- **GitHub:** https://github.com/SimpleGridAI
- **Logo:** https://simplegrid.ai/assets/simplegrid-logo-horizontal.svg
- **Social/OG image:** https://simplegrid.ai/assets/og-card.jpg

> **Disambiguation note for every profile:** explicitly distinguish from "Simplegrid Technology, Inc." (a New Jersey managed-IT firm at simplegrid.com) and "Simply Grid" (EV charging). Always pair the name with "AI-native ERP for manufacturers" and the simplegrid.ai domain.

## Short description (≈160 chars)
> SimpleGrid is an AI-native ERP for US mid-market manufacturers. We build a custom system around your operation, deploy in 7 to 21 days, and you pay only after it works.

## Medium description (≈50 words)
> SimpleGrid is an AI-native ERP for US mid-market manufacturers ($10M to $250M revenue). Instead of forcing your factory into generic modules, we model your real operation as an "SG Schema" and generate the system from it. We build at our own risk and you pay only after a 30-day live run on your floor.

## Long description (≈100 words)
> SimpleGrid, by Valaya AI Technologies Pvt. Ltd., is an AI-native ERP built for US mid-market manufacturers that have outgrown QuickBooks and spreadsheets but cannot justify a $500K, 18-month SAP, NetSuite, or Acumatica deployment. Instead of generic modules, SimpleGrid models each customer's real operation as an "SG Schema" (the entities, states, and rules of how that specific business runs) and generates the system from it. Deployment takes 7 to 21 days. The pricing model is unusual: SimpleGrid builds the working system at its own risk, the customer runs it free for 30 days on the real floor, and pays only if they keep it. Founded by operators, not enterprise-software salespeople.

## Category / tags
ERP, Manufacturing ERP, AI ERP, Cloud ERP, MRP, Inventory Management, Production Planning, Job Costing, Mid-Market Manufacturing, Custom ERP.

---

## Per-directory checklist

| Directory | URL to submit at | Priority | Notes |
|---|---|---|---|
| **Crunchbase** | crunchbase.com/add-new | HIGH | Create org "SimpleGrid" (operator Valaya AI). Add founder, website, category "Software / ERP", short desc. This is the #1 entity-graph signal Google reads. |
| **Wikidata** | wikidata.org (create item) | HIGH | Item label "SimpleGrid", description "AI-native ERP for manufacturers", instance of: software/business; official website simplegrid.ai; founder Mukund Agarwal. Feeds Knowledge Graph. |
| **G2** | g2.com/products/new | HIGH | Vendor profile in "ERP Systems". Use medium desc. Do NOT solicit fake reviews; request real ones from the 2 deployed customers. |
| **Capterra** | capterra.com/vendors/sign-up | HIGH | Same as G2 (Gartner Digital Markets network — also feeds GetApp + Software Advice). |
| **GetApp** | getapp.com (via Capterra/GDM) | MED | Usually auto-syncs from Capterra/GDM listing. |
| **Software Advice** | softwareadvice.com (via GDM) | MED | Same GDM network as Capterra. |
| **TrustRadius** | trustradius.com/vendor | MED | ERP category; long desc + screenshots. |
| **Product Hunt** | producthunt.com/posts/new | MED | One launch post; links back, generates a referring domain. |

**Order of operations:** Crunchbase + Wikidata first (entity graph), then G2 + Capterra (GDM network covers 3 sites at once), then the rest. After each, add the resulting profile URL to the homepage Organization `sameAs` array in `index.html` (currently LinkedIn + X + GitHub) and to `llms.txt`.
