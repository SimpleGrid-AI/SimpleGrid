function BarsInfographic() {
  const [animate, setAnimate] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { setAnimate(true); obs.disconnect(); } });
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Volume share: CMT 55k, Brand 25k, Trading is fabric (different unit) -> shown as separate bar in meters or rolls
  const bars = [
    { cls: 'cmt',   label: 'CMT (contract)', value: 55000, max: 60000, display: '55,000', unit: 'shirts/mo' },
    { cls: 'brand', label: 'Own brand',      value: 25000, max: 60000, display: '25,000', unit: 'shirts/mo' },
    { cls: 'trade', label: 'Fabric trading', value: 38000, max: 60000, display: '~40,000', unit: 'meters/mo' },
  ];

  const locs = [
    { cls: 'a', count: '20+', h: 'Job worker units',  s: 'Cut · stitch · finish - across the city' },
    { cls: 'b', count: '10+', h: 'Logistics warehouses', s: 'Partner-operated, fabric & finished goods' },
    { cls: 'c', count: '2',   h: 'In-house operations',  s: 'Ironing & packaging only' },
  ];

  const flow = [
    { n: '01', h: 'Fabric procured',     p: 'PO raised, stock checked across all 30+ locations first' },
    { n: '02', h: 'Issued to job worker', p: 'Fabric + trims sent together, tracked per work order' },
    { n: '03', h: 'Production',           p: '20+ independent job workers, full cut-make-trim' },
    { n: '04', h: 'Returned & QC',        p: 'Reconciled against issued: yield, rejects, settlement' },
    { n: '05', h: 'Iron · pack · dispatch', p: 'In-house finishing, packed to buyer specs' },
  ];

  return (
    <div className="btn-info" ref={ref}>
      <div className="infographic-title">BY THE NUMBERS</div>
      <h2 className="infographic-h">Three streams. One inventory. Thirty-plus locations.</h2>

      <div className="btn-info-grid">
        {/* Volume by stream */}
        <div className="btn-bars">
          <h4>Monthly throughput by stream</h4>
          {bars.map(b => (
            <div key={b.label} className="bar-row">
              <div className="bar-label">{b.label}</div>
              <div className="bar-track">
                <div
                  className={'bar-fill ' + b.cls}
                  style={{ width: animate ? `${(b.value / b.max) * 100}%` : '0%' }}
                />
              </div>
              <div className="bar-value">
                {b.display}<br/>
                <span style={{fontSize:10,fontWeight:500,color:'var(--fg3)',letterSpacing:'0.05em'}}>{b.unit}</span>
              </div>
            </div>
          ))}
          <div style={{marginTop:18,paddingTop:14,borderTop:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.12em',color:'var(--fg3)'}}>TOTAL SHIRTS / MONTH</div>
            <div style={{fontFamily:'var(--font-heading)',fontSize:24,fontWeight:700,color:'var(--sg-blue)',letterSpacing:'-0.02em'}}>80,000 - 100,000</div>
          </div>
        </div>

        {/* Where the inventory lives */}
        <div className="btn-locations">
          <h4 style={{fontFamily:'var(--font-heading)',fontSize:14,fontWeight:700,margin:'0 0 4px'}}>Where the inventory lives</h4>
          <p style={{fontSize:12,color:'var(--fg3)',margin:'0 0 8px',lineHeight:1.5}}>Stock sits with partners and producers - not in a single factory. SimpleGrid tracks every roll, trim, and garment across all 30+ live locations.</p>
          {locs.map(l => (
            <div key={l.h} className="loc-row">
              <div className={'loc-icon ' + l.cls}>{l.count}</div>
              <div className="meta">
                <div className="h">{l.h}</div>
                <div className="s">{l.s}</div>
              </div>
              <div className="ct" style={{
                color: l.cls==='a' ? 'var(--sg-blue)' : l.cls==='b' ? 'var(--sg-gold)' : 'var(--sg-purple)'
              }}>●</div>
            </div>
          ))}
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginTop:6,paddingTop:14,borderTop:'1px solid var(--border)'}}>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.12em',color:'var(--fg3)'}}>LIVE INVENTORY POINTS</div>
            <div style={{fontFamily:'var(--font-heading)',fontSize:24,fontWeight:700,color:'var(--sg-blue)',letterSpacing:'-0.02em'}}>30+</div>
          </div>
        </div>
      </div>

      {/* Production flow */}
      <div className="btn-flow">
        {flow.map(f => (
          <div key={f.n} className="flow-cell">
            <div className="step-n">{f.n}</div>
            <div className="step-h">{f.h}</div>
            <div className="step-p">{f.p}</div>
          </div>
        ))}
      </div>

      {/* Outcome strip */}
      <div style={{marginTop:28,display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:0,border:'1px solid var(--sg-blue)',borderRadius:12,overflow:'hidden',background:'linear-gradient(135deg, rgba(74,123,247,0.04), rgba(74,123,247,0.08))'}}>
        {[
          { n: '24', u: 'hours', l: 'Working demo delivered' },
          { n: '12', u: 'days',  l: 'From kickoff to live' },
          { n: '34', u: '',      l: 'Domain entities tracked' },
          { n: '44', u: '',      l: 'Automatic triggers wired' },
        ].map((s,i) => (
          <div key={i} style={{padding:'22px 20px',borderRight:i<3?'1px solid rgba(74,123,247,0.25)':'none',textAlign:'center'}}>
            <div style={{fontFamily:'var(--font-heading)',fontSize:38,fontWeight:700,color:'var(--sg-blue)',letterSpacing:'-0.02em',lineHeight:1}}>
              {s.n}{s.u && <span style={{fontSize:14,color:'var(--fg3)',fontWeight:500,marginLeft:4}}>{s.u}</span>}
            </div>
            <div style={{fontSize:11,color:'var(--fg2)',marginTop:8,letterSpacing:'0.04em'}}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NetworkInfographic() {
  // Hub-and-spoke: central warehouse → 30 dots around (job workers + logistics warehouses)
  const cx = 400, cy = 240, r = 180;
  const nodes = Array.from({ length: 30 }, (_, i) => {
    const angle = (i / 30) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r, i };
  });
  // Honest categories (not arbitrary modulo): 20 job worker units, ~8 logistics
  // partner warehouses, 2 in-house (iron + pack) - matching the real counts.
  const colorOf = (i) => {
    if (i >= 28) return 'var(--sg-purple)';  // in-house (iron · pack)
    if (i >= 20) return 'var(--sg-gold)';    // logistics partner warehouses
    return 'var(--sg-blue)';                  // job worker units
  };
  return (
    <svg viewBox="0 0 800 480" className="network-svg">
      <defs>
        <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(74,123,247,0.25)" />
          <stop offset="100%" stopColor="rgba(74,123,247,0)" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r="120" fill="url(#hubGlow)" />
      {nodes.map((n, i) => (
        <line key={`l-${i}`} x1={cx} y1={cy} x2={n.x} y2={n.y} stroke={colorOf(i)} strokeWidth="1" opacity="0.35" className="spoke-line" style={{ animationDelay: `${i * 0.1}s` }} />
      ))}
      {nodes.map((n, i) => (
        <circle key={`d-${i}`} cx={n.x} cy={n.y} r="7" fill={colorOf(i)} className="spoke-dot" style={{ animationDelay: `${i * 0.08}s` }} />
      ))}
      {/* Hub */}
      <circle cx={cx} cy={cy} r="48" fill="#fff" stroke="var(--sg-blue)" strokeWidth="2.5" />
      <text x={cx} y={cy - 4} textAnchor="middle" fontFamily="var(--font-heading)" fontSize="11" fontWeight="700" fill="var(--fg1)" letterSpacing="0.04em">CENTRAL</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontFamily="var(--font-heading)" fontSize="11" fontWeight="700" fill="var(--fg1)" letterSpacing="0.04em">WAREHOUSE</text>
      {/* Legend */}
      <g transform="translate(40, 430)">
        <circle cx="6" cy="6" r="5" fill="var(--sg-blue)" />
        <text x="18" y="10" fontSize="11" fill="var(--fg2)">Job worker units (cut · stitch · finish)</text>
        <circle cx="280" cy="6" r="5" fill="var(--sg-gold)" />
        <text x="292" y="10" fontSize="11" fill="var(--fg2)">Logistics partner warehouses</text>
        <circle cx="540" cy="6" r="5" fill="var(--sg-purple)" />
        <text x="552" y="10" fontSize="11" fill="var(--fg2)">In-house (iron · pack)</text>
      </g>
      <text x={cx} y="40" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="0.14em" fill="var(--fg3)">30+ INVENTORY LOCATIONS · ALL VISIBLE IN ONE LEDGER</text>
    </svg>
  );
}

function ApexCaseStudy() {
  const [showLogin, setShowLogin] = React.useState(false);
  return (<>
    <main id="main">

    <section className="case-hero">
      <div className="container">
        <div className="tag">CASE STUDY · APPAREL MANUFACTURING</div>
        <h1>An apparel manufacturer running 80,000-100,000 shirts a month - without a factory of his own.</h1>
        <p className="case-hook">Two years. Two failed ERPs. Over $100,000 spent with nothing to show for it. The company runs three interconnected businesses through 20+ job workers and stores inventory at its logistics partners' warehouses - 30+ locations in total. Every generic ERP assumed a factory model. This operation does not have a factory.</p>
        <div className="confidential-banner">
          🔒 Client name withheld for confidentiality. We refer to them as "Apex Apparel" throughout this case study.
        </div>
        <div className="case-strip">
          <div className="case-strip-item"><div className="label">Monthly volume</div><div className="value">80k-100k shirts</div></div>
          <div className="case-strip-item"><div className="label">Operating model</div><div className="value">100% job work</div></div>
          <div className="case-strip-item"><div className="label">Inventory locations</div><div className="value">30+ tracked live</div></div>
          <div className="case-strip-item"><div className="label">Deployed in</div><div className="value">12 days</div></div>
        </div>
      </div>
    </section>

    <div className="container">

      {/* INFOGRAPHIC 1 - operation at a glance */}
      <div className="infographic">
        <div className="infographic-title">THE OPERATION AT A GLANCE</div>
        <h2 className="infographic-h">A factoryless apparel business, by the numbers.</h2>

        <div className="stat-row">
          <div className="stat-cell">
            <div className="stat-num">80-100<span className="unit">k</span></div>
            <div className="stat-label">Shirts manufactured per month, across all three streams</div>
          </div>
          <div className="stat-cell">
            <div className="stat-num">3</div>
            <div className="stat-label">Business streams: CMT, own brand, fabric trading</div>
          </div>
          <div className="stat-cell">
            <div className="stat-num">20<span className="unit">+</span></div>
            <div className="stat-label">Independent job workers across the city</div>
          </div>
          <div className="stat-cell">
            <div className="stat-num">30<span className="unit">+</span></div>
            <div className="stat-label">Inventory locations including logistics partner warehouses</div>
          </div>
        </div>

        <NetworkInfographic />

        <div className="split-row">
          <div className="split-card">
            <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.12em',color:'var(--sg-blue)'}}>STREAM 01 · CMT</div>
            <div className="vol">~55,000 / mo</div>
            <h4>Contract manufacturing</h4>
            <p>Cut-make-trim for external brand principals. Brand owns the IP, Apex owns the supply chain.</p>
          </div>
          <div className="split-card alt">
            <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.12em',color:'var(--sg-purple)'}}>STREAM 02 · OWN BRAND</div>
            <div className="vol">~25,000 / mo</div>
            <h4>Own-label retail</h4>
            <p>Their own designs, manufactured through the same job worker network, sold to retail buyers.</p>
          </div>
          <div className="split-card alt2">
            <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.12em',color:'var(--sg-gold)'}}>STREAM 03 · TRADING</div>
            <div className="vol">High-volume fabric</div>
            <h4>Fabric wholesale</h4>
            <p>Buying fabric in bulk and reselling to other manufacturers - a separate P&L on the same inventory ledger.</p>
          </div>
        </div>
      </div>

      {/* INFOGRAPHIC 2 - by the numbers */}
      <BarsInfographic />

      <section className="case-section">
        <div className="tag" style={{marginBottom:10}}>THE OPERATION</div>
        <h2>Three businesses, no factory of their own.</h2>
        <p style={{maxWidth:780}}>Apex runs <strong>three interconnected businesses</strong> on one inventory ledger: contract manufacturing for external brands, their own retail label, and high-volume fabric trading.</p>
        <p style={{maxWidth:780}}>The production model is <strong>100% job work</strong> - they don't cut and don't sew. Every garment is made at one of <strong>20+ job worker units</strong> across the city; only ironing and packaging happen in-house.</p>
        <p style={{maxWidth:780}}>And the stock isn't theirs to hold. Fabric, trims and finished goods sit at their <strong>logistics partners' warehouses</strong>. Add the job worker units, and at any moment Apex has inventory across <strong>30+ live locations</strong>.</p>
      </section>

      <section className="case-section">
        <div className="tag" style={{marginBottom:10}}>THE PROBLEM</div>
        <h2>What was breaking</h2>
        <p style={{maxWidth:780}}><strong>Two ERPs, two years, $100,000+ spent - and nothing that fit.</strong> Every off-the-shelf system assumed a factory. Apex doesn't have one, so each one broke on contact.</p>
        <div className="prob-grid">
          {[
            {icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/></svg>', t:'Inventory scattered everywhere', d:'Fabric, trims and goods across 20+ workers and 10+ warehouses - finding an order meant five phone calls.'},
            {icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>', t:'A BOM per work order', d:'Buttons, tags, labels and thread - all bought per order, issued, and reconciled by hand.'},
            {icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/></svg>', t:'Three businesses, one sheet', d:'A single fabric roll might be a CMT order, own stock, or a trading sale - nobody could tell.'},
            {icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>', t:'Reconciliation ate the day', d:'20+ workers issued fabric and trims and returning garments - all matched by hand, for hours.'},
            {icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V4M4 20h16"/><path d="M7 14l3-3 3 2 4-5"/></svg>', t:'Profit by stream: a guess', d:'Was CMT earning, or quietly subsidized by fabric trading? No way to know.'},
          ].map((p,i)=>(
            <div key={i} className="prob-card">
              <span className="prob-ic" dangerouslySetInnerHTML={{__html:p.icon}} />
              <div><div className="t">{p.t}</div><p className="d">{p.d}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="case-section">
        <div className="tag" style={{marginBottom:10}}>THE BUILD</div>
        <h2>What we built</h2>
        <p>We offered to build it free. The founder's first reaction was that we must be overconfident. Then we sent him a <strong>working demo in 24 hours</strong>: 60-70% accurate to how his operation actually runs, including the distributed job worker network, secondary material procurement, and three separate business streams.</p>
        <p>Over the next 11 days we did 4 working sessions with the founder and his operations head. Walked through every edge case.</p>
        <p style={{fontFamily:'var(--font-heading)',fontSize:'var(--fs-body)',fontWeight:700,color:'var(--sg-blue)',margin:'24px 0'}}>Day 12: live. For the first time, every order across 30+ locations sat in one view - and the founder could finally see which of his three businesses made money.</p>
      </section>

      <section className="case-section">
        <div className="tag" style={{marginBottom:10}}>THE PROCESS</div>
        <h2>The full CMT flow</h2>
        <p style={{maxWidth:780}}>One contract order, end to end - from the brand's work order to job worker settlement.</p>
        <div className="proc-pipe proc-anim">
          {[
            {t:'Work order received', d:'Specs in; SKUs auto-generated.'},
            {t:'BOM & specs built', d:'Fabric, trims, labels, patterns linked.'},
            {t:'Fabric & trims procured', d:'Stock checked first; only the shortfall ordered.'},
            {t:'Received & inspected', d:'Checked for defects, tracked by roll.'},
            {t:'Issued to job worker', d:'Fabric and trims go out together, tracked.'},
            {t:'Produced & returned', d:'Returns reconciled against expected yield.'},
            {t:'Ironed, packed, QC', d:'In-house finishing, pre-dispatch gate.'},
            {t:'Dispatched & settled', d:'Invoice out; worker auto-settled.'},
          ].map((s,i)=>(
            <div key={i} className="proc-node">
              <span className="proc-n" style={{animationDelay:(i*0.5)+'s'}}>{String(i+1).padStart(2,'0')}</span>
              <div className="t">{s.t}</div>
              <p className="d">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="case-section">
        <div className="tag" style={{marginBottom:10}}>GUARDRAILS</div>
        <h2>Rules the system enforces</h2>
        <p style={{maxWidth:780}}>Not suggestions - the system physically blocks the action.</p>
        <div className="guard-grid">
          {[
            "Can't issue fabric without an active work order.",
            "Can't receive more goods than the work order quantity.",
            "Can't start production until every trim is issued.",
            "Can't settle a job worker until returns are reconciled.",
            "Defective fabric rolls are quarantined from production.",
            "Wrong packaging or label format blocks the dispatch.",
          ].map((r,i)=>(
            <div key={i} className="guard-card">
              <span className="guard-badge" dangerouslySetInnerHTML={{__html:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 2.5v5c0 4.3-2.9 7.3-7 8.5-4.1-1.2-7-4.2-7-8.5v-5z"/><path d="M9.5 9.5l5 5M14.5 9.5l-5 5"/></svg>'}} />
              <p className="r">{r}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="case-section">
        <div className="tag" style={{marginBottom:10}}>RESULTS</div>
        <h2>What changed</h2>
        <div className="res-rows">
          <div className="res-row" style={{marginBottom:2,fontSize:11,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase'}}>
            <div style={{color:'var(--sg-red)'}}>Before SimpleGrid</div>
            <div></div>
            <div style={{color:'var(--sg-green)'}}>After SimpleGrid</div>
          </div>
          {[
            {b:'Two failed ERPs in two years; $100K+ spent', a:'Live in 12 days, modeled to the operation'},
            {b:'Finding an order meant 3-5 phone calls', a:'30+ locations in one live ledger'},
            {b:'Three businesses tangled in one spreadsheet', a:'Three clean P&Ls: CMT, own brand, trading'},
            {b:'Job worker reconciliation ate hours a day', a:'Issued vs. returned reconciled automatically'},
            {b:'Trims tracked by hand, per order', a:'Every button, tag and label on its own BOM'},
            {b:'Profit by stream was guesswork', a:'Margin visible per stream and per work order'},
          ].map((r,i)=>(
            <div key={i} className="res-row">
              <div className="res-cell res-before">{r.b}</div>
              <div className="res-arrow" dangerouslySetInnerHTML={{__html:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'}} />
              <div className="res-cell res-after">{r.a}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="testimonial-block">
        <RevealQuote text={`"When they said they'd deploy for free, I honestly thought it was overconfidence. Then I got a working demo in 24 hours - and it was 60-70% accurate to how we actually operate. That's when I knew these guys understood manufacturing. No other vendor we've worked with has shown me a working system before asking me to sign a check."`} />
        <div className="attr">- Founder, Apex Apparel <span style={{color:'var(--fg3)',fontWeight:400}}>(name withheld for confidentiality)</span></div>
      </div>

      <div className="case-bottom-line">
        <div className="big">Two years and two failed ERPs - then live in 12 days. 30+ locations in one ledger. Three businesses, three clear P&Ls.</div>
        <p>Two years and two failed ERPs. Then 12 days with SimpleGrid. Inventory visible across 20+ job worker facilities and 10+ logistics partner warehouses, all in one live ledger.</p>
        <a href="https://cal.com/simplegrid-ai" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{marginTop:16}}>Book a demo - See how we'd model your operations</a>
        <div style={{marginTop:20,fontSize:14}}>
          <a href="case-furniture-manufacturer.html" style={{color:'var(--sg-blue)',fontWeight:600,textDecoration:'none'}}>See a furniture manufacturer's deployment - live in 21 days →</a>
        </div>
      </div>
    </div>
    </main>

    <FinalCTA title="Want a result like Apex?" body="We'll configure SimpleGrid to how your floor actually runs, put it in your hands, and you run it live for 30 days. You pay only when it works." note="Limited slots each quarter. We onboard selectively." />
    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<ApexCaseStudy />);
