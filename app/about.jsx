function AboutPage() {
  const [showLogin, setShowLogin] = React.useState(false);
  const [showInvite, setShowInvite] = React.useState(false);
  React.useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);
    let tries = 0;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      } else if (tries++ < 20) {
        setTimeout(tryScroll, 100);
      }
    };
    setTimeout(tryScroll, 150);
  }, []);
  return (<>
    <main id="main">

    {/* (a) Hero - light, beige checks */}
    <section className="section section-beige" style={{paddingTop:150, paddingBottom:90}}>
      <div className="container">
        <Reveal>
          <div className="tag">ABOUT US</div>
          <h1 style={{fontFamily:'var(--font-heading)',fontWeight:700,letterSpacing:'-0.03em',lineHeight:1.06,fontSize:'clamp(40px, 6vw, 64px)',color:'var(--fg1)',margin:'14px 0 20px',maxWidth:900}}>We were the customer first.</h1>
          <p className="lead" style={{maxWidth:720, margin:0}}>
            We ran factories to $30M and watched two ERPs fail us. So we built the one we wished existed.
          </p>
        </Reveal>
      </div>
    </section>

    {/* (b) The story - short paragraphs, no lecture */}
    <section className="section section-roomy" id="story">
      <div className="container">
        <Reveal>
          <div className="tag">OUR STORY</div>
          <h2 className="h2 ink">Two failed ERPs. Then our own.</h2>
        </Reveal>
        <Reveal delay={100}>
          <div style={{maxWidth:720, display:'grid', gap:18, marginTop:10}}>
            <p className="about-story-p">We ran a real operation. Multi-stage production, hundreds of people, orders moving every hour. We grew it to $30M, and it ran on memory. The real status of any order lived in one person's head and a dozen group chats.</p>
            <p className="about-story-p">So we bought an ERP. Months of rollout, a six-figure bill, a fee for every change. The floor never logged in.</p>
            <p className="about-story-p">We tried a second one. Same rollout, same bill, same result. We were not unlucky. Around 75% of mid-market ERP projects fail.</p>
            <p className="about-story-p">We went back to spreadsheets and group chats. The floor actually used them. They also hid losses we could not see.</p>
            <blockquote className="about-story-pull">The books were never the problem. The floor was invisible.</blockquote>
            <p className="about-story-p">That was the whole insight. So we built SimpleGrid, the ERP we wished existed. Today it runs CPG brands, manufacturers and inventory-led businesses.</p>
            <p className="about-story-p">We are a small team. A senior engineer is on every deployment, from the first call to go-live.</p>
          </div>
        </Reveal>
      </div>
      <style>{`
        .about-story-p { font-size:17px; line-height:1.7; color:var(--fg2); margin:0; }
        .about-story-pull { font-family:var(--font-heading); font-size:clamp(21px, 2.6vw, 27px); font-weight:700; line-height:1.35; letter-spacing:-0.015em; color:var(--fg1); border-left:3px solid var(--sg-blue); padding-left:22px; margin:8px 0; }
      `}</style>
    </section>

    {/* (c) Decorative burst band (component loaded globally via components/BurstBand.js) */}
    <BurstBand />

    {/* (d) Our first client - Elite Arts & Crafts */}
    <section className="section section-alt section-roomy" id="first-client">
      <div className="container">
        <Reveal>
          <div className="tag">OUR FIRST CLIENT</div>
          <h2 className="h2 ink">Elite Arts &amp; Crafts.</h2>
        </Reveal>
        <div className="about-client-grid">
          <Reveal>
            <div className="about-client-photo">
              <img src="assets/elite-factory.jpeg" alt="The Elite Arts & Crafts factory floor" loading="lazy" />
              <span className="about-shot">● Actual shot</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="about-client-body">
              <p>Chirag runs Elite Arts &amp; Crafts, a furniture and home decor export house with 600+ people. The whole operation ran on Excel and WhatsApp.</p>
              <p>We modeled his stages, his contractors and his costing formulas. Live in 21 days. In the first months, SimpleGrid found $200K in silent losses nobody could see. Planning went from 20 hours a week to 30 minutes. All 30 floor staff use it daily.</p>
              <a href="case-furniture-manufacturer.html" className="about-case-link" data-cta="about_case_elite">Read the full case study -&gt;</a>
            </div>
          </Reveal>
        </div>
        <Reveal delay={150}>
          <RevealQuote className="about-quote" text={'"SimpleGrid felt like our own system from day one. They modeled our whole operation - our stages, our contractors, our costing formulas - in three weeks. My stores manager was comfortable the first morning. We found $200K in losses we could never see before. I have recommended it to every founder I know."'} cite="- Chirag, Founder, Elite Arts & Crafts" />
        </Reveal>
      </div>
      <style>{`
        .about-client-grid { display:grid; grid-template-columns:1fr 1fr; gap:32px; align-items:center; margin-top:32px; }
        .about-client-photo { position:relative; border-radius:16px; overflow:hidden; box-shadow:0 18px 44px rgba(20,28,46,0.12); }
        .about-client-photo img { display:block; width:100%; height:100%; max-height:380px; object-fit:cover; }
        .about-shot { position:absolute; top:16px; left:16px; z-index:2; background:rgba(0,0,0,0.6); color:#fff; font-size:10px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; padding:5px 9px; border-radius:5px; -webkit-backdrop-filter:blur(4px); backdrop-filter:blur(4px); }
        .about-client-body p { font-size:16px; line-height:1.7; color:var(--fg2); margin:0 0 16px; }
        .about-case-link { display:inline-block; font-size:15px; font-weight:700; color:var(--sg-blue); text-decoration:none; }
        .about-case-link:hover { text-decoration:underline; }
        .about-quote { font-family:var(--font-heading); font-size:clamp(22px, 2.8vw, 34px); font-weight:700; line-height:1.35; letter-spacing:-0.02em; color:var(--fg1); max-width:940px; margin:52px 0 0; }
        .about-quote .rq-cite { display:block; margin-top:18px; font-family:var(--font-body); font-size:15px; font-weight:600; letter-spacing:0; color:var(--fg3); }
        @media (max-width:820px) { .about-client-grid { grid-template-columns:1fr; } }
      `}</style>
    </section>

    </main>
    <FinalCTA title="Built by people who lived the problem." body="We configure SimpleGrid around your operation at our cost. Run it live for 30 days, free. You pay only when it works." note="Live in 3 weeks or less. Working demo in 72 hours. $0 up front." />
    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<AboutPage />);
