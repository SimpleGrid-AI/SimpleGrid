function BarsInfographic() {
  const [animate, setAnimate] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setAnimate(true);
          obs.disconnect();
        }
      });
    }, {
      threshold: 0.2
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Volume share: CMT 55k, Brand 25k, Trading is fabric (different unit) -> shown as separate bar in meters or rolls
  const bars = [{
    cls: 'cmt',
    label: 'CMT (contract)',
    value: 55000,
    max: 60000,
    display: '55,000',
    unit: 'shirts/mo'
  }, {
    cls: 'brand',
    label: 'Own brand',
    value: 25000,
    max: 60000,
    display: '25,000',
    unit: 'shirts/mo'
  }, {
    cls: 'trade',
    label: 'Fabric trading',
    value: 38000,
    max: 60000,
    display: '~40,000',
    unit: 'meters/mo'
  }];
  const locs = [{
    cls: 'a',
    count: '20+',
    h: 'Job worker units',
    s: 'Cut · stitch · finish - across the city'
  }, {
    cls: 'b',
    count: '10+',
    h: 'Logistics warehouses',
    s: 'Partner-operated, fabric & finished goods'
  }, {
    cls: 'c',
    count: '2',
    h: 'In-house operations',
    s: 'Ironing & packaging only'
  }];
  const flow = [{
    n: '01',
    h: 'Fabric procured',
    p: 'PO raised, stock checked across all 30+ locations first'
  }, {
    n: '02',
    h: 'Issued to job worker',
    p: 'Fabric + trims sent together, tracked per work order'
  }, {
    n: '03',
    h: 'Production',
    p: '20+ independent job workers, full cut-make-trim'
  }, {
    n: '04',
    h: 'Returned & QC',
    p: 'Reconciled against issued: yield, rejects, settlement'
  }, {
    n: '05',
    h: 'Iron · pack · dispatch',
    p: 'In-house finishing, packed to buyer specs'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "btn-info",
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "infographic-title"
  }, "BY THE NUMBERS"), /*#__PURE__*/React.createElement("h2", {
    className: "infographic-h"
  }, "Three streams. One inventory. Thirty-plus locations."), /*#__PURE__*/React.createElement("div", {
    className: "btn-info-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "btn-bars"
  }, /*#__PURE__*/React.createElement("h4", null, "Monthly throughput by stream"), bars.map(b => /*#__PURE__*/React.createElement("div", {
    key: b.label,
    className: "bar-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bar-label"
  }, b.label), /*#__PURE__*/React.createElement("div", {
    className: "bar-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: 'bar-fill ' + b.cls,
    style: {
      width: animate ? `${b.value / b.max * 100}%` : '0%'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "bar-value"
  }, b.display, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 500,
      color: 'var(--fg3)',
      letterSpacing: '0.05em'
    }
  }, b.unit)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      paddingTop: 14,
      borderTop: '1px solid var(--border)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.12em',
      color: 'var(--fg3)'
    }
  }, "TOTAL SHIRTS / MONTH"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 24,
      fontWeight: 700,
      color: 'var(--sg-blue)',
      letterSpacing: '-0.02em'
    }
  }, "80,000 - 100,000"))), /*#__PURE__*/React.createElement("div", {
    className: "btn-locations"
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 14,
      fontWeight: 700,
      margin: '0 0 4px'
    }
  }, "Where the inventory lives"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: 'var(--fg3)',
      margin: '0 0 8px',
      lineHeight: 1.5
    }
  }, "Stock sits with partners and producers - not in a single factory. SimpleGrid tracks every roll, trim, and garment across all 30+ live locations."), locs.map(l => /*#__PURE__*/React.createElement("div", {
    key: l.h,
    className: "loc-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: 'loc-icon ' + l.cls
  }, l.count), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h"
  }, l.h), /*#__PURE__*/React.createElement("div", {
    className: "s"
  }, l.s)), /*#__PURE__*/React.createElement("div", {
    className: "ct",
    style: {
      color: l.cls === 'a' ? 'var(--sg-blue)' : l.cls === 'b' ? 'var(--sg-gold)' : 'var(--sg-purple)'
    }
  }, "\u25CF"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginTop: 6,
      paddingTop: 14,
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.12em',
      color: 'var(--fg3)'
    }
  }, "LIVE INVENTORY POINTS"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 24,
      fontWeight: 700,
      color: 'var(--sg-blue)',
      letterSpacing: '-0.02em'
    }
  }, "30+")))), /*#__PURE__*/React.createElement("div", {
    className: "btn-flow"
  }, flow.map(f => /*#__PURE__*/React.createElement("div", {
    key: f.n,
    className: "flow-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "step-n"
  }, f.n), /*#__PURE__*/React.createElement("div", {
    className: "step-h"
  }, f.h), /*#__PURE__*/React.createElement("div", {
    className: "step-p"
  }, f.p)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 0,
      border: '1px solid var(--sg-blue)',
      borderRadius: 12,
      overflow: 'hidden',
      background: 'linear-gradient(135deg, rgba(74,123,247,0.04), rgba(74,123,247,0.08))'
    }
  }, [{
    n: '24',
    u: 'hours',
    l: 'Working demo delivered'
  }, {
    n: '12',
    u: 'days',
    l: 'From kickoff to live'
  }, {
    n: '34',
    u: '',
    l: 'Domain entities tracked'
  }, {
    n: '44',
    u: '',
    l: 'Automatic triggers wired'
  }].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: '22px 20px',
      borderRight: i < 3 ? '1px solid rgba(74,123,247,0.25)' : 'none',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 38,
      fontWeight: 700,
      color: 'var(--sg-blue)',
      letterSpacing: '-0.02em',
      lineHeight: 1
    }
  }, s.n, s.u && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--fg3)',
      fontWeight: 500,
      marginLeft: 4
    }
  }, s.u)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--fg2)',
      marginTop: 8,
      letterSpacing: '0.04em'
    }
  }, s.l)))));
}
function NetworkInfographic() {
  // Hub-and-spoke: central warehouse → 30 dots around (job workers + logistics warehouses)
  const cx = 400,
    cy = 240,
    r = 180;
  const nodes = Array.from({
    length: 30
  }, (_, i) => {
    const angle = i / 30 * Math.PI * 2 - Math.PI / 2;
    return {
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
      i
    };
  });
  // Honest categories (not arbitrary modulo): 20 job worker units, ~8 logistics
  // partner warehouses, 2 in-house (iron + pack) - matching the real counts.
  const colorOf = i => {
    if (i >= 28) return 'var(--sg-purple)'; // in-house (iron · pack)
    if (i >= 20) return 'var(--sg-gold)'; // logistics partner warehouses
    return 'var(--sg-blue)'; // job worker units
  };
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 800 480",
    className: "network-svg"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: "hubGlow",
    cx: "50%",
    cy: "50%",
    r: "50%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "rgba(74,123,247,0.25)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "rgba(74,123,247,0)"
  }))), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: "120",
    fill: "url(#hubGlow)"
  }), nodes.map((n, i) => /*#__PURE__*/React.createElement("line", {
    key: `l-${i}`,
    x1: cx,
    y1: cy,
    x2: n.x,
    y2: n.y,
    stroke: colorOf(i),
    strokeWidth: "1",
    opacity: "0.35",
    className: "spoke-line",
    style: {
      animationDelay: `${i * 0.1}s`
    }
  })), nodes.map((n, i) => /*#__PURE__*/React.createElement("circle", {
    key: `d-${i}`,
    cx: n.x,
    cy: n.y,
    r: "7",
    fill: colorOf(i),
    className: "spoke-dot",
    style: {
      animationDelay: `${i * 0.08}s`
    }
  })), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: "48",
    fill: "#fff",
    stroke: "var(--sg-blue)",
    strokeWidth: "2.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: cy - 4,
    textAnchor: "middle",
    fontFamily: "var(--font-heading)",
    fontSize: "11",
    fontWeight: "700",
    fill: "var(--fg1)",
    letterSpacing: "0.04em"
  }, "CENTRAL"), /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: cy + 12,
    textAnchor: "middle",
    fontFamily: "var(--font-heading)",
    fontSize: "11",
    fontWeight: "700",
    fill: "var(--fg1)",
    letterSpacing: "0.04em"
  }, "WAREHOUSE"), /*#__PURE__*/React.createElement("g", {
    transform: "translate(40, 430)"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "5",
    fill: "var(--sg-blue)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "18",
    y: "10",
    fontSize: "11",
    fill: "var(--fg2)"
  }, "Job worker units (cut \xB7 stitch \xB7 finish)"), /*#__PURE__*/React.createElement("circle", {
    cx: "280",
    cy: "6",
    r: "5",
    fill: "var(--sg-gold)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "292",
    y: "10",
    fontSize: "11",
    fill: "var(--fg2)"
  }, "Logistics partner warehouses"), /*#__PURE__*/React.createElement("circle", {
    cx: "540",
    cy: "6",
    r: "5",
    fill: "var(--sg-purple)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "552",
    y: "10",
    fontSize: "11",
    fill: "var(--fg2)"
  }, "In-house (iron \xB7 pack)")), /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: "40",
    textAnchor: "middle",
    fontSize: "11",
    fontWeight: "700",
    letterSpacing: "0.14em",
    fill: "var(--fg3)"
  }, "30+ INVENTORY LOCATIONS \xB7 ALL VISIBLE IN ONE LEDGER"));
}
function ApexCaseStudy() {
  const [showLogin, setShowLogin] = React.useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("main", {
    id: "main"
  }, /*#__PURE__*/React.createElement("section", {
    className: "case-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "CASE STUDY \xB7 APPAREL MANUFACTURING"), /*#__PURE__*/React.createElement("h1", null, "An apparel manufacturer running 80,000-100,000 shirts a month - without a factory of his own."), /*#__PURE__*/React.createElement("p", {
    className: "case-hook"
  }, "Two years. Two failed ERPs. Over $100,000 spent with nothing to show for it. The company runs three interconnected businesses through 20+ job workers and stores inventory at its logistics partners' warehouses - 30+ locations in total. Every generic ERP assumed a factory model. This operation does not have a factory."), /*#__PURE__*/React.createElement("div", {
    className: "confidential-banner"
  }, "\uD83D\uDD12 Client name withheld for confidentiality. We refer to them as \"Apex Apparel\" throughout this case study."), /*#__PURE__*/React.createElement("div", {
    className: "case-strip"
  }, /*#__PURE__*/React.createElement("div", {
    className: "case-strip-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Monthly volume"), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, "80k-100k shirts")), /*#__PURE__*/React.createElement("div", {
    className: "case-strip-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Operating model"), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, "100% job work")), /*#__PURE__*/React.createElement("div", {
    className: "case-strip-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Inventory locations"), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, "30+ tracked live")), /*#__PURE__*/React.createElement("div", {
    className: "case-strip-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Deployed in"), /*#__PURE__*/React.createElement("div", {
    className: "value"
  }, "12 days"))))), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "infographic"
  }, /*#__PURE__*/React.createElement("div", {
    className: "infographic-title"
  }, "THE OPERATION AT A GLANCE"), /*#__PURE__*/React.createElement("h2", {
    className: "infographic-h"
  }, "A factoryless apparel business, by the numbers."), /*#__PURE__*/React.createElement("div", {
    className: "stat-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-num"
  }, "80-100", /*#__PURE__*/React.createElement("span", {
    className: "unit"
  }, "k")), /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, "Shirts manufactured per month, across all three streams")), /*#__PURE__*/React.createElement("div", {
    className: "stat-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-num"
  }, "3"), /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, "Business streams: CMT, own brand, fabric trading")), /*#__PURE__*/React.createElement("div", {
    className: "stat-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-num"
  }, "20", /*#__PURE__*/React.createElement("span", {
    className: "unit"
  }, "+")), /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, "Independent job workers across the city")), /*#__PURE__*/React.createElement("div", {
    className: "stat-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-num"
  }, "30", /*#__PURE__*/React.createElement("span", {
    className: "unit"
  }, "+")), /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, "Inventory locations including logistics partner warehouses"))), /*#__PURE__*/React.createElement(NetworkInfographic, null), /*#__PURE__*/React.createElement("div", {
    className: "split-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "split-card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.12em',
      color: 'var(--sg-blue)'
    }
  }, "STREAM 01 \xB7 CMT"), /*#__PURE__*/React.createElement("div", {
    className: "vol"
  }, "~55,000 / mo"), /*#__PURE__*/React.createElement("h4", null, "Contract manufacturing"), /*#__PURE__*/React.createElement("p", null, "Cut-make-trim for external brand principals. Brand owns the IP, Apex owns the supply chain.")), /*#__PURE__*/React.createElement("div", {
    className: "split-card alt"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.12em',
      color: 'var(--sg-purple)'
    }
  }, "STREAM 02 \xB7 OWN BRAND"), /*#__PURE__*/React.createElement("div", {
    className: "vol"
  }, "~25,000 / mo"), /*#__PURE__*/React.createElement("h4", null, "Own-label retail"), /*#__PURE__*/React.createElement("p", null, "Their own designs, manufactured through the same job worker network, sold to retail buyers.")), /*#__PURE__*/React.createElement("div", {
    className: "split-card alt2"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.12em',
      color: 'var(--sg-gold)'
    }
  }, "STREAM 03 \xB7 TRADING"), /*#__PURE__*/React.createElement("div", {
    className: "vol"
  }, "High-volume fabric"), /*#__PURE__*/React.createElement("h4", null, "Fabric wholesale"), /*#__PURE__*/React.createElement("p", null, "Buying fabric in bulk and reselling to other manufacturers - a separate P&L on the same inventory ledger.")))), /*#__PURE__*/React.createElement(BarsInfographic, null), /*#__PURE__*/React.createElement("section", {
    className: "case-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag",
    style: {
      marginBottom: 10
    }
  }, "THE OPERATION"), /*#__PURE__*/React.createElement("h2", null, "Three businesses, no factory of their own."), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 780
    }
  }, "Apex runs ", /*#__PURE__*/React.createElement("strong", null, "three interconnected businesses"), " on one inventory ledger: contract manufacturing for external brands, their own retail label, and high-volume fabric trading."), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 780
    }
  }, "The production model is ", /*#__PURE__*/React.createElement("strong", null, "100% job work"), " - they don't cut and don't sew. Every garment is made at one of ", /*#__PURE__*/React.createElement("strong", null, "20+ job worker units"), " across the city; only ironing and packaging happen in-house."), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 780
    }
  }, "And the stock isn't theirs to hold. Fabric, trims and finished goods sit at their ", /*#__PURE__*/React.createElement("strong", null, "logistics partners' warehouses"), ". Add the job worker units, and at any moment Apex has inventory across ", /*#__PURE__*/React.createElement("strong", null, "30+ live locations"), ".")), /*#__PURE__*/React.createElement("section", {
    className: "case-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag",
    style: {
      marginBottom: 10
    }
  }, "THE PROBLEM"), /*#__PURE__*/React.createElement("h2", null, "What was breaking"), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 780
    }
  }, /*#__PURE__*/React.createElement("strong", null, "Two ERPs, two years, $100,000+ spent - and nothing that fit."), " Every off-the-shelf system assumed a factory. Apex doesn't have one, so each one broke on contact."), /*#__PURE__*/React.createElement("div", {
    className: "prob-grid"
  }, [{icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/></svg>', t:'Inventory scattered everywhere', d:'Fabric, trims and goods across 20+ workers and 10+ warehouses - finding an order meant five phone calls.'}, {icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>', t:'A BOM per work order', d:'Buttons, tags, labels and thread - all bought per order, issued, and reconciled by hand.'}, {icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/></svg>', t:'Three businesses, one sheet', d:'A single fabric roll might be a CMT order, own stock, or a trading sale - nobody could tell.'}, {icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>', t:'Reconciliation ate the day', d:'20+ workers issued fabric and trims and returning garments - all matched by hand, for hours.'}, {icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V4M4 20h16"/><path d="M7 14l3-3 3 2 4-5"/></svg>', t:'Profit by stream: a guess', d:'Was CMT earning, or quietly subsidized by fabric trading? No way to know.'}].map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "prob-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "prob-ic",
    dangerouslySetInnerHTML: {
      __html: p.icon
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "t"
  }, p.t), /*#__PURE__*/React.createElement("p", {
    className: "d"
  }, p.d)))))), /*#__PURE__*/React.createElement("section", {
    className: "case-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag",
    style: {
      marginBottom: 10
    }
  }, "THE BUILD"), /*#__PURE__*/React.createElement("h2", null, "What we built"), /*#__PURE__*/React.createElement("p", null, "We offered to build it free. The founder's first reaction was that we must be overconfident. Then we sent him a ", /*#__PURE__*/React.createElement("strong", null, "working demo in 24 hours"), ": 60-70% accurate to how his operation actually runs, including the distributed job worker network, secondary material procurement, and three separate business streams."), /*#__PURE__*/React.createElement("p", null, "Over the next 11 days we did 4 working sessions with the founder and his operations head. Walked through every edge case."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 'var(--fs-body)',
      fontWeight: 700,
      color: 'var(--sg-blue)',
      margin: '24px 0'
    }
  }, "Day 12: live. For the first time, every order across 30+ locations sat in one view - and the founder could finally see which of his three businesses made money.")), /*#__PURE__*/React.createElement("section", {
    className: "case-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag",
    style: {
      marginBottom: 10
    }
  }, "THE PROCESS"), /*#__PURE__*/React.createElement("h2", null, "The full CMT flow"), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 780
    }
  }, "One contract order, end to end - from the brand's work order to job worker settlement."), /*#__PURE__*/React.createElement("div", {
    className: "proc-pipe proc-anim"
  }, [{t:'Work order received', d:'Specs in; SKUs auto-generated.'}, {t:'BOM & specs built', d:'Fabric, trims, labels, patterns linked.'}, {t:'Fabric & trims procured', d:'Stock checked first; only the shortfall ordered.'}, {t:'Received & inspected', d:'Checked for defects, tracked by roll.'}, {t:'Issued to job worker', d:'Fabric and trims go out together, tracked.'}, {t:'Produced & returned', d:'Returns reconciled against expected yield.'}, {t:'Ironed, packed, QC', d:'In-house finishing, pre-dispatch gate.'}, {t:'Dispatched & settled', d:'Invoice out; worker auto-settled.'}].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "proc-node"
  }, /*#__PURE__*/React.createElement("span", {
    className: "proc-n",
    style: {
      animationDelay: i * 0.5 + 's'
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("div", {
    className: "t"
  }, s.t), /*#__PURE__*/React.createElement("p", {
    className: "d"
  }, s.d))))), /*#__PURE__*/React.createElement("section", {
    className: "case-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag",
    style: {
      marginBottom: 10
    }
  }, "GUARDRAILS"), /*#__PURE__*/React.createElement("h2", null, "Rules the system enforces"), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 780
    }
  }, "Not suggestions - the system physically blocks the action."), /*#__PURE__*/React.createElement("div", {
    className: "guard-grid"
  }, ["Can't issue fabric without an active work order.", "Can't receive more goods than the work order quantity.", "Can't start production until every trim is issued.", "Can't settle a job worker until returns are reconciled.", "Defective fabric rolls are quarantined from production.", "Wrong packaging or label format blocks the dispatch."].map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "guard-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "guard-badge",
    dangerouslySetInnerHTML: {
      __html: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 2.5v5c0 4.3-2.9 7.3-7 8.5-4.1-1.2-7-4.2-7-8.5v-5z"/><path d="M9.5 9.5l5 5M14.5 9.5l-5 5"/></svg>'
    }
  }), /*#__PURE__*/React.createElement("p", {
    className: "r"
  }, r))))), /*#__PURE__*/React.createElement("section", {
    className: "case-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag",
    style: {
      marginBottom: 10
    }
  }, "RESULTS"), /*#__PURE__*/React.createElement("h2", null, "What changed"), /*#__PURE__*/React.createElement("div", {
    className: "res-rows"
  }, /*#__PURE__*/React.createElement("div", {
    className: "res-row",
    style: {
      marginBottom: 2,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--sg-red)'
    }
  }, "Before SimpleGrid"), /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--sg-green)'
    }
  }, "After SimpleGrid")), [{b:'Two failed ERPs in two years; $100K+ spent', a:'Live in 12 days, modeled to the operation'}, {b:'Finding an order meant 3-5 phone calls', a:'30+ locations in one live ledger'}, {b:'Three businesses tangled in one spreadsheet', a:'Three clean P&Ls: CMT, own brand, trading'}, {b:'Job worker reconciliation ate hours a day', a:'Issued vs. returned reconciled automatically'}, {b:'Trims tracked by hand, per order', a:'Every button, tag and label on its own BOM'}, {b:'Profit by stream was guesswork', a:'Margin visible per stream and per work order'}].map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "res-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "res-cell res-before"
  }, r.b), /*#__PURE__*/React.createElement("div", {
    className: "res-arrow",
    dangerouslySetInnerHTML: {
      __html: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "res-cell res-after"
  }, r.a))))), /*#__PURE__*/React.createElement("div", {
    className: "testimonial-block"
  }, /*#__PURE__*/React.createElement(RevealQuote, {
    text: "\"When they said they'd deploy for free, I honestly thought it was overconfidence. Then I got a working demo in 24 hours - and it was 60-70% accurate to how we actually operate. That's when I knew these guys understood manufacturing. No other vendor we've worked with has shown me a working system before asking me to sign a check.\""
  }), /*#__PURE__*/React.createElement("div", {
    className: "attr"
  }, "- Founder, Apex Apparel ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg3)',
      fontWeight: 400
    }
  }, "(name withheld for confidentiality)"))), /*#__PURE__*/React.createElement("div", {
    className: "case-bottom-line"
  }, /*#__PURE__*/React.createElement("div", {
    className: "big"
  }, "Two years and two failed ERPs - then live in 12 days. 30+ locations in one ledger. Three businesses, three clear P&Ls."), /*#__PURE__*/React.createElement("p", null, "Two years and two failed ERPs. Then 12 days with SimpleGrid. Inventory visible across 20+ job worker facilities and 10+ logistics partner warehouses, all in one live ledger."), /*#__PURE__*/React.createElement("a", {
    href: "https://cal.com/simplegrid-ai",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "btn btn-primary",
    style: {
      marginTop: 16
    }
  }, "Book a demo - See how we'd model your operations"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "case-furniture-manufacturer.html",
    style: {
      color: 'var(--sg-blue)',
      fontWeight: 600,
      textDecoration: 'none'
    }
  }, "See a furniture manufacturer's deployment - live in 21 days \u2192"))))), /*#__PURE__*/React.createElement(FinalCTA, {
    title: "Want a result like Apex?",
    body: "We'll configure SimpleGrid to how your floor actually runs, put it in your hands, and you run it live for 30 days. You pay only when it works.",
    note: "Limited slots each quarter. We onboard selectively."
  }), showLogin && /*#__PURE__*/React.createElement(LoginModal, {
    onClose: () => setShowLogin(false)
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(ApexCaseStudy, null));