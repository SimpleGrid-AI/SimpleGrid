function EliteCaseStudy() {
  const [showLogin, setShowLogin] = React.useState(false);
  return (<>
    <main id="main">

    <section className="case-hero">
      <div className="container">
        <div className="tag">CASE STUDY - FURNITURE &amp; HOME DECOR EXPORT</div>
        <h1>Elite Arts &amp; Crafts found $200K in silent losses. Live in 21 days.</h1>
        <div className="case-strip">
          <div className="case-strip-item"><div className="label">Silent losses stopped</div><div className="value">$200K</div></div>
          <div className="case-strip-item"><div className="label">To live</div><div className="value">21 days</div></div>
          <div className="case-strip-item"><div className="label">Weekly planning</div><div className="value">20 hrs → 30 min</div></div>
          <div className="case-strip-item"><div className="label">Floor staff daily users</div><div className="value">30 of 30</div></div>
        </div>
      </div>
    </section>

    <div className="container">

      {/* Background */}
      <section className="case-section">
        <div className="tag" style={{marginBottom:10}}>BACKGROUND</div>
        <h2>600 people. Excel and WhatsApp.</h2>
        <p style={{maxWidth:780}}>
          Elite Arts &amp; Crafts is Chirag's furniture and home decor export house. 600+ people across 1 million sq ft, shipping to 12+ countries, including a major US retailer. Raw wood in one end, finished furniture out the other. The whole operation ran on Excel sheets and WhatsApp groups.
        </p>
      </section>

      {/* Challenge */}
      <section className="case-section">
        <div className="tag" style={{marginBottom:10}}>CHALLENGE</div>
        <h2>Losses nobody could see.</h2>
        <p style={{maxWidth:780}}>
          If 600 components entered sanding and 580 came out, nobody caught the gap until final count. Over four years those gaps cost about $200K. Planning ate 20 hours of one person's week. And the floor staff could not use any ERP. They had tried one. Everyone went back to texting.
        </p>
      </section>

      {/* What we built */}
      <section className="case-section">
        <div className="tag" style={{marginBottom:10}}>WHAT WE BUILT</div>
        <h2>Their process, modeled as-is.</h2>
        <p style={{maxWidth:780}}>
          SimpleGrid modeled the operation the way it already runs: 19 stages, 4 QC gates, and 6 contractor payment formulas. No process change. Chirag saw a working demo in 72 hours. The system was live on the floor in 21 days. The floor team runs it by chatting with Hank, not navigating menus.
        </p>

        <EliteFactoryRoad compact={true} />

        <p style={{maxWidth:780, marginTop:24}}>Three of the rules it enforces on the floor:</p>
        <ul className="rules-list">
          <li>Can't receive more material than the PO ordered. The system rejects it.</li>
          <li>Component counts must reconcile before assembly. The $200K problem, caught at the source.</li>
          <li>Final QC must approve before dispatch. No exceptions.</li>
        </ul>
      </section>

      {/* Impact */}
      <section className="case-section">
        <div className="tag" style={{marginBottom:10}}>IMPACT</div>
        <h2>What changed</h2>
        <table className="ba-table">
          <thead><tr><th>Before SimpleGrid</th><th>After SimpleGrid</th></tr></thead>
          <tbody>
            <tr><td>Planning took 20 hours a week</td><td><strong>30 minutes.</strong> The system aggregates and proposes.</td></tr>
            <tr><td>~1.5% material wastage</td><td><strong>Under 0.1%.</strong> Gaps caught at the source.</td></tr>
            <tr><td>Delivery dates slipped invisibly</td><td><strong>On-time delivery up 25%.</strong></td></tr>
            <tr><td>0 floor staff on any system</td><td><strong>30 of 30 use it daily.</strong></td></tr>
          </tbody>
        </table>
      </section>

      {/* Full factory video */}
      <section className="case-section">
        <div className="tag" style={{marginBottom:10}}>THE FACTORY</div>
        <h2>Walk the floor</h2>
        <p style={{maxWidth:640}}>The full tour of the Elite Arts &amp; Crafts factory, running on SimpleGrid.</p>
        <div style={{position:'relative', width:'100%', aspectRatio:'16 / 9', borderRadius:16, overflow:'hidden', border:'1px solid var(--border)', background:'#000'}}>
          <iframe
            src="https://www.youtube-nocookie.com/embed/9-OTYmUJe8U?rel=0"
            title="Inside the Elite Arts & Crafts factory - full tour"
            loading="lazy"
            frameBorder="0"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            style={{position:'absolute', inset:0, width:'100%', height:'100%', border:0}}
          ></iframe>
        </div>
      </section>

      {/* Testimonial */}
      <div className="testimonial-block">
        <RevealQuote text={`"SimpleGrid felt like our own system from day one. They modeled our whole operation - our stages, our contractors, our costing formulas - in three weeks. My stores manager was comfortable the first morning. We found $200K in losses we could never see before. I have recommended it to every founder I know."`} />
        <div className="attr">- Chirag, Founder, Elite Arts &amp; Crafts</div>
      </div>

      {/* Bottom line */}
      <div className="case-bottom-line">
        <div className="big">The $200K leak is closed. Planning takes 30 minutes. The whole floor uses it.</div>
        <a href="https://cal.com/simplegrid-ai" target="_blank" rel="noopener noreferrer" className="btn btn-primary" data-cta="case_elite_body" style={{marginTop:16}}>Book a demo</a>
        <div style={{marginTop:20,fontSize:14}}>
          <a href="case-apex.html" style={{color:'var(--sg-blue)',fontWeight:600,textDecoration:'none'}}>Next: an apparel maker, live in 12 days →</a>
        </div>
      </div>
    </div>
    </main>

    <FinalCTA title="Want a result like this?" body="We model SimpleGrid around how your floor already runs. Run it live for 30 days, free. Pay only when it works." note="$0 up front. Working demo in 72 hours." />
    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<EliteCaseStudy />);
