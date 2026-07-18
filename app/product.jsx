function ProductPage() {
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
      {/* HERO */}
      <ProductHeroNew />

      {/* MEET HANK */}
      <MotivationSection />

      {/* INTEGRATIONS */}
      <Integrations />

      {/* YOUR LANGUAGE - the software speaks your terms */}
      <AbilitySection />

      {/* CAPABILITIES - specific feature tiles, each links to a detail page */}
      <PlatformCapabilities />

      {/* RULES - your process, enforced */}
      <CustomRules />

      {/* SECURITY - slim strip */}
      <DataSecurity />

      {/* FINAL CTA */}
      <FinalCTA title="One system for your whole operation." body="Orders, inventory, production and costing in one place, synced to the books you already run. See it working on your own operation before you pay anything." note="$0 up front. Live in 3 weeks or less. 30-day trial." ctaLabel="See a live demo" />
    </main>
    {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
    <div className="mobile-cta">
      <button type="button" onClick={() => setShowInvite(true)} data-cta="mobile_demo" className="btn btn-invite">Book a demo</button>
    </div>
  </>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<ProductPage />);
