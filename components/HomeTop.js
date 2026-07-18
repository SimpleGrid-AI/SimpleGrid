// Hank's avatar - the real mascot head, from the character design bible.
// Used by the Meet Hank section's chat demo.
function HankAva({
  size = 17
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "hank-ava",
    "aria-hidden": "true",
    dangerouslySetInnerHTML: {
      __html: `<svg viewBox="75 40 250 250" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><g><path d="M 100 115 Q 95 100 110 92 Q 145 72 200 72 Q 255 72 290 92 Q 305 100 300 115 L 308 200 Q 312 245 295 270 Q 270 290 200 290 Q 130 290 105 270 Q 88 245 92 200 Z" fill="#C9A878" stroke="#1A1A1A" stroke-width="3"/><path d="M 92 210 Q 92 255 120 275 Q 145 282 162 277 Q 152 250 142 220 Z" fill="#A0814F" opacity="0.45"/><path d="M 308 210 Q 308 255 280 275 Q 255 282 238 277 Q 248 250 258 220 Z" fill="#A0814F" opacity="0.45"/><path d="M 95 132 Q 78 118 82 148 Q 88 168 112 162 Q 105 148 100 132 Z" fill="#A0814F" stroke="#1A1A1A" stroke-width="3"/><path d="M 305 132 Q 322 118 318 148 Q 312 168 288 162 Q 295 148 300 132 Z" fill="#A0814F" stroke="#1A1A1A" stroke-width="3"/><path d="M 162 142 Q 200 132 238 142" fill="none" stroke="#1A1A1A" stroke-width="2" opacity="0.55"/><path d="M 172 154 Q 200 146 228 154" fill="none" stroke="#1A1A1A" stroke-width="2" opacity="0.5"/><ellipse cx="200" cy="228" rx="64" ry="48" fill="#F0DEC0" stroke="#1A1A1A" stroke-width="3"/><path d="M 140 235 Q 132 272 158 282 Q 200 292 242 282 Q 268 272 260 235 Q 235 252 200 254 Q 165 252 140 235 Z" fill="#F0DEC0" stroke="#1A1A1A" stroke-width="3"/><path d="M 178 192 Q 173 184 200 184 Q 227 184 222 192 Q 224 210 200 213 Q 176 210 178 192 Z" fill="#1A1A1A"/><ellipse cx="190" cy="192" rx="4" ry="2.5" fill="#FAF7F1" opacity="0.65"/><g><g><ellipse cx="160" cy="178" rx="17" ry="19" fill="#FAF7F1" stroke="#1A1A1A" stroke-width="3"/><ellipse cx="160" cy="180" rx="9.350000000000001" ry="11.4" fill="#1A1A1A"/><ellipse cx="160" cy="180" rx="4.42" ry="5.7" fill="#4A7BF7"/><circle cx="163" cy="175" r="3.4000000000000004" fill="#FAF7F1"/></g><g><ellipse cx="240" cy="178" rx="17" ry="19" fill="#FAF7F1" stroke="#1A1A1A" stroke-width="3"/><ellipse cx="240" cy="180" rx="9.350000000000001" ry="11.4" fill="#1A1A1A"/><ellipse cx="240" cy="180" rx="4.42" ry="5.7" fill="#4A7BF7"/><circle cx="243" cy="175" r="3.4000000000000004" fill="#FAF7F1"/></g><g><path d="M 200 213 L 200 240" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round"/><path d="M 200 240 Q 178 252 158 246" fill="none" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round"/><path d="M 200 240 Q 222 252 242 246" fill="none" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round"/><path d="M 172 256 Q 200 272 228 256 Q 222 266 200 269 Q 178 266 172 256 Z" fill="#1A1A1A"/><path d="M 192 261 Q 200 272 208 261 L 209 268 Q 200 273 191 268 Z" fill="#E89090"/><path d="M 176 258 L 180 269 L 184 258 Z" fill="#FAF7F1" stroke="#1A1A1A" stroke-width="1.2"/><path d="M 216 258 L 220 269 L 224 258 Z" fill="#FAF7F1" stroke="#1A1A1A" stroke-width="1.2"/></g></g><path d="M 142 152 Q 158 138 182 146 Q 168 152 142 158 Z" fill="#A0814F" stroke="#1A1A1A" stroke-width="2"/><path d="M 258 152 Q 242 138 218 146 Q 232 152 258 158 Z" fill="#A0814F" stroke="#1A1A1A" stroke-width="2"/><path d="M 92 115 Q 92 48 200 42 Q 308 48 308 115 L 308 122 Q 200 108 92 122 Z" fill="#F5B000" stroke="#1A1A1A" stroke-width="3"/><path d="M 125 62 Q 165 47 200 50 Q 175 60 142 80 Q 128 80 125 62 Z" fill="#FFD64A" opacity="0.85"/><path d="M 200 44 L 200 118" stroke="#C48400" stroke-width="3"/><path d="M 162 50 Q 162 80 162 116" stroke="#C48400" stroke-width="1.5" opacity="0.55"/><path d="M 238 50 Q 238 80 238 116" stroke="#C48400" stroke-width="1.5" opacity="0.55"/><path d="M 76 112 Q 76 126 95 128 L 305 128 Q 324 126 324 112 L 308 105 Q 200 100 92 105 Z" fill="#C48400" stroke="#1A1A1A" stroke-width="3"/><rect x="92" y="112" width="216" height="9" fill="#1A1A1A" opacity="0.85"/><line x1="115" y1="78" x2="115" y2="105" stroke="#1A1A1A" stroke-width="1.5" opacity="0.5"/><line x1="285" y1="78" x2="285" y2="105" stroke="#1A1A1A" stroke-width="1.5" opacity="0.5"/><g transform="translate(200,86) scale(1)"><rect x="-28" y="-13" width="56" height="26" fill="#1A1A1A" stroke="#FAF7F1" stroke-width="1.5" rx="3"/><rect x="-24" y="-9" width="48" height="18" fill="#4A7BF7" rx="2"/><circle cx="-19" cy="-4" r="1.2" fill="#FAF7F1" opacity="0.85"/><circle cx="-19" cy="4" r="1.2" fill="#FAF7F1" opacity="0.85"/><circle cx="19" cy="-4" r="1.2" fill="#FAF7F1" opacity="0.85"/><circle cx="19" cy="4" r="1.2" fill="#FAF7F1" opacity="0.85"/><text x="0" y="4" text-anchor="middle" font-family="Geist,sans-serif" font-size="10" font-weight="800" fill="#FAF7F1" letter-spacing="0.08em">HANK.AI</text><rect x="-28" y="-13" width="56" height="26" fill="none" stroke="#4A7BF7" stroke-width="1.2" rx="3" opacity="0.6"><animate attributeName="opacity" values="0.6;1;0.6" dur="2.4s" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1" repeatCount="indefinite"/></rect></g></g></svg>`
    }
  });
}
function CycleHeadline() {
  const HEADLINES = [/*#__PURE__*/React.createElement(React.Fragment, null, "The Operations Cloud", /*#__PURE__*/React.createElement("br", null), "that adapts to you.")];
  // Each tile fades smoothly; staggering them by (x+y)*delay gives a diagonal
  // sweep that visually "breaks" the headline into checkboxes and reassembles.
  const TX = 8,
    TY = 3;
  const TILES = React.useMemo(() => Array.from({
    length: TX * TY
  }, (_, idx) => {
    const x = idx % TX,
      y = Math.floor(idx / TX);
    return {
      idx,
      delay: (x + y) * 70
    };
  }), []);
  // Primary (index 0) holds 10s; the rest hold 3s each.
  const holdFor = idx => idx === 0 ? 10000 : 3000;
  const TRANSITION = 1300; // tile sweep duration
  const [i, setI] = React.useState(0);
  const [phase, setPhase] = React.useState('reveal'); // 'reveal' = tiles transparent (text visible), 'cover' = tiles opaque (text hidden)
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (HEADLINES.length <= 1) return;
    const cover = setTimeout(() => setPhase('cover'), holdFor(i));
    const swap = setTimeout(() => {
      setI(x => (x + 1) % HEADLINES.length);
      setPhase('reveal');
    }, holdFor(i) + TRANSITION);
    return () => {
      clearTimeout(cover);
      clearTimeout(swap);
    };
  }, [i]);
  return /*#__PURE__*/React.createElement("div", {
    className: 'hero-title-stage hero-title-' + phase
  }, /*#__PURE__*/React.createElement("h1", {
    className: "hero-title"
  }, HEADLINES[i]), /*#__PURE__*/React.createElement("div", {
    className: "hero-title-tiles",
    "aria-hidden": "true"
  }, TILES.map(t => /*#__PURE__*/React.createElement("span", {
    key: t.idx,
    className: "hero-title-tile",
    style: {
      transitionDelay: t.delay + 'ms'
    }
  }))));
}
function Hero() {
  const [showInvite, setShowInvite] = React.useState(false);
  // light-only hero: two columns - message left, frosted stat card right,
  // floating over the silk ribbon.
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "hero hero-light"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-inner"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(CycleHeadline, null)), /*#__PURE__*/React.createElement(Reveal, {
    delay: 200
  }, /*#__PURE__*/React.createElement("p", {
    className: "hero-sub"
  }, "SimpleGrid is the operations cloud for CPG brands, manufacturers, and inventory-led businesses. Built around how you already work.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 400
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-cta"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "data-cta": "hero",
    className: "btn btn-lg btn-invite",
    onClick: () => {
      setShowInvite(true);
      window.sgTrack && window.sgTrack('cta_clicked', {
        location: 'hero'
      });
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      marginRight: 2
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2l2.39 5.84L20 10l-5.61 2.16L12 18l-2.39-5.84L4 10l5.61-2.16L12 2z",
    fill: "currentColor"
  })), "Book a demo")))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 300
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-stat-box",
    style: {
      background: 'rgba(255,255,255,0.55)',
      border: '1px solid var(--border)',
      borderRadius: 20,
      padding: '36px 40px',
      textAlign: 'center',
      maxWidth: 440,
      margin: '0 auto',
      boxShadow: '0 24px 60px rgba(20,28,46,0.10)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      color: 'var(--fg3)',
      marginBottom: 10
    }
  }, "Execution speed"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 64,
      fontWeight: 700,
      color: 'var(--sg-blue)',
      lineHeight: 1,
      letterSpacing: '-0.04em'
    }
  }, '\u22643', /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 26,
      color: 'var(--fg2)',
      marginLeft: 12,
      fontWeight: 500,
      letterSpacing: 'normal'
    }
  }, "weeks")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--fg2)',
      marginTop: 10
    }
  }, "From kickoff to live on your real operation."), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--border)',
      margin: '26px 0'
    },
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      color: 'var(--fg3)',
      marginBottom: 10
    }
  }, "Trial"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 64,
      fontWeight: 700,
      color: 'var(--fg1)',
      lineHeight: 1,
      letterSpacing: '-0.04em'
    }
  }, "30", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 26,
      color: 'var(--fg2)',
      marginLeft: 12,
      fontWeight: 500,
      letterSpacing: 'normal'
    }
  }, "days")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--fg2)',
      marginTop: 10
    }
  }, "Real orders. Real team. $0 up front. Then you decide.")))))), showInvite && /*#__PURE__*/React.createElement(InviteModal, {
    onClose: () => setShowInvite(false)
  }));
}
window.Hero = Hero;

// "Syncs with" running marquee shown between the hero and the
// problem section. Single-color brand glyphs (Simple Icons paths,
// CC0) + label, list duplicated so the CSS keyframe loops seamlessly.
function IntegrationsBar() {
  // Brand-color SVGs from Simple Icons (CC0). The Amazon glyph was previously
  // just the smile arc - replaced with the full Simple Icons Amazon path so the
  // wordmark + smile both render.
  const items = [{
    name: 'WhatsApp',
    href: 'integrations/whatsapp.html',
    color: '#25D366',
    path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413'
  }, {
    name: 'Slack',
    href: 'integrations/slack.html',
    color: '#4A154B',
    path: 'M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z'
  }, {
    name: 'Gmail',
    href: 'integrations/gmail.html',
    color: '#EA4335',
    path: 'M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z'
  }, {
    name: 'Excel',
    href: 'integrations/excel.html',
    color: '#217346',
    path: 'M23.546 1.785H7.93v3.43H0v13.572h7.93v3.428h15.616A.45.45 0 0 0 24 21.764V2.236a.45.45 0 0 0-.454-.451zm-12.16 14.193l-1.998-3.51-1.7 3.255H4.992l3.103-4.937L5.027 5.85h2.768l1.764 3.337L11.357 5.85h2.696l-2.999 5.06 3.108 4.94zm10.875 1.85h-7.95V13.51h2.997v-1.78h-2.997V9.95h2.997V8.16h-2.997V6.376h7.95z'
  }, {
    name: 'Google Sheets',
    href: 'integrations/google-sheets.html',
    color: '#34A853',
    path: 'M11.318 12.545H7.91v-1.909h3.41v1.91zM14.728 0v6h6zm-3.41 8.727H7.91v1.909h3.41V8.727zm1.227 3.818v-1.909h3.41v1.91zm0-3.818v1.909h3.41V8.727zM19.5 24H4.5C3.12 24 2 22.88 2 21.5v-19C2 1.12 3.12 0 4.5 0H14v6h6v15.5c0 1.38-1.12 2.5-2.5 2.5zM18 7.5H6v9h12z'
  }, {
    name: 'QuickBooks',
    href: 'integrations/quickbooks.html',
    color: '#2CA01C',
    path: 'M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm.642 4.1335c.9554 0 1.7296.776 1.7296 1.7332v9.0667h1.6c1.614 0 2.9275-1.3156 2.9275-2.933 0-1.6173-1.3136-2.9333-2.9276-2.9333h-.6654V7.3334h.6654c2.5722 0 4.6577 2.0897 4.6577 4.667 0 2.5774-2.0855 4.6666-4.6577 4.6666H12.642zM7.9837 7.333h3.3291v12.533c-.9555 0-1.73-.7759-1.73-1.7332V9.0662H7.9837c-1.6146 0-2.9277 1.316-2.9277 2.9334 0 1.6175 1.3131 2.9333 2.9277 2.9333h.6654v1.7332h-.6654c-2.5725 0-4.6577-2.0892-4.6577-4.6665 0-2.5771 2.0852-4.6666 4.6577-4.6666Z'
  }, {
    name: 'Tally',
    href: 'integrations/tally.html',
    color: '#D43A2F',
    path: 'M3 3h3v18H3zM10 3h3v18h-3zM17 3h4v18h-4z'
  }, {
    name: 'Shopify',
    href: 'integrations/shopify.html',
    color: '#95BF47',
    path: 'M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715-.02.01zM11.17.83c.136 0 .271.038.405.135-.984.465-2.064 1.639-2.508 3.992-.656.213-1.293.405-1.889.578C7.697 3.75 8.951.84 11.17.84V.83zm1.235 2.949v.135c-.754.232-1.583.484-2.394.736.466-1.777 1.333-2.645 2.085-2.971.193.501.309 1.176.309 2.1zm.539-2.234c.694.074 1.141.867 1.429 1.755-.349.114-.735.231-1.158.366v-.252c0-.752-.096-1.371-.271-1.871v.002zm2.992 1.289c-.02 0-.06.021-.078.021s-.289.075-.714.21c-.423-1.233-1.176-2.37-2.508-2.37h-.115C12.135.209 11.669 0 11.265 0 8.159 0 6.675 3.877 6.21 5.846c-1.194.365-2.063.636-2.16.674-.675.213-.694.232-.772.87-.075.462-1.83 14.063-1.83 14.063L15.009 24l.927-21.166z'
  }, {
    name: 'Amazon',
    href: 'integrations/amazon.html',
    color: '#FF9900',
    path: 'M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726a17.617 17.617 0 01-10.951-.577 17.88 17.88 0 01-5.43-3.35c-.1-.074-.151-.15-.151-.22 0-.047.021-.09.051-.13zm6.565-6.218c0-1.005.247-1.863.743-2.577.495-.71 1.17-1.25 2.04-1.615.796-.335 1.756-.575 2.912-.72.39-.046 1.033-.103 1.92-.174v-.37c0-.93-.105-1.558-.3-1.875-.302-.43-.78-.65-1.44-.65h-.182c-.48.046-.896.196-1.246.46-.35.27-.575.63-.675 1.096-.06.3-.206.465-.435.51l-2.52-.315c-.248-.06-.372-.18-.372-.39 0-.046.007-.09.022-.15.247-1.29.855-2.25 1.82-2.88.976-.616 2.1-.975 3.39-1.05h.54c1.65 0 2.957.434 3.888 1.29.135.15.27.3.405.48.12.165.224.314.283.45.075.134.15.33.195.57.06.254.105.42.135.51.03.104.062.3.076.615.01.313.02.493.02.553v5.28c0 .376.06.72.165 1.036.105.313.21.54.315.674l.51.674c.09.136.136.256.136.36 0 .12-.06.226-.18.314-1.2 1.05-1.86 1.62-1.963 1.71-.165.135-.375.15-.63.045a6.062 6.062 0 01-.526-.496l-.31-.347a9.391 9.391 0 01-.317-.42l-.3-.435c-.81.886-1.603 1.44-2.4 1.665-.494.15-1.093.227-1.83.227-1.11 0-2.04-.343-2.76-1.034-.72-.69-1.08-1.665-1.08-2.94l-.05-.076zm3.753-.438c0 .566.14 1.02.425 1.364.285.34.675.512 1.155.512.045 0 .106-.007.195-.02.09-.016.134-.023.166-.023.614-.16 1.08-.553 1.424-1.178.165-.28.285-.58.36-.91.09-.32.12-.59.135-.8.015-.195.015-.54.015-1.005v-.54c-.84 0-1.484.06-1.92.18-1.275.36-1.92 1.17-1.92 2.43l-.035-.02zm9.162 7.027c.03-.06.075-.11.132-.17.362-.243.714-.41 1.05-.5a8.094 8.094 0 011.612-.24c.14-.012.28 0 .41.03.65.06 1.05.168 1.172.33.063.09.099.228.099.39v.15c0 .51-.149 1.11-.424 1.8-.278.69-.664 1.248-1.156 1.68-.073.06-.14.09-.197.09-.03 0-.06 0-.09-.012-.09-.044-.107-.12-.064-.24.54-1.26.806-2.143.806-2.64 0-.15-.03-.27-.087-.344-.145-.166-.55-.257-1.224-.257-.243 0-.533.016-.87.046-.363.045-.7.09-1 .135-.09 0-.148-.014-.18-.044-.03-.03-.036-.047-.02-.077 0-.017.006-.03.02-.063v-.06z'
  }, {
    name: 'ShipStation',
    href: 'integrations/shipstation.html',
    color: '#0099FF',
    path: 'M3 16.2c0-.4.3-.7.7-.7H22c.4 0 .7.3.7.7v.5c0 .4-.3.7-.7.7H3.7c-.4 0-.7-.3-.7-.7zM3 19.4h19c.4 0 .7.3.7.7v.5c0 .4-.3.7-.7.7H3.7c-.4 0-.7-.3-.7-.7v-.5c0-.4.3-.7.7-.7zM3 12.3c0-.4.3-.7.7-.7h13.6c.4 0 .7.3.7.7v.5c0 .4-.3.7-.7.7H3.7c-.4 0-.7-.3-.7-.7zM3 8.4c0-.4.3-.7.7-.7h10c.4 0 .7.3.7.7v.5c0 .4-.3.7-.7.7H3.7c-.4 0-.7-.3-.7-.7zM3 4.5c0-.4.3-.7.7-.7H22c.4 0 .7.3.7.7V5c0 .4-.3.7-.7.7H3.7c-.4 0-.7-.3-.7-.7z'
  }];
  // Two copies of the list so the CSS marquee loops seamlessly. Each item is
  // a real link to its integration page (second copy is hidden from keyboard
  // and screen readers so nothing is announced or tabbed twice).
  const list = [...items, ...items];
  return /*#__PURE__*/React.createElement("section", {
    className: "ig-bar",
    "aria-label": "Integration partners"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ig-label"
  }, "Syncs with"), /*#__PURE__*/React.createElement("div", {
    className: "ig-marquee"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ig-track"
  }, list.map((it, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    className: "ig-item",
    href: it.href,
    title: it.name + ' integration',
    "aria-hidden": i >= items.length ? 'true' : undefined,
    tabIndex: i >= items.length ? -1 : undefined,
    "data-cta": 'ig_' + it.name.toLowerCase().replace(/\s+/g, '_')
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: it.path,
    fill: it.color
  })), /*#__PURE__*/React.createElement("span", null, it.name))))), /*#__PURE__*/React.createElement("style", null, `
        a.ig-item { text-decoration: none; }
        a.ig-item:hover span, a.ig-item:focus-visible span { color: var(--fg1); text-decoration: underline; }
        .ig-track:focus-within { animation-play-state: paused; }
      `));
}
window.IntegrationsBar = IntegrationsBar;
function TrustStrip() {
  // Slim "Recognized by" strip - lives just below the hero so above-fold
  // visitors see real third-party validation. Duplicated in the footer
  // (intentional - footer is the catalog, this is the hero proof).
  const prefix = typeof window !== 'undefined' && window.__SG_BLOG_ASSET_PREFIX__ || '';
  return /*#__PURE__*/React.createElement("div", {
    "aria-label": "Recognized by",
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 24,
      padding: '14px 24px',
      flexWrap: 'wrap',
      borderTop: '1px solid var(--sg-black)',
      borderBottom: '1px solid var(--sg-black)',
      background: 'rgba(250,251,252,0.45)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--fg3)'
    }
  }, "Recognized by"), /*#__PURE__*/React.createElement("a", {
    href: "https://www.nvidia.com/en-us/startups/",
    target: "_blank",
    rel: "noopener noreferrer",
    title: "NVIDIA Inception Program member",
    "data-cta": "trust_nvidia",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      height: 28,
      opacity: 0.85
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: prefix + 'assets/nvidia-inception.png',
    alt: "NVIDIA Inception Program member",
    width: "84",
    height: "26",
    loading: "lazy",
    decoding: "async",
    style: {
      display: 'block',
      height: 26,
      width: 'auto'
    }
  })), /*#__PURE__*/React.createElement("a", {
    href: "https://aws.amazon.com/startups/",
    target: "_blank",
    rel: "noopener noreferrer",
    title: "AWS Activate Startups member",
    "data-cta": "trust_aws",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 28,
      opacity: 0.85,
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "44",
    height: "26",
    viewBox: "0 0 304 182",
    "aria-hidden": "true",
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("path", {
    fill: "#252F3E",
    d: "M86.4 66.4c0 3.7.4 6.7 1.1 8.9.8 2.2 1.8 4.6 3.2 7.2.5.8.7 1.6.7 2.3 0 1-.6 2-1.9 3l-6.3 4.2c-.9.6-1.8.9-2.6.9-1 0-2-.5-3-1.4C76.2 90 75 88.4 74 86.8c-1-1.7-2-3.6-3.1-5.9-7.8 9.2-17.6 13.8-29.4 13.8-8.4 0-15.1-2.4-20-7.2-4.9-4.8-7.4-11.2-7.4-19.2 0-8.5 3-15.4 9.1-20.6 6.1-5.2 14.2-7.8 24.5-7.8 3.4 0 6.9.3 10.6.8 3.7.5 7.5 1.3 11.5 2.2v-7.3c0-7.6-1.6-12.9-4.7-16-3.2-3.1-8.6-4.6-16.3-4.6-3.5 0-7.1.4-10.8 1.3-3.7.9-7.3 2-10.8 3.4-1.6.7-2.8 1.1-3.5 1.3-.7.2-1.2.3-1.6.3-1.4 0-2.1-1-2.1-3.1v-4.9c0-1.6.2-2.8.7-3.5.5-.7 1.4-1.4 2.8-2.1 3.5-1.8 7.7-3.3 12.6-4.5C41 1.9 46.2 1.3 51.7 1.3c11.9 0 20.6 2.7 26.2 8.1 5.5 5.4 8.3 13.6 8.3 24.6v32.4h.2zM45.8 81.6c3.3 0 6.7-.6 10.3-1.8 3.6-1.2 6.8-3.4 9.5-6.4 1.6-1.9 2.8-4 3.4-6.4.6-2.4 1-5.3 1-8.7v-4.2c-2.9-.7-6-1.3-9.2-1.7-3.2-.4-6.3-.6-9.4-.6-6.7 0-11.6 1.3-14.9 4-3.3 2.7-4.9 6.5-4.9 11.5 0 4.7 1.2 8.2 3.7 10.6 2.4 2.5 5.9 3.7 10.5 3.7zm80.3 10.8c-1.8 0-3-.3-3.8-1-.8-.6-1.5-2-2.1-3.9L96.7 10.2c-.6-2-.9-3.3-.9-4 0-1.6.8-2.5 2.4-2.5h9.8c1.9 0 3.2.3 3.9 1 .8.6 1.4 2 2 3.9l16.8 66.2 15.6-66.2c.5-2 1.1-3.3 1.9-3.9.8-.6 2.2-1 4-1h8c1.9 0 3.2.3 4 1 .8.6 1.5 2 1.9 3.9l15.8 67 17.3-67c.6-2 1.3-3.3 2-3.9.8-.6 2.1-1 3.9-1h9.3c1.6 0 2.5.8 2.5 2.5 0 .5-.1 1-.2 1.6-.1.6-.3 1.4-.7 2.5l-24.1 77.3c-.6 2-1.3 3.3-2.1 3.9-.8.6-2.1 1-3.8 1h-8.6c-1.9 0-3.2-.3-4-1-.8-.7-1.5-2-1.9-4L156 23l-15.4 64.4c-.5 2-1.1 3.3-1.9 4-.8.7-2.2 1-4 1h-8.6zm128.5 2.7c-5.2 0-10.4-.6-15.4-1.8-5-1.2-8.9-2.5-11.5-4-1.6-.9-2.7-1.9-3.1-2.8-.4-.9-.6-1.9-.6-2.8v-5.1c0-2.1.8-3.1 2.3-3.1.6 0 1.2.1 1.8.3.6.2 1.5.6 2.5 1 3.4 1.5 7.1 2.7 11 3.5 4 .8 7.9 1.2 11.9 1.2 6.3 0 11.2-1.1 14.6-3.3 3.4-2.2 5.2-5.4 5.2-9.5 0-2.8-.9-5.1-2.7-7-1.8-1.9-5.2-3.6-10.1-5.2L246 52c-7.3-2.3-12.7-5.7-16-10.2-3.3-4.4-5-9.3-5-14.5 0-4.2.9-7.9 2.7-11.1 1.8-3.2 4.2-6 7.2-8.2 3-2.3 6.4-4 10.4-5.2 4-1.2 8.2-1.7 12.6-1.7 2.2 0 4.5.1 6.7.4 2.3.3 4.4.7 6.5 1.1 2 .5 3.9 1 5.7 1.6 1.8.6 3.2 1.2 4.2 1.8 1.4.8 2.4 1.6 3 2.5.6.8.9 1.9.9 3.3v4.7c0 2.1-.8 3.2-2.3 3.2-.8 0-2.1-.4-3.8-1.2-5.7-2.6-12.1-3.9-19.2-3.9-5.7 0-10.2.9-13.3 2.8-3.1 1.9-4.7 4.8-4.7 8.9 0 2.8 1 5.2 3 7.1 2 1.9 5.7 3.8 11 5.5l14.2 4.5c7.2 2.3 12.4 5.5 15.5 9.6 3.1 4.1 4.6 8.8 4.6 14 0 4.3-.9 8.2-2.6 11.6-1.8 3.4-4.2 6.4-7.3 8.8-3.1 2.5-6.8 4.3-11.1 5.6-4.5 1.4-9.2 2.1-14.3 2.1z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#FF9900",
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M273.5 143.7c-32.9 24.3-80.7 37.2-121.8 37.2-57.6 0-109.5-21.3-148.7-56.7-3.1-2.8-.3-6.6 3.4-4.4 42.4 24.6 94.7 39.5 148.8 39.5 36.5 0 76.6-7.6 113.5-23.2 5.5-2.5 10.2 3.6 4.8 7.6z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "#FF9900",
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M287.2 128.1c-4.2-5.4-27.8-2.6-38.5-1.3-3.2.4-3.7-2.4-.8-4.5 18.8-13.2 49.7-9.4 53.3-5 3.6 4.5-1 35.4-18.6 50.2-2.7 2.3-5.3 1.1-4.1-1.9 4-9.9 12.9-32.2 8.7-37.5z"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: 'var(--fg2)'
    }
  }, "Activate Startups")));
}
window.TrustStrip = TrustStrip;

// The five pains - all five shown together in one section. A clean
// typographic list: number, pain, answer, link. No visuals, so the page
// checks and the silk ribbon read through.
function PainsJourney() {
  const pains = [{
    n: '01',
    t: 'Too complex to use',
    pain: 'Big ERPs are built for a thousand companies. You get a hundred screens your team never uses.',
    answer: "SimpleGrid is built for you. Every screen is yours. Nothing you don't need.",
    href: 'solutions.html#built-for-you',
    cta: 'pain_built_for_you'
  }, {
    n: '02',
    t: 'Costing is guesswork',
    pain: 'Your real costs live in spreadsheets. Every product, every batch, a different formula.',
    answer: 'The custom formula builder costs every order your way. The most accurate costing there is.',
    href: 'solutions.html#costing',
    cta: 'pain_costing'
  }, {
    n: '03',
    t: "No one can see what's happening",
    pain: "The numbers sit with one person. And they're already a day old.",
    answer: 'SimpleGrid puts real-time data on a simple app. If your team can text, they can use it.',
    href: 'solutions.html#visibility',
    cta: 'pain_visibility'
  }, {
    n: '04',
    t: 'Planning lives in spreadsheets',
    pain: 'Five versions of the plan. Nobody knows which one is real.',
    answer: 'SimpleGrid keeps one live plan. Stock, orders and capacity in the same place.',
    href: 'solutions.html#planning',
    cta: 'pain_planning'
  }, {
    n: '05',
    t: 'Paying before it works',
    pain: 'Legacy ERPs charge you up front to find out if they fit.',
    answer: 'SimpleGrid flips it. $0 up front. 30 days trial on your real operations. Pay only when it works.',
    href: 'solutions.html#pay-before',
    cta: 'pain_pricing'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-screen",
    id: "why-erp"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "pj-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "WHY ERPs ARE BROKEN"), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "Most ERPs were never built to run your floor."), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "They started as accounting tools - great at booking numbers, not at running operations. The rest were enterprise systems scaled down to fit you. Either way, you hit the same five problems."))), /*#__PURE__*/React.createElement("div", {
    className: "pj-list"
  }, pains.map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i * 90
  }, /*#__PURE__*/React.createElement("div", {
    className: "pj-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pj-num",
    "aria-hidden": "true"
  }, p.n), /*#__PURE__*/React.createElement("div", {
    className: "pj-body"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pj-t"
  }, p.t), /*#__PURE__*/React.createElement("p", {
    className: "pj-pain"
  }, p.pain), /*#__PURE__*/React.createElement("p", {
    className: "pj-answer"
  }, p.answer)), /*#__PURE__*/React.createElement("a", {
    className: "pj-link",
    href: p.href,
    "data-cta": p.cta
  }, "See how \u2192")))))), /*#__PURE__*/React.createElement("style", null, `
        .pj-head { text-align: center; }
        .pj-head .lead { max-width: 560px; margin-left: auto; margin-right: auto; }
        .pj-list { max-width: 920px; margin: 44px auto 0; border-top: 1px solid var(--border); }
        .pj-row { display: grid; grid-template-columns: 56px 1fr auto; column-gap: clamp(18px, 3vw, 36px); align-items: baseline; padding: 26px 4px; border-bottom: 1px solid var(--border); }
        .pj-num { font-family: var(--font-mono); font-size: 14px; font-weight: 600; letter-spacing: 0.06em; color: var(--fg3); }
        .pj-t { font-family: var(--font-heading); font-size: clamp(19px, 2vw, 23px); font-weight: 700; letter-spacing: -0.015em; line-height: 1.2; color: var(--fg1); margin: 0 0 6px; }
        .pj-pain { font-size: 15.5px; line-height: 1.55; color: var(--fg2); margin: 0 0 6px; max-width: 64ch; }
        .pj-answer { font-size: 15.5px; font-weight: 600; line-height: 1.55; color: var(--sg-blue); margin: 0; max-width: 64ch; }
        .pj-link { font-size: 14px; font-weight: 700; color: var(--sg-blue); text-decoration: none; white-space: nowrap; justify-self: end; }
        .pj-link:hover { text-decoration: underline; }
        @media (max-width: 720px) {
          .pj-row { grid-template-columns: 1fr; row-gap: 4px; padding: 22px 0; }
          .pj-link { justify-self: start; margin-top: 6px; }
        }
      `));
}
window.PainsJourney = PainsJourney;

// Short "Adaptive ERP" explainer - what SimpleGrid is, in three cards.
function WhatIsSimpleGrid() {
  const cards = [{
    t: 'Built for you',
    d: 'Only the screens you need. Nothing extra.'
  }, {
    t: 'Live in weeks',
    d: 'Under 3 weeks to go live. A working demo in 72 hours.'
  }, {
    t: 'Books stay put',
    d: 'Connects to QuickBooks, Tally, Zoho and 20+ tools. No migration.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-beige section-roomy",
    id: "what-is"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "WHAT IS SIMPLEGRID"), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "An ERP built around you. Not the other way around."), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 720
    }
  }, "SimpleGrid is an operations cloud for CPG brands, manufacturers and inventory-led businesses. It runs your orders, inventory, production, planning and costing in one place - and it is shaped around how you already work.")), /*#__PURE__*/React.createElement("div", {
    className: "wis-grid"
  }, cards.map((c, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i * 90
  }, /*#__PURE__*/React.createElement("div", {
    className: "wis-card"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "wis-t"
  }, c.t), /*#__PURE__*/React.createElement("p", {
    className: "wis-d"
  }, c.d)))))), /*#__PURE__*/React.createElement("style", null, `
        .wis-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 36px; }
        .wis-card { background: var(--bg); border: 1px solid var(--border); border-radius: 14px; padding: 24px; height: 100%; }
        .wis-t { font-family: var(--font-heading); font-size: 18px; font-weight: 700; color: var(--fg1); margin: 0 0 8px; letter-spacing: -0.01em; }
        .wis-d { font-size: 15px; line-height: 1.55; color: var(--fg2); margin: 0; }
        @media (max-width: 760px) { .wis-grid { grid-template-columns: 1fr; } }
      `));
}
window.WhatIsSimpleGrid = WhatIsSimpleGrid;

// Meet Hank - the AI assistant, shown as a simple static chat.
function MeetHankHome() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-roomy",
    id: "hank"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mh-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "MEET HANK"), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "The AI assistant your team already knows how to use."), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 520
    }
  }, "If your team can text, they can use SimpleGrid. Real-time answers from live data, on desktop and the mobile app."), /*#__PURE__*/React.createElement("a", {
    className: "mh-link",
    href: "product.html#hank",
    "data-cta": "hank_home"
  }, "See Hank on the platform \u2192"))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("div", {
    className: "mh-chat",
    "aria-label": "Example questions for Hank"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mh-chat-head"
  }, /*#__PURE__*/React.createElement(HankAva, null), /*#__PURE__*/React.createElement("span", null, "Hank")), /*#__PURE__*/React.createElement("div", {
    className: "mh-chat-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hank-row user"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hank-bubble user"
  }, "What did we dispatch today?")), /*#__PURE__*/React.createElement("div", {
    className: "hank-row user"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hank-bubble user"
  }, "Which orders are running late?")), /*#__PURE__*/React.createElement("div", {
    className: "hank-row user"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hank-bubble user"
  }, "What is my margin on the Wilson order?")), /*#__PURE__*/React.createElement("div", {
    className: "hank-row bot"
  }, /*#__PURE__*/React.createElement(HankAva, null), /*#__PURE__*/React.createElement("div", {
    className: "hank-bubble bot"
  }, "38.2% on the Wilson order. Costed with your formula, updated 2 minutes ago."))))))), /*#__PURE__*/React.createElement("style", null, `
        .mh-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
        .mh-link { display: inline-block; margin-top: 18px; font-size: 15px; font-weight: 700; color: var(--sg-blue); text-decoration: none; }
        .mh-link:hover { text-decoration: underline; }
        .mh-chat { border: 1px solid var(--border); border-radius: 16px; background: #fff; box-shadow: 0 14px 40px rgba(15,20,25,0.08); overflow: hidden; }
        .mh-chat-head { display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-bottom: 1px solid var(--border); font-weight: 700; font-size: 14px; color: var(--fg1); background: var(--bg-alt); }
        .mh-chat-body { padding: 18px 16px; display: flex; flex-direction: column; gap: 10px; }
        .mh-chat .hank-bubble { font-size: 13.5px; padding: 8px 12px; }
        @media (max-width: 900px) { .mh-grid { grid-template-columns: 1fr; gap: 28px; } }
      `));
}
window.MeetHankHome = MeetHankHome;

// The 21-day go-live journey - four steps on a simple road.
function HowItWorks() {
  const [showInvite, setShowInvite] = React.useState(false);
  const steps = [{
    k: 'Day 1',
    t: 'One call',
    d: 'We learn how your operation runs. No forms, no workshops.'
  }, {
    k: 'Day 1-3',
    t: 'Working demo',
    d: 'You see your own products and process in SimpleGrid within 72 hours.'
  }, {
    k: 'Week 1-3',
    t: 'We build around you',
    d: 'Your data moves in. Your team shapes it with us.'
  }, {
    k: 'Day 21',
    t: "You're live",
    d: 'Run everything on it for 30 days. Keep it only if it works.'
  }];
  const stats = [{
    v: '≤3 weeks',
    l: 'to live'
  }, {
    v: '30-day',
    l: 'trial'
  }, {
    v: '$0',
    l: 'up front'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-alt section-roomy",
    id: "how-it-works"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "HOW IT GOES LIVE"), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "Your 3 weeks with us go as follows.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 100
  }, /*#__PURE__*/React.createElement("ol", {
    className: "glj-road"
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("li", {
    className: "glj-step",
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "glj-node",
    "aria-hidden": "true"
  }, i + 1), /*#__PURE__*/React.createElement("div", {
    className: "glj-k"
  }, s.k), /*#__PURE__*/React.createElement("div", {
    className: "glj-t"
  }, s.t), /*#__PURE__*/React.createElement("p", {
    className: "glj-d"
  }, s.d))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 180
  }, /*#__PURE__*/React.createElement("div", {
    className: "glj-stats"
  }, stats.map((s, i) => /*#__PURE__*/React.createElement("div", {
    className: "glj-stat",
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "glj-stat-v"
  }, s.v), /*#__PURE__*/React.createElement("span", {
    className: "glj-stat-l"
  }, s.l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 26
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "data-cta": "how_it_works",
    className: "btn btn-lg btn-invite",
    onClick: () => {
      setShowInvite(true);
      window.sgTrack && window.sgTrack('cta_clicked', {
        location: 'how_it_works'
      });
    }
  }, "Book a demo")))), /*#__PURE__*/React.createElement("style", null, `
        .glj-road { list-style: none; display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; margin: 44px 0 0; padding: 0; position: relative; }
        .glj-road::before { content: ''; position: absolute; top: 18px; left: 12.5%; right: 12.5%; height: 2px; background: var(--border); }
        .glj-step { position: relative; text-align: center; padding: 0 8px; }
        .glj-node { position: relative; z-index: 1; display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; background: var(--sg-blue); color: #fff; font-family: var(--font-heading); font-size: 15px; font-weight: 700; }
        .glj-k { margin-top: 12px; font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--sg-blue); }
        .glj-t { margin-top: 4px; font-family: var(--font-heading); font-size: 18px; font-weight: 700; color: var(--fg1); letter-spacing: -0.01em; }
        .glj-d { margin: 6px 0 0; font-size: 14.5px; line-height: 1.55; color: var(--fg2); }
        .glj-stats { display: flex; justify-content: center; gap: 44px; margin-top: 40px; flex-wrap: wrap; }
        .glj-stat { display: flex; flex-direction: column; align-items: center; }
        .glj-stat-v { font-family: var(--font-heading); font-size: 24px; font-weight: 700; color: var(--fg1); letter-spacing: -0.02em; }
        .glj-stat-l { font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--fg3); margin-top: 4px; }
        @media (max-width: 820px) {
          .glj-road { grid-template-columns: 1fr; gap: 24px; }
          .glj-road::before { top: 18px; bottom: 18px; left: 17px; right: auto; width: 2px; height: auto; }
          .glj-step { display: grid; grid-template-columns: 36px 1fr; column-gap: 16px; text-align: left; padding: 0; }
          .glj-node { grid-row: 1 / span 3; }
          .glj-k, .glj-t, .glj-d { grid-column: 2; }
          .glj-k { margin-top: 0; }
          .glj-stats { gap: 26px; }
        }
      `), showInvite && /*#__PURE__*/React.createElement(InviteModal, {
    onClose: () => setShowInvite(false)
  }));
}
window.HowItWorks = HowItWorks;

// Selective onboarding - why we take on only a few deployments at a time.
// Light section: transparent background so the page checks and silk ribbon
// read through. Sonar rings are pure CSS in light blue.
function SelectiveOnboarding() {
  const [showInvite, setShowInvite] = React.useState(false);
  const stats = [{
    v: '≤3 weeks',
    l: 'to live'
  }, {
    v: '30 days',
    l: 'trial on your real operations'
  }, {
    v: 'Our cost',
    l: 'to configure'
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "section section-roomy",
    id: "onboarding"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      maxWidth: 880
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "so-kicker-dot"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--fg3)'
    }
  }, "Selective onboarding")), /*#__PURE__*/React.createElement("h2", {
    className: "h2",
    style: {
      maxWidth: 720,
      margin: '0 auto 12px'
    }
  }, "We'd love to onboard everyone.", /*#__PURE__*/React.createElement("br", null), "We just ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--sg-blue)'
    }
  }, "can't - yet.")), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 600,
      margin: '0 auto'
    }
  }, "Our senior engineers and deployment leads are on every deployment. We keep the roster small so every rollout gets them."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 140
  }, /*#__PURE__*/React.createElement("div", {
    className: "so-sonar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "so-ring",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "so-ring",
    "aria-hidden": "true",
    style: {
      animationDelay: '1.6s'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "so-ring",
    "aria-hidden": "true",
    style: {
      animationDelay: '3.2s'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "so-ring",
    "aria-hidden": "true",
    style: {
      animationDelay: '4.8s'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "so-core",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "so-badge"
  }, /*#__PURE__*/React.createElement("span", {
    className: "so-badge-dot",
    "aria-hidden": "true"
  }), "3 slots open this quarter"))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 200
  }, /*#__PURE__*/React.createElement("div", {
    className: "so-promise"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15.5,
      lineHeight: 1.6,
      color: 'var(--fg2)',
      margin: 0
    }
  }, "If we take you on, we set SimpleGrid up around ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--fg1)',
      fontWeight: 700
    }
  }, "how you actually run"), " - at our cost. Run it live for 30 days: real orders, real team. ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--fg1)',
      fontWeight: 700
    }
  }, "You pay only when it works.")))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 260
  }, /*#__PURE__*/React.createElement("div", {
    className: "so-stats"
  }, stats.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "so-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "so-stat-v"
  }, s.v), /*#__PURE__*/React.createElement("span", {
    className: "so-stat-l"
  }, s.l))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 320
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "data-cta": "onboarding",
    className: "btn btn-lg btn-invite",
    onClick: () => {
      setShowInvite(true);
      window.sgTrack && window.sgTrack('cta_clicked', {
        location: 'onboarding'
      });
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      marginRight: 2
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2l2.39 5.84L20 10l-5.61 2.16L12 18l-2.39-5.84L4 10l5.61-2.16L12 2z",
    fill: "currentColor"
  })), "Book a demo"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--fg3)',
      marginTop: 12,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      fontWeight: 600
    }
  }, "We reply within 24 hours \xB7 Select partners only")))), /*#__PURE__*/React.createElement("style", null, `
        .so-kicker-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: var(--sg-blue); animation: soKickerPulse 2s ease-in-out infinite; }
        @keyframes soKickerPulse {
          0%   { box-shadow: 0 0 0 0 rgba(52,97,224,0.45); }
          70%  { box-shadow: 0 0 0 10px rgba(52,97,224,0); }
          100% { box-shadow: 0 0 0 0 rgba(52,97,224,0); }
        }
        .so-sonar { position: relative; height: 220px; margin: 36px auto 30px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .so-ring { position: absolute; top: 50%; left: 50%; width: 56px; height: 56px; margin: -28px 0 0 -28px; border: 1.5px solid rgba(52,97,224,0.35); border-radius: 50%; opacity: 0; transform: scale(0.2); animation: soRing 6.4s linear infinite; }
        @keyframes soRing {
          0%   { transform: scale(0.2); opacity: 0.65; }
          100% { transform: scale(6.2); opacity: 0; }
        }
        .so-core { position: absolute; top: 50%; left: 50%; width: 14px; height: 14px; margin: -7px 0 0 -7px; border-radius: 50%; background: var(--sg-blue); box-shadow: 0 0 0 8px rgba(52,97,224,0.12); }
        .so-badge { position: absolute; top: calc(50% + 26px); left: 50%; transform: translateX(-50%); display: inline-flex; align-items: center; gap: 7px; padding: 6px 13px; border-radius: 999px; background: rgba(255,255,255,0.9); border: 1px solid var(--border); font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--fg2); white-space: nowrap; }
        .so-badge-dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: var(--sg-green); animation: soKickerPulse 2s ease-in-out infinite; }
        .so-promise { background: rgba(255,255,255,0.85); border: 1px solid var(--border); border-radius: 16px; padding: 20px 26px; max-width: 680px; margin: 0 auto 28px; text-align: center; box-shadow: 0 12px 32px rgba(15,20,25,0.05); }
        .so-stats { display: flex; justify-content: center; gap: 44px; flex-wrap: wrap; margin: 0 auto 30px; }
        .so-stat { display: flex; flex-direction: column; align-items: center; max-width: 200px; }
        .so-stat-v { font-family: var(--font-heading); font-size: 24px; font-weight: 700; color: var(--sg-blue); letter-spacing: -0.02em; }
        .so-stat-l { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--fg3); margin-top: 5px; text-align: center; }
        @media (max-width: 700px) {
          .so-sonar { height: 180px; margin: 28px auto 24px; }
          .so-stats { gap: 24px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .so-kicker-dot, .so-badge-dot { animation: none; }
          .so-ring { animation: none; opacity: 0.25; transform: scale(3); }
        }
      `)), showInvite && /*#__PURE__*/React.createElement(InviteModal, {
    onClose: () => setShowInvite(false)
  }));
}
window.SelectiveOnboarding = SelectiveOnboarding;