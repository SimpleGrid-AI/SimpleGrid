// Events Ledger - flagship section. Domain-Driven Design + Event Sourcing.
// Animated streaming feed + the architecture behind it.

function EventsLedger() {
  // Realistic event stream that types in over time
  const allEvents = [
    { t: '11:47:02', actor: 'Sarah · Sales', verb: 'CANCEL_LINE',     entity: 'SO-4521 · Line 3',         from: 'In Production', to: 'Cancelled',     impact: 'WIP returned · Buyer notified' },
    { t: '11:46:58', actor: 'System',        verb: 'TRIGGER_FIRED',   entity: 'Inventory rule R-204',     from: '-',             to: 'Reorder draft', impact: 'PO-8821 prepared for approval' },
    { t: '11:46:51', actor: 'Mike · Floor',  verb: 'START_STAGE',     entity: 'JO-KEN-MIRROR · Assembly', from: 'Issued',        to: 'In progress',   impact: 'Stage clock started' },
    { t: '11:46:44', actor: 'Raj · QC',      verb: 'REJECT_BATCH',    entity: 'Batch B-7710 · 12 pcs',    from: 'Pending',       to: 'Rejected',      impact: 'Auto-routed to original contractor' },
    { t: '11:46:31', actor: 'Mukund · Owner',verb: 'APPROVE',         entity: 'PO-8819 · ₹ 14.2 L',       from: 'Pending',       to: 'Approved',      impact: 'Vendor notified · Funds reserved' },
    { t: '11:46:18', actor: 'Bruce · Disp.', verb: 'SHIP_DISPATCH',   entity: 'HACO-Dispatch-441',        from: 'Packed',        to: 'Shipped',       impact: 'Invoice INV-2207 generated' },
    { t: '11:46:05', actor: 'System',        verb: 'RECONCILE',       entity: 'Bank · ICICI 4421',        from: '-',             to: 'Matched',       impact: '37 receipts matched · 2 flagged' },
    { t: '11:45:52', actor: 'Hank · Whse',   verb: 'RECEIVE_GOODS',   entity: 'GRN-3320 · 200 sheets',    from: '-',             to: 'In stock',      impact: 'Inventory +200 · AP +₹ 14.2 L' },
  ];

  const [count, setCount] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const containerRef = React.useRef(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    if (!inView || paused) return;
    if (count >= allEvents.length) return;
    const id = setTimeout(() => setCount(c => c + 1), count === 0 ? 350 : 750);
    return () => clearTimeout(id);
  }, [count, inView, paused]);

  const visible = allEvents.slice(0, count);
  const total = 12987 + count; // running counter

  const verbColor = (v) => {
    if (v.startsWith('REJECT') || v.startsWith('CANCEL')) return 'var(--sg-red)';
    if (v.startsWith('APPROVE') || v.startsWith('SHIP') || v.startsWith('RECEIVE') || v.startsWith('RECONCILE')) return 'var(--sg-green)';
    if (v.startsWith('TRIGGER')) return 'var(--sg-purple)';
    return 'var(--sg-blue)';
  };

  return (
    <section className="section section-dark" id="ledger" ref={containerRef} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* subtle grid bg */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <Reveal>
          <div className="tag" style={{ color: 'rgba(255,255,255,0.5)' }}>THE EVENTS LEDGER</div>
          <h2 className="h2" style={{ color: '#fff', maxWidth: 880 }}>
            Your enterprise, alive - every action recorded, every decision traceable, every state replayable.
          </h2>
        </Reveal>

        {/* Live ledger card */}
        <Reveal delay={120}>
          <div style={{
            marginTop: 36,
            background: '#0E0E10',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 14,
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
          }}>
            {/* header bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }}></span>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }}></span>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }}></span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
                events.simplegrid · live tail
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)' }}>
                  {total.toLocaleString()} events
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#10B981', fontWeight: 600 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 0 4px rgba(16,185,129,0.18)' }}></span>
                  LIVE
                </span>
                <button onClick={() => {
                  if (count >= allEvents.length) { setCount(0); setPaused(false); }
                  else { setPaused(p => !p); }
                }} style={{
                  background: 'transparent', border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.7)',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '5px 10px', borderRadius: 4, cursor: 'pointer', fontFamily: 'var(--font-body)',
                }}>{count >= allEvents.length ? '⟲ Replay' : paused ? 'Resume' : 'Pause'}</button>
              </div>
            </div>

            {/* column headers */}
            <div style={{
              display: 'grid', gridTemplateColumns: '110px 170px 170px 1fr 1fr 1fr',
              gap: 16, padding: '10px 20px',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)', borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div>Time</div><div>Actor</div><div>Event</div><div>Entity</div><div>Transition</div><div>Downstream effect</div>
            </div>

            {/* rows */}
            <div style={{ minHeight: 380 }}>
              {visible.map((e, i) => (
                <div key={i} className="ledger-row" style={{
                  display: 'grid', gridTemplateColumns: '110px 170px 170px 1fr 1fr 1fr',
                  gap: 16, padding: '12px 20px',
                  fontSize: 12, color: 'rgba(255,255,255,0.78)',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  fontFamily: 'var(--font-mono)',
                  animation: 'sgLedgerIn 0.5s cubic-bezier(0.2,0.8,0.2,1) both',
                }}>
                  <div style={{ color: 'rgba(255,255,255,0.45)' }}>{e.t}</div>
                  <div style={{ color: 'rgba(255,255,255,0.85)' }}>{e.actor}</div>
                  <div style={{ color: verbColor(e.verb), fontWeight: 700, letterSpacing: '0.04em' }}>{e.verb}</div>
                  <div style={{ color: '#fff' }}>{e.entity}</div>
                  <div>
                    <span style={{ color: 'rgba(255,255,255,0.5)' }}>{e.from}</span>
                    <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px' }}>→</span>
                    <span style={{ color: '#fff', background: 'rgba(255,255,255,0.07)', padding: '1px 6px', borderRadius: 3 }}>{e.to}</span>
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.6)' }}>{e.impact}</div>
                </div>
              ))}
            </div>

            <div style={{
              padding: '12px 20px', fontSize: 11, color: 'rgba(255,255,255,0.4)',
              borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 24, fontFamily: 'var(--font-mono)',
            }}>
              <span>● append-only</span>
              <span>● cryptographically ordered</span>
              <span>● replayable to any point in time</span>
              <span>● regulator-ready</span>
            </div>
          </div>
        </Reveal>

        {/* What this gives you - expanded benefits */}
        <Reveal>
          <div style={{
            marginTop: 56,
            background: 'linear-gradient(135deg, rgba(74,123,247,0.08) 0%, rgba(124,58,237,0.06) 100%)',
            border: '1px solid rgba(74,123,247,0.22)',
            borderRadius: 16,
            padding: '44px 40px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--sg-blue)', marginBottom: 14 }}>WHAT THIS GIVES YOU</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 38, fontWeight: 700, color: '#fff', margin: '0 0 14px', letterSpacing: '-0.02em', lineHeight: 1.12 }}>
              Time travel for your business.
            </h3>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.78)', lineHeight: 1.6, maxWidth: 720, margin: '0 auto' }}>
              Pick any moment in your factory{'’'}s past - March 14th at 3:42 PM, last Tuesday morning, the day before that big dispatch - and see exactly what was true. Who approved what. Where the order was. What inventory you had. The system replays it for you, with the names and the timestamps still attached.
            </p>
          </div>
        </Reveal>

        <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {[
            {
              icon: '⟳',
              t: 'Replay any day, any hour.',
              p: '“Why was the Wednesday dispatch held?” Open the day. Watch the events in order. The reason is in the log - with the name, the time, and what changed because of it.',
            },
            {
              icon: '⚖',
              t: 'Disputes resolved by the system.',
              p: 'Vendor says 500 sheets. Log says 450, received by Mike, 11:46 AM Tuesday. No more “let me check with the team.” The argument is over before it starts.',
            },
            {
              icon: '✓',
              t: 'Audit-ready, by default.',
              p: 'GST notice. ESI inspection. Buyer audit. You don’t scramble to assemble proof - every event already has a timestamp and a name on it. Filter, export, send.',
            },
            {
              icon: '↺',
              t: 'Mistakes are reversible, never hidden.',
              p: 'Wrong approval? Wrong receipt? Issue a corrective event. The original is still there, the correction is recorded next to it. Nothing is overwritten, nothing is lost.',
            },
            {
              icon: '∞',
              t: 'One source of truth, forever.',
              p: 'Inventory, AR, AP, production status - all computed from the same log, in real time. No nightly reconciliation, no “the report says X but the WhatsApp says Y.”',
            },
            {
              icon: '◆',
              t: 'Trust without supervision.',
              p: 'Every action carries a name. Edits, approvals, cancellations - all visible to you, not just to the person who did it. You stop being the bottleneck for trust.',
            },
          ].map((x, i) => (
            <Reveal key={i} delay={i * 70}>
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12,
                padding: '24px 26px',
                height: '100%',
                display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: 'rgba(74,123,247,0.16)',
                  color: 'var(--sg-blue)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, fontWeight: 700,
                }}>{x.icon}</div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, color: '#fff', margin: '4px 0 0', letterSpacing: '-0.01em' }}>{x.t}</h4>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, margin: 0 }}>{x.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes sgLedgerIn {
          from { opacity: 0; transform: translateY(-8px); background: rgba(74,123,247,0.08); }
          to   { opacity: 1; transform: translateY(0);    background: transparent; }
        }
        .ledger-row:hover { background: rgba(255,255,255,0.02); }
      `}</style>
    </section>
  );
}
window.EventsLedger = EventsLedger;

// ----- Architecture explainer (DDD + Event Sourcing) -----
function ArchitectureNew() {
  return (
    <section className="section" id="architecture" style={{ background: '#fff' }}>
      <div className="container">
        <Reveal>
          <div className="tag" style={{ color: 'var(--sg-purple)' }}>UNDER THE HOOD</div>
          <h2 className="h2 ink" style={{ maxWidth: 900, color: 'var(--fg1)' }}>
            Domain-Driven Design <span style={{ color: 'var(--fg3)', fontWeight: 400 }}>×</span> Event Sourcing.
          </h2>
          <p className="lead" style={{ maxWidth: 820 }}>
            Most ERPs are CRUD apps wearing a suit - tables, forms, overwrites. SimpleGrid is built on two ideas the software industry has known for fifteen years but almost no business platform has dared to ship at the core: model the business as <strong>domains</strong>, and store change as <strong>events</strong>. The result is a system that bends to your business instead of the other way around.
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 40 }}>
          <Reveal>
            <div style={{
              border: '1px solid var(--border)', borderRadius: 12, padding: 32, height: '100%',
              borderLeft: '4px solid var(--sg-purple)',
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: 'var(--sg-purple)', marginBottom: 8 }}>DOMAIN-DRIVEN DESIGN</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, margin: '0 0 14px', color: 'var(--fg1)', letterSpacing: '-0.015em' }}>
                Your business has a language. The system speaks it.
              </h3>
              <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.7, margin: '0 0 14px' }}>
                A "Job Order" in your factory is not the same thing as a "Work Order" in someone else's. A "rejection" in fabric is different from a "rejection" in plywood. Generic ERPs flatten that - every customer fits the same forms.
              </p>
              <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.7, margin: 0 }}>
                We build a model of <em>your</em> domain - your entities, your transitions, your rules - and the platform generates a system around it. The vocabulary on every screen is yours, because the model underneath is yours.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{
              border: '1px solid var(--border)', borderRadius: 12, padding: 32, height: '100%',
              borderLeft: '4px solid var(--sg-blue)',
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: 'var(--sg-blue)', marginBottom: 8 }}>EVENT SOURCING</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, margin: '0 0 14px', color: 'var(--fg1)', letterSpacing: '-0.015em' }}>
                The log is the database. The state is a projection.
              </h3>
              <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.7, margin: '0 0 14px' }}>
                Instead of storing the current row and losing the past, we store every event that ever changed your business. Inventory is not a number - it's the sum of every receipt and issuance. An order's status is not a flag - it's the latest state in a chain of recorded transitions.
              </p>
              <p style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.7, margin: 0 }}>
                Banks have run on this idea for centuries - a ledger, never erased. Almost no ERP does. We do.
              </p>
            </div>
          </Reveal>
        </div>

        {/* The "why this matters" outcome row */}
        <div style={{ marginTop: 40, padding: 32, background: 'var(--sg-off-white)', border: '1px solid var(--border)', borderRadius: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg3)', marginBottom: 18 }}>What this combination unlocks</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[
              { t: '7-day deploys', p: 'New domain → new system, generated from configuration. No new codebase per customer.' },
              { t: 'Audit by design', p: 'You don\'t add audit logs. The audit is the system. Every regulator question already has an answer.' },
              { t: 'Rules without releases', p: 'Change a rule, the system changes. No deploy cycle. No IT ticket. No version migration.' },
              { t: 'Disputes resolved', p: 'Vendor said 500. Log says 450, by Mike, 4:13 PM Tuesday. Argument over.' },
            ].map((x, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 700, color: 'var(--fg1)', marginBottom: 6 }}>{x.t}</div>
                <div style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.6 }}>{x.p}</div>
              </div>
            ))}
          </div>
        </div>

        {/* The honest line */}
        <Reveal delay={200}>
          <div style={{ marginTop: 40, padding: '24px 0', borderTop: '1px solid var(--border)' }}>
            <p style={{ fontSize: 15, color: 'var(--fg2)', lineHeight: 1.7, maxWidth: 860, margin: 0, fontStyle: 'italic' }}>
              "This is not AI. AI is the surface. Underneath is an architecture so unusual that even seasoned engineers ask us to draw it twice. Most ERPs are 1990s thinking dressed in 2020s UI. SimpleGrid is what an enterprise system looks like if you started today, with what we now know."
            </p>
            <p style={{ fontSize: 13, color: 'var(--fg3)', marginTop: 10 }}>- Mukund Agarwal, founder · operator first, technologist second</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
window.ArchitectureNew = ArchitectureNew;

// ----- Fogg-aligned hero, motivation, ability, trigger sections -----

function ProductHeroNew() {
  return (
    <section className="section section-dark" style={{ paddingTop: 88, paddingBottom: 64, position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(74,123,247,0.18), transparent 50%), radial-gradient(circle at 20% 80%, rgba(124,58,237,0.12), transparent 50%)',
      }}></div>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="tag" style={{ color: 'rgba(255,255,255,0.5)' }}>THE PRODUCT</div>
        <h1 className="h1" style={{ color: '#fff', maxWidth: 980, fontSize: 48, lineHeight: 1.1 }}>
          Stop running your factory on WhatsApp groups and Excel sheets.
        </h1>
        <p className="lead" style={{ color: 'rgba(255,255,255,0.78)', maxWidth: 760, marginTop: 18 }}>
          You know how it goes. Fourteen WhatsApp groups, six Excel spreadsheets, an approval stuck on somebody's phone, a dispatch nobody can confirm went out, and a buyer calling about an order you can't find. SimpleGrid is one system for all of it - built the way your team already works.
        </p>
        <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="https://cal.com/simplegrid-ai" target="_blank" rel="noopener" className="btn btn-lg btn-primary">Book a Call</a>
        </div>
        <div style={{ marginTop: 36, display: 'flex', gap: 32, flexWrap: 'wrap', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
          <span>● 7-day deployment</span>
          <span>● No commitment</span>
          <span>● Founder runs your onboarding</span>
        </div>
      </div>
    </section>
  );
}
window.ProductHeroNew = ProductHeroNew;

// MOTIVATION - operator pain, in operator voice
function MotivationSection() {
  const pains = [
    { day: 'Monday 9:14 AM', q: 'How much did we ship last week?',  a: 'Three people, two spreadsheets, an hour of guessing.' },
    { day: 'Tuesday 2:33 PM', q: 'Why is this PO higher than quoted?', a: 'Someone edited the row. No one knows who. The chat scrolled past it.' },
    { day: 'Wednesday 6:41 PM', q: 'Did the QC reject for HACO go back to the contractor?', a: 'Probably. Maybe. Let me check tomorrow.' },
    { day: 'Friday 8:52 PM', q: 'What is our cash position by buyer?', a: 'Tally export, two pivots, and a prayer.' },
  ];
  return (
    <section className="section" style={{ background: 'var(--sg-off-white)' }}>
      <div className="container">
        <Reveal>
          <div className="tag">THE WEEK YOU{'\u2019'}RE HAVING</div>
          <h2 className="h2 ink" style={{ maxWidth: 880 }}>
            You don{'\u2019'}t need more data. You need to stop losing it.
          </h2>
          <p className="lead" style={{ maxWidth: 820 }}>
            The questions that matter at 9 PM on a Friday don{'\u2019'}t need a dashboard. They need a system that already knew the answer the moment it happened.
          </p>
        </Reveal>
        <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {pains.map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{
                background: '#fff', border: '1px solid var(--border)', borderRadius: 10,
                padding: 22, display: 'grid', gridTemplateColumns: '140px 1fr', gap: 18, alignItems: 'start',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg3)', letterSpacing: '0.04em', paddingTop: 2 }}>{p.day}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg1)', marginBottom: 6 }}>{p.q}</div>
                  <div style={{ fontSize: 13, color: 'var(--sg-red)' }}>{p.a}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Or, you have Hank - interactive AI chatbot demo */}
        <div style={{ marginTop: 72, textAlign: 'center' }}>
          <Reveal>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '6px 14px', borderRadius: 999,
              background: '#fff', border: '1px solid var(--border)',
              fontSize: 11, fontWeight: 700, color: 'var(--fg2)', letterSpacing: '0.14em', textTransform: 'uppercase',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }}></span>
              Or, you have Hank
            </div>
          </Reveal>
        </div>
        <Reveal delay={100}>
          <div style={{ marginTop: 18, maxWidth: 760, marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 700, color: 'var(--fg1)', margin: '0 0 12px', letterSpacing: '-0.015em', lineHeight: 1.18 }}>
              Meet Hank - your AI chatbot for the shop floor.
            </h3>
            <p style={{ fontSize: 15, color: 'var(--fg2)', lineHeight: 1.65, margin: 0, maxWidth: 660, marginLeft: 'auto', marginRight: 'auto' }}>
              Hank doesn{'’'}t guess. He reads the events ledger. Ask him the same questions that ruin your Friday night, and he answers in seconds - with the timestamp, the person, and the number behind every fact.
            </p>
          </div>
        </Reveal>
        <Reveal delay={180}>
          <div style={{ marginTop: 28, maxWidth: 780, marginLeft: 'auto', marginRight: 'auto' }}>
            <HankChat />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
window.MotivationSection = MotivationSection;

// Hank - interactive AI chatbot answering the same Friday-night questions,
// from the events ledger.
function HankChat() {
  const conversation = [
    { role: 'user', day: 'Monday 9:14 AM', text: 'Hank, how much did we ship last week?' },
    { role: 'hank', body: [
      { line: 'Mar 31 – Apr 6: ', strong: '47 dispatches · ₹ 3.8 Cr invoiced.' },
      { line: 'Top buyer: ', strong: 'HACO', after: ' - 12 dispatches, ₹ 92 L.' },
      { line: '2 disputes pending: INV-2207, INV-2189.' },
    ], cta: 'See the dispatch log →' },
    { role: 'user', day: 'Tuesday 2:33 PM', text: 'Why is PO-4521 higher than what we quoted?' },
    { role: 'hank', body: [
      { line: 'Edited ', strong: 'Tue 4:13 PM by Mike (Floor).' },
      { line: '₹ 12.8 L → ', strong: '₹ 14.2 L', after: '.' },
      { line: 'Reason logged: “rate revision per vendor email, Mar 18.”' },
    ], cta: 'Open the audit trail →' },
    { role: 'user', day: 'Wednesday 6:41 PM', text: 'Did the QC reject for HACO go back to the contractor?' },
    { role: 'hank', body: [
      { line: 'Yes. ', strong: 'Batch B-7710', after: ' - 12 pcs, rejected by Raj at 11:46:44.' },
      { line: 'Auto-routed to Sunrise Steel (same contractor).' },
      { line: 'Replacement ETA: Apr 27 · cost recovery: ₹ 1.4 L claimed.' },
    ] },
    { role: 'user', day: 'Friday 8:52 PM', text: 'What’s our cash position by buyer?' },
    { role: 'hank', body: [
      { line: 'As of 11:48 AM today:' },
      { line: '· HACO: ', strong: '₹ 1.2 Cr', after: ' receivable (PDC Apr 18)' },
      { line: '· Apex Mfg: ', strong: '₹ 84 L', after: ' - overdue 3 days, flagged' },
      { line: '· Elite Motors: ', strong: '₹ 56 L', after: ' current' },
      { line: 'Total AR: ', strong: '₹ 4.6 Cr · DSO 42 days.' },
    ] },
  ];

  const ref = React.useRef(null);
  const scrollRef = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [typing, setTyping] = React.useState(false);

  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    if (!inView) return;
    if (step >= conversation.length) return;
    const next = conversation[step];
    if (next.role === 'hank' && !typing) {
      const t = setTimeout(() => setTyping(true), 380);
      return () => clearTimeout(t);
    }
    if (next.role === 'hank' && typing) {
      const t = setTimeout(() => { setTyping(false); setStep(s => s + 1); }, 1100);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep(s => s + 1), step === 0 ? 300 : 1200);
    return () => clearTimeout(t);
  }, [inView, step, typing]);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [step, typing]);

  const visible = conversation.slice(0, step);
  const showingTyping = typing && step < conversation.length && conversation[step].role === 'hank';
  const done = step >= conversation.length;

  const replay = () => { setTyping(false); setStep(0); };

  return (
    <div ref={ref} style={{
      background: '#fff', border: '1px solid var(--border)', borderRadius: 14,
      overflow: 'hidden', boxShadow: '0 18px 48px rgba(15,23,42,0.08)',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '14px 18px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--sg-off-white)',
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--sg-blue) 0%, var(--sg-purple) 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 15,
          boxShadow: '0 4px 12px rgba(74,123,247,0.25)',
        }}>H</div>
        <div>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 14, color: 'var(--fg1)', display: 'flex', alignItems: 'center', gap: 8 }}>
            Hank
            <span style={{
              fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--sg-blue)', background: 'rgba(74,123,247,0.12)',
              padding: '2px 6px', borderRadius: 999,
            }}>AI</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--fg3)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 0 3px rgba(16,185,129,0.18)' }}></span>
            online · reads from the events ledger
          </div>
        </div>
        <button onClick={replay} disabled={!done} style={{
          marginLeft: 'auto',
          background: done ? 'var(--sg-blue)' : 'transparent',
          border: done ? 'none' : '1px solid var(--border)',
          color: done ? '#fff' : 'var(--fg3)',
          fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
          padding: '6px 11px', borderRadius: 4,
          cursor: done ? 'pointer' : 'default',
          fontFamily: 'var(--font-body)',
          opacity: done ? 1 : 0.55,
        }}>{done ? '⟲ Replay' : 'Live'}</button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{
        padding: '20px 22px',
        height: 460, overflowY: 'auto',
        display: 'flex', flexDirection: 'column', gap: 14,
        background: '#fff',
      }}>
        {visible.map((m, i) => <HankBubble key={i} message={m} />)}
        {showingTyping && <HankTyping />}
      </div>

      {/* Input bar (visual only) */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 16px',
        borderTop: '1px solid var(--border)',
        background: 'var(--sg-off-white)',
      }}>
        <div style={{
          flex: 1,
          background: '#fff', border: '1px solid var(--border)', borderRadius: 8,
          padding: '10px 12px', fontSize: 13, color: 'var(--fg3)', fontFamily: 'var(--font-body)',
        }}>
          Ask Hank anything{'…'}
        </div>
        <button style={{
          background: 'var(--sg-blue)', color: '#fff',
          border: 'none', borderRadius: 8, padding: '10px 16px',
          fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)',
        }}>Send</button>
      </div>

      <style>{`
        @keyframes sgChatIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sgTypingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
          30%           { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
window.HankChat = HankChat;

function HankBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: isUser ? 'flex-end' : 'flex-start',
      animation: 'sgChatIn 0.35s cubic-bezier(0.2,0.8,0.2,1) both',
    }}>
      {message.day && (
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10,
          color: 'var(--fg3)', letterSpacing: '0.06em',
          margin: isUser ? '0 6px 4px 0' : '0 0 4px 6px',
        }}>{message.day}</div>
      )}
      <div style={{
        maxWidth: '82%',
        background: isUser ? 'var(--sg-blue)' : 'var(--sg-off-white)',
        color: isUser ? '#fff' : 'var(--fg1)',
        border: isUser ? 'none' : '1px solid var(--border)',
        borderRadius: 14,
        borderTopLeftRadius: isUser ? 14 : 4,
        borderTopRightRadius: isUser ? 4 : 14,
        padding: '11px 15px',
        fontSize: 14, lineHeight: 1.55,
      }}>
        {isUser ? (
          message.text
        ) : (
          <>
            {message.body.map((b, i) => (
              <div key={i} style={{ marginBottom: i < message.body.length - 1 ? 4 : 0 }}>
                {b.line}
                {b.strong && <strong style={{ color: 'var(--fg1)', fontWeight: 700 }}>{b.strong}</strong>}
                {b.after}
              </div>
            ))}
            {message.cta && (
              <a href="#ledger" style={{
                display: 'inline-block', marginTop: 10,
                fontSize: 12, fontWeight: 600, color: 'var(--sg-blue)',
                textDecoration: 'none',
              }}>{message.cta}</a>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function HankTyping() {
  return (
    <div style={{
      display: 'flex', justifyContent: 'flex-start',
      animation: 'sgChatIn 0.3s ease-out both',
    }}>
      <div style={{
        background: 'var(--sg-off-white)', border: '1px solid var(--border)',
        borderRadius: 14, borderTopLeftRadius: 4,
        padding: '14px 18px', display: 'flex', gap: 5, alignItems: 'center',
      }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: 6, height: 6, borderRadius: '50%', background: 'var(--fg3)',
            display: 'inline-block',
            animation: `sgTypingDot 1.2s ${i * 0.18}s infinite ease-in-out`,
          }}></span>
        ))}
      </div>
    </div>
  );
}

// ABILITY - make adoption stupid easy
function AbilitySection() {
  const lines = [
    { type: 'prompt',   text: '> received 200 sheets 16-gauge from Midwest, PO-4521' },
    { type: 'response', text: '✓ Matched to PO-4521.\n  Inventory +200 · AP +₹14.2L\n  Reorder rule R-204 paused.\n  Logged at 11:46:05 by Hank.' },
  ];
  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container">
        <Reveal>
          <div className="tag">FOR THE PEOPLE WHO ACTUALLY DO THE WORK</div>
          <h2 className="h2 ink" style={{ maxWidth: 900 }}>
            If your warehouse manager can send a WhatsApp, he can run your ERP.
          </h2>
          <p className="lead" style={{ maxWidth: 820 }}>
            Adoption is where ERPs go to die. We removed the menus, the codes, the training manual. Your team types what happened. The system does the seven steps.
          </p>
        </Reveal>

        <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 36, alignItems: 'center' }}>
          <Reveal>
            <TypingDemo lines={lines} />
          </Reveal>
          <Reveal delay={120}>
            <div>
              <div style={{ display: 'grid', gap: 18 }}>
                {[
                  { t: 'No training day', p: 'Day one, your floor is logging in. The interface is a sentence.' },
                  { t: 'No menus to memorise', p: 'No SKU codes, no transaction codes, no eight-tab forms. The model knows what you mean.' },
                  { t: 'No data lost in WhatsApp', p: 'Every "received this," "approved that," "QC rejected" becomes a permanent event with a name and a timestamp.' },
                ].map((x, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: 14, alignItems: 'start' }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--sg-blue-light)', color: 'var(--sg-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, marginTop: 2 }}>{i + 1}</div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: 17, fontWeight: 700, color: 'var(--fg1)', marginBottom: 4 }}>{x.t}</div>
                      <div style={{ fontSize: 14, color: 'var(--fg2)', lineHeight: 1.6 }}>{x.p}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
window.AbilitySection = AbilitySection;

// TRIGGER - final CTA, friction-free
function TriggerCTA() {
  return (
    <section className="section section-dark final-cta" style={{ paddingTop: 80, paddingBottom: 88 }}>
      <div className="container">
        <Reveal>
          <div className="tag" style={{ color: 'rgba(255,255,255,0.5)' }}>THE ONLY DECISION YOU NEED TO MAKE THIS WEEK</div>
          <h2 className="h2" style={{ color: '#fff', maxWidth: 880 }}>
            Spend 30 minutes with us. Run it for 30 days. Keep it if it works.
          </h2>
          <p className="sub" style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 760 }}>
            We deploy at our cost. Your team uses it on real orders. If by day 30 you don{'\u2019'}t feel the difference, you walk away - and we{'\u2019'}ve still done the migration work.
          </p>
          <div style={{ marginTop: 26, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="https://cal.com/simplegrid-ai" target="_blank" rel="noopener" className="btn btn-lg btn-primary">Book a call - it's free</a>
            <a href="hiring.html" className="btn btn-lg btn-ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.25)' }}>Or come build it with us →</a>
          </div>
          <p className="note" style={{ color: 'rgba(255,255,255,0.5)' }}>Founder-led onboarding · Migration included · No commitment</p>
        </Reveal>
      </div>
    </section>
  );
}
window.TriggerCTA = TriggerCTA;
