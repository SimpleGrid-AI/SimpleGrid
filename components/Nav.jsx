function Nav({ page = 'home', onLoginClick }) {
  const [openResources, setOpenResources] = React.useState(false);
  const resourcesRef = React.useRef(null);
  
  React.useEffect(() => {
    const handler = (e) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target)) setOpenResources(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const links = [
    { id: 'home', label: 'Home', href: 'index.html' },
    { id: 'product', label: 'Product', href: 'product.html' },
  ];
  const resourceLinks = [
    { id: 'cases', label: 'Case studies', href: 'case-studies.html', desc: 'Real deployments. Real numbers.' },
    { id: 'blog', label: 'Blog', href: 'blog.html', desc: 'Field notes on ERP and ops.' },
  ];
  const isResourceActive = page === 'cases' || page === 'blog';
  
  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="nav-logo" href="index.html">
          <img src="assets/simplegrid-logo-horizontal.svg" alt="SimpleGrid" />
        </a>
        <nav className="nav-links">
          {links.map(l => (
            <a key={l.id} href={l.href}
               className={'nav-link' + (page === l.id ? ' active' : '')}>{l.label}</a>
          ))}
          <div ref={resourcesRef} style={{position:'relative',display:'inline-flex',alignItems:'center'}}>
            <button
              onClick={(e) => { e.stopPropagation(); setOpenResources(o => !o); }}
              className={'nav-link' + (isResourceActive ? ' active' : '')}
              style={{background:'none',cursor:'pointer',fontFamily:'inherit',fontSize:'inherit',display:'inline-flex',alignItems:'center',gap:4,color:'inherit',lineHeight:1.4}}
            >
              Resources
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{transition:'transform 0.15s',transform:openResources?'rotate(180deg)':'none'}}>
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            {openResources && (
              <div style={{position:'absolute',top:'calc(100% + 12px)',left:'50%',transform:'translateX(-50%)',background:'#fff',border:'1px solid var(--border)',borderRadius:'var(--radius-lg)',padding:8,minWidth:280,boxShadow:'0 12px 32px rgba(0,0,0,0.08)',zIndex:100}}>
                {resourceLinks.map(r => (
                  <a key={r.id} href={r.href} style={{display:'block',padding:'12px 14px',borderRadius:'var(--radius-md)',textDecoration:'none',transition:'background 0.15s'}} onMouseEnter={e => e.currentTarget.style.background='var(--sg-off-white)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                    <div style={{fontSize:14,fontWeight:600,color:'var(--fg1)',marginBottom:2}}>{r.label}</div>
                    <div style={{fontSize:12,color:'var(--fg3)'}}>{r.desc}</div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>
        <div className="nav-right">
          <a href="build.html" className="btn-build desktop-only" title="Describe your business. Get a working ERP in 5 minutes. No credit card.">
            <span className="build-spark" aria-hidden="true">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l2.39 5.84L20 10l-5.61 2.16L12 18l-2.39-5.84L4 10l5.61-2.16L12 2z" fill="#fff"/>
              </svg>
            </span>
            <span className="build-text">
              <span className="build-main">Build your own ERP</span>
              <span className="build-sub">Tell us about your business</span>
            </span>
            <span className="free-pill">FREE</span>
          </a>
          <button className="btn btn-sm btn-secondary desktop-only" onClick={onLoginClick}>Log in</button>
          <a href="https://cal.com/simplegrid-ai" target="_blank" rel="noopener" className="btn btn-sm btn-primary">Book a Call</a>
        </div>
      </div>
    </header>
  );
}
window.Nav = Nav;
