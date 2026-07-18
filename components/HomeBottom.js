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
function ProofSection() {
  const CASES = [{
    label: 'Elite Arts & Crafts',
    headline: 'Elite Arts & Crafts stopped $200K in silent losses.',
    poster: 'assets/elite-factory.jpeg',
    clip: 'assets/elite-clip.mp4',
    shot: true,
    link: 'case-furniture-manufacturer.html',
    stats: [{
      v: '$200K',
      l: 'silent losses stopped'
    }, {
      v: '90%',
      l: 'less planning time'
    }, {
      v: '21 days',
      l: 'to go live'
    }],
    quote: 'They modeled our whole operation in three weeks. We found $200K in losses we could never see.',
    attrib: 'Chirag, Founder, Elite Arts & Crafts'
  }, {
    label: 'Apex Apparel',
    headline: 'Live in 12 days. Three businesses on one system.',
    apparel: true,
    link: 'case-apex.html',
    stats: [{
      v: '30+',
      l: 'locations in one view'
    }, {
      v: '12 days',
      l: 'to go live'
    }],
    quote: 'They sent a working demo in 72 hours and it was 60-70% right already. No other vendor showed us a working system before asking for money.',
    attrib: 'Founder, Apex Apparel'
  }];
  const [active, setActive] = React.useState(0);
  const n = CASES.length;
  const c = CASES[active];
  const touchX = React.useRef(null);
  const go = dir => {
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
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-roomy",
    id: "case-studies"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "CASE STUDIES"), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "Proof, not promises."), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 920,
      margin: '0 0 28px'
    }
  }, "Live deployments. Real numbers. More running confidentially."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 100
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-fullbleed"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-showcase"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-media" + (c.apparel ? " cs-media-diagram" : ""),
    onTouchStart: onTouchStart,
    onTouchEnd: onTouchEnd
  }, c.apparel ? /*#__PURE__*/React.createElement(ApparelVisual, null) : /*#__PURE__*/React.createElement("video", {
    className: "cs-clip",
    src: c.clip,
    poster: c.poster,
    autoPlay: true,
    muted: true,
    loop: true,
    playsInline: true,
    preload: "metadata",
    "aria-label": "Inside the Elite Arts & Crafts factory"
  }), c.shot && /*#__PURE__*/React.createElement("span", {
    className: "cs-shot"
  }, "\u25CF Actual shot"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "cs-float cs-float-prev",
    onClick: () => go(-1),
    "aria-label": "Previous case study"
  }, "\u2039"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "cs-float cs-float-next",
    onClick: () => go(1),
    "aria-label": "Next case study"
  }, "\u203A")), /*#__PURE__*/React.createElement("div", {
    className: "cs-caption"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "cs-cap-h"
  }, c.headline), /*#__PURE__*/React.createElement("div", {
    className: "cs-cap-actions"
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn cs-btn-case",
    href: c.link,
    "data-cta": "case_see_study"
  }, "See case study ", /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2192")))), /*#__PURE__*/React.createElement("div", {
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
    onClick: () => setActive(i)
  }, cc.label)))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 150
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("figure", {
    className: "cs-quote",
    key: active
  }, /*#__PURE__*/React.createElement("blockquote", null, "\"", c.quote, "\""), /*#__PURE__*/React.createElement("figcaption", null, c.attrib)))), /*#__PURE__*/React.createElement("style", null, `
        /* Boxed showcase: the case study sits inside a contained card, not edge to edge. */
        .cs-fullbleed { margin-top: 8px; max-width: 1040px; margin-left: auto; margin-right: auto; padding: 0 32px; }
        .cs-showcase { position: relative; background: #fff; overflow: hidden; border: 1px solid var(--border); border-radius: 20px; box-shadow: 0 24px 60px rgba(20,28,46,0.08); }
        /* Clean 16:9 media - the 1080p clip fills it exactly, so no black bars. */
        .cs-media { position: relative; width: 100%; aspect-ratio: 16 / 9; overflow: hidden; touch-action: pan-y; }
        @media (max-width: 700px) { .cs-fullbleed { padding: 0 20px; } }
        .cs-clip { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
        .cs-shot { position: absolute; top: 18px; left: 18px; z-index: 2; background: rgba(0,0,0,0.6); color: #fff; font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; padding: 5px 9px; border-radius: 5px; -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px); }
        .cs-btn-case { font-weight: 600; display: inline-flex; align-items: center; gap: 8px; }
        .cs-float { position: absolute; top: 50%; transform: translateY(-50%); z-index: 5; width: 54px; height: 54px; display: flex; align-items: center; justify-content: center; font-size: 28px; line-height: 1; color: #fff; background: rgba(0,0,0,0.42); border: 1px solid rgba(255,255,255,0.28); border-radius: 50%; cursor: pointer; -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px); transition: background .15s ease, transform .15s ease; }
        .cs-float:hover { background: rgba(0,0,0,0.64); transform: translateY(-50%) scale(1.08); }
        .cs-float-prev { left: 22px; }
        .cs-float-next { right: 22px; }
        .cs-caption { display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; padding: 26px 32px; background: #fff; border-top: 1px solid var(--border); }
        .cs-cap-h { font-family: var(--font-heading); font-size: clamp(21px, 2.4vw, 30px); font-weight: 700; line-height: 1.15; letter-spacing: -0.02em; color: var(--fg1); margin: 0; max-width: 680px; }
        .cs-cap-actions { display: flex; gap: 12px; flex-wrap: wrap; }
        .cs-caption .cs-btn-case { background: rgba(15,23,42,0.05); color: var(--fg1); border: 1px solid var(--border); }
        .cs-caption .cs-btn-case:hover { background: rgba(15,23,42,0.10); }
        .cs-stats { display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; border-top: 1px solid var(--border); }
        .cs-stat { padding: 26px 32px; border-right: 1px solid var(--border); text-align: center; }
        .cs-stat:last-child { border-right: none; }
        .cs-stat-v { font-family: var(--font-heading); font-size: 30px; font-weight: 700; color: var(--fg1); letter-spacing: -0.02em; line-height: 1.1; }
        .cs-stat-l { font-size: 13px; color: var(--fg2); margin-top: 5px; }
        .cs-dots { display: flex; justify-content: center; gap: 8px; padding: 14px 16px; border-top: 1px solid var(--border); flex-wrap: wrap; }
        .cs-dot { font: inherit; font-size: 13px; font-weight: 700; letter-spacing: 0.03em; color: var(--fg2); background: none; border: 0; padding: 8px 16px; border-radius: 8px; cursor: pointer; transition: color .15s ease, background .15s ease; }
        .cs-dot:hover { color: var(--fg1); }
        .cs-dot.is-active { color: var(--fg1); background: rgba(15,23,42,0.07); }
        .cs-quote { max-width: 720px; margin: 40px auto 0; text-align: center; animation: csQuoteFade 0.3s ease; }
        @keyframes csQuoteFade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .cs-quote { animation: none; } }
        .cs-quote blockquote { margin: 0; font-family: var(--font-heading); font-size: clamp(20px, 2.4vw, 26px); font-weight: 600; line-height: 1.35; letter-spacing: -0.01em; color: var(--fg1); }
        .cs-quote figcaption { margin-top: 14px; font-size: 14px; color: var(--fg2); }
        @media (max-width: 760px) {
          .cs-stats { grid-auto-flow: row; grid-auto-columns: unset; grid-template-columns: 1fr; }
          .cs-stat { border-right: none; border-top: 1px solid var(--border); padding: 18px 24px; }
          .cs-caption { padding: 22px 22px 24px; }
          .cs-float { width: 44px; height: 44px; font-size: 24px; }
          .cs-float-prev { left: 10px; }
          .cs-float-next { right: 10px; }
        }
        @media (prefers-reduced-motion: reduce) { .cs-float, .cs-btn-case, .cs-dot { transition: none; } }
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
  const byName = {};
  items.forEach(function (it) { byName[it.name] = it; });
  const CATS = [
    { label: 'Accounting & books', desc: 'We post to your ledger — never replace it.', tools: ['QuickBooks', 'Tally', 'Zoho', 'Xero', 'Bill.com'] },
    { label: 'Spreadsheets', desc: 'Keep working in the sheets your team lives in.', tools: ['Excel', 'Google Sheets'] },
    { label: 'Sales & e-commerce', desc: 'Orders and payments from every channel you sell on.', tools: ['Shopify', 'Amazon', 'WooCommerce', 'TikTok Shop', 'Stripe'] },
    { label: 'Messaging & marketing', desc: 'Reach customers straight from live data.', tools: ['Gmail', 'Outlook', 'Mailchimp', 'Klaviyo', 'Braze'] },
    { label: 'Shipping & logistics', desc: 'Labels and tracking, in sync with orders.', tools: ['ShipStation'] },
    { label: 'Data & files', desc: 'Direct database and file pipes for anything custom.', tools: ['PostgreSQL', 'SFTP'] }
  ];
  const VPS = [
    { t: 'Adapts to your stack', d: 'SimpleGrid is shaped around the tools you already run — not the other way around.' },
    { t: 'No rip and replace', d: 'Keep your books, channels and spreadsheets. Nothing gets torn out.' },
    { t: 'Built for your problem', d: 'Need a connector we don’t list yet? We build it around your problem as part of setup.' }
  ];
  const mailto = 'mailto:hello@simplegrid.ai?subject=Integration%20request%20%E2%80%94%20SimpleGrid&body=Hi%20SimpleGrid%2C%0D%0A%0D%0AWe%27d%20like%20SimpleGrid%20to%20integrate%20with%3A%20%5Btool%20name%5D%0D%0A%0D%0AThanks%21';
  function syncChip(name) {
    const it = byName[name] || {};
    const live = it.status === 'live';
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const inner = '<span class="sync-chip-ic">' + (it.svg || '') + '</span>' + name + (live ? '<span class="sync-chip-dot" aria-hidden="true"></span>' : '');
    const cls = 'sync-chip' + (live ? ' is-live' : '');
    return '<a class="' + cls + '" href="integrations/' + slug + '.html" title="' + name + ' + SimpleGrid">' + inner + '</a>';
  }
  const vpHtml = VPS.map(function (v) {
    return '<div class="sync-vp"><div class="sync-vp-t">' + v.t + '</div><div class="sync-vp-d">' + v.d + '</div></div>';
  }).join('');
  const catHtml = CATS.map(function (c) {
    return '<div class="sync-cat"><div class="sync-cat-head"><span class="sync-cat-label">' + c.label + '</span><span class="sync-cat-n">' + c.tools.length + '</span></div><p class="sync-cat-desc">' + c.desc + '</p><div class="sync-chips">' + c.tools.map(syncChip).join('') + '</div></div>';
  }).join('');
  const html =
    '<style>' +
    '.sync-head{max-width:760px}' +
    '.sync-vps{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:26px 0 6px}' +
    '.sync-vp{background:#fff;border:1px solid var(--border);border-radius:14px;padding:16px 18px}' +
    '.sync-vp-t{font-family:var(--font-heading);font-size:15px;font-weight:700;color:var(--fg1);letter-spacing:-0.01em;margin-bottom:6px;padding-left:24px;position:relative}' +
    '.sync-vp-t::before{content:"";position:absolute;left:0;top:1px;width:15px;height:15px;border-radius:5px;background:color-mix(in srgb,var(--sg-blue) 14%,transparent);border:1px solid color-mix(in srgb,var(--sg-blue) 40%,transparent)}' +
    '.sync-vp-t::after{content:"";position:absolute;left:5px;top:3.5px;width:4px;height:7px;border:solid var(--sg-blue);border-width:0 2px 2px 0;transform:rotate(45deg)}' +
    '.sync-vp-d{font-size:13px;line-height:1.55;color:var(--fg2)}' +
    '.sync-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:18px}' +
    '.sync-cat{background:#fff;border:1px solid var(--border);border-radius:16px;padding:20px;box-shadow:0 8px 26px rgba(15,23,42,0.04)}' +
    '.sync-cat-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:5px}' +
    '.sync-cat-label{font-family:var(--font-heading);font-size:15px;font-weight:700;color:var(--fg1);letter-spacing:-0.01em}' +
    '.sync-cat-n{font-size:11px;font-weight:700;color:var(--fg3);background:var(--sg-beige);border:1px solid var(--sg-beige-line);border-radius:999px;padding:2px 8px}' +
    '.sync-cat-desc{font-size:12.5px;line-height:1.5;color:var(--fg2);margin:0 0 13px}' +
    '.sync-chips{display:flex;flex-wrap:wrap;gap:8px}' +
    '.sync-chip{display:inline-flex;align-items:center;gap:7px;font-size:12.5px;font-weight:600;color:var(--fg1);background:#FAFBFC;border:1px solid var(--border);border-radius:999px;padding:5px 12px 5px 6px;text-decoration:none;transition:border-color .14s ease, box-shadow .14s ease, transform .14s ease}' +
    'a.sync-chip:hover{border-color:color-mix(in srgb,var(--sg-blue) 45%,var(--border));box-shadow:0 3px 10px rgba(20,28,46,0.08);transform:translateY(-1px)}' +
    '.sync-chip-ic{display:inline-flex;width:18px;height:18px;flex:0 0 18px}' +
    '.sync-chip-ic svg{width:18px;height:18px;display:block;border-radius:4px}' +
    '.sync-chip-dot{width:6px;height:6px;border-radius:50%;background:#10b981;margin-left:1px}' +
    '.sync-foot{text-align:center;font-size:13px;color:var(--fg2);line-height:1.6;max-width:600px;margin:26px auto 0}' +
    '.sync-legend{display:flex;justify-content:center;gap:20px;flex-wrap:wrap;font-size:12px;color:var(--fg3);margin-top:12px}' +
    '.sync-legend-i{display:inline-flex;align-items:center;gap:6px}' +
    '@media(max-width:900px){.sync-vps{grid-template-columns:1fr}.sync-grid{grid-template-columns:1fr 1fr}}' +
    '@media(max-width:600px){.sync-grid{grid-template-columns:1fr}}' +
    '</style>' +
    '<div class="sync-head"><div class="tag">WORKS WITH YOUR STACK</div>' +
    '<h2 class="h2">We adapt to your stack. No rip and replace.</h2>' +
    '<p class="lead">SimpleGrid wraps around the tools you already run — your books, your sales channels, your spreadsheets. Where a connector doesn’t exist yet, we build it around your problem as part of setup. <a href="syncs.html" style="color:var(--sg-blue);font-weight:600;text-decoration:underline">See all syncs &rarr;</a></p></div>' +
    '<div class="sync-vps">' + vpHtml + '</div>' +
    '<div class="sync-grid">' + catHtml + '</div>' +
    '<div class="sync-foot">Don’t see yours? Email <a href="' + mailto + '" style="color:var(--sg-blue);font-weight:600;text-decoration:underline">hello@simplegrid.ai</a> with a brief note on what you need — we’ll build it around your problem.</div>' +
    '<div class="sync-legend"><span class="sync-legend-i"><span class="sync-chip-dot"></span>Live today</span><span class="sync-legend-i">Everything else built during your setup</span></div>';
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "integrations",
    style: { paddingTop: 56, paddingBottom: 56 }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    dangerouslySetInnerHTML: { __html: html }
  }));
}
window.Integrations = Integrations;
function DataSecurity() {
  const chips = ['AES-256 at rest', 'TLS 1.3 in transit', 'SOC 2 Type II in progress'];
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-alt",
    id: "security",
    style: {
      paddingTop: 36,
      paddingBottom: 36
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "ds-strip"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-copy"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "DATA SECURITY"), /*#__PURE__*/React.createElement("p", {
    className: "ds-line"
  }, "Your data stays yours. Encrypted at rest (AES-256) and in transit (TLS 1.3). Your own isolated database. SOC 2 Type II in progress.")), /*#__PURE__*/React.createElement("div", {
    className: "ds-chips"
  }, chips.map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "ds-chip"
  }, c)))))), /*#__PURE__*/React.createElement("style", null, `
        .ds-strip { display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
        .ds-copy { max-width: 640px; }
        .ds-line { margin: 0; font-size: 15px; line-height: 1.55; color: var(--fg2); }
        .ds-chips { display: flex; gap: 8px; flex-wrap: wrap; }
        .ds-chip { font-size: 12px; font-weight: 600; color: var(--fg1); background: #fff; border: 1px solid var(--border); border-radius: 999px; padding: 7px 13px; white-space: nowrap; }
        @media (max-width: 700px) { .ds-strip { flex-direction: column; align-items: flex-start; } }
      `));
}
window.DataSecurity = DataSecurity;
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
    a: "You walk. No invoice, no clawback, and you get a clean export of your data."
  }, {
    q: "Do we have to migrate our data ourselves?",
    a: "No. Your books stay where they are, and we move in whatever you run on today - spreadsheets, group chats, an old ERP."
  }, {
    q: "How much does it cost after the 30-day trial?",
    a: /*#__PURE__*/React.createElement(React.Fragment, null, "We agree on a number before you decide, then it's one monthly subscription. No setup fees, no per-seat fees - full details on the ", /*#__PURE__*/React.createElement("a", {
      href: "pricing.html",
      style: {
        color: 'var(--sg-blue)',
        fontWeight: 600
      }
    }, "pricing page"), ".")
  }, {
    q: "Who runs the deployment - sales reps, or actual engineers?",
    a: "Senior engineers and deployment experts. No sales reps, no chatbot, no implementation partner you also have to pay."
  }, {
    q: "What's the catch?",
    a: "No catch. SimpleGrid is built for CPG brands, manufacturers and inventory-led businesses doing $5M-$250M in revenue. If that is you, it will fit."
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
  }, "Five questions every buyer asks us.")), /*#__PURE__*/React.createElement("div", {
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

// "Who it's for" - five role cards in a clean grid, each deep-linking into
// the matching role page. Same card language as solutions.html.
function WhoItsFor() {
  const personas = [{
    n: '01',
    role: 'Owner / MD',
    pain: 'You chase three people to know what happened today.',
    outcome: 'See the whole business live, without chasing anyone.',
    href: 'solutions.html#roles',
    cta: 'persona_owner'
  }, {
    n: '02',
    role: 'COO / VP Operations',
    pain: 'Every team runs on its own version of the numbers.',
    outcome: 'One source of truth. No status meetings.',
    href: 'solutions.html#roles',
    cta: 'persona_coo'
  }, {
    n: '03',
    role: 'CFO / Finance Head',
    pain: 'Margin is a guess until the books close.',
    outcome: 'Costing follows your formulas, so margin is real.',
    href: 'solutions.html#roles',
    cta: 'persona_cfo'
  }, {
    n: '04',
    role: 'Plant Manager',
    pain: 'You are the status board for the whole floor.',
    outcome: 'The floor logs work as it happens. You get your day back.',
    href: 'solutions.html#roles',
    cta: 'persona_plant_manager'
  }, {
    n: '05',
    role: 'Sales Head',
    pain: 'You promise dates without seeing stock or capacity.',
    outcome: 'Promise dates you can actually hit.',
    href: 'solutions.html#roles',
    cta: 'persona_sales_head'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-roomy",
    id: "who-its-for"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "WHO IT'S FOR"), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "Built for every seat at the table."), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 620
    }
  }, "Five roles, one live system. Find your seat.")), /*#__PURE__*/React.createElement("div", {
    className: "wif-grid"
  }, personas.map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i * 70
  }, /*#__PURE__*/React.createElement("div", {
    className: "wif-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wif-num"
  }, p.n), /*#__PURE__*/React.createElement("h3", {
    className: "wif-role"
  }, p.role), /*#__PURE__*/React.createElement("p", {
    className: "wif-pain"
  }, p.pain), /*#__PURE__*/React.createElement("p", {
    className: "wif-outcome"
  }, p.outcome), /*#__PURE__*/React.createElement("a", {
    className: "wif-link",
    href: p.href,
    "data-cta": p.cta
  }, "See how \u2192")))))), /*#__PURE__*/React.createElement("style", null, `
        .wif-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-top: 44px; }
        .wif-card { background: #fff; border: 1px solid var(--border); border-radius: 16px; padding: 26px 24px; height: 100%; display: flex; flex-direction: column; transition: box-shadow 0.2s ease, transform 0.2s ease; }
        .wif-card:hover { box-shadow: 0 14px 36px rgba(15,20,25,0.09); transform: translateY(-2px); }
        .wif-num { font-family: var(--font-heading); font-size: 13px; font-weight: 700; color: var(--sg-blue); letter-spacing: 0.08em; margin-bottom: 12px; }
        .wif-role { font-family: var(--font-heading); font-size: 18px; font-weight: 700; color: var(--fg1); letter-spacing: -0.01em; margin: 0 0 10px; }
        .wif-pain { font-size: 14.5px; line-height: 1.55; color: var(--fg3); margin: 0 0 8px; }
        .wif-outcome { font-size: 14.5px; line-height: 1.55; color: var(--fg1); font-weight: 600; margin: 0 0 16px; }
        .wif-link { margin-top: auto; font-size: 14px; font-weight: 700; color: var(--sg-blue); text-decoration: none; }
        .wif-link:hover { text-decoration: underline; }
        @media (max-width: 700px) { .wif-grid { grid-template-columns: 1fr; } }
        @media (prefers-reduced-motion: reduce) { .wif-card { transition: none; } }
      `));
}
window.WhoItsFor = WhoItsFor;

// FinalCTA now lives in its own shared component (components/FinalCTA.jsx) so it
// can be reused with per-page copy across every page.