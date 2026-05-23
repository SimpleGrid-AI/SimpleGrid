function FounderStory() {
  return (
    <section className="section" id="founder">
      <div className="container">
        <Reveal>
          <div className="founder-grid">
            <div className="founder-photo">Photo placeholder</div>
            <div className="founder-text">
              <div className="tag">BUILT BY AN OPERATOR</div>
              <blockquote>I built a $30M manufacturing business. Survived two ERP failures. Ended up on Google Sheets.</blockquote>
              <p className="body">SimpleGrid exists because I was the customer first. Multiple factories, 400-person workforce, international buyers. I know what breaks when your system can't keep up.</p>
              <p className="body">Every deployment runs with senior engineers, deployment experts, and direct founder engagement. You work with the team that builds the system. Not a sales rep. Not a chatbot.</p>
              <p className="attr">- Mukund Agarwal, Founder &amp; CEO</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
window.FounderStory = FounderStory;

function ProofSection() {
  return (
    <section className="section section-alt">
      <div className="container">
        <Reveal>
          <div className="tag">PROOF</div>
          <h2 className="h2">Deployed. Running. Live data.</h2>
        </Reveal>
        <div className="proof-grid">
          {[
            { img: 'url(assets/elite-factory.jpeg) center/cover', name: 'Elite Arts & Crafts', desc: 'Furniture exporter. 600–800 employees. ~1M sqft. Excel + WhatsApp → live ERP.', stats: '32 tracked · 36 triggers · 21 days', quote: '"SimpleGrid feels like our system. My stores manager was comfortable on day one."', attr: '- Chirag, Founder', link: 'case-elite.html' },
            { img: null, name: 'Singal Fabrics', desc: 'Apparel CMT. 3 streams. 20+ job workers. Two failed ERPs → live in 12 days.', stats: '34 tracked · 44 triggers · 12 days', quote: '"Working demo in 24 hours - 60–70% accurate. No vendor has ever done that."', attr: '- Founder, Singal Fabrics', link: 'case-singal.html' },
          ].map((c,i) => (
            <Reveal key={i} delay={i * 150}>
              <div className="proof-card" style={{height:'100%'}}>
                <div className="proof-img" style={c.img ? {background:c.img,height:200} : {height:200}}>
                  {!c.img && <span>Factory photo - {c.name}</span>}
                </div>
                <div className="proof-body">
                  <h3>{c.name}</h3>
                  <p>{c.desc}</p>
                  <div className="proof-stats">{c.stats}</div>
                  <div className="proof-quote">{c.quote}<div className="proof-attr">{c.attr}</div></div>
                  <a href={c.link} className="btn btn-ghost btn-sm" style={{paddingLeft:0}}>Full case study →</a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
window.ProofSection = ProofSection;

function Integrations() {
  const items = [
    { name: 'Gmail', svg: '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/></svg>' },
    { name: 'Tally', svg: '<svg viewBox="0 0 40 40" width="24" height="24"><rect width="40" height="40" rx="6" fill="#263238"/><text x="20" y="26" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="16">T</text></svg>' },
    { name: 'QuickBooks', svg: '<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="12" fill="#2CA01C"/><path d="M7.5 8a2 2 0 00-2 2v4a2 2 0 002 2h1V8h-1zm3-1v10h1a4 4 0 004-4v-2a4 4 0 00-4-4h-1zm2 2.5a1.5 1.5 0 011.5 1.5v2a1.5 1.5 0 01-1.5 1.5V9.5z" fill="#fff"/></svg>' },
    { name: 'Zoho', svg: '<svg viewBox="0 0 40 40" width="24" height="24"><rect width="40" height="40" rx="6" fill="#D0312D"/><text x="20" y="26" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="12">ZOHO</text></svg>' },
    { name: 'Excel', svg: '<svg viewBox="0 0 24 24" width="24" height="24"><rect width="24" height="24" rx="4" fill="#107C41"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="11">XL</text></svg>' },
    { name: 'Shopify', svg: '<svg viewBox="0 0 24 24" width="24" height="24"><rect width="24" height="24" rx="4" fill="#96BF48"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="11">S</text></svg>' },
  ];
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="tag">INTEGRATIONS</div>
          <h2 className="h2">Works with what you already use.</h2>
          <p className="lead">Connect to the tools your team relies on. Need something not listed? We build it.</p>
        </Reveal>
        <Reveal delay={200}>
          <div className="int-grid">
            {items.map((ig,i) => (
              <div key={i} className="int-card">
                <div className="int-icon" dangerouslySetInnerHTML={{__html: ig.svg}}></div>
                <div className="int-name">{ig.name}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
window.Integrations = Integrations;

function DataSecurity() {
  return (
    <section className="section section-alt">
      <div className="container">
        <Reveal>
          <div className="tag">DATA SECURITY</div>
          <h2 className="h2">Your data stays yours.</h2>
        </Reveal>
        <div className="sec-grid">
          {[
            { badge: 'ARCHITECTURE', color: 'var(--sg-purple)', t: 'Multi-tenant isolation', p: 'Every client gets their own database. Shared platform, completely separate data. Like an apartment building - shared infrastructure, your own lock, your own walls. No client can ever see another\'s data.' },
            { badge: 'IN PROGRESS', color: 'var(--sg-blue)', t: 'SOC II compliance', p: 'Independent auditors verifying our security controls, data handling, and availability. Not just our word - third-party certification.' },
            { badge: 'IN PROGRESS', color: 'var(--sg-green)', t: 'GDPR compliance', p: 'Encrypted at rest and in transit. You control what\'s stored. Full export or deletion on request.' },
          ].map((s,i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="sec-card" style={{height:'100%'}}>
                <div className="sec-badge" style={{color:s.color}}>{s.badge}</div>
                <h3>{s.t}</h3>
                <p>{s.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
window.DataSecurity = DataSecurity;

function Architecture() {
  const cols = [
    { t: 'One permanent record', b: 'Every action recorded once. Can never be changed. Your audit trail isn\'t a feature - it\'s how the system is built.' },
    { t: 'Configuration, not code', b: 'AI writes a configuration. Platform reads it and generates forms, workflows, rules, dashboards. Change config, system changes instantly.' },
    { t: 'Every rule is a row', b: 'Approval above $10K? One row. QC before dispatch? One row. No code. No deployment cycle.' },
  ];
  return (
    <section className="section section-dark">
      <div className="container">
        <Reveal>
          <div className="tag" style={{color:'rgba(255,255,255,0.4)'}}>WHY 7 DAYS IS POSSIBLE</div>
          <h2 className="h2">The architecture.</h2>
        </Reveal>
        <div className="arch-grid" style={{marginTop:28}}>
          {cols.map((c,i) => (
            <Reveal key={i} delay={i * 100}><div className="arch-col"><h3>{c.t}</h3><p>{c.b}</p></div></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Architecture = Architecture;

function ComparisonTable() {
  const rows = [
    { label: 'Deploy time', sap: '18+ months', epicor: '9–12 months', qb: 'Instant', sg: 'Days' },
    { label: 'Cost to start', sap: '$500K+', epicor: '$150K–$300K', qb: 'Free', sg: '$0' },
    { label: 'Customization', sap: 'Months + consultants', epicor: 'Months + devs', qb: 'Breaks at scale', sg: 'Minutes' },
    { label: 'Floor staff UX', sap: 'Complex menus', epicor: 'Complex forms', qb: 'Formulas', sg: 'Plain English' },
    { label: 'Try before paying', sap: 'No', epicor: 'Limited', qb: 'N/A', sg: '30 days, live data' },
  ];
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="tag">COMPARE</div>
          <h2 className="h2">How it stacks up.</h2>
        </Reveal>
        <Reveal delay={200}>
          <div style={{overflowX:'auto'}}>
            <table className="compare-table">
              <thead><tr><th></th><th>SAP / Oracle</th><th>Epicor / Plex</th><th>QuickBooks + Excel</th><th>SimpleGrid</th></tr></thead>
              <tbody>
                {rows.map((r,i) => (
                  <tr key={i}><td style={{fontWeight:600,color:'var(--fg1)'}}>{r.label}</td><td>{r.sap}</td><td>{r.epicor}</td><td>{r.qb}</td><td>{r.sg}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
window.ComparisonTable = ComparisonTable;

function FinalCTA() {
  return (
    <section className="section section-dark final-cta">
      <div className="container">
        <Reveal>
          <h2 className="h2">Deploy in days. Decide in 30.</h2>
          <p className="sub">We build it at our cost. You run it with your team. Doesn't work? Walk away.</p>
          <a href="https://calendly.com" target="_blank" rel="noopener" className="btn btn-lg btn-primary">Book a call - it's free</a>
          <p className="note">No commitment. Migration included. Founder-led onboarding.</p>
        </Reveal>
      </div>
    </section>
  );
}
window.FinalCTA = FinalCTA;
