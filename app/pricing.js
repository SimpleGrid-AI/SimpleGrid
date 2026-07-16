const TIERS = [{
  name: 'Build + 30-day trial',
  sub: 'You carry no cost until you see it run',
  price: '$0',
  priceUnit: 'For the build. For the migration. For the 30 days on your real floor.',
  accent: 'var(--sg-blue)',
  features: ['We configure the operations layer to your factory floor', 'Live in 7-21 days, at our cost and our risk', 'You run it on your real floor for 30 days', 'All your data migrated for you', 'If it doesn\'t move the business, you walk. No invoice.'],
  cta: 'Book a demo',
  ctaHref: 'https://cal.com/simplegrid-ai',
  highlight: true
}, {
  name: 'After it works',
  sub: 'Monthly subscription · one number, all in',
  price: 'Custom-quoted',
  priceUnit: 'This isn\'t a discount play. We carried the build, so the price reflects the result, not the risk.',
  accent: 'var(--sg-purple)',
  features: ['One monthly subscription. That is the entire bill.', 'All features included. No tiers. No add-ons. No per-seat fees.', 'New features ship regularly - yours automatically.', 'Direct line to the team that builds it. No account-manager middle layer.'],
  cta: 'Book a demo',
  ctaHref: 'https://cal.com/simplegrid-ai',
  highlight: false
}];
const COMPARE = [{
  metric: 'What they\'re built for',
  us: 'Mid-market manufacturers who don\'t want to be a software project',
  sap: 'F500 finance, multi-country tax, public-co close',
  netsuite: 'Mid-to-large multi-entity ops',
  qbe: 'Bookkeeping for small businesses'
}, {
  metric: 'Time to value',
  us: 'Live in 7-21 days',
  sap: '12-18 months',
  netsuite: '6-12 months',
  qbe: 'Same day for books - breaks as ops scale'
}, {
  metric: 'Up-front cost',
  us: '$0',
  sap: '$150K-$500K+',
  netsuite: '$25K-$100K implementation',
  qbe: '$1.7K/yr/user + add-ons'
}, {
  metric: 'Change-order fees',
  us: 'None. Ever.',
  sap: '$8K-$20K each',
  netsuite: '$200+/hr consultant',
  qbe: 'Per add-on / SuiteApp'
}, {
  metric: 'Try-before-you-buy',
  us: '30 days on your real floor, real orders',
  sap: 'Sandbox demos',
  netsuite: 'Sandbox demos',
  qbe: 'Free tier'
}];
const BUILD_GROUPS = [{
  label: 'In the build',
  items: [{
    h: 'Modeling sessions',
    p: 'A few calls to map every entity, state, rule, and exception that runs your factory.'
  }, {
    h: 'Working demo in 24 hours',
    p: 'Not a slideshow. A live system reflecting how your operation actually runs.'
  }, {
    h: 'Data migration',
    p: 'Your spreadsheets, your existing ERP exports, your group chats. We move what we can use.'
  }]
}, {
  label: 'For as long as you run it',
  items: [{
    h: 'Floor-staff training',
    p: 'Your team types what happened like on WhatsApp. The training is the conversation.'
  }, {
    h: 'Senior-led onboarding',
    p: 'Led by senior engineers. Not a sales engineer, not an account manager.'
  }, {
    h: 'All future rule changes',
    p: 'New approval rule, new stage, new QC gate. Configuration, not code. No change orders.'
  }]
}];
function PricingPage() {
  const [showLogin, setShowLogin] = React.useState(false);
  const [showInvite, setShowInvite] = React.useState(false);
  const [openFaq, setOpenFaq] = React.useState(0);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("main", {
    id: "main"
  }, /*#__PURE__*/React.createElement("section", {
    className: "section section-dark",
    style: {
      paddingTop: 88,
      paddingBottom: 64,
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--sg-black)',
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      position: 'relative',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "PRICING"), /*#__PURE__*/React.createElement("h1", {
    className: "h1",
    style: {
      color: '#fff',
      maxWidth: 980,
      fontFamily: 'var(--font-heading)',
      fontSize: 48,
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.03em',
      margin: '0 0 18px'
    }
  }, "You carry nothing until you see it run."), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      color: 'rgba(255,255,255,0.78)',
      maxWidth: 820,
      margin: 0
    }
  }, "The build is on us, and your books stay in QuickBooks or Tally. Most ERPs charge you to find out if they work - we charge you after you already know."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowInvite(true),
    className: "btn btn-lg btn-invite",
    style: {
      animation: 'sgBuildPulse 1.8s ease-in-out infinite'
    }
  }, "Book a demo \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      display: 'flex',
      gap: 32,
      flexWrap: 'wrap',
      fontSize: 'var(--fs-caption)',
      color: 'rgba(255,255,255,0.5)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u25CF Built at our risk"), /*#__PURE__*/React.createElement("span", null, "\u25CF Live in 7-21 days"), /*#__PURE__*/React.createElement("span", null, "\u25CF You pay only after it works")))), /*#__PURE__*/React.createElement("section", {
    className: "offer section",
    "aria-labelledby": "offer-h2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "offer-inner"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("p", {
    className: "offer-eyebrow"
  }, "The offer"), /*#__PURE__*/React.createElement("h2", {
    className: "offer-h2",
    id: "offer-h2"
  }, "Try it on. Then pay."), /*#__PURE__*/React.createElement("p", {
    className: "offer-sub"
  }, "Every ERP makes you pay first and hope. We flipped it: we build and run it on your real floor for 30 days, at our cost.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 100
  }, /*#__PURE__*/React.createElement("ol", {
    className: "offer-steps"
  }, /*#__PURE__*/React.createElement("li", {
    className: "offer-step"
  }, /*#__PURE__*/React.createElement("div", {
    className: "offer-step-num"
  }, "01"), /*#__PURE__*/React.createElement("h3", {
    className: "offer-step-h"
  }, "One intro call, then a quote"), /*#__PURE__*/React.createElement("p", {
    className: "offer-step-p"
  }, "One call, and you get a real number - no drawn-out discovery before you know the price.")), /*#__PURE__*/React.createElement("li", {
    className: "offer-step"
  }, /*#__PURE__*/React.createElement("div", {
    className: "offer-step-num"
  }, "02"), /*#__PURE__*/React.createElement("h3", {
    className: "offer-step-h"
  }, "Then the detailed conversation"), /*#__PURE__*/React.createElement("p", {
    className: "offer-step-p"
  }, "Once the number makes sense, we go deep on your floor - stages, contractors, approvals, costing.")), /*#__PURE__*/React.createElement("li", {
    className: "offer-step"
  }, /*#__PURE__*/React.createElement("div", {
    className: "offer-step-num"
  }, "03"), /*#__PURE__*/React.createElement("h3", {
    className: "offer-step-h"
  }, "A working demo, not a deck"), /*#__PURE__*/React.createElement("p", {
    className: "offer-step-p"
  }, "No scope doc, no slide deck - we build a working demo of your operation and start there.")))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 150
  }, /*#__PURE__*/React.createElement("div", {
    className: "offer-cards"
  }, /*#__PURE__*/React.createElement("div", {
    className: "offer-card offer-card-hero"
  }, /*#__PURE__*/React.createElement("span", {
    className: "offer-badge"
  }, "Start here · $0"), /*#__PURE__*/React.createElement("p", {
    className: "offer-card-eyebrow"
  }, "Build + 30-day trial"), /*#__PURE__*/React.createElement("p", {
    className: "offer-card-sub"
  }, "You carry no cost until you see it run."), /*#__PURE__*/React.createElement("div", {
    className: "offer-price"
  }, "$0"), /*#__PURE__*/React.createElement("p", {
    className: "offer-card-caption"
  }, "For the build. For the migration. For the 30 days on your real floor."), /*#__PURE__*/React.createElement("ul", {
    className: "offer-checks"
  }, /*#__PURE__*/React.createElement("li", null, "Configured to your floor."), /*#__PURE__*/React.createElement("li", null, "Live in 7-21 days, at our cost."), /*#__PURE__*/React.createElement("li", null, "Run live for 30 days."), /*#__PURE__*/React.createElement("li", null, "All your data migrated."), /*#__PURE__*/React.createElement("li", null, "Doesn't work? You walk - no invoice."))), /*#__PURE__*/React.createElement("div", {
    className: "offer-then",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", null, "then")), /*#__PURE__*/React.createElement("div", {
    className: "offer-card offer-card-outcome"
  }, /*#__PURE__*/React.createElement("p", {
    className: "offer-card-eyebrow"
  }, "After it works"), /*#__PURE__*/React.createElement("p", {
    className: "offer-card-sub"
  }, "Monthly subscription. One number, all in."), /*#__PURE__*/React.createElement("div", {
    className: "offer-price offer-price-sm"
  }, "Custom-quoted"), /*#__PURE__*/React.createElement("p", {
    className: "offer-card-caption"
  }, "This isn't a discount play. We carried the build, so the price reflects the result, not the risk."), /*#__PURE__*/React.createElement("ul", {
    className: "offer-checks offer-checks-muted"
  }, /*#__PURE__*/React.createElement("li", null, "One monthly subscription - the entire bill."), /*#__PURE__*/React.createElement("li", null, "Every feature. No tiers, no add-ons, no per-seat fees."), /*#__PURE__*/React.createElement("li", null, "New features ship regularly, yours automatically."), /*#__PURE__*/React.createElement("li", null, "A direct line to the team that builds it."))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 200
  }, /*#__PURE__*/React.createElement("div", {
    className: "offer-cta"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://cal.com/simplegrid-ai",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "btn btn-lg btn-primary",
    "data-cta": "pricing_offer"
  }, "Book the intro call")))), /*#__PURE__*/React.createElement("style", null, `
        .offer { background: #FAFBFC; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .offer-inner { max-width: 1040px; margin: 0 auto; padding: 0 32px; }
        .offer-eyebrow { display: inline-block; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--sg-blue); margin: 0 0 16px; padding: 7px 15px; border-radius: 10px; background: color-mix(in srgb, var(--sg-blue) 9%, transparent); border: 1px solid color-mix(in srgb, var(--sg-blue) 20%, transparent); }
        .offer-h2 { font-family: var(--font-heading); font-size: clamp(30px, 4vw, 42px); font-weight: 700; letter-spacing: -0.025em; line-height: 1.08; color: var(--fg1); margin: 0 0 14px; }
        .offer-sub { font-size: 17px; line-height: 1.6; color: var(--fg2); margin: 0; max-width: 780px; }
        .offer-steps { list-style: none; margin: 54px 0 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 36px; }
        .offer-step { position: relative; }
        .offer-step:not(:last-child)::after { content: ''; position: absolute; top: 19px; left: 44px; right: -36px; height: 2px; border-radius: 2px; background: linear-gradient(90deg, color-mix(in srgb, var(--sg-blue) 55%, transparent), color-mix(in srgb, var(--sg-blue) 12%, transparent), color-mix(in srgb, var(--sg-blue) 55%, transparent)); background-size: 200% 100%; animation: offerFlow 2.6s linear infinite; }
        @keyframes offerFlow { from { background-position: 200% 0; } to { background-position: 0 0; } }
        .offer-step-num { position: relative; z-index: 1; display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; background: var(--sg-blue); color: #fff; font-family: var(--font-heading); font-weight: 700; font-size: 14px; margin-bottom: 18px; box-shadow: 0 6px 18px rgba(52,97,224,0.28); transition: transform .18s ease, box-shadow .18s ease; }
        .offer-step:hover .offer-step-num { transform: translateY(-3px) scale(1.06); box-shadow: 0 12px 26px rgba(52,97,224,0.4); }
        .offer-step-h { font-family: var(--font-heading); font-size: 16.5px; font-weight: 700; color: var(--fg1); margin: 0 0 7px; letter-spacing: -0.01em; }
        .offer-step-p { font-size: 14px; color: var(--fg2); line-height: 1.55; margin: 0; }
        .offer-cards { margin-top: 56px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: stretch; gap: 10px; }
        .offer-card { position: relative; border: 1px solid var(--border); border-radius: 18px; padding: 36px 32px; display: flex; flex-direction: column; min-height: 460px; transition: transform .2s ease, box-shadow .2s ease; }
        .offer-card:hover { transform: translateY(-4px); }
        .offer-card-hero { background: #fff; border-color: color-mix(in srgb, var(--sg-blue) 50%, transparent); box-shadow: 0 22px 56px rgba(52,97,224,0.16); animation: offerGlow 3.6s ease-in-out infinite; }
        @keyframes offerGlow { 0%, 100% { box-shadow: 0 18px 44px rgba(52,97,224,0.14); } 50% { box-shadow: 0 26px 64px rgba(52,97,224,0.26); } }
        .offer-card-hero:hover { animation: none; box-shadow: 0 30px 72px rgba(52,97,224,0.32); }
        .offer-card-outcome { background: #F1F3F7; }
        .offer-card-hero .offer-price { background: linear-gradient(100deg, var(--sg-blue), #7AA5FF, var(--sg-blue)); background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent; animation: offerShimmer 3s linear infinite; }
        @keyframes offerShimmer { from { background-position: 200% 0; } to { background-position: 0 0; } }
        .offer-badge { position: absolute; top: -13px; left: 30px; background: var(--sg-blue); color: #fff; font-size: 10.5px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 6px 14px; border-radius: 999px; box-shadow: 0 6px 16px rgba(52,97,224,0.32); }
        .offer-card-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--sg-blue); margin: 6px 0 4px; }
        .offer-card-outcome .offer-card-eyebrow { color: var(--fg3); }
        .offer-card-sub { font-size: 13.5px; color: var(--fg3); margin: 0 0 18px; }
        .offer-price { font-family: var(--font-heading); font-size: 46px; font-weight: 700; color: var(--fg1); letter-spacing: -0.03em; line-height: 1; }
        .offer-price-sm { font-size: 34px; }
        .offer-card-caption { font-size: 12.5px; color: var(--fg3); margin: 9px 0 20px; line-height: 1.5; }
        .offer-checks { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
        .offer-checks li { position: relative; padding-left: 26px; font-size: 14px; line-height: 1.5; color: var(--fg1); }
        .offer-checks li::before { content: "\\2713"; position: absolute; left: 0; top: 0; color: var(--sg-blue); font-weight: 800; }
        .offer-checks-muted li { color: var(--fg2); }
        .offer-checks-muted li::before { color: var(--fg3); }
        .offer-then { align-self: center; display: flex; justify-content: center; }
        .offer-then span { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--fg3); background: #fff; border: 1px solid var(--border); border-radius: 999px; padding: 7px 13px; white-space: nowrap; }
        .offer-cta { margin-top: 40px; text-align: center; }
        @media (max-width: 860px) {
          .offer-steps { grid-template-columns: 1fr; gap: 26px; }
          .offer-step:not(:last-child)::after { display: none; }
          .offer-cards { grid-template-columns: 1fr; gap: 0; }
          .offer-card { min-height: 0; }
          .offer-then { padding: 16px 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .offer-step:not(:last-child)::after, .offer-card-hero, .offer-card-hero .offer-price { animation: none; }
          .offer-card, .offer-step-num { transition: none; }
        }
      `)), /*#__PURE__*/React.createElement("section", {
    className: "builds section",
    "aria-labelledby": "builds-h2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "builds-inner"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("p", {
    className: "tag"
  }, "What the build covers"), /*#__PURE__*/React.createElement("h2", {
    className: "builds-h2",
    id: "builds-h2"
  }, "What we build for you before you owe us anything."), /*#__PURE__*/React.createElement("p", {
    className: "builds-sub"
  }, "All part of the build and the 30-day trial - no add-ons, no professional-services line item, no implementation partner to pay.")), BUILD_GROUPS.map((grp, g) => /*#__PURE__*/React.createElement("div", {
    key: g,
    className: "builds-group"
  }, /*#__PURE__*/React.createElement(Reveal, {
    delay: 80 + g * 60
  }, /*#__PURE__*/React.createElement("p", {
    className: "builds-grouplabel"
  }, grp.label), /*#__PURE__*/React.createElement("div", {
    className: "builds-branch",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bb-cell"
  }), /*#__PURE__*/React.createElement("span", {
    className: "bb-cell"
  }), /*#__PURE__*/React.createElement("span", {
    className: "bb-cell"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "builds-grid"
  }, grp.items.map((it, j) => /*#__PURE__*/React.createElement(Reveal, {
    key: j,
    delay: 140 + g * 60 + j * 90
  }, /*#__PURE__*/React.createElement("div", {
    className: "builds-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "builds-index",
    "aria-hidden": "true"
  }, String(g * 3 + j + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("h3", {
    className: "builds-card-h"
  }, it.h), /*#__PURE__*/React.createElement("p", {
    className: "builds-card-p"
  }, it.p))))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 240
  }, /*#__PURE__*/React.createElement("p", {
    className: "builds-allofit"
  }, "All of it. ", /*#__PURE__*/React.createElement("span", null, "$0 until it works.")))), /*#__PURE__*/React.createElement("style", null, `
        .builds { background: linear-gradient(180deg, #F4F8FE 0%, #E4EDFB 100%); border-top: 2px solid color-mix(in srgb, var(--sg-blue) 32%, var(--border)); border-bottom: 1px solid color-mix(in srgb, var(--sg-blue) 18%, var(--border)); box-shadow: 0 -10px 30px rgba(52,97,224,0.07), inset 0 2px 0 rgba(255,255,255,0.55); }
        .builds-inner { position: relative; z-index: 1; max-width: 1040px; margin: 0 auto; padding: 0 32px; }
        .builds-h2 { font-family: var(--font-heading); font-size: clamp(28px, 3.6vw, 40px); font-weight: 700; letter-spacing: -0.025em; line-height: 1.1; color: var(--fg1); margin: 0 0 14px; max-width: 600px; }
        .builds-sub { font-size: 16px; line-height: 1.6; color: var(--fg2); margin: 0; max-width: 580px; }
        .builds-grouplabel { display: table; margin: 56px auto 0; font-size: 12px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--sg-blue); padding: 8px 18px; border-radius: 999px; background: color-mix(in srgb, var(--sg-blue) 9%, transparent); border: 1px solid color-mix(in srgb, var(--sg-blue) 22%, transparent); }
        .builds-branch { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; height: 22px; margin-top: 10px; }
        .builds-branch .bb-cell { position: relative; }
        .builds-branch .bb-cell::after { content: ''; position: absolute; left: 50%; transform: translateX(-50%); top: 11px; width: 3px; height: 11px; background-image: linear-gradient(180deg, transparent, rgba(150,190,255,1) 38%, #ffffff 50%, rgba(150,190,255,1) 62%, transparent), linear-gradient(rgba(52,97,224,0.5), rgba(52,97,224,0.5)); background-size: 100% 9px, 100% 100%; background-repeat: no-repeat; background-position: 0 -9px, 0 0; animation: bbDrop 4s linear infinite; }
        .builds-branch .bb-cell:nth-child(2)::before { content: ''; position: absolute; left: 50%; transform: translateX(-50%); top: 0; width: 3px; height: 11px; background-image: linear-gradient(180deg, transparent, rgba(150,190,255,1) 38%, #ffffff 50%, rgba(150,190,255,1) 62%, transparent), linear-gradient(rgba(52,97,224,0.5), rgba(52,97,224,0.5)); background-size: 100% 9px, 100% 100%; background-repeat: no-repeat; background-position: 0 -9px, 0 0; animation: bbPill 4s linear infinite; }
        .builds-branch .bb-cell:first-child::before { content: ''; position: absolute; left: 50%; top: 11px; width: calc(100% + 16px); height: 3px; background-image: linear-gradient(90deg, transparent, rgba(150,190,255,1) 38%, #ffffff 50%, rgba(150,190,255,1) 62%, transparent), linear-gradient(rgba(52,97,224,0.5), rgba(52,97,224,0.5)); background-size: 48px 100%, 100% 100%; background-repeat: no-repeat; background-position: calc(100% + 48px) 0, 0 0; animation: bbLeft 4s linear infinite; }
        .builds-branch .bb-cell:nth-child(3)::before { content: ''; position: absolute; right: 50%; top: 11px; width: calc(100% + 16px); height: 3px; background-image: linear-gradient(90deg, transparent, rgba(150,190,255,1) 38%, #ffffff 50%, rgba(150,190,255,1) 62%, transparent), linear-gradient(rgba(52,97,224,0.5), rgba(52,97,224,0.5)); background-size: 48px 100%, 100% 100%; background-repeat: no-repeat; background-position: -48px 0, 0 0; animation: bbRight 4s linear infinite; }
        @keyframes bbPill { 0% { background-position: 0 -9px, 0 0; } 15% { background-position: 0 11px, 0 0; } 100% { background-position: 0 11px, 0 0; } }
        @keyframes bbLeft { 0%, 15% { background-position: calc(100% + 48px) 0, 0 0; } 40% { background-position: -48px 0, 0 0; } 100% { background-position: -48px 0, 0 0; } }
        @keyframes bbRight { 0%, 15% { background-position: -48px 0, 0 0; } 40% { background-position: calc(100% + 48px) 0, 0 0; } 100% { background-position: calc(100% + 48px) 0, 0 0; } }
        @keyframes bbDrop { 0%, 40% { background-position: 0 -9px, 0 0; } 55% { background-position: 0 11px, 0 0; } 100% { background-position: 0 11px, 0 0; } }
        .builds-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; align-items: stretch; }
        .builds-grid > div { display: flex; }
        .builds-card { position: relative; flex: 1; display: flex; flex-direction: column; background: #fff; border: 1px solid var(--border); border-radius: 16px; padding: 26px 24px 24px; min-height: 158px; box-shadow: 0 2px 10px rgba(20,28,46,0.05); overflow: hidden; transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease; }
        .builds-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #7AA5FF, var(--sg-blue), #7AA5FF); opacity: 0; box-shadow: 0 0 10px rgba(52,97,224,0.55); animation: bbEdge 4s ease-in-out infinite; }
        @keyframes bbEdge { 0%, 55% { opacity: 0; } 68% { opacity: 1; } 86% { opacity: 1; } 95% { opacity: 0; } 100% { opacity: 0; } }
        .builds-card:hover { transform: translateY(-5px); border-color: color-mix(in srgb, var(--sg-blue) 35%, transparent); box-shadow: 0 20px 44px rgba(52,97,224,0.14); }
        .builds-card:hover::before { opacity: 1; }
        .builds-index { display: inline-flex; align-items: center; justify-content: center; align-self: flex-start; min-width: 30px; height: 30px; padding: 0 9px; border-radius: 999px; background: color-mix(in srgb, var(--sg-blue) 10%, transparent); border: 1px solid color-mix(in srgb, var(--sg-blue) 22%, transparent); color: var(--sg-blue); font-family: var(--font-mono); font-size: 12px; font-weight: 700; letter-spacing: 0.06em; margin-bottom: 14px; transition: transform .22s ease, background .22s ease; }
        .builds-card:hover .builds-index { transform: scale(1.08); background: color-mix(in srgb, var(--sg-blue) 16%, transparent); }
        .builds-card-h { font-family: var(--font-heading); font-size: 16px; font-weight: 700; color: var(--fg1); letter-spacing: -0.01em; margin: 0 0 14px; }
        .builds-card-p { font-size: 13.5px; line-height: 1.55; color: var(--fg2); margin: 0; }
        .builds-allofit { text-align: center; font-family: var(--font-heading); font-size: 18px; font-weight: 600; color: var(--fg2); margin: 44px 0 0; }
        .builds-allofit span { color: var(--sg-blue); }
        @media (max-width: 720px) {
          .builds-grid { grid-template-columns: 1fr; }
          .builds-h2, .builds-sub { max-width: none; }
          .builds-branch { display: none; }
          .builds-grouplabel { margin-bottom: 20px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .builds-inner > div, .builds-grid > div { transition: none !important; transform: none !important; opacity: 1 !important; }
          .builds-card, .builds-card::before, .builds-index { transition: none !important; }
          .builds-branch .bb-cell::after, .builds-branch .bb-cell::before, .builds-card::before { animation: none; }
        }
      `)), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "COMPARE - HONESTLY"), /*#__PURE__*/React.createElement("h2", {
    className: "h2",
    style: {
      maxWidth: 760
    }
  }, "How we compare on the line items that actually move money."), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 960
    }
  }, "Sticker pricing rarely tells the truth. The line items below are where ERP budgets quietly inflate."), /*#__PURE__*/React.createElement("div", {
    className: "cmp-scroll"
  }, /*#__PURE__*/React.createElement("table", {
    className: "cmp-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "cmp-th cmp-th-metric"
  }, "Line item"), /*#__PURE__*/React.createElement("th", {
    className: "cmp-th cmp-th-us"
  }, "SimpleGrid"), /*#__PURE__*/React.createElement("th", {
    className: "cmp-th"
  }, "SAP Business One"), /*#__PURE__*/React.createElement("th", {
    className: "cmp-th"
  }, "NetSuite"), /*#__PURE__*/React.createElement("th", {
    className: "cmp-th"
  }, "QuickBooks Enterprise"))), /*#__PURE__*/React.createElement("tbody", null, COMPARE.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    className: "cmp-row"
  }, /*#__PURE__*/React.createElement("td", {
    className: "cmp-metric"
  }, r.metric), /*#__PURE__*/React.createElement("td", {
    className: "cmp-cell-us" + (i === COMPARE.length - 1 ? " cmp-cell-us-last" : "")
  }, /*#__PURE__*/React.createElement("span", {
    className: "cmp-check",
    "aria-hidden": "true"
  }, "✓"), r.us), /*#__PURE__*/React.createElement("td", {
    className: "cmp-cell"
  }, r.sap), /*#__PURE__*/React.createElement("td", {
    className: "cmp-cell"
  }, r.netsuite), /*#__PURE__*/React.createElement("td", {
    className: "cmp-cell"
  }, r.qbe)))))), /*#__PURE__*/React.createElement("p", {
    className: "cmp-note"
  }, "Competitor figures are ranges based on publicly available implementation data for mid-market manufacturers (200-1,500 employees). Your quote may differ.")), /*#__PURE__*/React.createElement("style", null, `
        .cmp-scroll { overflow-x: auto; margin-top: 30px; background: #fff; border: 1px solid var(--border); border-radius: var(--radius-lg); box-shadow: 0 1px 2px rgba(20,28,46,0.04); padding: 6px 20px; }
        .cmp-table { width: 100%; min-width: 820px; border-collapse: separate; border-spacing: 0; }
        .cmp-th { font-family: var(--font-heading); font-weight: 700; font-size: 13.5px; color: var(--fg2); text-align: left; padding: 16px 18px; vertical-align: bottom; border-bottom: 1px solid var(--sg-black); letter-spacing: -0.005em; }
        .cmp-th-metric { color: var(--fg3); font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.09em; border-right: 1px solid var(--sg-black); }
        .cmp-th-us { color: var(--sg-blue); background: rgba(74,123,247,0.07); border-bottom: 1px solid var(--sg-black); border-top-left-radius: 12px; border-top-right-radius: 12px; }
        .cmp-metric { font-family: var(--font-heading); font-weight: 700; font-size: 14px; color: var(--fg1); padding: 16px 18px; border-bottom: 1px solid var(--border); border-right: 1px solid var(--sg-black); letter-spacing: -0.005em; transition: background .15s ease; }
        .cmp-cell { font-size: 13.5px; color: var(--fg2); padding: 16px 18px; border-bottom: 1px solid var(--border); line-height: 1.5; transition: background .15s ease; }
        .cmp-cell-us { position: relative; font-size: 13.5px; font-weight: 600; color: var(--sg-blue); padding: 16px 18px 16px 38px; background: rgba(74,123,247,0.07); border-bottom: 1px solid rgba(74,123,247,0.14); line-height: 1.5; transition: background .15s ease; }
        .cmp-cell-us-last { border-bottom: none; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; }
        .cmp-check { position: absolute; left: 18px; top: 16px; color: var(--sg-blue); font-size: 12px; font-weight: 700; opacity: 0.85; }
        .cmp-row { animation: cmpRowIn .5s ease both; }
        .cmp-row:nth-child(1) { animation-delay: .04s; }
        .cmp-row:nth-child(2) { animation-delay: .10s; }
        .cmp-row:nth-child(3) { animation-delay: .16s; }
        .cmp-row:nth-child(4) { animation-delay: .22s; }
        .cmp-row:nth-child(5) { animation-delay: .28s; }
        @keyframes cmpRowIn { from { opacity: 0; } to { opacity: 1; } }
        .cmp-row:hover .cmp-cell, .cmp-row:hover .cmp-metric { background: rgba(20,28,46,0.02); }
        .cmp-row:hover .cmp-cell-us { background: rgba(74,123,247,0.12); }
        .cmp-row:last-child .cmp-cell, .cmp-row:last-child .cmp-metric { border-bottom: none; }
        .cmp-note { font-size: var(--fs-tag); color: var(--fg3); margin-top: 16px; font-style: italic; }
        @media (max-width: 720px) {
          .cmp-scroll { padding: 6px 6px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cmp-row { animation: none; opacity: 1; }
          .cmp-cell, .cmp-cell-us, .cmp-metric { transition: none; }
        }
      `)), /*#__PURE__*/React.createElement("section", {
    className: "section section-alt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "FAQ"), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "Frequently asked questions about pricing."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      maxWidth: 880
    }
  }, [{
    q: 'How much does SimpleGrid cost after the 30 days?',
    a: 'You get a quote after the first introductory call, before the deep-dive - so you know the number early. It is one monthly subscription, and that is the entire bill - no setup, no add-ons, no surprise line items, no per-seat fees.'
  }, {
    q: 'What does "you walk if it doesn\'t work" actually mean?',
    a: 'At the end of 30 days you decide. If the system is being used daily by your floor staff and your dashboards match the floor, it works. If not, you walk. No invoice. No clawback. No data ransom - you get a clean export.'
  }, {
    q: 'Why isn\'t this the cheapest option on the table?',
    a: 'This isn\'t a discount play. We carry the build, the deployment risk, and the 30-day trial - with senior engineers and deployment experts on every project - so the price reflects the result, not the risk. Cheap ERP exists. It will not show up with a working version of your factory before you pay. We will.'
  }, {
    q: 'Why are you so selective about who you onboard?',
    a: 'Senior engineers and deployment experts work on every deployment, so we have limited capacity each quarter. We only take on customers we know we can win for - because we only get paid when you succeed, and we don\'t want to set anyone up to lose. We\'re built for mid-market manufacturers, roughly $5M-$250M in revenue - below that, spreadsheets or QuickBooks still win; above that, SAP or Oracle make more sense.'
  }, {
    q: 'Do I get new features as you ship them?',
    a: 'Yes. We ship new products and features regularly, and they roll out to every customer at no extra cost. Your subscription includes everything we have built and everything we are about to build.'
  }].map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOpenFaq(openFaq === i ? -1 : i),
    "aria-expanded": openFaq === i,
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
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--fg1)',
      letterSpacing: '-0.005em'
    }
  }, f.q), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      flexShrink: 0,
      color: 'var(--sg-blue)',
      fontSize: 22,
      fontWeight: 300,
      transform: openFaq === i ? 'rotate(45deg)' : 'none',
      transition: 'transform 180ms ease'
    }
  }, "+")), openFaq === i && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 22px 18px',
      fontSize: 'var(--fs-small)',
      lineHeight: 1.65,
      color: 'var(--fg2)'
    }
  }, f.a))))))), /*#__PURE__*/React.createElement(FinalCTA, {
    title: "The price is simple: nothing until it works.",
    body: "We carry the build cost and the risk. You run it for 30 days on your real floor, with your real team and real orders. You pay only once it's already running your business - not a cent before.",
    note: "Limited slots each quarter. We onboard selectively."
  }), showLogin && /*#__PURE__*/React.createElement(LoginModal, {
    onClose: () => setShowLogin(false)
  }), showInvite && /*#__PURE__*/React.createElement(InviteModal, {
    onClose: () => setShowInvite(false)
  }), /*#__PURE__*/React.createElement("div", {
    className: "mobile-cta"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowInvite(true),
    className: "btn btn-invite"
  }, "Book a demo")));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(PricingPage, null));