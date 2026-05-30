# T5 page configs. Copy is FOR FOUNDER REVIEW. No em dashes.
# Tools/pages referenced by absolute path so links work from any depth.

PROOF_TICKS = ["Built at our risk", "Live in 7 to 21 days", "Pay only if you keep it"]

PAGES = [

# ---- T5.1 PILLAR: Manufacturing valuation / exit ----
{
 "slug":"manufacturing-valuation",
 "title":"What Your Manufacturing Business Is Worth | SimpleGrid",
 "meta":"How US manufacturers are valued: SDE and EBITDA multiples, what moves the number, and free calculators to estimate your business value and exit readiness.",
 "eyebrow":"Valuation guide for manufacturers",
 "h1":"What your manufacturing business is actually worth.",
 "lead":"Most owners find out what their business is worth the hard way, in a buyer's first offer. You can get a real number now. This guide walks through how mid-market manufacturers are valued, what raises and lowers the multiple, and links the free calculators that do the math for you.",
 "ticks":["SDE and EBITDA based","Vertical-specific multiples","Free, no signup"],
 "cta_id":"valuation_pillar_hero",
 "breadcrumb":[("Home","https://simplegrid.ai/"),("Manufacturing valuation","https://simplegrid.ai/manufacturing-valuation/")],
 "sections":[
   {"eyebrow":"The basics","h2":"How a manufacturing business is valued.","paras":[
     "Smaller manufacturers are usually valued on SDE (seller's discretionary earnings) times a multiple. Larger ones move to EBITDA times a multiple. SDE adds the owner's salary and personal add-backs back to profit; EBITDA strips out interest, taxes, depreciation, and amortization.",
     "The multiple is where most of the value lives. A clean, well-documented shop with diversified customers can earn a meaningfully higher multiple than an identical business that depends on one customer and one owner."]},
   {"eyebrow":"What moves the number","h2":"Five things that raise or lower your multiple.","paras":[],
    "cards":[
      ("Customer concentration","If one customer is more than 20 to 30 percent of revenue, buyers discount the price. Measure it before they do."),
      ("Owner dependence","A business that cannot run for 30 days without the owner is worth less. Documented processes raise the number."),
      ("Margin quality","Consistent, defensible margins beat a single good year. Buyers pay for repeatable profit."),
      ("Clean financials","Fast monthly closes and accurate cost data signal a business that is easy to underwrite."),
    ]},
 ],
 "related_h":"Free tools to estimate your value",
 "related":[
   ("Business Valuation Calculator","/tools/business-valuation-calculator/","SDE-based with vertical multiples"),
   ("EBITDA & SDE Calculator","/tools/ebitda-calculator/","The number buyers actually use"),
   ("SDE Walkthrough","/tools/sde-calculator/","What a buyer takes home"),
   ("Exit Readiness Scorecard","/tools/exit-readiness-scorecard/","What stops a sale from closing"),
   ("Customer Concentration Risk","/tools/customer-concentration-risk/","The silent valuation killer"),
   ("Revenue per Employee","/tools/revenue-per-employee/","Where you rank vs peers"),
 ],
 "faqs":[
   ("How is a small manufacturing business valued?","Most small manufacturers are valued on seller's discretionary earnings (SDE) multiplied by a market multiple, typically in the 2.5x to 4x range depending on size, customer concentration, and how dependent the business is on the owner. Larger businesses shift to an EBITDA multiple."),
   ("What is a good EBITDA multiple for a manufacturer?","It varies by sub-vertical and size, but mid-market manufacturers commonly trade in a 4x to 7x EBITDA range. Clean financials, diversified customers, and low owner dependence push toward the high end."),
   ("Why does customer concentration lower my value?","If one customer is a large share of revenue, the buyer is buying that relationship's risk. Losing it after the sale could sink the business, so buyers discount the price or hold back part of it."),
 ],
 "final_h":"Want the number you cannot calculate: a system that proves your margins?",
},

# ---- T5.1 PILLAR: ERP readiness ----
{
 "slug":"erp-readiness",
 "title":"Are You Ready for an ERP? Free Assessment | SimpleGrid",
 "meta":"Before you buy an ERP, find out if you are ready. Free assessments that diagnose your data, processes, and digital maturity for mid-market manufacturers.",
 "eyebrow":"ERP readiness for manufacturers",
 "h1":"Are you ready for an ERP? Find out before you buy.",
 "lead":"Most failed ERP projects were never a software problem. The business was not ready: processes undocumented, data scattered, no clear owner. This guide helps you diagnose readiness honestly before you spend a dollar, with free assessments that give you a real answer.",
 "ticks":["Diagnose before you evaluate","3 minutes each","Free, no signup"],
 "cta_id":"erp_pillar_hero",
 "breadcrumb":[("Home","https://simplegrid.ai/"),("ERP readiness","https://simplegrid.ai/erp-readiness/")],
 "sections":[
   {"eyebrow":"Start here","h2":"Do you actually need an ERP yet?","paras":[
     "Plenty of manufacturers buy an ERP a year too early and a year too late at the same time: too early for the processes they have, too late for the volume that broke their spreadsheets. The first question is not which ERP. It is whether your operation is ready to run on one.",
     "Run the assessments below to get a number, not a sales pitch. They look at your financials, your process documentation, your data, and your floor."]},
   {"eyebrow":"What readiness means","h2":"The four things an ERP needs from you.","paras":[],
    "cards":[
      ("Documented process","If how a job moves through the floor lives only in people's heads, the ERP has nothing to model."),
      ("Trustworthy data","Inventory counts, BOMs, and costs that are roughly accurate. The system inherits your data quality."),
      ("A clear owner","One person who owns the rollout and can make decisions. Projects without an owner drift."),
      ("A real reason","A specific pain (you cannot quote accurately, you run out of stock, you cannot close the month) beats a vague upgrade."),
    ]},
 ],
 "related_h":"Free readiness assessments",
 "related":[
   ("Do I Need an ERP?","/tools/erp-needs-assessment/","8 questions, a real number"),
   ("ERP Readiness Scorecard","/tools/erp-readiness-scorecard/","Diagnose before you evaluate"),
   ("Digital Maturity Assessment","/tools/digital-maturity-assessment/","Where you sit on Industry 4.0"),
   ("Operations Health Score","/tools/operations-health-score/","One number for your operation"),
 ],
 "faqs":[
   ("How do I know if my business is ready for an ERP?","You are ready when your core processes are documented, your inventory and cost data are roughly accurate, you have one clear owner for the project, and you have a specific pain the ERP will solve. The free assessments above score each of these."),
   ("What happens if we implement an ERP before we are ready?","You automate chaos. The system inherits bad data and undocumented processes, the floor refuses to use it, and the project stalls. Fixing readiness first is cheaper than restarting a failed rollout."),
   ("How long does an ERP take to deploy?","Traditional ERP runs 6 to 18 months. SimpleGrid models your operation and deploys a working custom system in 7 to 21 days, and you only pay after a 30-day live run."),
 ],
 "final_h":"Ready, or close to it? See a custom ERP built around your floor.",
},

# ---- T5.2 HUB: Outgrown QuickBooks ----
{
 "slug":"quickbooks-manufacturing-limits",
 "title":"When Manufacturing Outgrows QuickBooks | SimpleGrid",
 "meta":"The signs your manufacturing business has outgrown QuickBooks: inventory and WIP, job costing, and multi-location limits, plus what to move to and how fast.",
 "eyebrow":"Outgrown QuickBooks?",
 "h1":"When your manufacturing has outgrown QuickBooks.",
 "lead":"QuickBooks is excellent accounting software. It was never built to run a factory floor. If you are tracking inventory in spreadsheets next to QuickBooks, guessing at job costs, or stitching together multiple files for multiple locations, you have outgrown it. Here is exactly where it breaks and what to do next.",
 "ticks":["Built for the floor, not the ledger","Live in 7 to 21 days","Pay only if you keep it"],
 "cta_id":"qb_hub_hero",
 "breadcrumb":[("Home","https://simplegrid.ai/"),("Outgrown QuickBooks","https://simplegrid.ai/quickbooks-manufacturing-limits/")],
 "sections":[
   {"eyebrow":"The three walls","h2":"Where QuickBooks stops keeping up.","paras":[
     "Almost every manufacturer hits the same three walls with QuickBooks. Each one starts as a workaround and ends as a daily tax on your team's time. Read the breakdowns below to see which one is costing you the most."],
    "cards":[
      ("Inventory and WIP","QuickBooks does not track work in process, multi-level BOMs, or real-time shop-floor inventory. You end up in spreadsheets."),
      ("Job costing","True job cost needs materials, labor, and applied overhead per job. QuickBooks gives you a rough estimate, not the real number."),
      ("Multi-location","Multiple plants or legal entities mean multiple files, manual consolidation, and no single source of truth."),
    ]},
 ],
 "related_h":"Go deeper on each limit",
 "related":[
   ("QuickBooks inventory and WIP limits","/quickbooks-inventory-wip-limits/","Where stock tracking breaks"),
   ("QuickBooks job costing limits","/quickbooks-job-costing-limits/","Why your job costs are guesses"),
   ("QuickBooks multi-entity limits","/quickbooks-multi-entity-limits/","The multi-location ceiling"),
   ("Free Job Cost Calculator","/tools/job-cost-calculator/","True cost, margin, and price"),
   ("Reorder Point Calculator","/tools/reorder-point-calculator/","Never run out or overstock"),
   ("QuickBooks Desktop is changing","/quickbooks-desktop-sunset/","What the subscription shift means"),
   ("Apex Apparel: live in 12 days","/case-apex.html","A real QuickBooks-to-custom move"),
 ],
 "faqs":[
   ("When should a manufacturer move off QuickBooks?","When you are running inventory or job costing in spreadsheets alongside QuickBooks, when month-end takes too long, or when multiple locations force manual consolidation. Those are signs the accounting tool is now the bottleneck."),
   ("What should a manufacturer move to from QuickBooks?","A system built around the floor: real inventory and WIP, true job costing, and one source of truth across locations. SimpleGrid builds that custom to your operation and deploys it in 7 to 21 days."),
   ("Do we have to rip out QuickBooks all at once?","No. Many manufacturers keep QuickBooks for accounting at first and move operations onto a system built for the floor, then consolidate over time."),
 ],
 "final_h":"Outgrown QuickBooks? See a system built for your floor.",
},

# ---- T5.2 CLUSTER 1 ----
{
 "slug":"quickbooks-inventory-wip-limits",
 "title":"QuickBooks Inventory & WIP Limits for Manufacturers",
 "meta":"Why QuickBooks struggles with manufacturing inventory and work in process: no multi-level BOMs, no real WIP, no shop-floor tracking, and what to use instead.",
 "eyebrow":"QuickBooks limits",
 "h1":"QuickBooks and manufacturing inventory: where it breaks.",
 "lead":"QuickBooks tracks finished goods well enough. It was never built for the messy middle of manufacturing: raw materials becoming work in process becoming finished goods, across multi-level bills of materials, on a live shop floor. Here is exactly where that gap shows up.",
 "ticks":["Real WIP tracking","Multi-level BOMs","Live floor inventory"],
 "cta_id":"qb_inv_hero",
 "breadcrumb":[("Home","https://simplegrid.ai/"),("Outgrown QuickBooks","https://simplegrid.ai/quickbooks-manufacturing-limits/"),("Inventory and WIP","https://simplegrid.ai/quickbooks-inventory-wip-limits/")],
 "sections":[
   {"eyebrow":"The gap","h2":"No work in process, no multi-level BOM.","paras":[
     "Manufacturing inventory is not a single number. It is raw material, work in process at each stage, and finished goods, all moving at once. QuickBooks does not model work in process or multi-level bills of materials, so the value sitting on your floor never shows up accurately.",
     "The usual workaround is a spreadsheet that someone updates by hand. It is wrong the moment a job moves, and every decision made from it inherits that error."]},
   {"eyebrow":"What it costs","h2":"The hidden cost of guessing at stock.","paras":[
     "When inventory is a guess, you either carry too much (cash tied up on the floor) or too little (stockouts that stop a line). Both are expensive, and neither shows up cleanly in QuickBooks until month-end, long after you could have acted."]},
 ],
 "related_h":"Tools and next steps",
 "related":[
   ("Reorder Point Calculator","/tools/reorder-point-calculator/","Never run out or overstock"),
   ("Bill of Materials Builder","/tools/bill-of-materials-template/","Per-unit cost, CSV and PDF"),
   ("Back to: Outgrown QuickBooks","/quickbooks-manufacturing-limits/","The three walls overview"),
 ],
 "faqs":[
   ("Can QuickBooks track work in process?","Not in a real manufacturing sense. QuickBooks has no native concept of WIP across production stages or multi-level BOMs, so manufacturers track it in spreadsheets, which drift out of date quickly."),
   ("Does QuickBooks support multi-level bills of materials?","QuickBooks supports simple assemblies but struggles with deep, multi-level BOMs and routings. Manufacturers with sub-assemblies usually hit this wall fast."),
 ],
 "final_h":"See inventory and WIP tracked the way your floor actually works.",
},

# ---- T5.2 CLUSTER 2 ----
{
 "slug":"quickbooks-job-costing-limits",
 "title":"QuickBooks Job Costing Limits for Manufacturers",
 "meta":"Why job costing in QuickBooks falls short for manufacturers: no applied overhead, weak labor capture, and estimates instead of true cost. What to use instead.",
 "eyebrow":"QuickBooks limits",
 "h1":"Why job costing in QuickBooks falls apart on the floor.",
 "lead":"If you quote jobs, you live and die by true job cost. QuickBooks gives you a rough version: it can tag some costs to a job, but it does not properly apply overhead or capture real shop-floor labor. The result is a cost number you cannot fully trust, which means margins you cannot fully trust.",
 "ticks":["Materials, labor, and burden","Per-job true cost","Real margin, not a guess"],
 "cta_id":"qb_jobcost_hero",
 "breadcrumb":[("Home","https://simplegrid.ai/"),("Outgrown QuickBooks","https://simplegrid.ai/quickbooks-manufacturing-limits/"),("Job costing","https://simplegrid.ai/quickbooks-job-costing-limits/")],
 "sections":[
   {"eyebrow":"The gap","h2":"Estimates, not true cost.","paras":[
     "True job cost = direct materials + direct labor + applied overhead (burden). QuickBooks can attach invoices and some time to a job, but applying overhead per job and capturing real labor off the floor is where it breaks down. You end up with an estimate that ignores the cost of running the building.",
     "Quote off an estimate and you will take jobs that quietly lose money, and turn down jobs that would have been profitable."]},
   {"eyebrow":"What it costs","h2":"Underpriced jobs you never see.","paras":[
     "The dangerous part is that underpriced jobs look fine in QuickBooks. The overhead they failed to absorb just disappears into general expenses. You feel the squeeze at year-end without ever knowing which jobs caused it."]},
 ],
 "related_h":"Tools and next steps",
 "related":[
   ("Free Job Cost Calculator","/tools/job-cost-calculator/","True cost, margin, suggested price"),
   ("Labor Burden Rate Calculator","/tools/burden-rate-calculator/","What labor really costs"),
   ("Markup vs Margin Calculator","/tools/markup-vs-margin/","Stop the pricing error"),
   ("Back to: Outgrown QuickBooks","/quickbooks-manufacturing-limits/","The three walls overview"),
 ],
 "faqs":[
   ("Can QuickBooks do job costing for manufacturers?","QuickBooks offers basic job costing, but it does not properly apply manufacturing overhead per job or capture real shop-floor labor, so the cost figure is an estimate rather than true cost."),
   ("How do I calculate true job cost?","True job cost is direct materials plus direct labor plus applied overhead (your burden rate). Our free job cost calculator does the full calculation and suggests a price."),
 ],
 "final_h":"See true job cost captured automatically from your floor.",
},

# ---- T5.2 CLUSTER 3 ----
{
 "slug":"quickbooks-multi-entity-limits",
 "title":"QuickBooks Multi-Entity Limits for Manufacturers",
 "meta":"Running multiple plants or legal entities on QuickBooks means multiple files and manual consolidation. Where the multi-location ceiling hits and what to do.",
 "eyebrow":"QuickBooks limits",
 "h1":"QuickBooks across multiple locations and entities: the ceiling.",
 "lead":"One plant on QuickBooks is fine. Two plants, or two legal entities, and you are now reconciling separate files by hand, with no single live view of the business. The more you grow, the more time disappears into consolidation that should be automatic.",
 "ticks":["One source of truth","Cross-location inventory","Live consolidated view"],
 "cta_id":"qb_multi_hero",
 "breadcrumb":[("Home","https://simplegrid.ai/"),("Outgrown QuickBooks","https://simplegrid.ai/quickbooks-manufacturing-limits/"),("Multi-entity","https://simplegrid.ai/quickbooks-multi-entity-limits/")],
 "sections":[
   {"eyebrow":"The gap","h2":"Separate files, manual consolidation.","paras":[
     "QuickBooks handles a single entity well. Multiple locations or legal entities usually mean a file per entity, exported to spreadsheets and consolidated by hand at month-end. There is no live, cross-entity view of inventory, jobs, or cash.",
     "That manual consolidation is slow, error-prone, and always out of date. By the time the numbers are reconciled, the month is over and the decisions have already been made."]},
   {"eyebrow":"What it costs","h2":"No live view of the whole business.","paras":[
     "When you cannot see all locations at once, you cannot move inventory between them intelligently, compare plant performance, or spot a problem in one entity before it spreads. You are running a connected business on disconnected books."]},
 ],
 "related_h":"Tools and next steps",
 "related":[
   ("Operations Health Score","/tools/operations-health-score/","One number across your operation"),
   ("Manufacturing KPI Benchmark","/tools/manufacturing-kpi-benchmark/","Compare against peers"),
   ("Back to: Outgrown QuickBooks","/quickbooks-manufacturing-limits/","The three walls overview"),
 ],
 "faqs":[
   ("Can QuickBooks handle multiple locations or entities?","QuickBooks can run multiple files, but it does not give a single live view across entities. Multi-location manufacturers end up consolidating manually, which is slow and error-prone."),
   ("What is the alternative for a multi-plant manufacturer?","A single system that models all locations and entities with one source of truth. SimpleGrid builds that around your specific operation and deploys it in 7 to 21 days."),
 ],
 "final_h":"See every location in one live system.",
},

# ---- T5.3 ERP replacement ----
{
 "slug":"replace-your-erp",
 "title":"Replace Your ERP Without the Risk | SimpleGrid",
 "meta":"Stuck on a half-working SAP, NetSuite, or Epicor system? Replace your ERP without paying first. We build at our risk; you pay only after 30 days on your floor.",
 "eyebrow":"ERP replacement",
 "h1":"Your ERP is fighting your floor. Replace it without the risk.",
 "lead":"You bought an ERP and the floor still works around it in spreadsheets. Every change is a quote and a six-week wait. You are paying for a system your team avoids. The hard part of replacing it is the fear of repeating the mistake. We remove that: we build the replacement at our own risk, and you pay only after it works on your floor.",
 "ticks":["Built around your real workflow","Live in 7 to 21 days","Pay only if you keep it"],
 "cta_id":"replace_erp_hero",
 "breadcrumb":[("Home","https://simplegrid.ai/"),("Replace your ERP","https://simplegrid.ai/replace-your-erp/")],
 "sections":[
   {"eyebrow":"The trap","h2":"Why ERP replacement feels impossible.","paras":[
     "Most manufacturers stay on an ERP they dislike because switching means another large up-front payment, another long implementation, and another bet that this time it will fit. After one bad experience, that bet feels reckless.",
     "So the workarounds pile up. The floor runs on shadow spreadsheets, the ERP becomes a system of record nobody trusts, and the gap between what you paid for and what you use keeps growing."]},
   {"eyebrow":"The flip","h2":"See it work before you pay for it.","paras":[
     "SimpleGrid is the only vendor in the category that lets you see the system run before you pay. We model your actual operation, build the working system at our cost, and put it on your real floor for 30 days. If it does not work, you walk away and owe nothing. That removes the exact risk that keeps you stuck."]},
 ],
 "related_h":"Compare and decide",
 "related":[
   ("SimpleGrid vs NetSuite","/competitors/netsuite/","Built for the floor"),
   ("SimpleGrid vs SAP Business One","/competitors/sap-business-one/","Around your floor, not their template"),
   ("SimpleGrid vs Acumatica","/competitors/acumatica/","Pay only if you keep it"),
   ("All ERP comparisons","/competitors.html","Every rival, side by side"),
   ("Furniture exporter: live in 21 days","/case-furniture-manufacturer.html","A real 600-employee switch"),
 ],
 "faqs":[
   ("How do you replace an ERP without paying up front?","SimpleGrid builds the replacement at its own cost, you run it free on your real floor for 30 days, and you pay only if you keep it. The financial risk of switching sits with us, not you."),
   ("How long does ERP replacement take?","SimpleGrid models your operation and deploys a working custom system in 7 to 21 days, versus the 6 to 18 months a traditional ERP re-implementation takes."),
   ("What if the new system does not work either?","Then you walk away and owe nothing. That is the point of the 30-day live run: you see it work on your floor before any money changes hands."),
 ],
 "final_h":"Replace the ERP your floor avoids, without paying first.",
},

# ---- T5.4 Dynamics GP migration landing ----
{
 "slug":"dynamics-gp-migration",
 "title":"Dynamics GP Sunset: Migration Path | SimpleGrid",
 "meta":"Microsoft is sunsetting Dynamics GP. GP manufacturers need a migration path. SimpleGrid builds a custom replacement in 7 to 21 days, paid only when it works.",
 "eyebrow":"Dynamics GP sunset",
 "h1":"Dynamics GP is sunsetting. Move to a custom ERP in weeks.",
 "lead":"Microsoft is winding down Dynamics GP, and every GP manufacturer now needs a plan before support ends. The default path is a long, expensive migration to Business Central. There is a faster option: a system modeled on how your operation actually runs, deployed in 7 to 21 days, paid only after it works.",
 "ticks":["A real migration path","Live in 7 to 21 days","Pay only if you keep it"],
 "cta_id":"gp_migration_hero",
 "breadcrumb":[("Home","https://simplegrid.ai/"),("Dynamics GP migration","https://simplegrid.ai/dynamics-gp-migration/")],
 "sections":[
   {"eyebrow":"The deadline","h2":"GP is ending. Doing nothing is a decision.","paras":[
     "Dynamics GP is on a sunset path. Mainstream development has wound down and support has an end date. GP shops that wait will be making a forced, rushed decision later instead of a considered one now.",
     "The partner-default answer is a migration to Dynamics 365 Business Central: a months-long, six-figure project that re-implements your business on a new generic platform."]},
   {"eyebrow":"The alternative","h2":"A system built around your floor, not a re-implementation.","paras":[
     "Instead of forcing your operation into another generic module set, SimpleGrid models your actual operation as an SG Schema and generates the system from it. That is why it deploys in 7 to 21 days. And you pay only after a 30-day live run, so the migration risk sits with us."]},
 ],
 "related_h":"Read more and assess",
 "related":[
   ("Dynamics GP Sunset: the full story","/blog/dynamics-gp-sunset-switch-to-simplegrid/","Why GP is ending and what to do"),
   ("Do I Need an ERP?","/tools/erp-needs-assessment/","8 questions, a real number"),
   ("ERP Readiness Scorecard","/tools/erp-readiness-scorecard/","Diagnose before you migrate"),
   ("Replace your ERP without the risk","/replace-your-erp/","See it work before you pay"),
 ],
 "faqs":[
   ("When is Dynamics GP end of life?","Microsoft has put Dynamics GP on a sunset path with mainstream development wound down and a defined support end. GP manufacturers should plan a migration before support ends rather than wait for a forced move."),
   ("What should Dynamics GP users migrate to?","The default is Dynamics 365 Business Central, a long re-implementation. SimpleGrid offers a faster path: a custom system modeled on your operation, deployed in 7 to 21 days, paid only after it works."),
 ],
 "final_h":"On Dynamics GP? Get a migration path that fits your floor.",
},

# ---- T5.4 second angle (scaffold) ----
{
 "slug":"quickbooks-desktop-sunset",
 "title":"QuickBooks Desktop Sunset: What Manufacturers Do Next",
 "meta":"Intuit is pushing QuickBooks Desktop users to subscription and cloud. For manufacturers, it is a moment to rethink. Here is what changes and the options.",
 "eyebrow":"QuickBooks Desktop sunset",
 "h1":"QuickBooks Desktop is changing. Time for manufacturers to rethink.",
 "lead":"Intuit has been steadily moving QuickBooks Desktop toward subscription-only and pushing users to the cloud. For a manufacturer already stretching Desktop past its limits, a forced change is the right moment to ask a bigger question: should the floor still run on accounting software at all?",
 "ticks":["Built for the floor","Live in 7 to 21 days","Pay only if you keep it"],
 "cta_id":"qbd_sunset_hero",
 "breadcrumb":[("Home","https://simplegrid.ai/"),("QuickBooks Desktop sunset","https://simplegrid.ai/quickbooks-desktop-sunset/")],
 "sections":[
   {"eyebrow":"What is changing","h2":"From perpetual license to subscription.","paras":[
     "Intuit has shifted QuickBooks Desktop toward subscription pricing and is steering users to its online products. If you are going to re-subscribe or migrate anyway, it is worth asking whether the accounting tool should keep doubling as your operations system.",
     "For most growing manufacturers, the honest answer is no. The forced change is an opening to put the floor on a system actually built for it."]},
 ],
 "related_h":"Where to go next",
 "related":[
   ("When manufacturing outgrows QuickBooks","/quickbooks-manufacturing-limits/","The three walls"),
   ("QuickBooks job costing limits","/quickbooks-job-costing-limits/","Why job costs are guesses"),
   ("Do I Need an ERP?","/tools/erp-needs-assessment/","8 questions, a real number"),
 ],
 "faqs":[
   ("Is QuickBooks Desktop being discontinued?","Intuit has moved QuickBooks Desktop to subscription pricing and is steering users toward its cloud products. Whether or not a specific version is retired, the direction is clear, and it is a natural moment for manufacturers to reassess."),
 ],
 "final_h":"Re-subscribing anyway? See what a floor-first system looks like.",
},

]
