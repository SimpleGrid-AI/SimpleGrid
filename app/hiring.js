const ROLES = [{
  id: 'software-engineering-intern',
  team: 'Engineering',
  t: 'Software Engineering Intern',
  loc: 'Bangalore (in-person)',
  type: 'Internship',
  datePosted: '2026-06-15',
  comp: 'Stipend - discussed on the call',
  summary: 'Be the engineer on an AI-native ERP that compresses 18-month implementations into days. Your code ships to real clients in week one, working directly with the founder - no layers.',
  about: ['We do not ship predefined modules. We map how a business runs and configure the system around it - approvals, handoffs, quality checks - all as configuration, not a development cycle. Under the hood: a schema engine, a permanent record of every action as the single source of truth, and an AI layer that turns messy PDFs and plain-language instructions into structured records. The protocol is strict - AI interprets, the system validates, a human confirms, the record commits. AI never writes directly to the record.', 'Our first live client, Elite Arts & Crafts, is a furniture and home decor exporter with 600+ people across nearly 1 million sq ft, previously drowning in 550 Excel files and WhatsApp coordination. SAP quoted 18 months. We deployed in 21 days, and more brands and manufacturers are in the pipeline.', 'The founder built and scaled a manufacturing business to 200 employees and $30M+ in revenue, and managed $5M in debt as a solo founder, all repaid. He is building the system he wished existed, and you work directly with him.'],
  what: ['Ship production code to live customers from week one - features, fixes, and integrations.', 'Work on the core: the schema engine, the permanent action record, and the AI layer that turns PDFs and plain language into structured records.', 'Configure the system around how each business actually runs, as configuration rather than a development cycle.', 'Sit on real deployments with the founder and senior engineers, and turn floor problems into working software.'],
  you: ['In your final or pre-final year.', 'You have built something real - a hackathon project, a side project with actual users, or an open-source contribution - and can explain the decisions behind it.', 'You write TypeScript or Python and can pick up the other quickly.', 'You understand databases beyond SELECT and know what an index does. Bonus if you have thought about audit logs, versioned data, or JSONB.', 'You are curious about systems and want to understand architecture that configures itself from a schema, not glaze over it.'],
  not: ['A tutorial-grade internship. You ship real code to real factories, not toy projects.', 'A role behind layers. You work directly with the founder and own what you build.'],
  process: ['Send your resume and a link to something you have built - a GitHub repo or a deployed app.', 'Complete the assessment at https://bit.ly/3Ncb7HJ.', 'Email hello@simplegrid.ai. If your work is interesting, you hear from the founder within 48 hours.']
}, {
  id: 'ui-ux-design-intern',
  team: 'Design',
  t: 'UI/UX Design Intern',
  loc: 'Bangalore (in-person)',
  type: 'Internship',
  datePosted: '2026-06-15',
  comp: 'Stipend - discussed on the call',
  summary: 'Make something powerful feel genuinely simple. SimpleGrid is an AI-native ERP that adapts to how a factory actually works, goes live in days, and is simple enough to use by typing in plain language. The hard part is the simplicity, and that is where you come in.',
  about: ['Most factories run on rigid, decades-old software so slow and confusing that staff abandon it for Excel and WhatsApp. We build the opposite: software that adapts to how a business actually works, goes live in days instead of months, and is simple enough to use by just typing in plain language.', 'The hard part is not the technology. It is making something powerful feel genuinely simple, and that is where you come in. Your designs ship to real customers, with direct mentorship from the founder and engineering team and no layers in between.'],
  what: ['Design intuitive interfaces for product screens, dashboards, forms, and data-heavy workflows that solve real customer problems.', 'Map user journeys for operators, supervisors, and business owners, and translate them into clear product experiences.', 'Turn complex business processes such as inventory management, costing, and approval workflows into clear wireframes, user flows, and interactive prototypes.', 'Join user research and usability testing, identify friction points, and improve the experience through iterative design.', 'Contribute to the design system - components, interaction patterns, and visual standards that keep the product consistent.', 'Collaborate with product managers, developers, and stakeholders to turn requirements into user-centered design.', 'Support the end-to-end design process, from research and ideation to prototyping, testing, and implementation.'],
  you: ['A portfolio (student, personal, or professional) showing clean, usable interface work. How you think matters more than how long your resume is.', 'Working knowledge of Figma: wireframes, prototypes, and components.', 'A strong eye for simplicity - you notice clutter and know how to fix it.', 'Genuine curiosity about how real businesses run, not just making things look good.', 'A self-starter who can take a rough problem, ask sharp questions, and move without hand-holding.', 'Bonus: front-end basics (HTML/CSS), or experience designing data-heavy or B2B products.'],
  not: ['A pixel-pushing role. You design how the product actually works, not just how it looks.', 'A remote internship. This is on-site in Bangalore, in the room with the team.'],
  process: ['Apply through our form: https://tally.so/r/1ARqeM.', 'Have your portfolio and a short note on why this interests you ready.', 'We review applications on a rolling basis and onboard selectively.']
}, {
  id: 'founders-office-intern',
  team: 'Founder\'s Office',
  t: 'Founder\'s Office Intern',
  loc: 'Bangalore (in-person)',
  type: 'Internship',
  datePosted: '2026-04-10',
  comp: 'Stipend - discussed on the call',
  summary: 'Run with whatever the founder needs run with. Customer ops, deployment notes, content, data, sales-ops, partner outreach. Six months of unfair access to how a B2B startup is actually built.',
  about: ['This is not a coffee-and-decks internship. Founders and senior engineers run every deployment together. You will sit next to them on customer calls, take the followups, build the spreadsheets, draft the contracts, write the case studies, and own the loose ends.', 'If you want to be a founder yourself one day, this is the densest six months you can spend.'],
  what: ['Customer ops: own followups, deployment trackers, and customer-success notes for every live account.', 'Sales ops: research target accounts, draft outbound, prep founder for calls, log everything in CRM.', 'Content: turn deployment learnings into case studies, blog posts, and product docs.', 'Internal tooling: keep dashboards, hiring trackers, and finance trackers honest.', 'Anything that is on fire that nobody else is owning.'],
  you: ['Final-year undergrad, recent grad, or pre-MBA / pre-grad-school.', 'Strong written English. We write everything down here.', 'Ridiculously organized. Things you own do not slip.', 'Comfortable with ambiguity, allergic to fluff, fast on a keyboard.', 'Bonus: prior startup internship, debate / writing background, basic SQL or spreadsheets-at-depth.'],
  not: ['A remote internship. We want you in the room.', 'A passive role. We will not assign you a project; you will find the next thing yourself.'],
  process: ['A short written application (3 questions, ~30 min).', 'A 30-min call with the founder.', 'A 1-day paid trial in the office.', 'Offer.']
}];
function HiringHero() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    style: {
      paddingTop: 80,
      paddingBottom: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "HIRING"), /*#__PURE__*/React.createElement("h1", {
    className: "h1",
    style: {
      maxWidth: 880
    }
  }, "Build the operations layer factories actually use."), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 760,
      marginTop: 16
    }
  }, "Lean team. Senior engineers on every customer. We're building the Adaptive ERP - the operations cloud for businesses still run on spreadsheets and WhatsApp. We win only when the customer wins. We're hiring engineers, operators, and go-to-market hires who want to ship a system that gets used on the floor, not bought and shelved."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#roles",
    className: "btn btn-lg btn-primary"
  }, "See open roles"))));
}
function WhyThis() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "WHY THIS"), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "A few things to know before you apply.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 20,
      marginTop: 28
    },
    className: "hire-grid"
  }, [{
    t: 'Operator-grounded',
    b: 'The people who built SimpleGrid ran a $30M manufacturing business and survived two ERP failures before building this. We design for the floor. Every feature is tested against a real plant.'
  }, {
    t: 'Proven on the floor',
    b: 'Every customer runs SimpleGrid live on their real floor for 30 days before they commit. We win only when it works in production. That commitment runs through the company - tight loops, visible work, no 9-month roadmaps.'
  }, {
    t: 'Small by design',
    b: 'We will stay under 25 people for as long as we can. Everyone ships. Everyone talks to customers. Senior people on every deployment.'
  }].map((c, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i * 100
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: 24,
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 18,
      fontWeight: 700,
      margin: '0 0 10px',
      color: 'var(--fg1)',
      letterSpacing: '-0.01em'
    }
  }, c.t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--fg2)',
      lineHeight: 1.6,
      margin: 0
    }
  }, c.b)))))));
}
function RoleSummary({
  r,
  onOpen
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '22px 26px',
      display: 'grid',
      gridTemplateColumns: '160px 1fr auto',
      gap: 24,
      alignItems: 'center'
    },
    className: "role-row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: 'var(--fg3)',
      fontWeight: 700,
      marginBottom: 4
    }
  }, r.team), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg3)'
    }
  }, r.type)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 20,
      fontWeight: 700,
      margin: '0 0 4px',
      color: 'var(--fg1)',
      letterSpacing: '-0.01em'
    }
  }, r.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--fg3)',
      marginBottom: 4
    }
  }, r.loc), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-caption)',
      color: 'var(--sg-blue)',
      fontWeight: 600,
      marginBottom: 8
    }
  }, r.comp), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--fg2)',
      lineHeight: 1.55,
      margin: 0,
      maxWidth: 680
    }
  }, r.summary)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onOpen(r.id),
    className: "btn btn-sm btn-secondary",
    style: {
      whiteSpace: 'nowrap'
    }
  }, "Read full JD \u2192"), /*#__PURE__*/React.createElement("a", {
    href: 'mailto:hello@simplegrid.ai?subject=Application:%20' + encodeURIComponent(r.t),
    className: "btn btn-sm btn-primary",
    style: {
      whiteSpace: 'nowrap'
    }
  }, "Apply")));
}
function RoleDetail({
  r
}) {
  const Sec = ({
    title,
    items,
    color
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: color || 'var(--fg3)',
      fontWeight: 700,
      marginBottom: 10
    }
  }, title), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--fg2)',
      lineHeight: 1.6,
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: color || 'var(--sg-blue)',
      fontWeight: 700,
      marginTop: 1,
      flexShrink: 0
    }
  }, "-"), /*#__PURE__*/React.createElement("span", null, it)))));
  return /*#__PURE__*/React.createElement("div", {
    id: r.id,
    style: {
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '40px 44px',
      scrollMarginTop: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 24,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: 'var(--fg3)',
      fontWeight: 700,
      marginBottom: 8
    }
  }, r.team, " \xB7 ", r.type), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-heading)',
      fontSize: 30,
      fontWeight: 700,
      margin: '0 0 8px',
      color: 'var(--fg1)',
      letterSpacing: '-0.02em',
      lineHeight: 1.15
    }
  }, r.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--fg3)',
      marginBottom: 6
    }
  }, r.loc), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--sg-blue)',
      fontWeight: 700
    }
  }, r.comp)), /*#__PURE__*/React.createElement("a", {
    href: 'mailto:hello@simplegrid.ai?subject=Application:%20' + encodeURIComponent(r.t),
    className: "btn btn-primary"
  }, "Apply")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      color: 'var(--fg1)',
      lineHeight: 1.55,
      margin: '24px 0 0',
      fontWeight: 500,
      maxWidth: 740
    }
  }, r.summary), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, r.about.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      fontSize: 'var(--fs-small)',
      color: 'var(--fg2)',
      lineHeight: 1.7,
      margin: '0 0 14px',
      maxWidth: 740
    }
  }, p))), /*#__PURE__*/React.createElement(Sec, {
    title: "What you will do",
    items: r.what
  }), /*#__PURE__*/React.createElement(Sec, {
    title: "What we are looking for",
    items: r.you
  }), /*#__PURE__*/React.createElement(Sec, {
    title: "What this is not",
    items: r.not,
    color: "var(--sg-red)"
  }), /*#__PURE__*/React.createElement(Sec, {
    title: "Process",
    items: r.process,
    color: "var(--sg-green)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      paddingTop: 24,
      borderTop: '1px solid var(--border)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--fg2)'
    }
  }, "Apply by emailing ", /*#__PURE__*/React.createElement("a", {
    href: 'mailto:hello@simplegrid.ai?subject=Application:%20' + encodeURIComponent(r.t),
    style: {
      color: 'var(--sg-blue)',
      fontWeight: 600
    }
  }, "hello@simplegrid.ai"), " with your CV or LinkedIn and a one-paragraph note on why this."), /*#__PURE__*/React.createElement("a", {
    href: 'mailto:hello@simplegrid.ai?subject=Application:%20' + encodeURIComponent(r.t),
    className: "btn btn-primary"
  }, "Apply for this role")));
}
function HiringPage() {
  const [showLogin, setShowLogin] = React.useState(false);
  const [openRole, setOpenRole] = React.useState(null);

  // Inject JobPosting JSON-LD per role for Google Jobs eligibility
  React.useEffect(() => {
    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.id = 'hiring-jobpostings';
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': ROLES.map(r => {
        // Each role declares its own datePosted (stable for crawlers).
        // validThrough = datePosted + 90 days, recomputed once at render time.
        const posted = r.datePosted || '2026-04-01';
        const through = new Date(new Date(posted + 'T00:00:00Z').getTime() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
        return {
          '@type': 'JobPosting',
          'title': r.t,
          'description': r.summary + ' ' + (r.about || []).join(' '),
          'employmentType': r.type.includes('Internship') ? 'INTERN' : r.type.includes('Fractional') ? 'CONTRACTOR' : 'FULL_TIME',
          'hiringOrganization': {
            '@type': 'Organization',
            '@id': 'https://simplegrid.ai/#org',
            'name': 'SimpleGrid',
            'sameAs': 'https://simplegrid.ai/'
          },
          'jobLocation': {
            '@type': 'Place',
            'address': {
              '@type': 'PostalAddress',
              'addressLocality': r.loc.includes('Bangalore') ? 'Bengaluru' : r.loc.includes('Remote') ? 'Remote' : r.loc,
              'addressCountry': r.loc.includes('US') ? 'US' : 'IN'
            }
          },
          'datePosted': posted,
          'validThrough': through,
          'directApply': true,
          'identifier': {
            '@type': 'PropertyValue',
            'name': 'SimpleGrid',
            'value': r.id
          }
        };
      })
    });
    document.head.appendChild(ld);
    return () => {
      if (ld.parentNode) ld.parentNode.removeChild(ld);
    };
  }, []);
  React.useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      if (ROLES.some(r => r.id === id)) {
        setOpenRole(id);
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  }, []);
  const handleOpen = id => {
    setOpenRole(id);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    }, 50);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("main", {
    id: "main"
  }, /*#__PURE__*/React.createElement(HiringHero, null), /*#__PURE__*/React.createElement(WhyThis, null), /*#__PURE__*/React.createElement("section", {
    className: "section section-alt",
    id: "roles"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "OPEN ROLES"), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "Where we need help.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, ROLES.map((r, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: r.id,
    delay: i * 60
  }, /*#__PURE__*/React.createElement(RoleSummary, {
    r: r,
    onOpen: handleOpen
  })))))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 32
    }
  }, ROLES.map((r, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: r.id,
    delay: i * 60
  }, /*#__PURE__*/React.createElement(RoleDetail, {
    r: r
  })))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 200
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: 'var(--fg2)',
      marginTop: 32,
      textAlign: 'center'
    }
  }, "Don't see your role? Email ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:hello@simplegrid.ai",
    style: {
      color: 'var(--sg-blue)'
    }
  }, "hello@simplegrid.ai"), " with how you'd contribute."))))), showLogin && /*#__PURE__*/React.createElement(LoginModal, {
    onClose: () => setShowLogin(false)
  }), /*#__PURE__*/React.createElement("style", null, `@media (max-width:760px){.role-row{grid-template-columns:1fr !important}.hire-grid{grid-template-columns:1fr !important}}`));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(HiringPage, null));