// Product page sections: hero, Meet Hank (+ chat), adoption.

// ----- Fogg-aligned hero, motivation, ability, trigger sections -----

function ProductHeroNew() {
  const [showInvite, setShowInvite] = React.useState(false);
  // Light hero - matches the home page hero height, content centered.
  const heroSize = {
    minHeight: 'calc(100vh - 64px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  };
  const bgStyle = {
    paddingTop: 88,
    paddingBottom: 64,
    position: 'relative',
    overflow: 'hidden',
    background: 'rgba(252,252,253,0.30)',
    ...heroSize
  };
  const overlayBg = 'radial-gradient(circle at 80% 20%, rgba(52,97,224,0.10), transparent 50%), radial-gradient(circle at 20% 80%, rgba(124,58,237,0.06), transparent 50%)';
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    style: bgStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: overlayBg
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      position: 'relative',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag",
    style: {
      color: 'var(--fg3)'
    }
  }, "PLATFORM"), /*#__PURE__*/React.createElement("h1", {
    className: "h1",
    style: {
      color: 'var(--fg1)',
      maxWidth: 980,
      fontSize: 48,
      lineHeight: 1.1
    }
  }, "One system for orders, inventory, production and costing."), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      color: 'var(--fg2)',
      maxWidth: 760,
      marginTop: 18
    }
  }, "SimpleGrid is the Adaptive ERP for CPG brands, manufacturers and inventory-led businesses. Shaped around your operation, synced to the QuickBooks, Tally or Zoho you already run. Live in 3 weeks or less."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowInvite(true),
    "data-cta": "product_hero_demo",
    className: "btn btn-lg btn-invite"
  }, "Book a demo \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      display: 'flex',
      gap: 32,
      flexWrap: 'wrap',
      fontSize: 'var(--fs-caption)',
      color: 'var(--fg3)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u25CF Built for you"), /*#__PURE__*/React.createElement("span", null, "\u25CF Live in \u22643 weeks"), /*#__PURE__*/React.createElement("span", null, "\u25CF 30-day trial"))), showInvite && /*#__PURE__*/React.createElement(InviteModal, {
    onClose: () => setShowInvite(false)
  }));
}
window.ProductHeroNew = ProductHeroNew;

// PRODUCT FEATURE - Hank, the AI chatbot for the shop floor
function MotivationSection() {
  // Hank the bulldog mascot - stylised flat illustration, standing upright in a blue "HANK" cap.
  const BULLDOG_SVG = '<svg viewBox="0 0 400 640" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hank, the SimpleGrid bulldog mascot in a yellow hardhat"><ellipse cx="200" cy="618" rx="130" ry="14.3" fill="#1A1A1A" opacity="0.14"/><path d="M 130 455 Q 122 495 118 555 L 168 558 Q 172 500 175 460 Z" fill="#2A3548" stroke="#1A1A1A" stroke-width="3"/><path d="M 225 460 Q 228 500 232 558 L 282 555 Q 278 495 270 455 Z" fill="#2A3548" stroke="#1A1A1A" stroke-width="3"/><path d="M 132 470 Q 130 510 130 550" fill="none" stroke="#3D4D66" stroke-width="2" opacity="0.7"/><path d="M 268 470 Q 270 510 270 550" fill="none" stroke="#3D4D66" stroke-width="2" opacity="0.7"/><rect x="113" y="552" width="60" height="9" fill="#1F2937" stroke="#1A1A1A" stroke-width="2.5" rx="1"/><rect x="227" y="552" width="60" height="9" fill="#1F2937" stroke="#1A1A1A" stroke-width="2.5" rx="1"/><path d="M 105 561 L 102 600 Q 102 618 120 618 L 180 618 Q 190 618 190 605 L 190 561 Z" fill="#3D2817" stroke="#1A1A1A" stroke-width="3"/><path d="M 102 598 Q 115 588 145 588 L 190 588 L 190 605 Q 190 618 178 618 L 120 618 Q 102 618 102 600 Z" fill="#5A3A22" stroke="#1A1A1A" stroke-width="2.5"/><line x1="138" y1="573" x2="160" y2="575" stroke="#1A1A1A" stroke-width="1.5"/><line x1="138" y1="582" x2="160" y2="584" stroke="#1A1A1A" stroke-width="1.5"/><path d="M 210 561 L 210 605 Q 210 618 220 618 L 280 618 Q 298 618 298 600 L 295 561 Z" fill="#3D2817" stroke="#1A1A1A" stroke-width="3"/><path d="M 220 588 L 255 588 Q 285 588 298 600 Q 298 618 280 618 L 220 618 Q 210 618 210 605 Z" fill="#5A3A22" stroke="#1A1A1A" stroke-width="2.5"/><line x1="240" y1="573" x2="262" y2="575" stroke="#1A1A1A" stroke-width="1.5"/><line x1="240" y1="582" x2="262" y2="584" stroke="#1A1A1A" stroke-width="1.5"/><rect x="75" y="448" width="250" height="28" fill="#6B4423" stroke="#1A1A1A" stroke-width="3"/><line x1="75" y1="453" x2="325" y2="453" stroke="#3D2616" stroke-width="1" stroke-dasharray="3 3"/><line x1="75" y1="471" x2="325" y2="471" stroke="#3D2616" stroke-width="1" stroke-dasharray="3 3"/><g transform="translate(97,465) rotate(12)"><rect x="-3" y="0" width="6" height="50" fill="#B8C2CC" stroke="#1A1A1A" stroke-width="2"/><path d="M -9 -3 L 9 -3 L 9 9 L 4 9 L 4 4 L -4 4 L -4 9 L -9 9 Z" fill="#B8C2CC" stroke="#1A1A1A" stroke-width="2"/><rect x="-1" y="20" width="2" height="20" fill="#1A1A1A" opacity="0.3"/></g><g transform="translate(303,465) rotate(-10)"><rect x="-3.5" y="0" width="7" height="28" fill="#EF4444" stroke="#1A1A1A" stroke-width="2" rx="1.5"/><rect x="-2" y="26" width="4" height="22" fill="#B8C2CC" stroke="#1A1A1A" stroke-width="2"/><rect x="-2.5" y="46" width="5" height="3" fill="#1A1A1A"/></g><path d="M 95 285 Q 78 325 78 380 L 75 448 L 325 448 L 322 380 Q 322 325 305 285 Q 280 258 258 252 L 142 252 Q 120 258 95 285 Z" fill="#4A7BF7" stroke="#1A1A1A" stroke-width="3"/><path d="M 78 380 Q 78 415 75 448 L 95 448 Q 95 415 95 380 Z" fill="#3461D1" opacity="0.5"/><path d="M 322 380 Q 322 415 325 448 L 305 448 Q 305 415 305 380 Z" fill="#3461D1" opacity="0.5"/><line x1="200" y1="265" x2="200" y2="448" stroke="#2A4FA8" stroke-width="2.5"/><circle cx="200" cy="295" r="3.5" fill="#2A4FA8"/><circle cx="200" cy="325" r="3.5" fill="#2A4FA8"/><circle cx="200" cy="355" r="3.5" fill="#2A4FA8"/><circle cx="200" cy="385" r="3.5" fill="#2A4FA8"/><circle cx="200" cy="415" r="3.5" fill="#2A4FA8"/><path d="M 118 298 L 118 342 L 162 342 L 162 298" fill="none" stroke="#2A4FA8" stroke-width="2"/><path d="M 118 298 L 140 315 L 162 298" fill="none" stroke="#2A4FA8" stroke-width="2"/><rect x="152" y="290" width="4" height="20" fill="#F5B000" stroke="#1A1A1A" stroke-width="1"/><text x="137" y="335" text-anchor="middle" font-family="Geist,sans-serif" font-size="13" font-weight="800" fill="#FAF7F1" letter-spacing="0.04em">SG</text><g transform="translate(263,310)"><rect x="-30" y="-13" width="60" height="26" fill="#FAF7F1" stroke="#1A1A1A" stroke-width="2" rx="2"/><text x="0" y="-1" text-anchor="middle" font-family="Geist,sans-serif" font-size="13" font-weight="800" fill="#1A1A1A" letter-spacing="0.06em">HANK</text><text x="0" y="10" text-anchor="middle" font-family="Inter,sans-serif" font-size="6" font-weight="700" fill="#9CA3AF" letter-spacing="0.18em">AI · ERP</text></g><g><rect x="80" y="398" width="240" height="22" rx="2" fill="#2E2114" stroke="#1A1A1A" stroke-width="3"/><line x1="84" y1="415" x2="316" y2="415" stroke="#1A1A1A" stroke-width="1" opacity="0.35"/><rect x="185" y="393" width="30" height="32" rx="4" fill="#E0A92E" stroke="#1A1A1A" stroke-width="2.5"/><rect x="192" y="400" width="16" height="18" rx="2" fill="none" stroke="#1A1A1A" stroke-width="2"/><line x1="200" y1="400" x2="200" y2="418" stroke="#1A1A1A" stroke-width="2.5"/></g><path d="M 95 290 Q 58 300 48 340 Q 42 375 55 405 L 92 408 Q 97 375 100 345 Q 103 312 108 292 Z" fill="#4A7BF7" stroke="#1A1A1A" stroke-width="3"/><path d="M 48 390 Q 48 412 70 415 Q 90 416 95 405 L 90 388 Q 75 396 60 393 Z" fill="#3461D1" stroke="#1A1A1A" stroke-width="2.5"/><ellipse cx="73" cy="438" rx="29" ry="22" fill="#C9A878" stroke="#1A1A1A" stroke-width="3"/><path d="M 50 432 Q 60 425 70 425" stroke="#A0814F" stroke-width="2" fill="none"/><ellipse cx="73" cy="470" rx="33" ry="20" fill="#C9A878" stroke="#1A1A1A" stroke-width="3"/><ellipse cx="73" cy="478" rx="16" ry="7" fill="#A0814F"/><line x1="58" y1="468" x2="56" y2="483" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/><line x1="73" y1="466" x2="73" y2="484" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/><line x1="88" y1="468" x2="90" y2="483" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/><path d="M 305 290 Q 342 300 352 340 Q 358 375 345 405 L 308 408 Q 303 375 300 345 Q 297 312 292 292 Z" fill="#4A7BF7" stroke="#1A1A1A" stroke-width="3"/><path d="M 352 390 Q 352 412 330 415 Q 310 416 305 405 L 310 388 Q 325 396 340 393 Z" fill="#3461D1" stroke="#1A1A1A" stroke-width="2.5"/><ellipse cx="327" cy="438" rx="29" ry="22" fill="#C9A878" stroke="#1A1A1A" stroke-width="3"/><path d="M 350 432 Q 340 425 330 425" stroke="#A0814F" stroke-width="2" fill="none"/><ellipse cx="327" cy="470" rx="33" ry="20" fill="#C9A878" stroke="#1A1A1A" stroke-width="3"/><ellipse cx="327" cy="478" rx="16" ry="7" fill="#A0814F"/><line x1="312" y1="468" x2="310" y2="483" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/><line x1="327" y1="466" x2="327" y2="484" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/><line x1="342" y1="468" x2="344" y2="483" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/><path d="M 100 115 Q 95 100 110 92 Q 145 72 200 72 Q 255 72 290 92 Q 305 100 300 115 L 308 200 Q 312 245 295 270 Q 270 290 200 290 Q 130 290 105 270 Q 88 245 92 200 Z" fill="#C9A878" stroke="#1A1A1A" stroke-width="3"/><path d="M 92 210 Q 92 255 120 275 Q 145 282 162 277 Q 152 250 142 220 Z" fill="#A0814F" opacity="0.45"/><path d="M 308 210 Q 308 255 280 275 Q 255 282 238 277 Q 248 250 258 220 Z" fill="#A0814F" opacity="0.45"/><path d="M 95 132 Q 78 118 82 148 Q 88 168 112 162 Q 105 148 100 132 Z" fill="#A0814F" stroke="#1A1A1A" stroke-width="3"/><path d="M 305 132 Q 322 118 318 148 Q 312 168 288 162 Q 295 148 300 132 Z" fill="#A0814F" stroke="#1A1A1A" stroke-width="3"/><path d="M 92 138 Q 92 152 102 158" fill="none" stroke="#6B4423" stroke-width="2"/><path d="M 308 138 Q 308 152 298 158" fill="none" stroke="#6B4423" stroke-width="2"/><path d="M 162 142 Q 200 132 238 142" fill="none" stroke="#1A1A1A" stroke-width="2" opacity="0.55"/><path d="M 172 154 Q 200 146 228 154" fill="none" stroke="#1A1A1A" stroke-width="2" opacity="0.5"/><ellipse cx="200" cy="228" rx="64" ry="48" fill="#F0DEC0" stroke="#1A1A1A" stroke-width="3"/><path d="M 140 235 Q 132 272 158 282 Q 200 292 242 282 Q 268 272 260 235 Q 235 252 200 254 Q 165 252 140 235 Z" fill="#F0DEC0" stroke="#1A1A1A" stroke-width="3"/><path d="M 178 192 Q 173 184 200 184 Q 227 184 222 192 Q 224 210 200 213 Q 176 210 178 192 Z" fill="#1A1A1A"/><ellipse cx="190" cy="192" rx="4" ry="2.5" fill="#FAF7F1" opacity="0.65"/><path d="M 200 213 L 200 240" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round"/><path d="M 200 240 Q 178 252 158 246" fill="none" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round"/><path d="M 200 240 Q 222 252 242 246" fill="none" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round"/><path d="M 172 256 Q 200 264 228 256" fill="none" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round"/><g><ellipse cx="160" cy="178" rx="17" ry="19" fill="#FAF7F1" stroke="#1A1A1A" stroke-width="3"/><ellipse cx="160" cy="180" rx="9.350000000000001" ry="11.4" fill="#1A1A1A"/><ellipse cx="160" cy="180" rx="4.42" ry="5.7" fill="#4A7BF7"/><circle cx="163" cy="175" r="3.4000000000000004" fill="#FAF7F1"/></g><g><ellipse cx="240" cy="178" rx="17" ry="19" fill="#FAF7F1" stroke="#1A1A1A" stroke-width="3"/><ellipse cx="240" cy="180" rx="9.350000000000001" ry="11.4" fill="#1A1A1A"/><ellipse cx="240" cy="180" rx="4.42" ry="5.7" fill="#4A7BF7"/><circle cx="243" cy="175" r="3.4000000000000004" fill="#FAF7F1"/></g><path d="M 142 152 Q 158 138 182 146 Q 168 152 142 158 Z" fill="#A0814F" stroke="#1A1A1A" stroke-width="2"/><path d="M 258 152 Q 242 138 218 146 Q 232 152 258 158 Z" fill="#A0814F" stroke="#1A1A1A" stroke-width="2"/><path d="M 92 115 Q 92 48 200 42 Q 308 48 308 115 L 308 122 Q 200 108 92 122 Z" fill="#F5B000" stroke="#1A1A1A" stroke-width="3"/><path d="M 125 62 Q 165 47 200 50 Q 175 60 142 80 Q 128 80 125 62 Z" fill="#FFD64A" opacity="0.85"/><path d="M 200 44 L 200 118" stroke="#C48400" stroke-width="3"/><path d="M 162 50 Q 162 80 162 116" stroke="#C48400" stroke-width="1.5" opacity="0.55"/><path d="M 238 50 Q 238 80 238 116" stroke="#C48400" stroke-width="1.5" opacity="0.55"/><path d="M 76 112 Q 76 126 95 128 L 305 128 Q 324 126 324 112 L 308 105 Q 200 100 92 105 Z" fill="#C48400" stroke="#1A1A1A" stroke-width="3"/><rect x="92" y="112" width="216" height="9" fill="#1A1A1A" opacity="0.85"/><line x1="115" y1="78" x2="115" y2="105" stroke="#1A1A1A" stroke-width="1.5" opacity="0.5"/><line x1="285" y1="78" x2="285" y2="105" stroke="#1A1A1A" stroke-width="1.5" opacity="0.5"/><g transform="translate(200,86) scale(1)"><rect x="-28" y="-13" width="56" height="26" fill="#1A1A1A" stroke="#FAF7F1" stroke-width="1.5" rx="3"/><rect x="-24" y="-9" width="48" height="18" fill="#4A7BF7" rx="2"/><circle cx="-19" cy="-4" r="1.2" fill="#FAF7F1" opacity="0.85"/><circle cx="-19" cy="4" r="1.2" fill="#FAF7F1" opacity="0.85"/><circle cx="19" cy="-4" r="1.2" fill="#FAF7F1" opacity="0.85"/><circle cx="19" cy="4" r="1.2" fill="#FAF7F1" opacity="0.85"/><text x="0" y="4" text-anchor="middle" font-family="Geist,sans-serif" font-size="10" font-weight="800" fill="#FAF7F1" letter-spacing="0.08em">HANK</text><rect x="-28" y="-13" width="56" height="26" fill="none" stroke="#4A7BF7" stroke-width="1.2" rx="3" opacity="0.6"><animate attributeName="opacity" values="0.6;1;0.6" dur="2.4s" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1" repeatCount="indefinite"/></rect></g></svg>';
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "hank",
    style: {
      background: 'rgba(250,251,252,0.4)',
      minHeight: 'calc(100vh - 64px)',
      paddingTop: 48,
      paddingBottom: 48,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "MEET HANK"), /*#__PURE__*/React.createElement("h2", {
    className: "h2 ink",
    style: {
      maxWidth: 760,
      margin: '0 auto'
    }
  }, "Meet Hank - the AI assistant for your operation."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 150
  }, /*#__PURE__*/React.createElement("div", {
    className: "hank-stage",
    style: {
      marginTop: 36,
      display: 'grid',
      gridTemplateColumns: '0.78fr 1.5fr',
      gap: 32,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hank-mascot",
    "aria-hidden": "true",
    dangerouslySetInnerHTML: {
      __html: BULLDOG_SVG
    }
  }), /*#__PURE__*/React.createElement(HankChat, null))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "case-studies.html",
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--sg-blue)',
      textDecoration: 'none'
    }
  }, "See live customer deployments \u2192"))), /*#__PURE__*/React.createElement("style", null, `
        .hank-mascot { display: flex; justify-content: flex-start; align-items: flex-end; }
        .hank-mascot svg { width: 100%; max-width: 380px; height: auto; display: block; filter: drop-shadow(0 18px 30px rgba(15,23,42,0.12)); }
        @media (max-width: 860px) {
          .hank-stage { grid-template-columns: 1fr !important; gap: 20px !important; }
          .hank-mascot svg { max-width: 240px; }
        }
      `));
}
window.MotivationSection = MotivationSection;

// Hank - interactive AI chatbot answering everyday questions from live data,
// each answer with a name and a timestamp.
function HankChat() {
  const conversation = [{
    role: 'user',
    day: 'Monday 9:14 AM',
    text: 'Hank, what goes out today?'
  }, {
    role: 'hank',
    body: [{
      line: 'Today: ',
      strong: '5 dispatches · $52k invoiced.'
    }, {
      line: 'Biggest: ',
      strong: 'Hampton Co',
      after: ' - 2 trucks, $28k.'
    }, {
      line: 'All 5 packed. QC cleared by Raj, 8:40 AM.'
    }]
  }, {
    role: 'user',
    day: 'Tuesday 9:24 AM',
    text: 'Which orders are running late?'
  }, {
    role: 'hank',
    body: [{
      line: '3 orders past promise date:'
    }, {
      line: '· ',
      strong: 'SO-4521 · Hampton Co - 2 days late',
      after: ' (QC backlog)'
    }, {
      line: '· SO-4533 - 1 day late, packs today'
    }, {
      line: '· SO-4540 - at risk, ships tomorrow'
    }]
  }, {
    role: 'user',
    day: 'Tuesday 2:33 PM',
    text: "What's my margin on the Hampton order?"
  }, {
    role: 'hank',
    body: [{
      line: 'SO-4521: quoted ',
      strong: '$16,200',
      after: ' · landed cost $12,900.'
    }, {
      line: 'Margin: ',
      strong: '20.4%',
      after: ' - 1.8 pts below plan.'
    }, {
      line: 'Cause: rework on batch B-7710, logged by Raj, Apr 22.'
    }]
  }, {
    role: 'user',
    day: 'Wednesday 3:48 PM',
    text: 'Which contractor has the worst rejection rate this quarter?'
  }, {
    role: 'hank',
    body: [{
      line: 'Top 3 by reject %:'
    }, {
      line: '1. ',
      strong: 'Sunrise Steel - 8.2%',
      after: ' (12 of 146 batches) ↑ from 4% Q1'
    }, {
      line: '2. Westwood Mfg - 4.1%'
    }, {
      line: '3. Acme Fab - 2.7%'
    }]
  }, {
    role: 'user',
    day: 'Thursday 11:15 AM',
    text: "What's at risk of running out in the next 7 days?"
  }, {
    role: 'hank',
    body: [{
      line: '3 SKUs below safety stock:'
    }, {
      line: '· ',
      strong: '3 mm steel sheet - 4 days',
      after: ' at current draw'
    }, {
      line: '· M8 hex bolts - 5 days'
    }, {
      line: '· Walnut veneer - 6 days'
    }, {
      line: 'All 3 auto-reordered Apr 24. Vendor ETA Apr 29 - May 1.'
    }]
  }, {
    role: 'user',
    day: 'Friday 8:52 PM',
    text: "What's our cash position by buyer?"
  }, {
    role: 'hank',
    body: [{
      line: 'As of 8:52 PM today:'
    }, {
      line: '· Hampton Co: ',
      strong: '$145k',
      after: ' receivable (post-dated Apr 18)'
    }, {
      line: '· Apex Mfg: ',
      strong: '$100k',
      after: ' - overdue 3 days, flagged'
    }, {
      line: '· Elite Motors: ',
      strong: '$67k',
      after: ' current'
    }, {
      line: 'Total AR: ',
      strong: '$552k · DSO 42 days.'
    }]
  }];
  const ref = React.useRef(null);
  const scrollRef = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [typing, setTyping] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.2
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  React.useEffect(() => {
    if (!inView || paused) return;
    if (step >= conversation.length) return;
    const next = conversation[step];
    if (next.role === 'hank' && !typing) {
      const t = setTimeout(() => setTyping(true), 380);
      return () => clearTimeout(t);
    }
    if (next.role === 'hank' && typing) {
      const t = setTimeout(() => {
        setTyping(false);
        setStep(s => s + 1);
      }, 1400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep(s => s + 1), step === 0 ? 300 : 1600);
    return () => clearTimeout(t);
  }, [inView, step, typing, paused]);
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [step, typing]);
  const visible = conversation.slice(0, step);
  const showingTyping = typing && step < conversation.length && conversation[step].role === 'hank';
  const done = step >= conversation.length;
  const replay = () => {
    setTyping(false);
    setStep(0);
    setPaused(false);
  };
  const togglePause = () => setPaused(p => !p);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 14,
      overflow: 'hidden',
      boxShadow: '0 18px 48px rgba(15,23,42,0.08)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 18px',
      borderBottom: '1px solid var(--border)',
      background: 'var(--sg-off-white)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: '#fff',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 12px rgba(52,97,224,0.25)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: '100%',
      height: '100%',
      display: 'block'
    },
    dangerouslySetInnerHTML: {
      __html: '<svg viewBox="75 40 250 250" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><g><path d="M 100 115 Q 95 100 110 92 Q 145 72 200 72 Q 255 72 290 92 Q 305 100 300 115 L 308 200 Q 312 245 295 270 Q 270 290 200 290 Q 130 290 105 270 Q 88 245 92 200 Z" fill="#C9A878" stroke="#1A1A1A" stroke-width="3"/><path d="M 92 210 Q 92 255 120 275 Q 145 282 162 277 Q 152 250 142 220 Z" fill="#A0814F" opacity="0.45"/><path d="M 308 210 Q 308 255 280 275 Q 255 282 238 277 Q 248 250 258 220 Z" fill="#A0814F" opacity="0.45"/><path d="M 95 132 Q 78 118 82 148 Q 88 168 112 162 Q 105 148 100 132 Z" fill="#A0814F" stroke="#1A1A1A" stroke-width="3"/><path d="M 305 132 Q 322 118 318 148 Q 312 168 288 162 Q 295 148 300 132 Z" fill="#A0814F" stroke="#1A1A1A" stroke-width="3"/><path d="M 162 142 Q 200 132 238 142" fill="none" stroke="#1A1A1A" stroke-width="2" opacity="0.55"/><path d="M 172 154 Q 200 146 228 154" fill="none" stroke="#1A1A1A" stroke-width="2" opacity="0.5"/><ellipse cx="200" cy="228" rx="64" ry="48" fill="#F0DEC0" stroke="#1A1A1A" stroke-width="3"/><path d="M 140 235 Q 132 272 158 282 Q 200 292 242 282 Q 268 272 260 235 Q 235 252 200 254 Q 165 252 140 235 Z" fill="#F0DEC0" stroke="#1A1A1A" stroke-width="3"/><path d="M 178 192 Q 173 184 200 184 Q 227 184 222 192 Q 224 210 200 213 Q 176 210 178 192 Z" fill="#1A1A1A"/><ellipse cx="190" cy="192" rx="4" ry="2.5" fill="#FAF7F1" opacity="0.65"/><g><g><ellipse cx="160" cy="178" rx="17" ry="19" fill="#FAF7F1" stroke="#1A1A1A" stroke-width="3"/><ellipse cx="160" cy="180" rx="9.350000000000001" ry="11.4" fill="#1A1A1A"/><ellipse cx="160" cy="180" rx="4.42" ry="5.7" fill="#4A7BF7"/><circle cx="163" cy="175" r="3.4000000000000004" fill="#FAF7F1"/></g><g><ellipse cx="240" cy="178" rx="17" ry="19" fill="#FAF7F1" stroke="#1A1A1A" stroke-width="3"/><ellipse cx="240" cy="180" rx="9.350000000000001" ry="11.4" fill="#1A1A1A"/><ellipse cx="240" cy="180" rx="4.42" ry="5.7" fill="#4A7BF7"/><circle cx="243" cy="175" r="3.4000000000000004" fill="#FAF7F1"/></g><g><path d="M 200 213 L 200 240" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round"/><path d="M 200 240 Q 178 252 158 246" fill="none" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round"/><path d="M 200 240 Q 222 252 242 246" fill="none" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round"/><path d="M 172 256 Q 200 264 228 256" fill="none" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round"/></g></g><path d="M 142 152 Q 158 138 182 146 Q 168 152 142 158 Z" fill="#A0814F" stroke="#1A1A1A" stroke-width="2"/><path d="M 258 152 Q 242 138 218 146 Q 232 152 258 158 Z" fill="#A0814F" stroke="#1A1A1A" stroke-width="2"/><path d="M 92 115 Q 92 48 200 42 Q 308 48 308 115 L 308 122 Q 200 108 92 122 Z" fill="#F5B000" stroke="#1A1A1A" stroke-width="3"/><path d="M 125 62 Q 165 47 200 50 Q 175 60 142 80 Q 128 80 125 62 Z" fill="#FFD64A" opacity="0.85"/><path d="M 200 44 L 200 118" stroke="#C48400" stroke-width="3"/><path d="M 162 50 Q 162 80 162 116" stroke="#C48400" stroke-width="1.5" opacity="0.55"/><path d="M 238 50 Q 238 80 238 116" stroke="#C48400" stroke-width="1.5" opacity="0.55"/><path d="M 76 112 Q 76 126 95 128 L 305 128 Q 324 126 324 112 L 308 105 Q 200 100 92 105 Z" fill="#C48400" stroke="#1A1A1A" stroke-width="3"/><rect x="92" y="112" width="216" height="9" fill="#1A1A1A" opacity="0.85"/><line x1="115" y1="78" x2="115" y2="105" stroke="#1A1A1A" stroke-width="1.5" opacity="0.5"/><line x1="285" y1="78" x2="285" y2="105" stroke="#1A1A1A" stroke-width="1.5" opacity="0.5"/><g transform="translate(200,86) scale(1)"><rect x="-28" y="-13" width="56" height="26" fill="#1A1A1A" stroke="#FAF7F1" stroke-width="1.5" rx="3"/><rect x="-24" y="-9" width="48" height="18" fill="#4A7BF7" rx="2"/><circle cx="-19" cy="-4" r="1.2" fill="#FAF7F1" opacity="0.85"/><circle cx="-19" cy="4" r="1.2" fill="#FAF7F1" opacity="0.85"/><circle cx="19" cy="-4" r="1.2" fill="#FAF7F1" opacity="0.85"/><circle cx="19" cy="4" r="1.2" fill="#FAF7F1" opacity="0.85"/><text x="0" y="4" text-anchor="middle" font-family="Geist,sans-serif" font-size="10" font-weight="800" fill="#FAF7F1" letter-spacing="0.08em">HANK</text><rect x="-28" y="-13" width="56" height="26" fill="none" stroke="#4A7BF7" stroke-width="1.2" rx="3" opacity="0.6"><animate attributeName="opacity" values="0.6;1;0.6" dur="2.4s" calcMode="spline" keySplines="0.42 0 0.58 1;0.42 0 0.58 1" repeatCount="indefinite"/></rect></g></g></svg>'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontWeight: 700,
      fontSize: 14,
      color: 'var(--fg1)',
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, "Hank", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--sg-blue)',
      background: 'rgba(52,97,224,0.12)',
      padding: '2px 6px',
      borderRadius: 999
    }
  }, "AI")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--fg3)',
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: '#10B981',
      boxShadow: '0 0 0 3px rgba(16,185,129,0.18)'
    }
  }), "online \xB7 answers from live data")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 6
    }
  }, !done && /*#__PURE__*/React.createElement("button", {
    onClick: togglePause,
    style: {
      background: paused ? 'var(--sg-blue)' : '#fff',
      border: '1px solid ' + (paused ? 'var(--sg-blue)' : 'var(--border)'),
      color: paused ? '#fff' : 'var(--fg2)',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      padding: '6px 11px',
      borderRadius: 4,
      cursor: 'pointer',
      fontFamily: 'var(--font-body)'
    }
  }, paused ? '▶ Resume' : '⏸ Pause'), /*#__PURE__*/React.createElement("button", {
    onClick: replay,
    disabled: !done && !paused,
    style: {
      background: done ? 'var(--sg-blue)' : 'transparent',
      border: done ? 'none' : '1px solid var(--border)',
      color: done ? '#fff' : 'var(--fg3)',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      padding: '6px 11px',
      borderRadius: 4,
      cursor: done || paused ? 'pointer' : 'default',
      fontFamily: 'var(--font-body)',
      opacity: done || paused ? 1 : 0.45
    }
  }, "\u27F2 Replay"))), /*#__PURE__*/React.createElement("div", {
    ref: scrollRef,
    style: {
      padding: '20px 22px',
      height: 460,
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      background: '#fff'
    }
  }, visible.map((m, i) => /*#__PURE__*/React.createElement(HankBubble, {
    key: i,
    message: m
  })), showingTyping && /*#__PURE__*/React.createElement(HankTyping, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 16px',
      borderTop: '1px solid var(--border)',
      background: 'var(--sg-off-white)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 8,
      padding: '10px 12px',
      fontSize: 13,
      color: 'var(--fg3)',
      fontFamily: 'var(--font-body)'
    }
  }, "Ask Hank anything", '…'), /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'var(--sg-blue)',
      color: '#fff',
      border: 'none',
      borderRadius: 8,
      padding: '10px 16px',
      fontSize: 13,
      fontWeight: 600,
      cursor: 'pointer',
      fontFamily: 'var(--font-body)'
    }
  }, "Send")), /*#__PURE__*/React.createElement("style", null, `
        @keyframes sgChatIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sgTypingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
          30%           { transform: translateY(-4px); opacity: 1; }
        }
      `));
}
window.HankChat = HankChat;
function HankBubble({
  message
}) {
  const isUser = message.role === 'user';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: isUser ? 'flex-end' : 'flex-start',
      animation: 'sgChatIn 0.35s cubic-bezier(0.2,0.8,0.2,1) both'
    }
  }, message.day && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      color: 'var(--fg3)',
      letterSpacing: '0.06em',
      margin: isUser ? '0 6px 4px 0' : '0 0 4px 6px'
    }
  }, message.day), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '82%',
      background: isUser ? 'var(--sg-blue)' : 'var(--sg-off-white)',
      color: isUser ? '#fff' : 'var(--fg1)',
      border: isUser ? 'none' : '1px solid var(--border)',
      borderRadius: 14,
      borderTopLeftRadius: isUser ? 14 : 4,
      borderTopRightRadius: isUser ? 4 : 14,
      padding: '11px 15px',
      fontSize: 14,
      lineHeight: 1.55
    }
  }, isUser ? message.text : /*#__PURE__*/React.createElement(React.Fragment, null, message.body.map((b, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      marginBottom: i < message.body.length - 1 ? 4 : 0
    }
  }, b.line, b.strong && /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--fg1)',
      fontWeight: 700
    }
  }, b.strong), b.after)), message.cta && /*#__PURE__*/React.createElement("a", {
    href: "#ledger",
    style: {
      display: 'inline-block',
      marginTop: 10,
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--sg-blue)',
      textDecoration: 'none'
    }
  }, message.cta))));
}
function HankTyping() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-start',
      animation: 'sgChatIn 0.3s ease-out both'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--sg-off-white)',
      border: '1px solid var(--border)',
      borderRadius: 14,
      borderTopLeftRadius: 4,
      padding: '14px 18px',
      display: 'flex',
      gap: 5,
      alignItems: 'center'
    }
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'var(--fg3)',
      display: 'inline-block',
      animation: `sgTypingDot 1.2s ${i * 0.18}s infinite ease-in-out`
    }
  }))));
}

// LANGUAGE - the software speaks the customer's own words (adoption made easy)
function AbilitySection() {
  const html =
    '<style>' +
    '.lang-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:36px}' +
    '.lang-card{background:#fff;border:1px solid var(--border);border-radius:16px;padding:24px 26px;box-shadow:0 8px 26px rgba(15,23,42,0.04)}' +
    '.lang-card-wide{grid-column:1 / -1}' +
    '.lang-cap{font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--fg3);margin-bottom:14px}' +
    '.lang-terms{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:14px}' +
    '.lang-terms span{font-family:var(--font-heading);font-size:16px;font-weight:700;letter-spacing:-0.01em;color:var(--sg-blue);background:color-mix(in srgb,var(--sg-blue) 8%,#fff);border:1px solid color-mix(in srgb,var(--sg-blue) 24%,transparent);border-radius:10px;padding:8px 14px}' +
    '.lang-note{font-size:14px;line-height:1.6;color:var(--fg2);margin:0}' +
    '.lang-foot{margin-top:28px;border-top:1px solid var(--border);padding-top:24px;max-width:760px}' +
    '.lang-foot-line{font-family:var(--font-heading);font-size:clamp(18px,2.2vw,22px);font-weight:700;letter-spacing:-0.01em;color:var(--fg1);line-height:1.35;margin:0}' +
    '.lang-echo{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:18px;margin-top:18px;background:#fff;border:1px solid var(--border);border-radius:16px;padding:20px 24px;box-shadow:0 8px 26px rgba(15,23,42,0.04)}' +
    '.lang-echo-k{display:block;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--fg3);margin-bottom:8px}' +
    '.lang-echo-v{font-family:var(--font-heading);font-size:16px;font-weight:600;color:var(--fg1);line-height:1.4}' +
    '.lang-echo-mid{font-size:22px;color:var(--sg-blue);font-weight:700;text-align:center}' +
    '.lang-echo-chip{display:inline-flex;align-items:center;font-family:var(--font-mono);font-size:14px;font-weight:700;color:var(--sg-blue);background:color-mix(in srgb,var(--sg-blue) 8%,#fff);border:1px solid color-mix(in srgb,var(--sg-blue) 26%,transparent);border-radius:9px;padding:8px 14px}' +
    '@media (max-width:620px){.lang-echo{grid-template-columns:1fr;text-align:center;gap:12px}.lang-echo-mid{transform:rotate(90deg)}}' +
    '@media (max-width:780px){.lang-grid{grid-template-columns:1fr}}' +
    '</style>' +
    '<div class="tag">Why Adoption is Easier</div>' +
    '<h2 class="h2 ink" style="max-width:1000px">Your team already knows how to use it.</h2>' +
    '<p class="lead" style="max-width:820px">Every company has its own words for the same thing. SimpleGrid uses yours - the exact terms your team already says. Nothing new to learn: we learn your language.</p>' +
    '<div class="lang-grid">' +
      '<div class="lang-card"><div class="lang-cap">Goods coming in</div><div class="lang-terms"><span>Receiving</span><span>Goods Receipt</span><span>Receiving Report</span><span>Inbound / ASN</span><span>Putaway</span></div><p class="lang-note">One warehouse logs a &ldquo;goods receipt,&rdquo; another just calls it &ldquo;receiving.&rdquo; Your screen shows the words your team uses.</p></div>' +
      '<div class="lang-card"><div class="lang-cap">Goods going out</div><div class="lang-terms"><span>Packing Slip</span><span>Packing List</span><span>Bill of Lading</span><span>Pick Ticket</span><span>Shipment</span></div><p class="lang-note">Packing slip, bill of lading, pick ticket - same shipment, different names. You keep the one your team already says.</p></div>' +
      '<div class="lang-card lang-card-wide"><div class="lang-cap">Job Order</div><div class="lang-terms"><span>Job Order</span><span>Work Order</span><span>Subcontract PO</span></div><p class="lang-note">For one company it is work sent out to a vendor for value-added services. For a make-to-order shop it is an internal work order, tracked process by process. Same feature - it takes on your meaning.</p></div>' +
    '</div>' +
    '<div class="lang-echo">' +
      '<div class="lang-echo-col"><span class="lang-echo-k">You call it</span><span class="lang-echo-v">&ldquo;Pick ticket&rdquo;</span></div>' +
      '<div class="lang-echo-mid" aria-hidden="true">&rarr;</div>' +
      '<div class="lang-echo-col"><span class="lang-echo-k">So that is the label</span><span class="lang-echo-chip">Pick Ticket</span></div>' +
    '</div>';
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "ability",
    style: { background: 'rgba(255,255,255,0.4)', paddingTop: 110, paddingBottom: 110 }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    dangerouslySetInnerHTML: { __html: html }
  }));
}
window.AbilitySection = AbilitySection;