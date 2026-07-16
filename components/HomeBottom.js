function ApparelVisual() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      background: '#0E1116',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("iframe", {
    src: "assets/case-apex-flow.html",
    title: "Apex Apparel - production flow, 5 stages",
    loading: "lazy",
    scrolling: "no",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      border: 0,
      display: 'block',
      pointerEvents: 'none'
    }
  }));
}
window.ApparelVisual = ApparelVisual;
function FounderStory() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-dark",
    id: "founder",
    style: {
      background: '#0B0F17'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "founder-text"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "BUILT BY PEOPLE WHO'VE RUN A FACTORY FLOOR"), /*#__PURE__*/React.createElement("blockquote", null, "We ran multi-stage factories to $30M annual revenue. We survived two ERP failures. We ended up back on Google Sheets."), /*#__PURE__*/React.createElement("p", {
    className: "body"
  }, "SimpleGrid exists because we were the customer first - multiple factories, 400-person workforce. We bought the same enterprise systems you're being pitched today. We watched them fail. We know exactly what breaks when the system can't keep up with the floor."), /*#__PURE__*/React.createElement("p", {
    className: "body"
  }, "That's why we built SimpleGrid the only way that makes sense to an operator: model it on your factory, run it on your real floor for 30 days, and only charge when it earns its keep."), /*#__PURE__*/React.createElement("p", {
    className: "body"
  }, "Senior engineers and deployment experts on every deployment. No sales reps. No SDRs. No chatbot. You deal with the people who'll actually build your system.")))));
}
window.FounderStory = FounderStory;
function ProofSection() {
  const CASES = [{
    label: 'Furniture exporter',
    headline: 'How a furniture exporter stopped $200K in silent losses.',
    poster: 'assets/elite-factory.jpeg',
    shot: true,
    video: 'https://youtu.be/9-OTYmUJe8U',
    link: 'case-furniture-manufacturer.html',
    stats: [{ v: 'Furniture export', l: 'industry' }, { v: '$200K', l: 'silent losses found' }, { v: '21 days', l: 'to go live' }]
  }, {
    label: 'Apparel maker',
    headline: 'How an apparel maker went live in 12 days after two failed ERPs.',
    apparel: true,
    video: null,
    link: 'case-apex.html',
    stats: [{ v: 'Apparel CMT', l: 'industry' }, { v: '30+', l: 'locations unified' }, { v: '12 days', l: 'to go live' }]
  }];
  const [active, setActive] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const n = CASES.length;
  const c = CASES[active];
  const touchX = React.useRef(null);
  const go = dir => {
    setPlaying(false);
    setActive(a => (a + dir + n) % n);
  };
  const onTouchStart = e => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = e => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
  };
  const ytEmbed = url => 'https://www.youtube-nocookie.com/embed/' + url.split('/').pop().split('?')[0] + '?autoplay=1&rel=0';
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "case-studies"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "CASE STUDIES"), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "Manufacturers running on SimpleGrid today."), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 920,
      margin: '0 0 28px'
    }
  }, "Two live deployments. More running confidentially."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 100
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-fullbleed"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-showcase"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-media" + (c.apparel ? " cs-media-diagram" : ""),
    onTouchStart: onTouchStart,
    onTouchEnd: onTouchEnd
  }, playing && c.video ? /*#__PURE__*/React.createElement("iframe", {
    className: "cs-video",
    src: ytEmbed(c.video),
    title: c.headline,
    frameBorder: "0",
    allow: "autoplay; encrypted-media; picture-in-picture; fullscreen",
    allowFullScreen: true
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, c.apparel ? /*#__PURE__*/React.createElement(ApparelVisual, null) : /*#__PURE__*/React.createElement("div", {
    className: "cs-poster",
    style: {
      backgroundImage: 'url(' + c.poster + ')'
    }
  }), c.shot && /*#__PURE__*/React.createElement("span", {
    className: "cs-shot"
  }, "● Actual shot"), !c.apparel && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "cs-scrim",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "cs-headline"
  }, c.headline), /*#__PURE__*/React.createElement("div", {
    className: "cs-actions"
  }, c.video && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn cs-btn-watch",
    onClick: () => setPlaying(true),
    "data-cta": "case_watch_video"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "13",
    viewBox: "0 0 11 13",
    fill: "currentColor",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 0l11 6.5L0 13z"
  })), " Watch video"), /*#__PURE__*/React.createElement("a", {
    className: "btn cs-btn-case",
    href: c.link,
    "data-cta": "case_see_study"
  }, "See case study ", /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "→"))))), playing && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "cs-close",
    onClick: () => setPlaying(false),
    "aria-label": "Close video"
  }, "×"), playing && /*#__PURE__*/React.createElement("a", {
    className: "cs-play-case",
    href: c.link,
    "data-cta": "case_see_study_overlay"
  }, "See case study ", /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "→")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "cs-float cs-float-prev",
    onClick: () => go(-1),
    "aria-label": "Previous case study"
  }, "‹"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "cs-float cs-float-next",
    onClick: () => go(1),
    "aria-label": "Next case study"
  }, "›")), c.apparel && /*#__PURE__*/React.createElement("div", {
    className: "cs-caption"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "cs-cap-h"
  }, c.headline), /*#__PURE__*/React.createElement("div", {
    className: "cs-cap-actions"
  }, c.video && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn cs-btn-watch",
    onClick: () => setPlaying(true),
    "data-cta": "case_watch_video"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "13",
    viewBox: "0 0 11 13",
    fill: "currentColor",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 0l11 6.5L0 13z"
  })), " Watch video"), /*#__PURE__*/React.createElement("a", {
    className: "btn cs-btn-case",
    href: c.link,
    "data-cta": "case_see_study"
  }, "See case study ", /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "→")))), /*#__PURE__*/React.createElement("div", {
    className: "cs-stats"
  }, c.stats.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "cs-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-stat-v"
  }, s.v), /*#__PURE__*/React.createElement("div", {
    className: "cs-stat-l"
  }, s.l)))), /*#__PURE__*/React.createElement("div", {
    className: "cs-dots",
    role: "tablist",
    "aria-label": "Case studies"
  }, CASES.map((cc, i) => /*#__PURE__*/React.createElement("button", {
    type: "button",
    key: i,
    role: "tab",
    "aria-selected": i === active,
    className: 'cs-dot' + (i === active ? ' is-active' : ''),
    onClick: () => {
      setPlaying(false);
      setActive(i);
    }
  }, cc.label)))))), /*#__PURE__*/React.createElement("style", null, `
        .cs-fullbleed { margin-top: 8px; }
        .cs-showcase { position: relative; background: #0E1116; overflow: hidden; border-top: 1px solid rgba(255,255,255,0.08); border-bottom: 1px solid rgba(255,255,255,0.08); }
        .cs-media { position: relative; width: 100%; height: min(56.25vw, 74vh); min-height: 340px; overflow: hidden; background: #000; touch-action: pan-y; }
        .cs-poster { position: absolute; inset: 0; background-size: cover; background-position: center; }
        .cs-video { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; display: block; z-index: 4; background: #000; }
        .cs-shot { position: absolute; top: 18px; left: 18px; z-index: 2; background: rgba(0,0,0,0.6); color: #fff; font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; padding: 5px 9px; border-radius: 5px; -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px); }
        .cs-scrim { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.12) 40%, rgba(0,0,0,0.82) 100%); }
        .cs-headline { position: absolute; left: 6vw; right: 6vw; bottom: 118px; z-index: 2; font-family: var(--font-heading); font-size: clamp(26px, 3.6vw, 48px); font-weight: 700; line-height: 1.08; letter-spacing: -0.025em; color: #fff; margin: 0; max-width: 820px; }
        .cs-actions { position: absolute; left: 6vw; bottom: 42px; z-index: 2; display: flex; gap: 12px; flex-wrap: wrap; }
        .cs-btn-watch { background: #fff; color: #1A1A1A; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; border: 0; cursor: pointer; }
        .cs-btn-watch:hover { background: rgba(255,255,255,0.88); }
        .cs-btn-case { background: rgba(255,255,255,0.12); color: #fff; border: 1px solid rgba(255,255,255,0.28); font-weight: 600; display: inline-flex; align-items: center; gap: 8px; }
        .cs-btn-case:hover { background: rgba(255,255,255,0.2); }
        .cs-float { position: absolute; top: 50%; transform: translateY(-50%); z-index: 5; width: 54px; height: 54px; display: flex; align-items: center; justify-content: center; font-size: 28px; line-height: 1; color: #fff; background: rgba(0,0,0,0.42); border: 1px solid rgba(255,255,255,0.28); border-radius: 50%; cursor: pointer; -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px); transition: background .15s ease, transform .15s ease; }
        .cs-float:hover { background: rgba(0,0,0,0.64); transform: translateY(-50%) scale(1.08); }
        .cs-float-prev { left: 22px; }
        .cs-float-next { right: 22px; }
        .cs-close { position: absolute; top: 64px; right: 16px; z-index: 6; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; line-height: 1; color: #fff; background: rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.32); cursor: pointer; }
        .cs-close:hover { background: rgba(0,0,0,0.82); }
        .cs-play-case { position: absolute; left: 50%; bottom: 16px; transform: translateX(-50%); z-index: 6; display: inline-flex; align-items: center; gap: 6px; padding: 8px 15px; border-radius: 999px; background: rgba(255,255,255,0.95); color: #1A1A1A; font-weight: 600; font-size: 10px; text-decoration: none; box-shadow: 0 6px 18px rgba(0,0,0,0.5); transition: background .15s ease, transform .15s ease; }
        .cs-play-case:hover { background: #fff; transform: translateX(-50%) translateY(-2px); }
        .cs-caption { padding: 30px 6vw 32px; background: #0E1116; border-top: 1px solid rgba(255,255,255,0.08); }
        .cs-cap-h { font-family: var(--font-heading); font-size: clamp(24px, 3vw, 40px); font-weight: 700; line-height: 1.1; letter-spacing: -0.025em; color: #fff; margin: 0 0 18px; max-width: 820px; }
        .cs-cap-actions { display: flex; gap: 12px; flex-wrap: wrap; }
        .cs-stats { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid rgba(255,255,255,0.08); }
        .cs-stat { padding: 26px 32px; border-right: 1px solid rgba(255,255,255,0.08); text-align: center; }
        .cs-stat:last-child { border-right: none; }
        .cs-stat-v { font-family: var(--font-heading); font-size: 30px; font-weight: 700; color: #fff; letter-spacing: -0.02em; line-height: 1.1; }
        .cs-stat-l { font-size: 13px; color: rgba(255,255,255,0.5); margin-top: 5px; }
        .cs-dots { display: flex; justify-content: center; gap: 8px; padding: 14px 16px; border-top: 1px solid rgba(255,255,255,0.08); flex-wrap: wrap; }
        .cs-dot { font: inherit; font-size: 13px; font-weight: 700; letter-spacing: 0.03em; color: rgba(255,255,255,0.45); background: none; border: 0; padding: 8px 16px; border-radius: 8px; cursor: pointer; transition: color .15s ease, background .15s ease; }
        .cs-dot:hover { color: #fff; }
        .cs-dot.is-active { color: #fff; background: rgba(255,255,255,0.10); }
        @media (max-width: 760px) {
          .cs-headline { left: 22px; right: 22px; bottom: 104px; }
          .cs-actions { left: 22px; bottom: 24px; }
          .cs-stats { grid-template-columns: 1fr; }
          .cs-stat { border-right: none; border-top: 1px solid rgba(255,255,255,0.08); padding: 18px 24px; }
          .cs-caption { padding: 22px 22px 24px; }
          .cs-float { width: 44px; height: 44px; font-size: 24px; }
          .cs-float-prev { left: 10px; }
          .cs-float-next { right: 10px; }
        }
        @media (prefers-reduced-motion: reduce) { .cs-float, .cs-btn-watch, .cs-btn-case, .cs-dot { transition: none; } }
      `));
}
window.ProofSection = ProofSection;
function Integrations() {
  // Status legend:
  //   'live'    - shipped on >=1 deployment, can demo today
  //   'request' - we have the integration spec and will build on contract sign
  //   'custom'  - the placeholder card inviting custom requests
  const items = [{
    name: 'Gmail',
    status: 'live',
    svg: '<svg viewBox="0 -31.5 256 256" width="24" height="24" aria-hidden="true"><path fill="#4285F4" d="M58.18 192.05V93.14L27.5 65.08 0 49.5v125.1c0 9.66 7.83 17.45 17.45 17.45z"/><path fill="#34A853" d="M197.82 192.05h40.73c9.66 0 17.45-7.83 17.45-17.45V49.5l-31.16 17.84-27.02 25.8z"/><path fill="#FBBC04" d="M197.82 17.5v75.64L256 49.5V26.23c0-21.58-24.64-33.89-41.89-20.94z"/><path fill="#C5221F" d="M0 49.5l58.18 43.64V17.5L41.89 5.29C24.61-7.66 0 4.65 0 26.23z"/><path fill="#EA4335" d="M58.18 93.14L128 145.5l69.82-52.36v-75.64L128 69.87 58.18 17.5z"/></svg>'
  }, {
    name: 'QuickBooks',
    status: 'request',
    svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#2CA01C"/><path d="M10.2 7.4a4.6 4.6 0 1 0 0 9.2" fill="none" stroke="#fff" stroke-width="1.7"/><line x1="10.2" y1="6.2" x2="10.2" y2="19.2" stroke="#fff" stroke-width="1.7" stroke-linecap="round"/><path d="M13.8 16.6a4.6 4.6 0 1 0 0-9.2" fill="none" stroke="#fff" stroke-width="1.7"/><line x1="13.8" y1="17.8" x2="13.8" y2="4.8" stroke="#fff" stroke-width="1.7" stroke-linecap="round"/></svg>'
  }, {
    name: 'Excel',
    status: 'live',
    svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#107C41"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="11">XL</text></svg>'
  }, {
    name: 'Google Sheets',
    status: 'live',
    svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" fill="#0F9D58"/><path d="M14 2v6h6" fill="#0B7B47"/><rect x="7" y="11" width="10" height="8" rx="1" fill="#fff"/><line x1="7" y1="14" x2="17" y2="14" stroke="#0F9D58" stroke-width="0.8"/><line x1="7" y1="17" x2="17" y2="17" stroke="#0F9D58" stroke-width="0.8"/><line x1="10.5" y1="11" x2="10.5" y2="19" stroke="#0F9D58" stroke-width="0.8"/><line x1="14" y1="11" x2="14" y2="19" stroke="#0F9D58" stroke-width="0.8"/></svg>'
  }, {
    name: 'Shopify',
    status: 'request',
    svg: '<svg viewBox="-7.5 0 124.5 124.5" width="24" height="24" aria-hidden="true"><path fill="#95BF47" d="M95.9 23.9c-.1-.6-.6-1-1.1-1-.5 0-9.3-.2-9.3-.2s-7.4-7.2-8.1-7.9c-.7-.7-2.2-.5-2.7-.3 0 0-1.4.4-3.7 1.1-.4-1.3-1-2.8-1.8-4.4-2.6-5-6.5-7.7-11.1-7.7-.3 0-.6 0-1 .1-.1-.2-.3-.3-.4-.5C53.7 1.5 51.1.4 48 .5c-6 .2-12 4.5-16.8 12.2-3.4 5.4-6 12.2-6.7 17.5-6.9 2.1-11.7 3.6-11.8 3.7-3.5 1.1-3.6 1.2-4 4.5C8.3 40.9 0 105.6 0 105.6l69.4 12 30.1-7.5S96 24.5 95.9 23.9zM68.2 17.1c-1.7.5-3.7 1.1-5.8 1.8 0-3-.4-7.2-1.8-10.8 4.5.8 6.7 5.9 7.6 9zm-9.7 3c-3.9 1.2-8.2 2.5-12.5 3.8 1.2-4.6 3.5-9.2 6.3-12.2 1-1.1 2.5-2.3 4.2-3 1.7 3.5 2.1 8.4 2 11.4zM48.2 4.5c1.4 0 2.6.3 3.6.9-1.6.8-3.2 2.1-4.7 3.7-3.7 4-6.5 10.2-7.7 16.2-3.6 1.1-7.1 2.2-10.3 3.2C31.4 19.3 39.2 4.8 48.2 4.5z"/><path fill="#5E8E3E" d="M94.8 22.9c-.5 0-9.3-.2-9.3-.2s-7.4-7.2-8.1-7.9c-.3-.3-.6-.4-1-.5l-5.2 106.3 30.1-7.5S96 24.5 95.9 23.9c-.1-.6-.6-1-1.1-1z"/><path fill="#fff" d="M58.4 38.4l-3.5 13.1s-3.9-1.8-8.5-1.5c-6.8.4-6.8 4.7-6.8 5.7.4 5.7 15.4 7 16.3 20.4.7 10.5-5.6 17.7-14.6 18.3-10.9.6-16.9-5.8-16.9-5.8l2.3-9.8s6 4.6 10.9 4.3c3.2-.2 4.3-2.8 4.2-4.6-.5-7.5-12.7-7.1-13.5-19.4-.7-10.3 6.1-20.7 21-21.6 5.8-.4 8.8 1.1 8.8 1.1z"/></svg>'
  }, {
    name: 'ShipStation',
    status: 'request',
    svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#0099FF"/><path d="M6 9 L12 6.5 L18 9 L18 15.5 L12 18 L6 15.5 Z" fill="none" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/><line x1="6" y1="9" x2="12" y2="11.5" stroke="#fff" stroke-width="1.4"/><line x1="18" y1="9" x2="12" y2="11.5" stroke="#fff" stroke-width="1.4"/><line x1="12" y1="11.5" x2="12" y2="18" stroke="#fff" stroke-width="1.4"/></svg>'
  }, {
    name: 'Outlook',
    status: 'request',
    svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#0078D4"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="13">O</text></svg>'
  }, {
    name: 'Tally',
    status: 'live',
    svg: '<svg viewBox="0 0 40 40" width="24" height="24" aria-hidden="true"><rect width="40" height="40" rx="6" fill="#263238"/><text x="20" y="26" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="16">T</text></svg>'
  }, {
    name: 'Xero',
    status: 'request',
    svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#13B5EA"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="13">X</text></svg>'
  }, {
    name: 'Stripe',
    status: 'request',
    svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#635BFF"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="13">S</text></svg>'
  }, {
    name: 'Zoho',
    status: 'request',
    svg: '<svg viewBox="0 0 40 40" width="24" height="24" aria-hidden="true"><rect width="40" height="40" rx="6" fill="#D0312D"/><text x="20" y="26" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="12">ZOHO</text></svg>'
  }, {
    name: 'WooCommerce',
    status: 'request',
    svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#7F54B3"/><text x="12" y="15" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="9">WC</text></svg>'
  }, {
    name: 'Mailchimp',
    status: 'request',
    svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#FFE01B"/><text x="12" y="16" text-anchor="middle" fill="#241C15" font-family="sans-serif" font-weight="700" font-size="13">M</text></svg>'
  }, {
    name: 'Klaviyo',
    status: 'request',
    svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#000"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="13">K</text></svg>'
  }, {
    name: 'PostgreSQL',
    status: 'live',
    svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#336791"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="10">Pg</text></svg>'
  }, {
    name: 'Amazon',
    status: 'request',
    svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#fff"/><text x="12" y="13" text-anchor="middle" fill="#232F3E" font-family="Arial, sans-serif" font-weight="700" font-size="6.2" letter-spacing="-0.4">amazon</text><path d="M5 16.4c4.2 2.8 9.8 2.8 14 .2" fill="none" stroke="#FF9900" stroke-width="1.7" stroke-linecap="round"/><path d="M19 16.6l-2.7-.5 1.4 2.4z" fill="#FF9900"/></svg>'
  }, {
    name: 'Braze',
    status: 'request',
    svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#FE5832"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="13">B</text></svg>'
  }, {
    name: 'Bill.com',
    status: 'request',
    svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#006FFF"/><text x="12" y="15" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="9">BILL</text></svg>'
  }, {
    name: 'TikTok Shop',
    status: 'request',
    svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#000"/><text x="12" y="16" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="11">TT</text></svg>'
  }, {
    name: 'SFTP',
    status: 'live',
    svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#4A5568"/><text x="12" y="15" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="700" font-size="9">SFTP</text></svg>'
  }, {
    name: '+ Build custom',
    status: 'custom',
    custom: true,
    svg: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="none" stroke="#3461E0" stroke-width="1.5" stroke-dasharray="3 2"/><line x1="12" y1="7" x2="12" y2="17" stroke="#3461E0" stroke-width="2" stroke-linecap="round"/><line x1="7" y1="12" x2="17" y2="12" stroke="#3461E0" stroke-width="2" stroke-linecap="round"/></svg>'
  }];
  // Duplicate the list so the loop is seamless when the track translates by -50%.
  const doubled = [...items, ...items];
  const intTrackRef = React.useRef(null);
  // Auto-scroll the logo strip at a calm pace, but let the viewer grab and drag it. Wraps seamlessly.
  React.useEffect(() => {
    const track = intTrackRef.current;
    if (!track) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0,
      offset = 0,
      last = 0,
      dragging = false,
      hoverPaused = false,
      onScreen = true,
      startX = 0,
      startOffset = 0;
    let setW = 1;
    const measure = () => {
      const sw = track.scrollWidth || 0;
      if (sw > 0) setW = sw / 2 + 7;
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro) ro.observe(track);
    const io = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(es => {
      onScreen = es[0].isIntersecting;
    }, {
      threshold: 0
    }) : null;
    if (io) io.observe(track);
    const wrap = x => {
      while (x <= -setW) x += setW;
      while (x > 0) x -= setW;
      return x;
    };
    const apply = () => {
      track.style.transform = 'translateX(' + offset + 'px)';
    };
    const down = e => {
      dragging = true;
      startX = e.clientX;
      startOffset = offset;
      if (track.setPointerCapture) {
        try {
          track.setPointerCapture(e.pointerId);
        } catch (err) {}
      }
    };
    const move = e => {
      if (!dragging) return;
      offset = wrap(startOffset + (e.clientX - startX));
      apply();
    };
    const up = () => {
      dragging = false;
    };
    const enter = () => {
      hoverPaused = true;
    };
    const leave = () => {
      hoverPaused = false;
    };
    track.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    track.addEventListener('mouseenter', enter);
    track.addEventListener('mouseleave', leave);
    const loop = t => {
      raf = requestAnimationFrame(loop);
      if (!last) last = t;
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      if (!dragging && !hoverPaused && onScreen) {
        offset = wrap(offset - setW / 200 * dt);
        apply();
      }
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      track.removeEventListener('mouseenter', enter);
      track.removeEventListener('mouseleave', leave);
      if (ro) ro.disconnect();
      if (io) io.disconnect();
    };
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "integrations",
    style: {
      minHeight: 'calc((100vh - 64px) / 2.6)',
      paddingTop: 40,
      paddingBottom: 40,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("style", {
    dangerouslySetInnerHTML: {
      __html: `
        .int-marquee{overflow:hidden;padding:6px 0;mask-image:linear-gradient(90deg,transparent 0%,black 6%,black 94%,transparent 100%);-webkit-mask-image:linear-gradient(90deg,transparent 0%,black 6%,black 94%,transparent 100%);margin-top:24px}
        .int-track{display:flex;gap:14px;width:max-content;cursor:grab;touch-action:pan-y;user-select:none;-webkit-user-select:none;will-change:transform}
        .int-track:active{cursor:grabbing}
        .int-marquee .int-card{flex:0 0 150px;position:relative}
        .int-marquee .int-card-custom{border:1px dashed var(--sg-blue);background:rgba(74,123,247,0.04)}
        .int-marquee .int-card-custom .int-name{color:var(--sg-blue)}
        .int-badge{position:absolute;top:6px;right:6px;font-size:9px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;padding:2px 6px;border-radius:999px;line-height:1.2}
        .int-badge-live{background:rgba(16,185,129,0.12);color:#0f8f6a}
        .int-badge-request{background:rgba(156,163,175,0.16);color:#5a6373}
        @keyframes int-roll{from{transform:translateX(0)}to{transform:translateX(calc(-50% - 7px))}}
        @media(prefers-reduced-motion:reduce){.int-track{animation:none}}
        .int-legend{display:flex;justify-content:center;gap:18px;flex-wrap:wrap;font-size:12px;color:var(--fg2);margin-top:14px}
        .int-legend-dot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px;vertical-align:1px}
      `
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "SYNCS WITH"), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "Works with what you already use."), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "SimpleGrid connects to the tools you already run - accounting, spreadsheets, sales channels, messaging and shipping. New connectors are built as part of your SimpleGrid setup, included in the configuration. ", /*#__PURE__*/React.createElement("a", {
    href: "syncs.html",
    style: {
      color: 'var(--sg-blue)',
      fontWeight: 600,
      textDecoration: 'underline'
    }
  }, "See all syncs \u2192")))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 200
  }, /*#__PURE__*/React.createElement("div", {
    className: "int-marquee"
  }, /*#__PURE__*/React.createElement("div", {
    className: "int-track",
    ref: intTrackRef
  }, doubled.map((ig, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: 'int-card' + (ig.custom ? ' int-card-custom' : ''),
    "aria-hidden": i >= items.length ? 'true' : undefined,
    title: ig.name
  }, /*#__PURE__*/React.createElement("div", {
    className: "int-icon",
    dangerouslySetInnerHTML: {
      __html: ig.svg
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "int-name"
  }, ig.name)))))), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 24,
      fontSize: 13,
      color: 'var(--fg2)',
      lineHeight: 1.6,
      maxWidth: 560,
      margin: '24px auto 0'
    }
  }, "Don't see yours? Email ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:hello@simplegrid.ai?subject=Integration%20request%20%E2%80%94%20SimpleGrid&body=Hi%20SimpleGrid%2C%0D%0A%0D%0AWe%27d%20like%20SimpleGrid%20to%20integrate%20with%3A%20%5Btool%20name%5D%0D%0A%0D%0ABrief%20note%20on%20what%20we%20need%3A%0D%0A%5BWhat%20it%20syncs%2C%20how%20often%2C%20any%20auth%20notes%5D%0D%0A%0D%0AThanks%21",
    style: {
      color: 'var(--sg-blue)',
      fontWeight: 600,
      textDecoration: 'underline'
    }
  }, "hello@simplegrid.ai"), " with a brief note on what you need - we'll add it.")));
}
window.Integrations = Integrations;
function DataSecurity() {
  var lock = '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/></svg>';
  var db = '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="12" cy="6" rx="7" ry="2.6"/><path d="M5 6v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6"/><path d="M5 12v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-6"/></svg>';
  var shield = '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7 2.5v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9v-5z"/><path d="M9 11.8l2 2 4-4"/></svg>';
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-alt",
    id: "security",
    style: {
      minHeight: 'calc((100vh - 64px) / 2.6)',
      paddingTop: 40,
      paddingBottom: 40,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "DATA SECURITY"), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "Your data stays yours.")), /*#__PURE__*/React.createElement("div", {
    className: "ds-grid"
  }, [{
    badge: 'In place',
    icon: lock,
    t: 'Encryption & data export',
    p: 'AES-256 at rest, TLS 1.3 in transit. Export all your data on request - no clawback, no ransom.'
  }, {
    badge: 'Architecture',
    icon: db,
    t: 'Your own database',
    p: "Every client gets an isolated database. Shared platform, fully separate data - no one ever sees another's."
  }, {
    badge: 'On the roadmap',
    icon: shield,
    t: 'SOC 2 Type II · Q4 2026',
    p: 'An independent audit of our security controls, due Q4 2026. Ask for our current security questionnaire today.'
  }].map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i * 100
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ds-ic",
    "aria-hidden": "true",
    dangerouslySetInnerHTML: {
      __html: s.icon
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "ds-badge"
  }, s.badge), /*#__PURE__*/React.createElement("h3", {
    className: "ds-t"
  }, s.t), /*#__PURE__*/React.createElement("p", {
    className: "ds-p"
  }, s.p))))), /*#__PURE__*/React.createElement("style", null, `
        .ds-grid { margin-top: 30px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .ds-card { height: 100%; display: flex; flex-direction: column; align-items: flex-start; background: #fff; border: 1px solid var(--border); border-radius: 16px; padding: 26px 24px; box-shadow: 0 6px 22px rgba(15,23,42,0.05); transition: border-color .15s ease, box-shadow .15s ease, transform .15s ease; }
        .ds-card:hover { border-color: color-mix(in srgb, var(--sg-blue) 40%, var(--border)); box-shadow: 0 14px 36px rgba(15,23,42,0.10); transform: translateY(-3px); }
        .ds-ic { width: 40px; height: 40px; border-radius: 11px; display: flex; align-items: center; justify-content: center; background: color-mix(in srgb, var(--sg-blue) 10%, #fff); color: var(--sg-blue); }
        .ds-badge { display: inline-block; margin: 16px 0 10px; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--sg-blue); background: color-mix(in srgb, var(--sg-blue) 9%, transparent); border: 1px solid color-mix(in srgb, var(--sg-blue) 20%, transparent); padding: 4px 11px; border-radius: 999px; }
        .ds-t { font-family: var(--font-heading); font-size: 17px; font-weight: 700; letter-spacing: -0.01em; color: var(--fg1); margin: 0 0 8px; }
        .ds-p { font-size: 14px; line-height: 1.55; color: var(--fg2); margin: 0; }
        @media (max-width: 820px) { .ds-grid { grid-template-columns: 1fr; } }
      `)));
}
window.DataSecurity = DataSecurity;
function Architecture() {
  const cols = [{
    t: 'One permanent record',
    b: 'Every action recorded once. Can never be changed. Your audit trail isn\'t a feature - it\'s how the system is built.'
  }, {
    t: 'Configuration, not code',
    b: 'AI writes a configuration. Platform reads it and generates forms, workflows, rules, dashboards. Change config, system changes instantly.'
  }, {
    t: 'Every rule is a row',
    b: 'Approval above $10K? One row. QC before dispatch? One row. No code. No deployment cycle.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-dark"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag",
    style: {
      color: 'rgba(255,255,255,0.4)'
    }
  }, "WHY WE CAN CONFIGURE IN DAYS"), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "The architecture that lets us configure to your floor.")), /*#__PURE__*/React.createElement("div", {
    className: "arch-grid",
    style: {
      marginTop: 28
    }
  }, cols.map((c, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i * 100
  }, /*#__PURE__*/React.createElement("div", {
    className: "arch-col"
  }, /*#__PURE__*/React.createElement("h3", null, c.t), /*#__PURE__*/React.createElement("p", null, c.b)))))));
}
window.Architecture = Architecture;
function ComparisonTable() {
  const rows = [{
    label: 'Built for',
    sap: 'F500 finance, multi-country tax, public-co close',
    epicor: 'Discrete manufacturers with mature IT teams',
    qb: 'Small businesses that need bookkeeping',
    sg: 'Mid-market manufacturers who don\'t want to be a software project'
  }, {
    label: 'What they do well',
    sap: 'Deep finance, global compliance, scale to billions',
    epicor: 'Strong shop-floor MRP, mature manufacturing modules',
    qb: 'Easy accounting, every accountant knows it',
    sg: 'A live layer on your floor - keeps your ledger, no migration'
  }, {
    label: 'Time to value',
    sap: '12-18+ months',
    epicor: '9-12 months',
    qb: 'Same day for books - but breaks as you scale ops',
    sg: 'Live in 7-21 days on your real data'
  }, {
    label: 'Up-front cost',
    sap: '$500K+',
    epicor: '$150K-$300K',
    qb: 'Low monthly fee',
    sg: 'Configured at our cost - you pay only when it works'
  }, {
    label: 'Change a workflow',
    sap: 'Consulting engagement',
    epicor: 'Dev sprint',
    qb: 'Build it in spreadsheets outside the system',
    sg: 'Configure live, often on the same call'
  }, {
    label: 'Floor-staff UX',
    sap: 'Built for accountants and analysts',
    epicor: 'Built for planners and IT',
    qb: 'Built for bookkeepers',
    sg: 'Built for the warehouse manager - plain English, same habit as texting'
  }, {
    label: 'Try before paying',
    sap: 'Sandbox demos',
    epicor: 'Sandbox demos',
    qb: 'Free tier',
    sg: '30 days running on your real floor, your real orders'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "COMPARE - HONESTLY"), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "When is SimpleGrid the right call?"), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 780
    }
  }, "SAP, Oracle NetSuite, Epicor and QuickBooks are excellent at what they were built for. SimpleGrid was built for a specific shape of customer: mid-market manufacturers who run differently from everyone, can't afford a 12-month rip-and-replace, and want a live operations layer on top of the books they already run.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 200
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    className: "compare-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null), /*#__PURE__*/React.createElement("th", null, "SAP / Oracle NetSuite"), /*#__PURE__*/React.createElement("th", null, "Epicor / Plex"), /*#__PURE__*/React.createElement("th", null, "QuickBooks + Excel"), /*#__PURE__*/React.createElement("th", null, "SimpleGrid"))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      fontWeight: 600,
      color: 'var(--fg1)'
    }
  }, r.label), /*#__PURE__*/React.createElement("td", null, r.sap), /*#__PURE__*/React.createElement("td", null, r.epicor), /*#__PURE__*/React.createElement("td", null, r.qb), /*#__PURE__*/React.createElement("td", null, r.sg)))))))));
}
window.ComparisonTable = ComparisonTable;
function FromTheField() {
  // Hand-picked: the three strongest field-notes for an ERP buyer.
  // Title/slug/desc are kept in sync with /blog/<slug>/ manually here so
  // the home doesn't need to load BLOG_DATA.
  const posts = [{
    slug: 'why-your-erp-vendor-charges-you-for-every-change-and-how-to-stop-paying',
    cat: 'OPERATOR ECONOMICS',
    title: "Why your ERP vendor charges you for every change - and how to stop paying.",
    desc: "Most ERPs price post-launch changes at $8K-$20K per change order. Here's the architecture trick that lets us include every change, forever, in one subscription."
  }, {
    slug: 'why-mid-market-manufacturers-are-the-most-underserved-businesses-in-enterprise-software',
    cat: 'MARKET',
    title: "Why mid-market manufacturers are the most underserved businesses in enterprise software.",
    desc: "QuickBooks is too small. NetSuite is too big. Why the $6M-$180M factory has been stuck between two bad options for 20 years - and what changed."
  }, {
    slug: 'event-sourcing-why-simplegrid-stores-everything-that-ever-happened',
    cat: 'ARCHITECTURE',
    title: "Event sourcing: why SimpleGrid stores every action forever.",
    desc: "Your audit trail isn't a feature we turned on. It's how the system is built - every event is permanent, the current state is just a query."
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "from-the-field",
    "aria-label": "From the field"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag",
    style: {
      textAlign: 'center'
    }
  }, "FROM THE FIELD"), /*#__PURE__*/React.createElement("h2", {
    className: "h2",
    style: {
      textAlign: 'center'
    }
  }, "Field notes from operators running the factory floor.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 20,
      marginTop: 32
    }
  }, posts.map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: p.slug,
    delay: i * 80
  }, /*#__PURE__*/React.createElement("a", {
    href: 'blog/' + p.slug + '/',
    "data-cta": 'from_the_field_' + i,
    style: {
      display: 'block',
      textDecoration: 'none',
      color: 'inherit',
      padding: '24px',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      background: '#fff',
      height: '100%',
      transition: 'all 160ms var(--ease-standard)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.06)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = '';
      e.currentTarget.style.boxShadow = '';
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.14em',
      color: 'var(--sg-blue)',
      marginBottom: 10
    }
  }, p.cat), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 17,
      fontWeight: 700,
      color: 'var(--fg1)',
      margin: '0 0 10px',
      lineHeight: 1.3,
      letterSpacing: '-0.005em'
    }
  }, p.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--fg2)',
      lineHeight: 1.55,
      margin: 0
    }
  }, p.desc), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      marginTop: 14,
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--sg-blue)'
    }
  }, "Read \u2192"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "blog.html",
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--sg-blue)',
      textDecoration: 'none'
    }
  }, "See all 17 field notes \u2192"))));
}
window.FromTheField = FromTheField;
function HomeFAQ() {
  const items = [{
    q: "What happens if it doesn't work after 30 days?",
    a: "You walk. No invoice. No clawback. We've still done the configuration and the data work at our cost. You get a clean data export and your spreadsheets back. That's the point of the 30-day run - you only pay for something you've already watched work on your real floor."
  }, {
    q: "Do we have to migrate our data ourselves?",
    a: "No - and your QuickBooks or Tally stays exactly where it is. SimpleGrid syncs to it. Whatever your floor runs on - spreadsheets, paper, group chats, an old ERP - we pull it in, clean it, structure it, and load it. Data work is included in the configuration, not a separate line item. You don't touch the data."
  }, {
    q: "How much does it cost after the 30-day trial?",
    a: /*#__PURE__*/React.createElement(React.Fragment, null, "Before you decide, we agree on a number together based on the size of your operation. After that, you pay one monthly subscription. That is the entire bill - no setup, no add-ons, no surprise line items, no per-seat fees. We are not free and not cheap - we configure at our cost because we're confident in what 30 days on your floor will show. Full details on the ", /*#__PURE__*/React.createElement("a", {
      href: "pricing.html",
      style: {
        color: 'var(--sg-blue)',
        fontWeight: 600
      }
    }, "pricing page"), ".")
  }, {
    q: "Who runs the deployment - sales reps, or actual engineers?",
    a: "Senior engineers and deployment experts who've worked on factory floors. No SDRs, no sales reps, no chatbot, no offshored implementation partner you also have to pay. You work directly with the team that builds the system."
  }, {
    q: "What's the catch?",
    a: "We onboard selectively each quarter because we can only succeed when our customers succeed. If we don't think we can win for you, we'll say so on the call. We're built for mid-market manufacturers, roughly $5M-$250M in revenue - below that, spreadsheets or QuickBooks still win; above that, SAP or Oracle make more sense. That's the catch."
  }];
  const [open, setOpen] = React.useState(0);
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-alt",
    id: "home-faq",
    "aria-label": "Frequently asked questions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "BEFORE YOU DECIDE"), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "Five questions every buyer asks us.")),/*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i * 80
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOpen(open === i ? -1 : i),
    "aria-expanded": open === i,
    "aria-controls": `home-faq-${i}`,
    style: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
      padding: '18px 22px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      font: 'inherit',
      color: 'inherit',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 17,
      fontWeight: 700,
      color: 'var(--fg1)',
      letterSpacing: '-0.005em'
    }
  }, it.q), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      flexShrink: 0,
      color: 'var(--sg-blue)',
      fontSize: 22,
      fontWeight: 300,
      transform: open === i ? 'rotate(45deg)' : 'none',
      transition: 'transform 180ms ease'
    }
  }, "+")), open === i && /*#__PURE__*/React.createElement("div", {
    id: `home-faq-${i}`,
    style: {
      padding: '0 22px 18px',
      fontSize: 'var(--fs-small)',
      lineHeight: 1.65,
      color: 'var(--fg2)'
    }
  }, it.a)))))));
}
window.HomeFAQ = HomeFAQ;

// "Why this isn't another ERP" - the three USPs of the ops-layer positioning.
// Compact 3-card band; reuses the sec-grid/sec-card styles from DataSecurity.
function WhyNotERP() {
  const cards = [{
    badge: 'DEPLOY FAST',
    color: 'var(--sg-blue)',
    t: 'Deploy in days, not quarters.',
    p: 'SimpleGrid maps to the workflows your floor already runs and never touches your financial backend. That’s why it goes live in 7–21 days, not 12 months.'
  }, {
    badge: 'ADAPT FREELY',
    color: 'var(--sg-purple)',
    t: 'Software that mirrors your floor, not a template.',
    p: 'Your ops managers change routing steps, BOM logic, and QC checklists themselves. No developer, no ticket, no downtime.'
  }, {
    badge: 'INTEGRATE CLEANLY',
    color: 'var(--sg-green)',
    t: 'Keep your accounting ledger. Upgrade your operational reality.',
    p: 'A layer, not a replacement. SimpleGrid handles the fast, messy reality of the floor and pushes clean financial data into QuickBooks or Tally automatically.'
  }];
  const [open, setOpen] = React.useState([0]);
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "not-an-erp"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "WHY THIS ISN'T ANOTHER ERP"), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "A layer on top of the books you already run. Not a rip-and-replace.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 100
  }, /*#__PURE__*/React.createElement("div", {
    className: "erp-acc"
  }, cards.map((c, i) => /*#__PURE__*/React.createElement("div", {
    className: 'erp-row' + (open.includes(i) ? ' open' : ''),
    key: i
  }, /*#__PURE__*/React.createElement("button", {
    className: "erp-bar",
    onClick: () => setOpen(o => o.includes(i) ? o.filter(x => x !== i) : [...o, i]),
    "aria-expanded": open.includes(i)
  }, /*#__PURE__*/React.createElement("span", {
    className: "erp-bar-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "erp-kicker",
    style: {
      color: c.color
    }
  }, c.badge), /*#__PURE__*/React.createElement("span", {
    className: "erp-head"
  }, c.t)), /*#__PURE__*/React.createElement("span", {
    className: "erp-chev",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "erp-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "erp-body-inner"
  }, /*#__PURE__*/React.createElement("p", null, c.p)))))))), /*#__PURE__*/React.createElement("style", null, `
        .erp-acc { margin-top: 34px; display: flex; flex-direction: column; gap: 14px; }
        .erp-row { border-radius: 14px; overflow: hidden; background: #EAF4FE; border: 1px solid #D6E8FB; transition: background 0.2s ease, border-color 0.2s ease; }
        .erp-row:hover { background: #E2EEFE; }
        .erp-row.open { background: #E5F0FE; border-color: #C4DDFA; }
        .erp-bar { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 22px 28px; background: none; border: 0; cursor: pointer; text-align: left; font-family: inherit; }
        .erp-bar-text { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
        .erp-kicker { font-size: 11.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; }
        .erp-head { font-family: var(--font-heading); font-size: 21px; font-weight: 700; letter-spacing: -0.01em; color: var(--fg1); line-height: 1.25; }
        .erp-chev { flex: 0 0 auto; color: var(--sg-blue); display: inline-flex; transition: transform 0.25s ease; }
        .erp-row.open .erp-chev { transform: rotate(180deg); }
        .erp-body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.32s ease; }
        .erp-row.open .erp-body { grid-template-rows: 1fr; }
        .erp-body-inner { overflow: hidden; }
        .erp-body p { margin: 0; padding: 0 28px 26px; font-size: 16px; line-height: 1.62; color: var(--fg2); max-width: 820px; }
        @media (max-width: 640px) {
          .erp-bar { padding: 18px 20px; }
          .erp-head { font-size: 18px; }
          .erp-body p { padding: 0 20px 20px; font-size: 15px; }
        }
      `));
}
window.WhyNotERP = WhyNotERP;

// "Who it's for" - five persona cards, each deep-linking into the matching
// block on solutions.html. Card style mirrors the FromTheField link cards.
function WhoItsFor() {
  const personas = [{
    role: 'Owner / MD',
    desc: 'see before you commit',
    line: "See what you can build today, what you're short on, and what it'll cost, before you commit to a customer.",
    href: 'solutions-owner.html',
    cta: 'persona_owner'
  }, {
    role: 'COO / VP Operations',
    desc: 'one source of truth',
    line: "One system, every team, the same data. No one working off yesterday's numbers.",
    href: 'solutions-coo.html',
    cta: 'persona_coo'
  }, {
    role: 'CFO / Finance Head',
    desc: 'costing, your way',
    line: 'Your costing logic, your way. Not the way an enterprise template thinks you should run it.',
    href: 'solutions-cfo.html',
    cta: 'persona_cfo'
  }, {
    role: 'Plant Manager',
    desc: 'the floor, live',
    line: 'Your floor staff log it. Everyone sees it live. No lag, no leakage, no one working in the dark.',
    href: 'solutions-plant-manager.html',
    cta: 'persona_plant_manager'
  }, {
    role: 'Sales Head',
    desc: 'promise with proof',
    line: "Before you promise a customer a date, you'll know if production can actually hit it.",
    href: 'solutions-sales-head.html',
    cta: 'persona_sales_head'
  }];
  const [active, setActive] = React.useState(0);
  const p = personas[active];
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-dark",
    id: "who-its-for",
    style: {
      background: '#0B0F17'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "WHO IT'S FOR"), /*#__PURE__*/React.createElement("h2", {
    className: "h2",
    style: {
      color: '#fff'
    }
  }, "From the floor to the founder.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 100
  }, /*#__PURE__*/React.createElement("div", {
    className: "rt-tabs",
    role: "tablist",
    "aria-label": "Roles"
  }, personas.map((x, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: 'rt-tab' + (i === active ? ' active' : ''),
    role: "tab",
    "aria-selected": i === active,
    onClick: () => setActive(i)
  }, /*#__PURE__*/React.createElement("span", {
    className: "rt-role"
  }, x.role), /*#__PURE__*/React.createElement("span", {
    className: "rt-desc"
  }, x.desc)))), /*#__PURE__*/React.createElement("div", {
    className: "rt-panel"
  }, /*#__PURE__*/React.createElement("p", {
    className: "rt-stmt",
    key: active
  }, p.line), /*#__PURE__*/React.createElement("a", {
    className: "rt-see",
    href: p.href,
    "data-cta": p.cta
  }, "See how \u2192")))), /*#__PURE__*/React.createElement("style", null, `
        .rt-tabs { display: flex; flex-wrap: nowrap; gap: 48px; margin-top: 44px; border-bottom: 1px solid rgba(255,255,255,0.1); overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
        .rt-tabs::-webkit-scrollbar { display: none; }
        .rt-tab { flex: 0 0 auto; background: none; border: 0; padding: 0 0 18px; margin: 0; text-align: left; cursor: pointer; position: relative; font-family: inherit; }
        .rt-role { display: block; font-size: 15px; font-weight: 700; letter-spacing: -0.01em; color: #6B7280; transition: color 0.18s ease; white-space: nowrap; }
        .rt-desc { display: block; font-size: 13px; font-weight: 500; color: #6B7280; opacity: 0.65; margin-top: 5px; white-space: nowrap; }
        .rt-tab:hover .rt-role { color: rgba(255,255,255,0.75); }
        .rt-tab.active .rt-role { color: #fff; }
        .rt-tab.active::after { content: ''; position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: #fff; border-radius: 2px; }
        .rt-panel { padding-top: 52px; max-width: 760px; }
        .rt-stmt { margin: 0 0 30px; font-size: 30px; line-height: 1.4; font-weight: 500; letter-spacing: -0.01em; color: rgba(255,255,255,0.85); animation: rt-fade 0.3s ease; }
        .rt-see { color: #3B82F6; text-decoration: none; font-size: 16px; font-weight: 600; }
        .rt-see:hover { text-decoration: underline; }
        @keyframes rt-fade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
        @media (max-width: 700px) { .rt-tabs { gap: 28px; } .rt-stmt { font-size: 22px; } }
      `));
}
window.WhoItsFor = WhoItsFor;

// FinalCTA now lives in its own shared component (components/FinalCTA.jsx) so it
// can be reused with per-page copy across every page.