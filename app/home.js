// Demo video section (black). Placeholder poster for now; swap the img for a
// real video/embed when the demo is ready.
function DemoVideo() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-dark",
    id: "demo",
    style: {
      background: '#0B0F17'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "DEMO"), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "See SimpleGrid running on a real floor."), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 720
    }
  }, "A short walkthrough of the operations layer in action. Full demo video coming soon.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("div", {
    className: "demo-frame"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/elite-factory.jpeg",
    alt: "SimpleGrid demo preview",
    className: "demo-poster"
  }), /*#__PURE__*/React.createElement("span", {
    className: "demo-play",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "34",
    height: "34",
    fill: "#fff"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 5v14l11-7z"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "demo-badge"
  }, "Sample preview. Demo video coming soon.")))), /*#__PURE__*/React.createElement("style", null, `
        .demo-frame { position: relative; margin-top: 36px; border-radius: 16px; overflow: hidden; aspect-ratio: 16 / 9; background: #0b0f17; border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 30px 80px rgba(0,0,0,0.5); }
        .demo-poster { width: 100%; height: 100%; object-fit: cover; display: block; opacity: 0.5; }
        .demo-play { position: absolute; inset: 0; margin: auto; width: 84px; height: 84px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: rgba(52,97,224,0.92); box-shadow: 0 12px 44px rgba(52,97,224,0.5); }
        .demo-play svg { margin-left: 5px; }
        .demo-badge { position: absolute; left: 16px; bottom: 14px; font-size: 12px; font-weight: 600; letter-spacing: 0.04em; color: rgba(255,255,255,0.85); background: rgba(0,0,0,0.5); padding: 6px 12px; border-radius: 8px; }
      `));
}

function App() {
  const [showLogin, setShowLogin] = React.useState(false);
  // When we arrive with a #section hash (e.g. from another page's Home menu),
  // scroll to it once the sections have rendered.
  React.useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({
        block: 'start'
      });
    });
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("main", {
    id: "main"
  }, /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(TrustStrip, null), /*#__PURE__*/React.createElement(IntegrationsBar, null), /*#__PURE__*/React.createElement(ProblemSection, null), /*#__PURE__*/React.createElement(BurstBand, null), /*#__PURE__*/React.createElement(WhatWeDo, null), /*#__PURE__*/React.createElement(HowItWorks, null), /*#__PURE__*/React.createElement(DemoVideo, null), /*#__PURE__*/React.createElement(WhyNotERP, null), /*#__PURE__*/React.createElement(WhoItsFor, null), /*#__PURE__*/React.createElement(ProofSection, null), /*#__PURE__*/React.createElement(FounderStory, null), /*#__PURE__*/React.createElement(HomeFAQ, null), /*#__PURE__*/React.createElement(FinalCTA, null)), showLogin && /*#__PURE__*/React.createElement(LoginModal, {
    onClose: () => setShowLogin(false)
  }), /*#__PURE__*/React.createElement("div", {
    className: "mobile-cta"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://cal.com/simplegrid-ai",
    target: "_blank",
    rel: "noopener noreferrer",
    "data-cta": "mobile_sticky",
    className: "btn btn-invite"
  }, "Book a demo")));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));