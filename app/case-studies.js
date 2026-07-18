function CaseStudiesPage() {
  const [showLogin, setShowLogin] = React.useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("main", {
    id: "main"
  }, /*#__PURE__*/React.createElement("section", {
    className: "section",
    style: {
      paddingBottom: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "CASE STUDIES"), /*#__PURE__*/React.createElement("h1", {
    className: "h2"
  }, "Real operations. Live in 12 and 21 days."), /*#__PURE__*/React.createElement("p", {
    className: "section-lead"
  }, "Elite Arts & Crafts found $200K in silent losses and went live in 21 days. An apparel maker went live in 12. Both ran SimpleGrid free for 30 days. Both kept it."), /*#__PURE__*/React.createElement("div", {
    className: "case-list"
  }, /*#__PURE__*/React.createElement("a", {
    href: "case-furniture-manufacturer.html",
    className: "proof-card case-row",
    style: {
      textDecoration: 'none',
      color: 'inherit',
      transition: 'all 160ms var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "proof-photo case-row-photo",
    style: {
      background: 'url(assets/elite-factory.jpeg) center/cover',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 10,
      left: 10,
      background: 'rgba(0,0,0,0.65)',
      color: '#fff',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      padding: '4px 8px',
      borderRadius: 4,
      backdropFilter: 'blur(4px)'
    }
  }, "\u25CF Actual shot")), /*#__PURE__*/React.createElement("div", {
    className: "proof-body case-row-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag",
    style: {
      marginBottom: 8
    }
  }, "FURNITURE & HOME DECOR EXPORT"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 22,
      fontWeight: 700,
      margin: '0 0 10px',
      letterSpacing: '-0.015em'
    }
  }, "Elite Arts & Crafts"), /*#__PURE__*/React.createElement("p", null, "600+ people. 1 million sq ft. 12+ export countries. Live in 21 days."), /*#__PURE__*/React.createElement("div", {
    className: "proof-stats"
  }, "$200K in silent losses, found and stopped."), /*#__PURE__*/React.createElement("div", {
    className: "proof-quote"
  }, "\"They modeled our whole operation in three weeks. We found $200K in losses we could never see.\"", /*#__PURE__*/React.createElement("div", {
    className: "proof-attr"
  }, "- Chirag, Founder, Elite Arts & Crafts"))), /*#__PURE__*/React.createElement("span", {
    className: "proof-detail-btn"
  }, "See in detail ", /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2192"))), /*#__PURE__*/React.createElement("a", {
    href: "case-apex.html",
    className: "proof-card case-row",
    style: {
      textDecoration: 'none',
      color: 'inherit',
      transition: 'all 160ms var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "proof-photo case-row-photo",
    style: {
      padding: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(ApparelVisual, null)), /*#__PURE__*/React.createElement("div", {
    className: "proof-body case-row-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag",
    style: {
      marginBottom: 8
    }
  }, "APPAREL MANUFACTURING"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 22,
      fontWeight: 700,
      margin: '0 0 10px',
      letterSpacing: '-0.015em'
    }
  }, "Apex Apparel ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--fg3)',
      fontWeight: 400
    }
  }, "(name withheld - reference on request)")), /*#__PURE__*/React.createElement("p", null, "80-100k shirts a month. 20+ job workers. 30+ stock locations. Live in 12 days."), /*#__PURE__*/React.createElement("div", {
    className: "proof-stats"
  }, "The first ERP they selected never went live. SimpleGrid did, in 12 days."), /*#__PURE__*/React.createElement("div", {
    className: "proof-quote"
  }, "\"They sent a working demo in 72 hours and it was 60-70% right already.\"", /*#__PURE__*/React.createElement("div", {
    className: "proof-attr"
  }, "- Founder, Apex Apparel"))), /*#__PURE__*/React.createElement("span", {
    className: "proof-detail-btn"
  }, "See in detail ", /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2192"))))))), /*#__PURE__*/React.createElement(FinalCTA, {
    title: "Your operation could be next.",
    body: "We model SimpleGrid around how you already work. Run it live for 30 days, free. Pay only when it works.",
    note: "$0 up front. Working demo in 72 hours."
  }), showLogin && /*#__PURE__*/React.createElement(LoginModal, {
    onClose: () => setShowLogin(false)
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(CaseStudiesPage, null));