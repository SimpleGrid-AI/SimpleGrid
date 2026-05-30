LEADS={
 'automation-roi-estimator':"Automation ROI = (annual hours saved x fully loaded hourly cost) / cost of the automation. If manual data entry eats 20 hours a week, that is over 1,000 hours a year you pay for twice. Enter your numbers to see the payback.",
 'bill-of-materials-template':"A bill of materials (BOM) lists every component, quantity, and cost in one finished unit. Get per-unit cost right and every quote and margin downstream gets right too. Build yours below and export to CSV or PDF.",
 'business-valuation-calculator':"A manufacturer is usually valued at SDE or EBITDA times a market multiple. Customer concentration, owner dependence, and margin quality move the multiple more than revenue does. Enter your numbers for an SDE-based estimate.",
 'capacity-planning-calculator':"Capacity utilization = actual output / maximum possible output. Your bottleneck, not your average, sets your true capacity. Enter your line numbers to find the constraint before it costs you an order.",
 'cost-of-poor-quality':"Cost of poor quality (COPQ) = scrap + rework + warranty + inspection + lost goodwill. Most of it sits hidden below the waterline. Enter your defect and volume numbers to see the real annual cost.",
 'customer-concentration-risk':"Customer concentration = largest customer revenue / total revenue. Above 20 to 30 percent, buyers and lenders discount your business. Enter your top customers to see your risk and its effect on valuation.",
 'digital-maturity-assessment':"Digital maturity measures how far your operation has moved from paper and spreadsheets toward integrated, real-time systems (Industry 4.0). Answer the questions to see your level and the biggest gap to close next.",
 'erp-needs-assessment':"Not every manufacturer needs an ERP yet. This 8-question assessment scores your processes, data, and pain against the cost of an ERP and gives you a real do-it-or-wait number in about 3 minutes.",
 'erp-readiness-scorecard':"ERP readiness is whether your processes, data, and team can support a system before you buy one. Most failed projects skipped this step. Score your readiness across the key dimensions and see the gaps.",
 'exit-readiness-scorecard':"Exit readiness measures how prepared your business is to survive due diligence and sell at a strong multiple. 20 questions across 5 pillars give you a score and a 12-month preparation roadmap.",
 'expansion-roi-calculator':"Expansion ROI = added annual profit / total cost of the expansion. A GO needs the return to clear your cost of capital and your risk. Enter the numbers for a clear GO or NO-GO.",
 'hire-vs-overtime':"This compares the fully loaded cost of a new hire against paying overtime for the same output. Overtime looks cheaper until you add fatigue, error, and burnout. Enter your numbers to see the real break-even.",
 'insurance-coverage-checklist':"This checklist covers the lines a manufacturer should carry: property, general liability, product liability, business interruption, equipment breakdown, and more. Work through it to find the gaps your broker may have missed.",
 'invoice-generator':"Create a branded, professional invoice with line items, tax, and totals, and export it to PDF in about 30 seconds. Free, no signup. Fill in your details below and download.",
 'iso-9001-readiness':"ISO 9001 readiness is a clause-by-clause check of your quality management system against the standard. This tool walks each clause and shows your gaps before the auditor does.",
 'lease-vs-buy-equipment':"Lease vs buy comes down to net present value (NPV): the after-tax cash cost of leasing versus owning, discounted to today. The sticker comparison usually misleads. Enter the terms to see the real NPV of each.",
 'make-vs-buy-calculator':"Make vs buy compares your true internal cost (materials + labor + overhead) against the supplier price, plus the strategic factors price alone misses. Enter both sides for a clear, defensible decision.",
 'manufacturing-kpi-benchmark':"This tool scores 5 essential manufacturing KPIs (such as OEE, on-time delivery, scrap rate, and inventory turns) against typical industry ranges. Enter your numbers to see where you lead and where you lag.",
 'operations-health-score':"Your operations health score rolls up the core signals of a healthy factory (throughput, quality, delivery, cost, and people) into one number. Answer the questions to get your score and your weakest area.",
 'osha-compliance-checklist':"This self-audit walks 25 OSHA essentials manufacturers are most often cited for, with the real penalty exposure for each. Work through it to find your gaps before an inspection does.",
 'production-schedule-template':"A production schedule maps jobs to machines and days so you can see load, gaps, and conflicts at a glance. Build a Gantt-style schedule below and export it. Free, no signup.",
 'purchase-order-generator':"Create a clean, numbered purchase order with vendor, line items, and totals, and export it to PDF in about 30 seconds. Free, no signup. Fill in the details and download.",
 'quality-inspection-checklist':"Build a reusable quality inspection checklist with your own criteria, pass/fail, and notes, then export it for the floor. Free, no signup. Define your checks below.",
 'quote-generator':"Create a professional quote or estimate with line items, terms, and totals, and export it to PDF in about 30 seconds. Free, no signup. Fill in the details and download.",
 'sde-calculator':"SDE (seller's discretionary earnings) = net profit + owner salary + owner perks + non-recurring expenses. It is what a buyer actually takes home, and the base most small manufacturers are valued on. Enter your figures to compute it.",
}
n=0
for slug,lead in LEADS.items():
    f='tools/%s/index.html'%slug
    raw=open(f,encoding='utf-8').read()
    if 'tool-lead' in raw: 
        continue
    assert '—' not in lead, slug
    raw=raw.replace('</h1>','</h1>\n    <p class="tool-lead">%s</p>'%lead,1)
    open(f,'w').write(raw); n+=1
print('remaining tool leads added:',n)
