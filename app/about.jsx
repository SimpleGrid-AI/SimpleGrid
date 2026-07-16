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

    {/* (a) Operator hook - solid black hero (matches the product page) */}
    <section className="section section-dark" style={{
      position:'relative',
      color:'#fff',
      overflow:'hidden',
      background:'var(--sg-black)',
      minHeight:'78vh',
      display:'flex',
      alignItems:'center',
      paddingTop:160,
      paddingBottom:160,
    }}>
      <div className="container" style={{maxWidth:'none', position:'relative', zIndex:2, width:'100%'}}>
        <div className="tag" style={{color:'rgba(255,255,255,0.7)',marginBottom:24}}>ABOUT US</div>
        <h1 style={{fontFamily:'var(--font-heading)',fontWeight:700,letterSpacing:'-0.03em',lineHeight:1.05,fontSize:'clamp(44px, 6.5vw, 72px)',color:'#fff',margin:'0 0 28px',maxWidth:1100}}>Built by operators who've been on your floor.</h1>
        <p style={{fontSize:'clamp(18px, 1.7vw, 22px)',lineHeight:1.55,color:'rgba(255,255,255,0.85)',margin:0,maxWidth:920}}>
          SimpleGrid was not designed in a boardroom. It was designed on a shop floor that was already running on Excel and group chats - and not working. The people who built SimpleGrid have run multi-stage factories with hundreds of workers, survived two ERP failures, and ended up on Google Sheets. SimpleGrid is the system we wished we had. We were the customer first - we know exactly what breaks when the system can't keep up with the floor.
        </p>
      </div>
    </section>

    {/* (b) WHY WE EXIST - checkpoint motion graphic + KPIs (no one reads the paragraph) */}
    <section className="section section-alt">
      <div className="container">
        <Reveal>
          <div className="tag">WHY WE EXIST</div>
          <p className="lead" style={{maxWidth:880, margin:'12px 0 0'}}>
            Here's what no software vendor will tell you: most mid-market ERP projects fail or get abandoned. We lived through two of them ourselves - so we built something different.
          </p>
        </Reveal>

        <div className="why-kpis">
          {[
            { n: '75%', l: 'of mid-market ERP projects fail or get abandoned' },
            { n: '2', l: 'ERP failures we lived through ourselves' },
            { n: '30 days', l: 'you run it live before you commit' },
            { n: '$0', l: 'up front - you pay only when it works' },
          ].map((k, i) => (
            <div key={i} className="why-kpi" style={{animationDelay: (0.08 * i) + 's'}}>
              <div className="why-kpi-n">{k.n}</div>
              <div className="why-kpi-l">{k.l}</div>
            </div>
          ))}
        </div>

        <ol className="why-flow">
          {[
            { h: 'The Factory Ops Cloud', p: 'An operations layer that runs your factory floor on top of the QuickBooks or Tally you already use.' },
            { h: 'Everything live, in one place', p: 'Jobs, batches, BOMs, QC checkpoints, costing - with no migration and no rip-and-replace.' },
            { h: 'Proven before you commit', p: 'We configure it to your floor at our cost, you run it live for 30 days, and you pay only when it works.' },
          ].map((s, i) => (
            <li key={i} className="why-step" style={{animationDelay: (0.1 * (i + 1)) + 's'}}>
              <span className="why-step-dot" aria-hidden="true">✓</span>
              <div className="why-step-body">
                <div className="why-step-h">{s.h}</div>
                <p className="why-step-p">{s.p}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <style>{`
        .why-kpis { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin:40px 0 4px; }
        .why-kpi { background:#fff; border:1px solid var(--border); border-radius:14px; padding:24px 22px; box-shadow:0 1px 2px rgba(20,28,46,0.04); opacity:0; transform:translateY(14px); animation:whyIn .6s ease forwards; transition:transform .2s ease, box-shadow .2s ease; }
        .why-kpi:hover { transform:translateY(-4px); box-shadow:0 18px 40px rgba(20,28,46,0.1); }
        .why-kpi-n { font-family:var(--font-heading); font-weight:700; font-size:clamp(30px,4vw,40px); letter-spacing:-0.02em; color:var(--sg-blue); line-height:1; margin-bottom:10px; }
        .why-kpi-l { font-size:13.5px; color:var(--fg2); line-height:1.5; }
        .why-flow { list-style:none; margin:34px 0 0; padding:0; position:relative; max-width:780px; }
        .why-flow::before { content:''; position:absolute; left:15px; top:16px; bottom:16px; width:2px; background:linear-gradient(180deg, color-mix(in srgb, var(--sg-blue) 55%, transparent), color-mix(in srgb, var(--sg-blue) 14%, transparent), color-mix(in srgb, var(--sg-blue) 55%, transparent)); background-size:100% 200%; animation:whyFlow 3s linear infinite; border-radius:2px; }
        @keyframes whyFlow { from { background-position:0 -200%; } to { background-position:0 0; } }
        .why-step { position:relative; display:flex; gap:20px; padding:0 0 24px; opacity:0; transform:translateY(14px); animation:whyIn .6s ease forwards; }
        .why-step:last-child { padding-bottom:0; }
        .why-step-dot { position:relative; z-index:1; flex-shrink:0; width:32px; height:32px; border-radius:50%; background:var(--sg-blue); color:#fff; display:inline-flex; align-items:center; justify-content:center; font-size:14px; font-weight:700; box-shadow:0 6px 16px rgba(52,97,224,0.28); }
        .why-step-h { font-family:var(--font-heading); font-weight:700; font-size:17px; color:var(--fg1); letter-spacing:-0.01em; margin:4px 0 5px; }
        .why-step-p { font-size:14.5px; color:var(--fg2); line-height:1.6; margin:0; }
        @keyframes whyIn { to { opacity:1; transform:none; } }
        @media (max-width:720px) { .why-kpis { grid-template-columns:repeat(2,1fr); } }
        @media (prefers-reduced-motion: reduce) {
          .why-kpi, .why-step { animation:none; opacity:1; transform:none; }
          .why-flow::before { animation:none; }
          .why-kpi { transition:none; }
        }
      `}</style>
    </section>

    {/* (c) UNDER THE HOOD - step-by-step animated pipeline of the architecture */}
    <section className="section" id="architecture" style={{background:'#fff'}}>
      <div className="container">
        <Reveal>
          <div className="tag" style={{color:'var(--sg-purple)'}}>UNDER THE HOOD</div>
          <p className="lead" style={{maxWidth:960, fontStyle:'italic', fontWeight:600, color:'var(--fg1)', margin:'4px 0 14px'}}>
            This is not AI. AI is the surface.
          </p>
          <h2 className="h2 ink" style={{color:'var(--fg1)'}}>
            SG Schema <span style={{color:'var(--fg3)', fontWeight:400}}>×</span> SG Engine <span style={{color:'var(--fg3)', fontWeight:400}}>×</span> Event Sourcing.
          </h2>
          <p className="lead" style={{maxWidth:960}}>
            Most ERPs are data-entry apps wearing a suit - tables, forms, overwrites. SimpleGrid is built on two ideas no other business platform ships at the core: an <strong>SG Schema</strong> that captures one factory's complete operational blueprint, and an <strong>event-sourced</strong> ledger that stores every change. SG Engine reads the SG Schema and runs your factory from it. The result is a system that bends to your business instead of the other way around.
          </p>
        </Reveal>

        {/* step-by-step pipeline: how the three parts operate, in order */}
        <ol className="uth-pipe">
          {[
            { tag:'SG SCHEMA', role:'Captures your complete operational blueprint.', accent:'var(--sg-purple)' },
            { tag:'SG ENGINE', role:'Reads the SG Schema and runs your factory from it.', accent:'var(--sg-green)' },
            { tag:'EVENT SOURCING', role:'Stores every change as a ledger that is never erased.', accent:'var(--sg-blue)' },
          ].map((n, i) => (
            <li key={i} className="uth-node" style={{animationDelay: (0.12 * i) + 's'}}>
              <div className="uth-node-num" style={{background:n.accent}}>{i + 1}</div>
              <div className="uth-node-tag" style={{color:n.accent}}>{n.tag}</div>
              <div className="uth-node-role">{n.role}</div>
            </li>
          ))}
        </ol>

        {/* SG Schema + Event Sourcing deep cards */}
        <div className="arch-ddd-grid">
          <Reveal>
            <div className="arch-ddd-card uth-card" style={{
              border:'1px solid var(--border)', borderRadius:12, padding:32, height:'100%',
              borderLeft:'4px solid var(--sg-purple)',
            }}>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'0.16em', color:'var(--sg-purple)', marginBottom:8}}>SG SCHEMA</div>
              <h3 style={{fontFamily:'var(--font-heading)', fontSize:22, fontWeight:700, margin:'0 0 14px', color:'var(--fg1)', letterSpacing:'-0.015em'}}>
                Your business has a language. The system speaks it.
              </h3>
              <p style={{fontSize:14, color:'var(--fg2)', lineHeight:1.7, margin:'0 0 14px'}}>
                A "Job Order" in your factory is not the same thing as a "Work Order" in someone else's. A "rejection" in fabric is different from a "rejection" in plywood. Generic ERPs flatten that - every customer fits the same forms.
              </p>
              <p style={{fontSize:14, color:'var(--fg2)', lineHeight:1.7, margin:0}}>
                Your SG Schema captures <em>your</em> entities, your states, your transitions, your invariants, your chain reactions. AI writes it, the operator validates it, SG Engine runs it. The vocabulary on every screen is yours, because the spec underneath is yours.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="uth-card" style={{
              border:'1px solid var(--border)', borderRadius:12, padding:32, height:'100%',
              borderLeft:'4px solid var(--sg-blue)',
            }}>
              <div style={{fontSize:10, fontWeight:700, letterSpacing:'0.16em', color:'var(--sg-blue)', marginBottom:8}}>EVENT SOURCING</div>
              <h3 style={{fontFamily:'var(--font-heading)', fontSize:22, fontWeight:700, margin:'0 0 14px', color:'var(--fg1)', letterSpacing:'-0.015em'}}>
                The log is the database. The state is a projection.
              </h3>
              <p style={{fontSize:14, color:'var(--fg2)', lineHeight:1.7, margin:'0 0 14px'}}>
                Instead of storing the current row and losing the past, we store every event that ever changed your business. Inventory is not a number - it's the sum of every receipt and issuance. An order's status is not a flag - it's the latest state in a chain of recorded transitions.
              </p>
              <p style={{fontSize:14, color:'var(--fg2)', lineHeight:1.7, margin:0}}>
                Banks have run on this idea for centuries - a ledger, never erased. Almost no ERP does. We do - and completed jobs flow from that ledger straight into the QuickBooks or Tally you already run.
              </p>
            </div>
          </Reveal>
        </div>

        {/* What this combination unlocks */}
        <Reveal>
          <div className="arch-outcome-box">
            <div style={{fontSize:'var(--fs-caption)', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--fg3)', marginBottom:8}}>What this combination unlocks</div>
            <p style={{fontSize:'var(--fs-small)', color:'var(--fg2)', lineHeight:1.6, margin:'0 0 18px'}}>
              The rest of the industry measures ERP rollouts in quarters and years. A SimpleGrid setup goes live in days.
            </p>
            <div className="arch-outcome-grid">
              {[
                { t: '7-day deploys', p: 'New operation → new system, generated from your SG Schema. No new codebase per customer.' },
                { t: 'Audit by design', p: 'You don\'t add audit logs. The audit is the system. Every regulator question already has an answer.' },
                { t: 'Rules without releases', p: 'Change a rule, the system changes. No deploy cycle. No IT ticket. No version migration.' },
                { t: 'Disputes resolved', p: 'Vendor said 500. Log says 450, by Mike, 4:13 PM Tuesday. Argument over.' },
              ].map((x, i) => (
                <div key={i} className="arch-outcome-cell uth-tile">
                  <div style={{fontFamily:'var(--font-heading)', fontSize:16, fontWeight:700, color:'var(--fg1)', marginBottom:6}}>{x.t}</div>
                  <div style={{fontSize:'var(--fs-caption)', color:'var(--fg2)', lineHeight:1.6}}>{x.p}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Founder quote */}
        <Reveal delay={200}>
          <div className="about-quote-panel">
            <RevealQuote className="about-quote" text={'"Underneath is an architecture so unusual that even seasoned engineers ask us to draw it twice. Most ERPs are 1990s thinking dressed in 2020s UI. SimpleGrid is what an enterprise system looks like if you started today, with what we now know."'} cite="- The founding team" />
          </div>
        </Reveal>
      </div>
      <style>{`
        .about-quote-panel { margin-top: 48px; background: linear-gradient(135deg, #0B0F17 0%, #14213F 55%, #0B0F17 100%); border-radius: 22px; padding: clamp(34px, 5vw, 64px); position: relative; overflow: hidden; box-shadow: 0 30px 70px rgba(11,15,23,0.28); }
        .about-quote { font-family: var(--font-heading); font-size: clamp(23px, 3vw, 38px); font-weight: 700; line-height: 1.3; letter-spacing: -0.02em; color: #fff; }
        .about-quote .rq-cite { margin-top: 24px; font-family: var(--font-body); font-size: 15px; font-weight: 600; letter-spacing: 0; color: rgba(255,255,255,0.55); }
        .uth-pipe { list-style:none; margin:44px 0 8px; padding:0; display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
        .uth-node { position:relative; background:var(--sg-off-white); border:1px solid var(--border); border-radius:16px; padding:24px 22px 22px; opacity:0; transform:translateY(16px); animation:uthIn .6s ease forwards; transition:transform .2s ease, box-shadow .2s ease; }
        .uth-node:hover { transform:translateY(-4px); box-shadow:0 18px 40px rgba(20,28,46,0.1); }
        .uth-node:not(:last-child)::after { content:''; position:absolute; top:38px; right:-18px; width:18px; height:2px; background:linear-gradient(90deg, color-mix(in srgb, var(--sg-blue) 55%, transparent), color-mix(in srgb, var(--sg-blue) 12%, transparent)); background-size:200% 100%; animation:uthFlow 2.4s linear infinite; z-index:2; }
        @keyframes uthFlow { from { background-position:200% 0; } to { background-position:0 0; } }
        .uth-node-num { width:34px; height:34px; border-radius:50%; color:#fff; display:inline-flex; align-items:center; justify-content:center; font-family:var(--font-heading); font-weight:700; font-size:15px; margin-bottom:14px; box-shadow:0 6px 16px rgba(20,28,46,0.18); }
        .uth-node-tag { font-size:11px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; margin-bottom:7px; }
        .uth-node-role { font-size:14px; color:var(--fg2); line-height:1.55; }
        @keyframes uthIn { to { opacity:1; transform:none; } }
        #architecture .uth-card { transition:transform .2s ease, box-shadow .2s ease; }
        #architecture .uth-card:hover { transform:translateY(-4px); box-shadow:0 18px 44px rgba(20,28,46,0.1); }
        #architecture .uth-tile { transition:transform .18s ease; }
        #architecture .uth-tile:hover { transform:translateY(-3px); }
        @media (max-width:720px) {
          .uth-pipe { grid-template-columns:1fr; gap:14px; }
          .uth-node:not(:last-child)::after { top:auto; right:auto; left:38px; bottom:-14px; width:2px; height:14px; background:linear-gradient(180deg, color-mix(in srgb, var(--sg-blue) 55%, transparent), color-mix(in srgb, var(--sg-blue) 12%, transparent)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .uth-node { animation:none; opacity:1; transform:none; transition:none; }
          .uth-node:not(:last-child)::after { animation:none; }
          #architecture .uth-card, #architecture .uth-tile { transition:none; }
        }
      `}</style>
    </section>

    </main>
    <FinalCTA title="Built by people who've run the floor." body="We ran multi-stage factories to $30M and survived two ERP failures before building SimpleGrid. We're on every deployment. We configure it to your floor at our cost. Run it live for 30 days. You pay only when it works." note="Limited slots each quarter. We onboard selectively." />
    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<AboutPage />);
