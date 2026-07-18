function CaseStudiesPage() {
  const [showLogin, setShowLogin] = React.useState(false);
  return (<>
    <main id="main">
    <section className="section" style={{paddingBottom:48}}>
      <div className="container">
        <div className="tag">CASE STUDIES</div>
        <h1 className="h2">Real operations. Live in 12 and 21 days.</h1>
        <p className="section-lead">Elite Arts &amp; Crafts found $200K in silent losses and went live in 21 days. An apparel maker went live in 12. Both ran SimpleGrid free for 30 days. Both kept it.</p>
        <div className="case-list">

          <a href="case-furniture-manufacturer.html" className="proof-card case-row" style={{textDecoration:'none',color:'inherit',transition:'all 160ms var(--ease-standard)'}}>
            <div className="proof-photo case-row-photo" style={{background:'url(assets/elite-factory.jpeg) center/cover',position:'relative'}}>
              <span style={{
                position:'absolute', top:10, left:10,
                background:'rgba(0,0,0,0.65)', color:'#fff',
                fontSize:10, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase',
                padding:'4px 8px', borderRadius:4, backdropFilter:'blur(4px)',
              }}>● Actual shot</span>
            </div>
            <div className="proof-body case-row-body">
              <div className="tag" style={{marginBottom:8}}>FURNITURE &amp; HOME DECOR EXPORT</div>
              <h2 style={{fontFamily:'var(--font-heading)',fontSize:22,fontWeight:700,margin:'0 0 10px',letterSpacing:'-0.015em'}}>Elite Arts &amp; Crafts</h2>
              <p>600+ people. 1 million sq ft. 12+ export countries. Live in 21 days.</p>
              <div className="proof-stats">$200K in silent losses, found and stopped.</div>
              <div className="proof-quote">"They modeled our whole operation in three weeks. We found $200K in losses we could never see."<div className="proof-attr">- Chirag, Founder, Elite Arts &amp; Crafts</div></div>
            </div>
            <span className="proof-detail-btn">See in detail <span aria-hidden="true">→</span></span>
          </a>

          <a href="case-apex.html" className="proof-card case-row" style={{textDecoration:'none',color:'inherit',transition:'all 160ms var(--ease-standard)'}}>
            <div className="proof-photo case-row-photo" style={{padding:0, overflow:'hidden'}}>
              <ApparelVisual />
            </div>
            <div className="proof-body case-row-body">
              <div className="tag" style={{marginBottom:8}}>APPAREL MANUFACTURING</div>
              <h2 style={{fontFamily:'var(--font-heading)',fontSize:22,fontWeight:700,margin:'0 0 10px',letterSpacing:'-0.015em'}}>Apex Apparel <span style={{fontSize:12,color:'var(--fg3)',fontWeight:400}}>(name withheld - reference on request)</span></h2>
              <p>80-100k shirts a month. 20+ job workers. 30+ stock locations. Live in 12 days.</p>
              <div className="proof-stats">The first ERP they selected never went live. SimpleGrid did, in 12 days.</div>
              <div className="proof-quote">"They sent a working demo in 72 hours and it was 60-70% right already."<div className="proof-attr">- Founder, Apex Apparel</div></div>
            </div>
            <span className="proof-detail-btn">See in detail <span aria-hidden="true">→</span></span>
          </a>

        </div>
      </div>
    </section>
    </main>

    <FinalCTA title="Your operation could be next." body="We model SimpleGrid around how you already work. Run it live for 30 days, free. Pay only when it works." note="$0 up front. Working demo in 72 hours." />
    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<CaseStudiesPage />);
