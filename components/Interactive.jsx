// Interactive elements and animations for the site
// Scroll-triggered number counter
function AnimatedNumber({ value, suffix = '', prefix = '', duration = 1500 }) {
  const ref = React.useRef(null);
  const [display, setDisplay] = React.useState('0');
  const [started, setStarted] = React.useState(false);
  
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
        const numVal = parseFloat(value.toString().replace(/[^0-9.]/g, ''));
        const isDecimal = value.toString().includes('.');
        const startTime = Date.now();
        const timer = setInterval(() => {
          const progress = Math.min((Date.now() - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = numVal * eased;
          setDisplay(isDecimal ? current.toFixed(1) : Math.round(current).toLocaleString());
          if (progress >= 1) clearInterval(timer);
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);
  
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}
window.AnimatedNumber = AnimatedNumber;

// Scroll reveal wrapper
function Reveal({ children, delay = 0 }) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.6s cubic-bezier(0.2,0.8,0.2,1) ${delay}ms, transform 0.6s cubic-bezier(0.2,0.8,0.2,1) ${delay}ms`,
    }}>{children}</div>
  );
}
window.Reveal = Reveal;

// Interactive tab component
function InteractiveTabs({ tabs }) {
  const [active, setActive] = React.useState(0);
  return (
    <div>
      <div style={{display:'flex',gap:4,marginBottom:24,borderBottom:'1px solid var(--border)',paddingBottom:0}}>
        {tabs.map((t,i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            padding:'10px 18px',fontSize:14,fontWeight:600,fontFamily:'var(--font-body)',
            color: active === i ? 'var(--sg-blue)' : 'var(--fg3)',
            background:'none',border:'none',borderBottom: active === i ? '2px solid var(--sg-blue)' : '2px solid transparent',
            cursor:'pointer',transition:'all 180ms',marginBottom:-1,
          }}>{t.label}</button>
        ))}
      </div>
      <div style={{minHeight:200}}>
        {tabs[active] && tabs[active].content}
      </div>
    </div>
  );
}
window.InteractiveTabs = InteractiveTabs;

// Animated flow line between elements
function FlowLine({ steps }) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:0,justifyContent:'center',margin:'32px 0',flexWrap:'wrap'}}>
      {steps.map((s,i) => (
        <React.Fragment key={i}>
          <div style={{
            padding:'12px 20px',background: s.highlight ? 'var(--sg-blue)' : '#fff',
            color: s.highlight ? '#fff' : 'var(--fg1)',
            border: s.highlight ? 'none' : '1px solid var(--border)',
            borderRadius:'var(--radius-md)',fontSize:13,fontWeight:600,
            fontFamily:'var(--font-heading)',whiteSpace:'nowrap',
          }}>{s.label}</div>
          {i < steps.length - 1 && (
            <div style={{width:32,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <svg width="20" height="12" viewBox="0 0 20 12"><path d="M0 6h16M12 1l5 5-5 5" fill="none" stroke="var(--sg-blue)" strokeWidth="1.5"/></svg>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
window.FlowLine = FlowLine;

// Typing animation for the chatbot demo
function TypingDemo({ lines, speed = 30 }) {
  const [lineIdx, setLineIdx] = React.useState(0);
  const [charIdx, setCharIdx] = React.useState(0);
  const [done, setDone] = React.useState([]);
  const ref = React.useRef(null);
  const [started, setStarted] = React.useState(false);
  
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) setStarted(true);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);
  
  React.useEffect(() => {
    if (!started || lineIdx >= lines.length) return;
    const line = lines[lineIdx];
    if (charIdx < line.text.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), line.type === 'response' ? speed * 0.5 : speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDone(d => [...d, { ...line, text: line.text }]);
        setLineIdx(l => l + 1);
        setCharIdx(0);
      }, line.type === 'response' ? 200 : 600);
      return () => clearTimeout(t);
    }
  }, [started, lineIdx, charIdx]);
  
  const currentLine = lineIdx < lines.length ? lines[lineIdx] : null;
  
  return (
    <div ref={ref} className="feature-demo" style={{minHeight:160}}>
      {done.map((d,i) => (
        <div key={i} className={d.type === 'prompt' ? 'prompt' : 'response'} style={{marginBottom:6,whiteSpace:'pre-line'}}>{d.text}</div>
      ))}
      {currentLine && (
        <div className={currentLine.type === 'prompt' ? 'prompt' : 'response'}>
          {currentLine.text.substring(0, charIdx)}
          <span style={{opacity: charIdx < currentLine.text.length ? 1 : 0, animation:'sg-blink 0.8s step-end infinite'}}>|</span>
        </div>
      )}
      <style dangerouslySetInnerHTML={{__html:'@keyframes sg-blink{0%,100%{opacity:1}50%{opacity:0}}'}} />
    </div>
  );
}
window.TypingDemo = TypingDemo;

// Animated progress bar
function ProgressCompare({ items }) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  
  return (
    <div ref={ref} style={{display:'flex',flexDirection:'column',gap:16,marginTop:24}}>
      {items.map((item,i) => (
        <div key={i}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
            <span style={{fontSize:13,fontWeight:600,color:'var(--fg1)'}}>{item.label}</span>
            <span style={{fontSize:13,color: item.highlight ? 'var(--sg-blue)' : 'var(--fg3)',fontWeight: item.highlight ? 700 : 400}}>{item.value}</span>
          </div>
          <div style={{height:6,background:'var(--sg-off-white)',borderRadius:3,overflow:'hidden'}}>
            <div style={{
              height:'100%',borderRadius:3,
              background: item.highlight ? 'var(--sg-blue)' : 'var(--sg-light-gray)',
              width: visible ? item.percent + '%' : '0%',
              transition: `width 1s cubic-bezier(0.2,0.8,0.2,1) ${i * 150}ms`,
            }}></div>
          </div>
        </div>
      ))}
    </div>
  );
}
window.ProgressCompare = ProgressCompare;
