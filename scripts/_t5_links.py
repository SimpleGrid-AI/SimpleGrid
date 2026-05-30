import re
def edit(f, old, new, count=1):
    s=open(f,encoding='utf-8').read()
    assert old in s, 'NOT FOUND in %s: %s'%(f, old[:60])
    open(f,'w',encoding='utf-8').write(s.replace(old,new,count)); return True

# 1) tools hub: Guides block before final-cta-band
guides=('<section class="container" style="padding:32px 0">'
  '<div style="font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#3461E0;margin-bottom:10px">Guides for manufacturers</div>'
  '<h2 style="margin:0 0 16px">Go beyond a single number.</h2>'
  '<ul style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;list-style:none;padding:0;margin:0">'
  '<li><a href="../manufacturing-valuation/" style="display:block;border:1px solid #e6e6ee;border-radius:10px;padding:14px;text-decoration:none;color:inherit"><strong>What your business is worth</strong><br><span style="font-size:13px;color:#5a6072">Valuation and exit guide</span></a></li>'
  '<li><a href="../erp-readiness/" style="display:block;border:1px solid #e6e6ee;border-radius:10px;padding:14px;text-decoration:none;color:inherit"><strong>Are you ready for an ERP?</strong><br><span style="font-size:13px;color:#5a6072">Readiness assessments</span></a></li>'
  '<li><a href="../quickbooks-manufacturing-limits/" style="display:block;border:1px solid #e6e6ee;border-radius:10px;padding:14px;text-decoration:none;color:inherit"><strong>Outgrown QuickBooks?</strong><br><span style="font-size:13px;color:#5a6072">Where it breaks for manufacturers</span></a></li>'
  '<li><a href="../replace-your-erp/" style="display:block;border:1px solid #e6e6ee;border-radius:10px;padding:14px;text-decoration:none;color:inherit"><strong>Replace your ERP</strong><br><span style="font-size:13px;color:#5a6072">Without paying first</span></a></li>'
  '<li><a href="../dynamics-gp-migration/" style="display:block;border:1px solid #e6e6ee;border-radius:10px;padding:14px;text-decoration:none;color:inherit"><strong>Dynamics GP sunset</strong><br><span style="font-size:13px;color:#5a6072">Your migration path</span></a></li>'
  '</ul></section>\n')
edit('tools/index.html','<section class="final-cta-band">', guides+'<section class="final-cta-band">')

# 2) pillar up-links in valuation + erp tools' related-tools block
PILLARS={'manufacturing-valuation':['business-valuation-calculator','ebitda-calculator','sde-calculator','exit-readiness-scorecard','customer-concentration-risk','revenue-per-employee'],
         'erp-readiness':['erp-needs-assessment','erp-readiness-scorecard','digital-maturity-assessment','operations-health-score']}
PLABEL={'manufacturing-valuation':'Manufacturing valuation guide','erp-readiness':'Are you ready for an ERP?'}
for pillar,tools in PILLARS.items():
    for t in tools:
        f='tools/%s/index.html'%t
        s=open(f).read()
        anchor='<li><a href="../">See all 35 manufacturer tools</a></li>'
        if anchor in s and pillar not in s:
            up='<li><a href="/%s/">%s</a></li>'%(pillar,PLABEL[pillar])
            open(f,'w').write(s.replace(anchor, up+anchor,1))

# 3) competitor re-angle (T5.5) + replace-erp link: netsuite, sap-business-one, acumatica
REANGLE={
 'netsuite':("For a sub-$50M custom manufacturer","If you are a make-to-order shop under about $50M in revenue, NetSuite is often more platform than you need: broad, powerful, and priced and implemented for larger, multi-entity finance teams. A system built around your one floor lands faster and costs less to run."),
 'sap-business-one':("For a single-plant shop under $30M","SAP Business One is strong for distribution and multi-entity finance, but a single-plant manufacturer under about $30M usually pays for breadth it never uses, plus a partner for every change. A system shaped to your floor is a closer fit."),
 'acumatica':("For a make-to-order shop under $50M","Acumatica is a capable mid-market suite, but a smaller make-to-order manufacturer often does not need the full platform or its implementation timeline. A system built around your exact workflow deploys in days, not weeks."),
}
for slug,(h,p) in REANGLE.items():
    f='competitors/%s/index.html'%slug
    s=open(f).read()
    if 'reangle' in s: continue
    block=('<section class="cd-reasons reangle"><div class="container">'
           '<div class="eyebrow">Right-sized</div><h2>%s</h2>'
           '<p style="max-width:68ch">%s</p>'
           '<p style="max-width:68ch">Not sure the incumbent is fighting your floor? See <a href="/replace-your-erp/">how to replace an ERP without paying first</a>.</p>'
           '</div></section>\n')%(h,p)
    anchor='<section class="cd-final">'
    if anchor in s:
        open(f,'w').write(s.replace(anchor, block+'  '+anchor,1))

# 4) GP blog -> gp-migration landing link (add into its related-tools block)
f='blog/dynamics-gp-sunset-switch-to-simplegrid/index.html'
s=open(f).read()
anchor='<li><a href="/tools/">See all 35 manufacturer tools</a></li>'
if 'dynamics-gp-migration' not in s and anchor in s:
    add='<li><a href="/dynamics-gp-migration/">Dynamics GP migration path</a></li>'
    open(f,'w').write(s.replace(anchor, add+anchor,1))
print('linking done')
