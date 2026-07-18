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
      <text x={cx} y="40" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="0.14em" fill="var(--fg3)">30+ STOCK LOCATIONS · ALL IN ONE VIEW</text>
    </svg>
  );
}

function ApexCaseStudy() {
  const [showLogin, setShowLogin] = React.useState(false);
  return (<>
    <main id="main">

    <section className="case-hero">
      <div className="container">
        <div className="tag">CASE STUDY - APPAREL MANUFACTURING</div>
        <h1>An apparel maker went live in 12 days.</h1>
        <p style={{fontSize:14,color:'var(--fg3)',margin:'0 0 18px'}}>Name withheld - reference on request.</p>
        <div className="case-strip">
          <div className="case-strip-item"><div className="label">To live</div><div className="value">12 days</div></div>
          <div className="case-strip-item"><div className="label">Business lines, one system</div><div className="value">3</div></div>
          <div className="case-strip-item"><div className="label">Stock locations, one view</div><div className="value">30+</div></div>
          <div className="case-strip-item"><div className="label">Working demo</div><div className="value">72 hrs</div></div>
        </div>
      </div>
    </section>

    <div className="container">

      {/* Background */}
      <section className="case-section">
        <div className="tag" style={{marginBottom:10}}>BACKGROUND</div>
        <h2>Three businesses. No factory.</h2>
        <p style={{maxWidth:780}}>
          Apex Apparel makes 80,000 to 100,000 shirts a month without a factory of its own. Production runs through 20+ job workers across the city. Stock sits in partner warehouses. Three streams share one inventory: contract manufacturing, an own brand, and fabric trading.
        </p>
        <NetworkInfographic />
      </section>

      {/* Challenge */}
      <section className="case-section">
        <div className="tag" style={{marginBottom:10}}>CHALLENGE</div>
        <h2>Every ERP assumed a factory.</h2>
        <p style={{maxWidth:780}}>
          Two rollouts failed over two years and cost more than $100,000. Finding one order meant five phone calls across 30+ locations. Job worker reconciliation ate hours every day. Nobody could say which of the three businesses made money.
        </p>
      </section>

      {/* What we built */}
      <section className="case-section">
        <div className="tag" style={{marginBottom:10}}>WHAT WE BUILT</div>
        <h2>Modeled as-is. Live on day 12.</h2>
        <p style={{maxWidth:780}}>
          We sent a working demo in 72 hours. It already covered the job worker network and all three streams. Four working sessions later, the system went live on day 12. Every order and every roll of fabric now sits in one view.
        </p>
        <p style={{maxWidth:780}}>Three of the rules it enforces:</p>
        <div className="guard-grid">
          {[
            "Can't issue fabric without an active work order.",
            "Can't settle a job worker until returns are reconciled.",
            "Wrong packaging or label format blocks the dispatch.",
          ].map((r,i)=>(
            <div key={i} className="guard-card">
              <span className="guard-badge" dangerouslySetInnerHTML={{__html:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 2.5v5c0 4.3-2.9 7.3-7 8.5-4.1-1.2-7-4.2-7-8.5v-5z"/><path d="M9.5 9.5l5 5M14.5 9.5l-5 5"/></svg>'}} />
              <p className="r">{r}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Impact */}
      <section className="case-section">
        <div className="tag" style={{marginBottom:10}}>IMPACT</div>
        <h2>What changed</h2>
        <div className="res-rows">
          <div className="res-row" style={{marginBottom:2,fontSize:11,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase'}}>
            <div style={{color:'var(--sg-red)'}}>Before SimpleGrid</div>
            <div></div>
            <div style={{color:'var(--sg-green)'}}>After SimpleGrid</div>
          </div>
          {[
            {b:'The first ERP they selected and decided to work with never reached the floor; $100K+ spent over two years', a:'Live in 12 days, modeled to the operation'},
            {b:'Finding an order meant 3-5 phone calls', a:'30+ stock locations in one live view'},
            {b:'Three businesses tangled in one spreadsheet', a:'Three clean P&Ls: CMT, own brand, trading'},
            {b:'Job worker reconciliation ate hours a day', a:'Issued vs. returned reconciled automatically'},
          ].map((r,i)=>(
            <div key={i} className="res-row">
              <div className="res-cell res-before">{r.b}</div>
              <div className="res-arrow" dangerouslySetInnerHTML={{__html:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'}} />
              <div className="res-cell res-after">{r.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <div className="testimonial-block">
        <RevealQuote text={`"They sent a working demo in 72 hours and it was 60-70% right already. No other vendor showed us a working system before asking for money."`} />
        <div className="attr">- Founder, Apex Apparel <span style={{color:'var(--fg3)',fontWeight:400}}>(name withheld)</span></div>
      </div>

      {/* Bottom line */}
      <div className="case-bottom-line">
        <div className="big">The first ERP they selected never went live. SimpleGrid did, in 12 days. 30+ locations in one view.</div>
        <a href="https://cal.com/simplegrid-ai" target="_blank" rel="noopener noreferrer" className="btn btn-primary" data-cta="case_apex_body" style={{marginTop:16}}>Book a demo</a>
        <div style={{marginTop:20,fontSize:14}}>
          <a href="case-furniture-manufacturer.html" style={{color:'var(--sg-blue)',fontWeight:600,textDecoration:'none'}}>Next: Elite Arts &amp; Crafts, live in 21 days →</a>
        </div>
      </div>
    </div>
    </main>

    <FinalCTA title="Want a result like this?" body="We model SimpleGrid around how your operation already runs. Run it live for 30 days, free. Pay only when it works." note="$0 up front. Working demo in 72 hours." />
    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<ApexCaseStudy />);
