function Hero() {
  const [count, setCount] = React.useState(547);
  React.useEffect(() => {
    const target = 7, start = 547, duration = 2200, startTime = Date.now();
    const timer = setInterval(() => {
      const progress = Math.min((Date.now() - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(start - (start - target) * eased));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-inner">
          <div>
            <Reveal>
              <h1 className="hero-title">You don't adapt to the system.<br/>The system adapts to you.</h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="hero-sub">Your factory runs differently from every other factory. That's not a problem - it's what makes you competitive. We build a custom ERP around your exact process. At our cost. In days.</p>
            </Reveal>
            <Reveal delay={400}>
              <div className="hero-cta">
                <a href="build.html" className="btn btn-lg btn-primary" style={{background:'linear-gradient(135deg, #2256E8 0%, #1e4dd9 100%)',boxShadow:'0 0 0 0 rgba(34,86,232,0.55), 0 6px 20px rgba(34,86,232,0.4)',animation:'sgBuildPulse 1.8s ease-in-out infinite'}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{marginRight:2}}>
                    <path d="M12 2l2.39 5.84L20 10l-5.61 2.16L12 18l-2.39-5.84L4 10l5.61-2.16L12 2z" fill="#fff"/>
                  </svg>
                  Build your own ERP - free
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={300}>
            <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:32,textAlign:'center'}}>
              <div style={{fontSize:10,textTransform:'uppercase',letterSpacing:'0.16em',color:'rgba(255,255,255,0.35)',marginBottom:8}}>Average ERP deploy time</div>
              <div style={{fontFamily:'var(--font-heading)',fontSize:80,fontWeight:700,color:'#fff',lineHeight:1,letterSpacing:'-0.04em',position:'relative'}}>
                <span>{count}</span>
                <span style={{fontSize:24,color:'rgba(255,255,255,0.4)',marginLeft:6,fontWeight:500}}>days</span>
              </div>
              <div style={{fontSize:13,color:'rgba(255,255,255,0.4)',marginTop:8}}>Industry average: 547 days. <span style={{color:'var(--sg-blue)',fontWeight:700}}>SimpleGrid: 7</span></div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:1,marginTop:28,background:'rgba(255,255,255,0.06)',borderRadius:10,overflow:'hidden'}}>
                {[{n:'$0',l:'Cost to start'},{n:'30',l:'Day free trial'},{n:'2',l:'Live deployments'}].map((s,i) => (
                  <div key={i} style={{background:'rgba(255,255,255,0.03)',padding:'16px 12px'}}>
                    <div style={{fontFamily:'var(--font-heading)',fontSize:22,fontWeight:700,color:'#fff'}}>{s.n}</div>
                    <div style={{fontSize:10,color:'rgba(255,255,255,0.4)',marginTop:2}}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
window.Hero = Hero;

function ProblemSection() {
  const [activeChatStep, setActiveChatStep] = React.useState(0);
  const chatRef = React.useRef(null);
  
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let step = 0;
        const t = setInterval(() => {
          step++;
          setActiveChatStep(step);
          if (step >= 4) clearInterval(t);
        }, 900);
        return () => clearInterval(t);
      }
    }, { threshold: 0.3 });
    if (chatRef.current) observer.observe(chatRef.current);
    return () => observer.disconnect();
  }, []);

  const problems = [
    { 
      n: '01', t: 'Upfront cost is brutal', b: '$500K+ before you see a screen.',
      visual: (
        <svg viewBox="0 0 400 200" style={{width:'100%',height:'100%'}}>
          <line x1="40" y1="170" x2="375" y2="170" stroke="#E5E8ED" strokeWidth="2"/>
          <line x1="40" y1="170" x2="40" y2="20" stroke="#E5E8ED" strokeWidth="2"/>
          <line x1="40" y1="130" x2="375" y2="130" stroke="#F0F2F5" strokeWidth="1" strokeDasharray="3 3"/>
          <line x1="40" y1="90" x2="375" y2="90" stroke="#F0F2F5" strokeWidth="1" strokeDasharray="3 3"/>
          <line x1="40" y1="50" x2="375" y2="50" stroke="#F0F2F5" strokeWidth="1" strokeDasharray="3 3"/>
          <path d="M 50 160 Q 120 150 180 120 T 300 55 L 360 25" fill="none" stroke="#DC2A3D" strokeWidth="3.5" strokeLinecap="round" style={{strokeDasharray:500,strokeDashoffset:500,animation:'sg-dash 4s ease-in-out infinite'}}/>
          <circle cx="360" cy="25" r="6" fill="#DC2A3D" style={{animation:'sg-dot-a 4s ease-in-out infinite'}}/>
          <text x="360" y="15" fontSize="14" fill="#DC2A3D" fontWeight="700" textAnchor="end" style={{animation:'sg-dot-a 4s ease-in-out infinite'}}>$500K+</text>
          <text x="30" y="174" fontSize="10" fill="#9CA3AF" textAnchor="end">$0</text>
          <text x="30" y="134" fontSize="10" fill="#9CA3AF" textAnchor="end">$150K</text>
          <text x="30" y="94" fontSize="10" fill="#9CA3AF" textAnchor="end">$300K</text>
          <text x="30" y="54" fontSize="10" fill="#9CA3AF" textAnchor="end">$450K</text>
          <text x="45" y="188" fontSize="11" fill="#9CA3AF">Contract signed</text>
          <text x="370" y="188" fontSize="11" fill="#9CA3AF" textAnchor="end">Go-live (18 mo)</text>
          <style>{`@keyframes sg-dash{0%{stroke-dashoffset:500}60%{stroke-dashoffset:0}100%{stroke-dashoffset:0}}@keyframes sg-dot-a{0%,50%{opacity:0}70%,100%{opacity:1}}`}</style>
        </svg>
      )
    },
    { 
      n: '02', t: 'Your business evolves. Your ERP does not.', b: 'Small change = 6-week consulting project.',
      visual: (
        <svg viewBox="0 0 400 200" style={{width:'100%',height:'100%'}}>
          <text x="20" y="38" fontSize="13" fill="var(--fg1)" fontWeight="600">Your business with a fluid ERP</text>
          <rect x="20" y="48" width="360" height="18" rx="9" fill="#E5E8ED"/>
          <rect x="20" y="48" width="360" height="18" rx="9" fill="#10B981" style={{transformOrigin:'20px 57px',animation:'sg-grow-b 3s ease-out infinite'}}/>
          <text x="370" y="61" fontSize="11" fill="#fff" fontWeight="700" textAnchor="end" style={{opacity:0,animation:'sg-fade-b 3s ease-out infinite'}}>Scales</text>
          <text x="20" y="104" fontSize="13" fill="var(--fg1)" fontWeight="600">Your business with a rigid ERP</text>
          <rect x="20" y="114" width="360" height="18" rx="9" fill="#E5E8ED"/>
          <rect x="20" y="114" width="180" height="18" rx="9" fill="#DC2A3D" style={{transformOrigin:'20px 123px',animation:'sg-grow-c 3s ease-out infinite'}}/>
          <text x="214" y="127" fontSize="11" fill="#DC2A3D" fontWeight="700">← Stuck</text>
          <text x="20" y="170" fontSize="12" fill="var(--fg2)" fontStyle="italic">SimpleGrid bends to your process.</text>
          <text x="20" y="188" fontSize="12" fill="var(--fg2)" fontStyle="italic">Others trap you mid-growth.</text>
          <style>{`@keyframes sg-grow-b{0%{transform:scaleX(0)}60%,100%{transform:scaleX(1)}}@keyframes sg-grow-c{0%{transform:scaleX(0)}50%,100%{transform:scaleX(1)}}@keyframes sg-fade-b{0%,60%{opacity:0}75%,100%{opacity:1}}`}</style>
        </svg>
      )
    },
    { 
      n: '03', t: 'UI built for accountants, not operators', b: 'Seven tabs. Twelve fields. Floor staff bounce.',
      visual: (
        <svg viewBox="0 0 400 200" style={{width:'100%',height:'100%'}}>
          <rect x="10" y="10" width="380" height="180" rx="6" fill="#fff" stroke="#E5E8ED" strokeWidth="1.5"/>
          {['Orders','Items','Stock','Vendor','QC','Tax','GL'].map((tab,i) => (
            <g key={i}>
              <rect x={14+i*52} y="14" width="48" height="20" rx="3" fill={i===0?'#F59E0B22':'#FAFBFC'} stroke="#E5E8ED" strokeWidth="0.8"/>
              <text x={38+i*52} y="27" fontSize="10" fill={i===0?'#B45309':'var(--fg2)'} textAnchor="middle" fontWeight="600">{tab}</text>
            </g>
          ))}
          <text x="20" y="52" fontSize="10" fill="var(--fg3)" fontWeight="600">REQUIRED FIELDS *</text>
          {[
            ['GL Acct','HSN Code'],
            ['Cost Center','Tax Class'],
            ['Profit Center','Doc Ref'],
            ['UOM','Ledger'],
          ].map((row,r) => (
            <g key={r}>
              <rect x="20" y={60+r*22} width="175" height="16" rx="3" fill="#FAFBFC" stroke="#E5E8ED" strokeWidth="0.8"/>
              <rect x="205" y={60+r*22} width="175" height="16" rx="3" fill="#FAFBFC" stroke="#E5E8ED" strokeWidth="0.8"/>
              <text x="26" y={71+r*22} fontSize="9" fill="#9CA3AF">{row[0]} *</text>
              <text x="211" y={71+r*22} fontSize="9" fill="#9CA3AF">{row[1]} *</text>
            </g>
          ))}
          <rect x="20" y="154" width="80" height="22" rx="4" fill="#4A7BF7"/>
          <text x="60" y="168" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="600">Submit</text>
          <rect x="108" y="154" width="80" height="22" rx="4" fill="#fff" stroke="#E5E8ED"/>
          <text x="148" y="168" fontSize="10" fill="var(--fg2)" textAnchor="middle" fontWeight="600">Cancel</text>
          <text x="370" y="172" fontSize="24" textAnchor="end" style={{animation:'sg-conf 1.5s ease-in-out infinite'}}>😵</text>
          <style>{`@keyframes sg-conf{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}`}</style>
        </svg>
      )
    },
    { 
      n: '04', t: 'You cannot change how 100 people work', b: 'That is why 75% of ERP projects fail.',
      visual: null,
      isChatDemo: true,
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="tag">THE PROBLEM</div>
          <h2 className="h2">Your enterprise runs differently from every other enterprise.</h2>
        </Reveal>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:20,marginTop:32}} ref={chatRef}>
          {problems.map((p,i) => (
            <Reveal key={p.n} delay={i * 100}>
              <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:'var(--radius-lg)',padding:24,height:'100%'}}>
                <div style={{display:'flex',alignItems:'baseline',gap:12,marginBottom:14}}>
                  <div style={{fontFamily:'var(--font-heading)',fontSize:22,fontWeight:700,color:'var(--sg-red)',letterSpacing:'-0.02em'}}>{p.n}</div>
                  <h3 style={{fontFamily:'var(--font-heading)',fontSize:17,fontWeight:700,color:'var(--fg1)',margin:0,letterSpacing:'-0.01em',lineHeight:1.3}}>{p.t}</h3>
                </div>
                <p style={{fontSize:13,color:'var(--fg2)',lineHeight:1.5,margin:'0 0 14px'}}>{p.b}</p>
                <div style={{background:'var(--sg-off-white)',border:'1px solid var(--border)',borderRadius:'var(--radius-md)',padding:20,height:240,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  {p.isChatDemo ? (
                    <div style={{width:'100%',fontFamily:'var(--font-mono)',fontSize:14,lineHeight:1.8}}>
                      <div style={{color:'var(--fg3)',fontSize:11,marginBottom:10,fontFamily:'var(--font-body)',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase'}}>Warehouse manager types:</div>
                      <div style={{color:'var(--fg1)',opacity:activeChatStep>=1?1:0.2,transition:'opacity 0.3s'}}>&gt; Received 2200cft of material from West Elm</div>
                      <div style={{color:'var(--sg-green)',marginTop:8,opacity:activeChatStep>=2?1:0.2,transition:'opacity 0.3s'}}>✓ PO matched. Inventory updated.</div>
                      <div style={{marginTop:12,fontFamily:'var(--font-body)',fontSize:13,color:'var(--fg3)',fontStyle:'italic',opacity:activeChatStep>=3?1:0.2,transition:'opacity 0.3s'}}>No training. Same habit as WhatsApp.</div>
                    </div>
                  ) : p.visual}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
window.ProblemSection = ProblemSection;

function WhatWeDo() {
  return (
    <section className="section section-blue">
      <div className="container" style={{maxWidth:880,margin:'0 auto',padding:'0 32px'}}>
        <Reveal>
          <div style={{textAlign:'center'}}>
            <div className="tag">WHAT WE DO</div>
            <h2 className="h2">We build you a custom ERP. At our cost.<br/>You try it for 30 days.</h2>
            <p style={{fontSize:16,color:'var(--fg2)',lineHeight:1.65,maxWidth:600,margin:'0 auto 24px'}}>
              Not a demo. Not a sandbox. A real system built around how your enterprise actually runs - your orders, your approvals, your production stages, your rules.
            </p>
            <p style={{fontSize:16,color:'var(--fg2)',lineHeight:1.65,maxWidth:600,margin:'0 auto 24px'}}>
              If it doesn't improve how your plant runs after 30 days, walk away. No contract. No invoice. We take that risk because the product speaks for itself.
            </p>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div className="offer-contrast">
            <div className="offer-col old"><strong>Every other ERP</strong>$500K+ and 18 months before you see it working.</div>
            <div className="offer-col new"><strong>SimpleGrid</strong>$0 and 7 days. See it working first. Pay only if you keep it.</div>
          </div>
        </Reveal>
        <Reveal delay={300}>
          <div style={{textAlign:'center'}}>
            <a href="https://cal.com/simplegrid-ai" target="_blank" rel="noopener" className="btn btn-lg btn-primary">Book a call - zero risk</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
window.WhatWeDo = WhatWeDo;

function HowItWorks() {
  const steps = [
    { n:'01', t:'A real conversation', b:'3 hour call with our founder - not a sales rep. We map how your factory actually runs.', icon:'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z' },
    { n:'02', t:'Working system in 24h', b:'Not slides. A working version of your system built from the call. Your operation reflected back.', icon:'M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 9V3.5L18.5 9H13z' },
    { n:'03', t:'Your team reviews live', b:'Your team sees the system. Tells us what\'s wrong. We fix it. No tickets. No waiting.', icon:'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z' },
    { n:'04', t:'Live in 7 days', b:'System goes into production with real data, real orders, real operations. 30-day trial starts.', icon:'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' },
    { n:'05', t:'No training needed', b:'Your team types what happened - same as WhatsApp. The system does the rest. 5 minutes to learn.', icon:'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z' },
  ];
  const animKF = `@keyframes sg-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}@keyframes sg-ring{0%{transform:scale(0.8);opacity:0}50%{transform:scale(1.1);opacity:0.3}100%{transform:scale(1.3);opacity:0}}@keyframes sg-dots{0%,80%,100%{opacity:0.3}40%{opacity:1}}`;
  const colors = ['#4A7BF7','#10B981','#F59E0B','#EF4444','#7C3AED'];
  const bgs = ['rgba(74,123,247,0.08)','rgba(16,185,129,0.08)','rgba(245,158,11,0.08)','rgba(239,68,68,0.08)','rgba(124,58,237,0.08)'];

  return (
    <section className="section section-alt" id="how-it-works">
      <style dangerouslySetInnerHTML={{__html:animKF}} />
      <div className="container">
        <Reveal><div className="tag">HOW IT WORKS</div><h2 className="h2">From first call to a live system. 7 days.</h2></Reveal>
        <Reveal delay={100}>
          <FlowLine steps={[{label:'Call'},{label:'Demo in 24h'},{label:'Team reviews'},{label:'Go live',highlight:true},{label:'30-day trial'}]} />
        </Reveal>
        <div className="steps2">
          {steps.map((s,i) => (
            <Reveal key={s.n} delay={i * 100}>
              <div className="step2" style={{height:'100%'}}>
                <div style={{width:48,height:48,borderRadius:'var(--radius-lg)',background:bgs[i],display:'flex',alignItems:'center',justifyContent:'center',position:'relative',overflow:'visible',margin:'0 auto 14px'}}>
                  <div style={{position:'absolute',inset:-6,border:`2px solid ${colors[i]}`,borderRadius:'var(--radius-xl)',animation:'sg-ring 2.5s ease-in-out infinite',animationDelay:(i*0.4)+'s'}}></div>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill={colors[i]} style={{animation:`sg-float 3s ease-in-out infinite`,animationDelay:(i*0.3)+'s'}}><path d={s.icon}/></svg>
                </div>
                <div className="step2-num">{s.n}</div>
                <h3 className="step2-title">{s.t}</h3>
                <p className="step2-body">{s.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
window.HowItWorks = HowItWorks;
