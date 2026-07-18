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
        window.scrollTo({
          top,
          behavior: 'smooth'
        });
      } else if (tries++ < 20) {
        setTimeout(tryScroll, 100);
      }
    };
    setTimeout(tryScroll, 150);
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("main", {
    id: "main"
  }, /*#__PURE__*/React.createElement(ProductHeroNew, null), /*#__PURE__*/React.createElement(MotivationSection, null), /*#__PURE__*/React.createElement(Integrations, null), /*#__PURE__*/React.createElement(AbilitySection, null), /*#__PURE__*/React.createElement(PlatformCapabilities, null), /*#__PURE__*/React.createElement(CustomRules, null), /*#__PURE__*/React.createElement(DataSecurity, null), /*#__PURE__*/React.createElement(FinalCTA, {
    title: "One system for your whole operation.",
    body: "Orders, inventory, production and costing in one place, synced to the books you already run. See it working on your own operation before you pay anything.",
    note: "$0 up front. Live in 3 weeks or less. 30-day trial.",
    ctaLabel: "See a live demo"
  })), showLogin && /*#__PURE__*/React.createElement(LoginModal, {
    onClose: () => setShowLogin(false)
  }), showInvite && /*#__PURE__*/React.createElement(InviteModal, {
    onClose: () => setShowInvite(false)
  }), /*#__PURE__*/React.createElement("div", {
    className: "mobile-cta"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowInvite(true),
    "data-cta": "mobile_demo",
    className: "btn btn-invite"
  }, "Book a demo")));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(ProductPage, null));