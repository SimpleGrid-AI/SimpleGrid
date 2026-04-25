function BuildChatbot() {
  const STAGES = [
    { key: 'company', q: "Welcome. Let's map your business process and sketch a starter ERP together. First - what's your company name and what do you make?", hint: 'e.g. Valaya Furniture, we manufacture custom hardwood furniture for US retailers' },
    { key: 'size', q: "Got it. How many people work at your plant? And roughly how many production streams do you run (e.g. cutting, assembly, finishing)?", hint: 'e.g. 250 employees, 4 streams: cutting, assembly, sanding, finishing' },
    { key: 'orders', q: "How does a typical sales order come in? Who approves it? Is there a cost check before production starts?", hint: 'e.g. Orders come by email from buyers like West Elm. Sales head reviews, founder approves above $50K. We check cost after approval.' },
    { key: 'procurement', q: "When material is needed, who raises the PO? Who approves it? Any vendor-specific rules?", hint: 'e.g. Planner raises PO. Founder approves above $10K. Three trusted vendors have higher limits.' },
    { key: 'production', q: "Walk me through your production stages. What gets tracked at each stage?", hint: 'e.g. Cutting → Assembly → Sanding → Finishing → QC. We track quantity completed, rejects, and contractor.' },
    { key: 'qc', q: "How does QC work? Any buyer-specific quality rules?", hint: 'e.g. Standard QC before packaging. West Elm requires 95% pass rate. Rework goes back to original contractor at no cost.' },
    { key: 'dispatch', q: "Last one - how do shipments go out? Any size or split rules?", hint: 'e.g. We pack, then truck to port. Buyer A dock limit is 40 CBM so we split larger orders.' },
  ];

  const [messages, setMessages] = React.useState([
    { role: 'bot', text: STAGES[0].q, hint: STAGES[0].hint }
  ]);
  const [input, setInput] = React.useState('');
  const [stageIdx, setStageIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  const [thinking, setThinking] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [sketch, setSketch] = React.useState(null);
  const endRef = React.useRef(null);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    endRef.current?.scrollTo({ top: endRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, thinking]);

  const buildSketch = (a) => ({
    entities: [
      { name: 'Sales Order', fields: ['Buyer', 'Items', 'Approval chain', 'Cost snapshot'] },
      { name: 'Purchase Order', fields: ['Vendor', 'Items', 'Approval by rule'] },
      { name: 'Production Job', fields: ['Stage', 'Quantity', 'Rejects', 'Contractor'] },
      { name: 'QC Record', fields: ['Pass/Fail', 'Buyer rules', 'Rework routing'] },
      { name: 'Dispatch', fields: ['Packing list', 'Shipment split', 'Dock limits'] },
    ],
    rules: [
      `Orders from ${a.company?.split(' ')[0] || 'your buyers'} auto-route by buyer rules`,
      `POs above threshold escalate to founder (from your answer on procurement)`,
      `Production tracks ${(a.production?.match(/→|,/g) || []).length + 1 || 4} stages with rejects per stage`,
      `QC rules vary per buyer (from your QC answer)`,
      `Dispatch splits automatically based on dock limits`,
    ],
    roles: [
      { name: 'Floor Operator', sees: 'Production stage, quantities, rejects' },
      { name: 'Planner', sees: 'Orders, POs, production schedule' },
      { name: 'QC Inspector', sees: 'Quality checks, rework routing' },
      { name: 'Founder', sees: 'Everything. Approvals above threshold.' },
    ],
  });

  const send = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    const nextAnswers = { ...answers, [STAGES[stageIdx].key]: userText };
    setAnswers(nextAnswers);
    setMessages(m => [...m, { role: 'user', text: userText }]);
    setInput('');
    setThinking(true);
    const next = stageIdx + 1;
    setTimeout(() => {
      setThinking(false);
      if (next < STAGES.length) {
        setMessages(m => [...m, { role: 'bot', text: STAGES[next].q, hint: STAGES[next].hint }]);
        setStageIdx(next);
      } else {
        setMessages(m => [...m, { role: 'bot', text: "Done. I've sketched a starter ERP around your answers. This isn't final - it's a starting point our founder will refine with you on the next call." }]);
        setSketch(buildSketch(nextAnswers));
        setDone(true);
      }
    }, 900);
  };

  const reset = () => {
    setMessages([{ role: 'bot', text: STAGES[0].q, hint: STAGES[0].hint }]);
    setStageIdx(0);
    setAnswers({});
    setDone(false);
    setSketch(null);
  };

  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,alignItems:'stretch'}} className="build-grid">
      {/* Chat column */}
      <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:'var(--radius-lg)',display:'flex',flexDirection:'column',height:600,overflow:'hidden'}}>
        <div style={{padding:'14px 20px',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:8,height:8,borderRadius:'50%',background:'var(--sg-green)'}} />
          <span style={{fontWeight:700,fontSize:14}}>SimpleGrid Assistant</span>
          <span style={{fontSize:11,color:'var(--fg3)'}}>Step {Math.min(stageIdx+1, STAGES.length)} of {STAGES.length}</span>
          {done && <button onClick={reset} style={{marginLeft:'auto',background:'none',border:'none',fontSize:12,color:'var(--sg-blue)',cursor:'pointer'}}>Start over</button>}
        </div>
        <div ref={endRef} style={{flex:1,overflowY:'auto',padding:20,display:'flex',flexDirection:'column',gap:12}}>
          {messages.map((m,i) => (
            <div key={i} style={{display:'flex',flexDirection:'column',alignItems:m.role==='user'?'flex-end':'flex-start',gap:4}}>
              <div style={{background:m.role==='user'?'var(--sg-blue)':'var(--sg-off-white)',color:m.role==='user'?'#fff':'var(--fg1)',padding:'10px 14px',borderRadius:'var(--radius-md)',maxWidth:'85%',fontSize:14,lineHeight:1.5,whiteSpace:'pre-wrap'}}>{m.text}</div>
              {m.hint && <div style={{fontSize:11,color:'var(--fg3)',fontStyle:'italic',maxWidth:'85%',paddingLeft:4}}>Example: {m.hint}</div>}
            </div>
          ))}
          {thinking && (
            <div style={{display:'flex',gap:4,padding:'10px 14px',background:'var(--sg-off-white)',borderRadius:'var(--radius-md)',alignSelf:'flex-start'}}>
              {[0,1,2].map(i => <span key={i} style={{width:6,height:6,borderRadius:'50%',background:'var(--fg3)',animation:`sg-blink 1.2s ${i*0.2}s infinite ease-in-out`}} />)}
              <style>{`@keyframes sg-blink{0%,60%,100%{opacity:0.3}30%{opacity:1}}`}</style>
            </div>
          )}
        </div>
        {!done && (
          <div style={{padding:16,borderTop:'1px solid var(--border)',display:'flex',gap:8}}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Type your answer..."
              style={{flex:1,padding:'10px 14px',border:'1px solid var(--border)',borderRadius:'var(--radius-md)',fontSize:14,fontFamily:'inherit',outline:'none'}}
            />
            <button onClick={send} className="btn btn-primary btn-sm" disabled={!input.trim()}>Send</button>
          </div>
        )}
      </div>

      {/* Sketch column */}
      <div style={{background:'var(--sg-off-white)',border:'1px solid var(--border)',borderRadius:'var(--radius-lg)',padding:20,minHeight:600,overflowY:'auto'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
          <span style={{fontWeight:700,fontSize:14}}>Your starter ERP sketch</span>
          {!sketch && <span style={{fontSize:11,color:'var(--fg3)'}}>Builds as you answer</span>}
          {sketch && <span style={{marginLeft:'auto',fontSize:11,color:'var(--sg-green)',fontWeight:600}}>● Ready</span>}
        </div>

        {!sketch ? (
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {STAGES.map((s,i) => (
              <div key={s.key} style={{background:'#fff',border:'1px solid var(--border)',borderRadius:'var(--radius-md)',padding:'10px 14px',display:'flex',gap:10,alignItems:'center',opacity: i <= stageIdx ? 1 : 0.4}}>
                <div style={{width:22,height:22,borderRadius:'50%',background: i < stageIdx ? 'var(--sg-green)' : i === stageIdx ? 'var(--sg-blue)' : 'var(--border)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700}}>{i < stageIdx ? '✓' : i+1}</div>
                <div style={{fontSize:13,fontWeight:600,textTransform:'capitalize'}}>{s.key.replace(/([A-Z])/g,' $1')}</div>
                {answers[s.key] && <div style={{marginLeft:'auto',fontSize:11,color:'var(--fg3)',maxWidth:180,textOverflow:'ellipsis',overflow:'hidden',whiteSpace:'nowrap'}}>{answers[s.key]}</div>}
              </div>
            ))}
          </div>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            <div>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.08em',color:'var(--fg3)',marginBottom:8,textTransform:'uppercase'}}>Entities</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:8}}>
                {sketch.entities.map((e,i) => (
                  <div key={i} style={{background:'#fff',border:'1px solid var(--border)',borderRadius:'var(--radius-md)',padding:10}}>
                    <div style={{fontSize:12,fontWeight:700,color:'var(--fg1)',marginBottom:4}}>{e.name}</div>
                    <div style={{fontSize:10,color:'var(--fg3)',lineHeight:1.5}}>{e.fields.join(' · ')}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.08em',color:'var(--fg3)',marginBottom:8,textTransform:'uppercase'}}>Rules</div>
              <div style={{display:'flex',flexDirection:'column',gap:6}}>
                {sketch.rules.map((r,i) => (
                  <div key={i} style={{background:'#fff',border:'1px solid var(--border)',borderLeft:'3px solid var(--sg-blue)',borderRadius:'var(--radius-sm)',padding:'8px 12px',fontSize:12,color:'var(--fg1)'}}>{r}</div>
                ))}
              </div>
            </div>
            <div>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.08em',color:'var(--fg3)',marginBottom:8,textTransform:'uppercase'}}>Roles</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:8}}>
                {sketch.roles.map((r,i) => (
                  <div key={i} style={{background:'#fff',border:'1px solid var(--border)',borderRadius:'var(--radius-md)',padding:10}}>
                    <div style={{fontSize:12,fontWeight:700,color:'var(--fg1)',marginBottom:2}}>{r.name}</div>
                    <div style={{fontSize:10,color:'var(--fg3)',lineHeight:1.5}}>{r.sees}</div>
                  </div>
                ))}
              </div>
            </div>
            <a href="https://calendly.com" target="_blank" rel="noopener" className="btn btn-primary" style={{justifyContent:'center'}}>Book a call to refine this</a>
          </div>
        )}
      </div>
    </div>
  );
}
window.BuildChatbot = BuildChatbot;