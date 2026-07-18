const COMPARE = [
  { metric: 'What they\'re built for',     us: 'CPG brands, manufacturers and inventory-led businesses', sap: 'F500 finance, multi-country tax, public-co close', netsuite: 'Mid-to-large multi-entity ops', qbe: 'Bookkeeping for small businesses' },
  { metric: 'Time to value',               us: 'Live in 3 weeks or less', sap: '12-18 months',  netsuite: '6-12 months',                qbe: 'Same day for books - breaks as ops scale' },
  { metric: 'Up-front cost',               us: '$0',                    sap: '$150K-$500K+',  netsuite: '$25K-$100K implementation',  qbe: '$1.7K/yr/user + add-ons' },
  { metric: 'Change-order fees',           us: 'None. Ever.',           sap: '$8K-$20K each', netsuite: '$200+/hr consultant',        qbe: 'Per add-on / SuiteApp' },
  { metric: 'Try-before-you-buy',          us: '30 days on your real operation, real orders',  sap: 'Sandbox demos',  netsuite: 'Sandbox demos', qbe: 'Free tier' },
];

const BUILD_ITEMS = [
  ['Modeling sessions', 'we map your products, stages and rules.'],
  ['Working demo in 72 hours', 'a live system, not a slideshow.'],
  ['Data migration', 'spreadsheets, exports and group chats moved in.'],
  ['Team training', 'if your team can text, they can use it.'],
  ['Senior-led onboarding', 'engineers, not account managers.'],
  ['All future changes', 'new rules and stages, no change orders.'],
];

const FAQS = [
  { q: 'How much does SimpleGrid cost after the 30 days?', a: 'You get a quote after the first call, before the deep dive. One monthly subscription is the entire bill - no setup, no add-ons, no per-seat fees.' },
  { q: 'What does "you walk if it doesn\'t work" actually mean?', a: 'At the end of 30 days you decide. If it is not running your operation, you walk with a clean export and no invoice.' },
  { q: 'Why isn\'t this the cheapest option on the table?', a: 'We carry the build, the risk and the 30-day trial, so the price reflects the result. Cheap ERP exists, but it will not show you a working system before you pay.' },
  { q: 'Who is SimpleGrid built for?', a: 'CPG brands, manufacturers and inventory-led businesses doing $5M-$250M in revenue. Senior engineers build every deployment.' },
  { q: 'Do I get new features as you ship them?', a: 'Yes. Every feature we ship rolls out to every customer at no extra cost.' },
];

function PricingPage() {
  const [showLogin, setShowLogin] = React.useState(false);
  const [showInvite, setShowInvite] = React.useState(false);
  const [openFaq, setOpenFaq] = React.useState(0);

  return (<>
    <main id="main">

    {/* HERO - light */}
    <section className="section" style={{paddingTop:150, paddingBottom:100}}>
      <div className="container">
        <div className="tag">PRICING</div>
        <h1 className="h1" style={{maxWidth:880, margin:'0 0 18px'}}>
          You carry nothing until you see it run.
        </h1>
        <p className="lead" style={{maxWidth:760, margin:0}}>
          The build is on us. Your books stay in QuickBooks, Tally or Zoho. You pay only after 30 days live on your real operation.
        </p>
        <div style={{marginTop:28, display:'flex', gap:12, flexWrap:'wrap'}}>
          <button type="button" onClick={() => setShowInvite(true)} className="btn btn-lg btn-invite" data-cta="pricing_hero">Book a demo →</button>
        </div>
        <div style={{marginTop:32, display:'flex', gap:10, flexWrap:'wrap'}}>
          {['≤3 weeks to go live', '30-day trial', '$0 up front'].map((c, i) => (
            <span key={i} style={{fontSize:'var(--fs-caption)', fontWeight:600, color:'var(--fg2)', background:'#fff', border:'1px solid var(--border)', borderRadius:999, padding:'8px 14px'}}>{c}</span>
          ))}
        </div>
      </div>
    </section>

    {/* THE OFFER: build + 30-day trial, then the subscription */}
    <section className="offer section section-roomy" aria-labelledby="offer-h2">
      <div className="offer-inner">
        <Reveal>
          <p className="offer-eyebrow">The offer</p>
          <h2 className="offer-h2" id="offer-h2">Try it on. Then pay.</h2>
          <p className="offer-sub">Most ERPs charge first and hope. We build first. You run it free for 30 days, then you decide.</p>
        </Reveal>

        <Reveal delay={100}>
          <div className="offer-cards">
            <div className="offer-card offer-card-hero">
              <span className="offer-badge">Start here · $0</span>
              <p className="offer-card-eyebrow">Build + 30-day trial</p>
              <p className="offer-card-sub">You carry no cost until you see it run.</p>
              <div className="offer-price">$0</div>
              <p className="offer-card-caption">For the build. For the migration. For the 30 days on your real operation.</p>
              <ul className="offer-checks">
                <li>Configured to your operation.</li>
                <li>Live in 3 weeks or less, at our cost.</li>
                <li>Run it live for 30 days, free.</li>
                <li>Doesn't work? You walk. No invoice.</li>
              </ul>
            </div>

            <div className="offer-then" aria-hidden="true"><span>then</span></div>

            <div className="offer-card offer-card-outcome">
              <p className="offer-card-eyebrow">After it works</p>
              <p className="offer-card-sub">Monthly subscription. One number, all in.</p>
              <div className="offer-price offer-price-sm">Custom-quoted</div>
              <p className="offer-card-caption">We carried the build, so the price reflects the result, not the risk.</p>
              <ul className="offer-checks offer-checks-muted">
                <li>One monthly subscription. The entire bill.</li>
                <li>Every feature included. No tiers, no add-ons.</li>
                <li>No per-seat fees.</li>
                <li>A direct line to the team that builds it.</li>
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="offer-cta">
            <a href="https://cal.com/simplegrid-ai" target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-primary" data-cta="pricing_offer">Book the intro call</a>
          </div>
          <p className="offer-note">We onboard selectively. A senior engineer leads every build, so we take on a few new operations at a time.</p>
        </Reveal>
      </div>

      <style>{`
        .offer { background: rgba(250,251,252,0.4); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .offer-inner { max-width: 1040px; margin: 0 auto; padding: 0 32px; }
        .offer-eyebrow { display: inline-block; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--sg-blue); margin: 0 0 16px; padding: 7px 15px; border-radius: 10px; background: color-mix(in srgb, var(--sg-blue) 9%, transparent); border: 1px solid color-mix(in srgb, var(--sg-blue) 20%, transparent); }
        .offer-h2 { font-family: var(--font-heading); font-size: clamp(30px, 4vw, 42px); font-weight: 700; letter-spacing: -0.025em; line-height: 1.08; color: var(--fg1); margin: 0 0 14px; }
        .offer-sub { font-size: 17px; line-height: 1.6; color: var(--fg2); margin: 0; max-width: 780px; }
        .offer-cards { margin-top: 48px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: stretch; gap: 10px; }
        .offer-card { position: relative; border: 1px solid var(--border); border-radius: 18px; padding: 36px 32px; display: flex; flex-direction: column; min-height: 420px; transition: transform .2s ease, box-shadow .2s ease; }
        .offer-card:hover { transform: translateY(-4px); }
        .offer-card-hero { background: #fff; border-color: color-mix(in srgb, var(--sg-blue) 50%, transparent); box-shadow: 0 18px 44px rgba(52,97,224,0.14); }
        .offer-card-hero:hover { box-shadow: 0 26px 64px rgba(52,97,224,0.24); }
        .offer-card-outcome { background: #F1F3F7; }
        .offer-card-hero .offer-price { color: var(--sg-blue); }
        .offer-badge { position: absolute; top: -13px; left: 30px; background: var(--sg-blue); color: #fff; font-size: 10.5px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 6px 14px; border-radius: 999px; box-shadow: 0 6px 16px rgba(52,97,224,0.32); }
        .offer-card-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--sg-blue); margin: 6px 0 4px; }
        .offer-card-outcome .offer-card-eyebrow { color: var(--fg3); }
        .offer-card-sub { font-size: 13.5px; color: var(--fg3); margin: 0 0 18px; }
        .offer-price { font-family: var(--font-heading); font-size: 46px; font-weight: 700; color: var(--fg1); letter-spacing: -0.03em; line-height: 1; }
        .offer-price-sm { font-size: 34px; }
        .offer-card-caption { font-size: 12.5px; color: var(--fg3); margin: 9px 0 20px; line-height: 1.5; }
        .offer-checks { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
        .offer-checks li { position: relative; padding-left: 26px; font-size: 14px; line-height: 1.5; color: var(--fg1); }
        .offer-checks li::before { content: "\\2713"; position: absolute; left: 0; top: 0; color: var(--sg-blue); font-weight: 800; }
        .offer-checks-muted li { color: var(--fg2); }
        .offer-checks-muted li::before { color: var(--fg3); }
        .offer-then { align-self: center; display: flex; justify-content: center; }
        .offer-then span { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--fg3); background: #fff; border: 1px solid var(--border); border-radius: 999px; padding: 7px 13px; white-space: nowrap; }
        .offer-cta { margin-top: 40px; text-align: center; }
        .offer-note { margin: 18px auto 0; text-align: center; font-size: 13.5px; line-height: 1.6; color: var(--fg3); max-width: 520px; }
        @media (max-width: 860px) {
          .offer-cards { grid-template-columns: 1fr; gap: 0; }
          .offer-card { min-height: 0; }
          .offer-then { padding: 16px 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .offer-card { transition: none; }
        }
      `}</style>
    </section>

    {/* WHAT THE BUILD COVERS */}
    <section className="section section-alt section-roomy" aria-labelledby="builds-h2">
      <div className="container">
        <Reveal>
          <div className="tag">WHAT THE BUILD COVERS</div>
          <h2 className="h2" id="builds-h2" style={{maxWidth:640}}>What we build before you owe us anything.</h2>
        </Reveal>
        <Reveal delay={100}>
          <ul className="builds-list">
            {BUILD_ITEMS.map(([h, p], i) => (
              <li key={i}><strong>{h}</strong> - {p}</li>
            ))}
          </ul>
        </Reveal>
      </div>
      <style>{`
        .builds-list { list-style: none; margin: 30px 0 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 14px 44px; max-width: 900px; }
        .builds-list li { position: relative; padding-left: 26px; font-size: 15px; line-height: 1.55; color: var(--fg2); }
        .builds-list li::before { content: "\\2713"; position: absolute; left: 0; top: 0; color: var(--sg-blue); font-weight: 800; }
        .builds-list strong { font-family: var(--font-heading); font-weight: 700; color: var(--fg1); }
        @media (max-width: 720px) {
          .builds-list { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>

    {/* COMPARISON TABLE */}
    <section className="section section-roomy">
      <div className="container">
        <div className="tag">COMPARE - HONESTLY</div>
        <h2 className="h2" style={{maxWidth:760}}>How we compare on the line items that actually move money.</h2>
        <p className="lead" style={{maxWidth:960}}>
          Sticker prices rarely tell the truth. These line items are where ERP budgets quietly inflate.
        </p>
        <div className="cmp-scroll">
          <table className="cmp-table">
            <thead>
              <tr>
                <th className="cmp-th cmp-th-metric">Line item</th>
                <th className="cmp-th cmp-th-us">SimpleGrid</th>
                <th className="cmp-th">SAP Business One</th>
                <th className="cmp-th">NetSuite</th>
                <th className="cmp-th">QuickBooks Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((r,i) => (
                <tr key={i} className="cmp-row">
                  <td className="cmp-metric">{r.metric}</td>
                  <td className={"cmp-cell-us" + (i === COMPARE.length - 1 ? " cmp-cell-us-last" : "")}>
                    <span className="cmp-check" aria-hidden="true">✓</span>{r.us}
                  </td>
                  <td className="cmp-cell">{r.sap}</td>
                  <td className="cmp-cell">{r.netsuite}</td>
                  <td className="cmp-cell">{r.qbe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="cmp-note">
          Competitor figures are ranges based on public implementation data for mid-market companies (200-1,500 employees). Your quote may differ.
        </p>
      </div>
      <style>{`
        .cmp-scroll { overflow-x: auto; margin-top: 30px; background: #fff; border: 1px solid var(--border); border-radius: var(--radius-lg); box-shadow: 0 1px 2px rgba(20,28,46,0.04); padding: 6px 20px; }
        .cmp-table { width: 100%; min-width: 820px; border-collapse: separate; border-spacing: 0; }
        .cmp-th { font-family: var(--font-heading); font-weight: 700; font-size: 13.5px; color: var(--fg2); text-align: left; padding: 16px 18px; vertical-align: bottom; border-bottom: 1px solid var(--sg-black); letter-spacing: -0.005em; }
        .cmp-th-metric { color: var(--fg3); font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.09em; border-right: 1px solid var(--sg-black); }
        .cmp-th-us { color: var(--sg-blue); background: rgba(52,97,224,0.07); border-bottom: 1px solid var(--sg-black); border-top-left-radius: 12px; border-top-right-radius: 12px; }
        .cmp-metric { font-family: var(--font-heading); font-weight: 700; font-size: 14px; color: var(--fg1); padding: 16px 18px; border-bottom: 1px solid var(--border); border-right: 1px solid var(--sg-black); letter-spacing: -0.005em; transition: background .15s ease; }
        .cmp-cell { font-size: 13.5px; color: var(--fg2); padding: 16px 18px; border-bottom: 1px solid var(--border); line-height: 1.5; transition: background .15s ease; }
        .cmp-cell-us { position: relative; font-size: 13.5px; font-weight: 600; color: var(--sg-blue); padding: 16px 18px 16px 38px; background: rgba(52,97,224,0.07); border-bottom: 1px solid rgba(52,97,224,0.14); line-height: 1.5; transition: background .15s ease; }
        .cmp-cell-us-last { border-bottom: none; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; }
        .cmp-check { position: absolute; left: 18px; top: 16px; color: var(--sg-blue); font-size: 12px; font-weight: 700; opacity: 0.85; }
        .cmp-row { animation: cmpRowIn .5s ease both; }
        .cmp-row:nth-child(1) { animation-delay: .04s; }
        .cmp-row:nth-child(2) { animation-delay: .10s; }
        .cmp-row:nth-child(3) { animation-delay: .16s; }
        .cmp-row:nth-child(4) { animation-delay: .22s; }
        .cmp-row:nth-child(5) { animation-delay: .28s; }
        @keyframes cmpRowIn { from { opacity: 0; } to { opacity: 1; } }
        .cmp-row:hover .cmp-cell, .cmp-row:hover .cmp-metric { background: rgba(20,28,46,0.02); }
        .cmp-row:hover .cmp-cell-us { background: rgba(52,97,224,0.12); }
        .cmp-row:last-child .cmp-cell, .cmp-row:last-child .cmp-metric { border-bottom: none; }
        .cmp-note { font-size: var(--fs-tag); color: var(--fg3); margin-top: 16px; font-style: italic; }
        @media (max-width: 720px) {
          .cmp-scroll { padding: 6px 6px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cmp-row { animation: none; opacity: 1; }
          .cmp-cell, .cmp-cell-us, .cmp-metric { transition: none; }
        }
      `}</style>
    </section>

    {/* TESTIMONIAL */}
    <section className="section section-beige section-roomy">
      <div className="container" style={{maxWidth:860}}>
        <Reveal>
          <blockquote style={{margin:0, textAlign:'center'}}>
            <p style={{fontFamily:'var(--font-heading)', fontSize:'clamp(22px, 3vw, 30px)', fontWeight:700, letterSpacing:'-0.02em', lineHeight:1.35, color:'var(--fg1)', margin:0}}>
              "They modeled our whole operation in three weeks. We found $200K in losses we could never see."
            </p>
            <footer style={{marginTop:18, fontSize:'var(--fs-small)', color:'var(--fg2)'}}>
              Chirag, Founder, Elite Arts &amp; Crafts
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>

    {/* FAQ */}
    <section className="section section-alt section-roomy">
      <div className="container">
        <div className="tag">FAQ</div>
        <h2 className="h2">Pricing questions, answered.</h2>
        <div style={{marginTop:32,display:'flex',flexDirection:'column',gap:12,maxWidth:880}}>
          {FAQS.map((f, i) => (
            <div key={i} style={{background:'#fff',border:'1px solid var(--border)',borderRadius:'var(--radius-lg)',overflow:'hidden'}}>
              <button type="button" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}
                style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',gap:16,padding:'18px 22px',background:'none',border:'none',cursor:'pointer',font:'inherit',color:'inherit',textAlign:'left'}}>
                <span style={{fontFamily:'var(--font-heading)',fontSize:16,fontWeight:700,color:'var(--fg1)',letterSpacing:'-0.005em'}}>{f.q}</span>
                <span aria-hidden="true" style={{flexShrink:0,color:'var(--sg-blue)',fontSize:22,fontWeight:300,transform:openFaq===i?'rotate(45deg)':'none',transition:'transform 180ms ease'}}>+</span>
              </button>
              {openFaq === i && (
                <div style={{padding:'0 22px 18px',fontSize:'var(--fs-small)',lineHeight:1.65,color:'var(--fg2)'}}>{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>

    </main>

    <FinalCTA title="The price is simple: nothing until it works." body="We carry the build and the risk. You run it for 30 days on your real operation, with your real team and real orders. You pay only once it works." note="Live in 3 weeks or less. $0 up front." />
    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
    <div className="mobile-cta">
      <button type="button" onClick={() => setShowInvite(true)} className="btn btn-invite" data-cta="pricing_mobile">Book a demo</button>
    </div>

  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<PricingPage />);
