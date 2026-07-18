function PlatformCapabilities() {
  const html =
    '<style>' +
    '.cap-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:36px}' +
    '.cap-tile{display:flex;flex-direction:column;gap:13px;background:#fff;border:1px solid var(--border);border-radius:16px;padding:26px;box-shadow:0 8px 26px rgba(15,23,42,0.04);text-decoration:none;transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease}' +
    '.cap-tile:hover{transform:translateY(-3px);box-shadow:0 16px 40px rgba(15,23,42,0.10);border-color:color-mix(in srgb,var(--sg-blue) 42%,var(--border))}' +
    '.cap-tile:focus-visible{outline:2px solid var(--sg-blue);outline-offset:3px}' +
    '.cap-ico{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:color-mix(in srgb,var(--sg-blue) 9%,#fff);border:1px solid color-mix(in srgb,var(--sg-blue) 22%,transparent)}' +
    '.cap-ico svg{width:22px;height:22px;stroke:var(--sg-blue);fill:none;stroke-width:1.9}' +
    '.cap-h{font-family:var(--font-heading);font-size:19px;font-weight:700;letter-spacing:-0.01em;color:var(--fg1);margin:0}' +
    '.cap-p{font-size:14.5px;line-height:1.6;color:var(--fg2);margin:0}' +
    '.cap-more{margin-top:auto;padding-top:4px;font-size:13px;font-weight:700;color:var(--sg-blue);display:inline-flex;align-items:center;gap:6px}' +
    '.cap-more span{transition:transform .18s ease}' +
    '.cap-tile:hover .cap-more span,.cap-feat:hover .cap-more span{transform:translateX(3px)}' +
    /* featured routing tile */
    '.cap-feat{grid-column:1 / -1;display:grid;grid-template-columns:1.02fr 0.98fr;gap:34px;align-items:center;background:#fff;border:1px solid var(--border);border-radius:18px;padding:32px 34px;box-shadow:0 8px 26px rgba(15,23,42,0.04);text-decoration:none;transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease}' +
    '.cap-feat:hover{transform:translateY(-3px);box-shadow:0 16px 40px rgba(15,23,42,0.10);border-color:color-mix(in srgb,var(--sg-blue) 42%,var(--border))}' +
    '.cap-feat:focus-visible{outline:2px solid var(--sg-blue);outline-offset:3px}' +
    '.cap-feat-body{display:flex;flex-direction:column;gap:13px}' +
    '.cap-feat-tag{font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--sg-blue)}' +
    '.cap-feat-h{font-family:var(--font-heading);font-size:24px;font-weight:700;letter-spacing:-0.02em;color:var(--fg1);margin:0}' +
    '.cap-feat-p{font-size:15px;line-height:1.6;color:var(--fg2);margin:0}' +
    /* mini route visual */
    '.cap-route{background:color-mix(in srgb,var(--sg-blue) 4%,#fbfcfe);border:1px solid var(--border);border-radius:14px;padding:20px}' +
    '.cap-route-lbl{font-size:10.5px;font-weight:700;letter-spacing:0.11em;text-transform:uppercase;color:var(--fg3);margin-bottom:14px}' +
    '.cap-route-row{display:flex;flex-wrap:wrap;align-items:center;gap:7px}' +
    '.cap-chip{font-family:var(--font-mono);font-size:12px;font-weight:700;color:var(--fg1);background:#fff;border:1px solid var(--border);border-radius:9px;padding:6px 9px;display:inline-flex;align-items:center;gap:6px;box-shadow:0 1px 2px rgba(15,23,42,0.04)}' +
    '.cap-grip{color:var(--fg3);letter-spacing:-2px;font-size:11px;line-height:1;cursor:grab}' +
    '.cap-x{color:var(--fg3);font-weight:700;font-size:12px;line-height:1;cursor:pointer}' +
    '.cap-plus{width:20px;height:20px;border-radius:6px;border:1px dashed color-mix(in srgb,var(--sg-blue) 45%,transparent);color:var(--sg-blue);font-weight:700;font-size:13px;display:inline-flex;align-items:center;justify-content:center;line-height:1}' +
    '.cap-route-note{margin:14px 0 0;font-size:12.5px;line-height:1.55;color:var(--fg3)}' +
    '.cap-route-note b{color:var(--sg-blue);font-weight:700}' +
    '@media (max-width:820px){.cap-grid{grid-template-columns:1fr}.cap-feat{grid-template-columns:1fr;gap:24px}}' +
    '</style>' +
    '<div class="tag">CAPABILITIES</div>' +
    '<h2 class="h2 ink" style="max-width:900px">Specific features, built for how you actually run.</h2>' +
    '<p class="lead" style="max-width:820px">Not a generic module list. These are the exact controls inventory-led operations ask us for - each one shaped to your process, your codes, your floor.</p>' +
    '<div class="cap-grid">' +

      /* FEATURED: SKU-based routing */
      '<a href="feature-routing.html" class="cap-feat" data-cta="cap_routing">' +
        '<div class="cap-feat-body">' +
          '<div class="cap-ico"><svg viewBox="0 0 24 24"><circle cx="5" cy="6" r="2.4"/><circle cx="5" cy="18" r="2.4"/><circle cx="19" cy="12" r="2.4"/><path d="M7.4 6H13a3.6 3.6 0 0 1 3.6 3.6V12M7.4 18H13a3.6 3.6 0 0 0 3.6-3.6V12"/></svg></div>' +
          '<div class="cap-feat-tag">Flagship</div>' +
          '<h3 class="cap-feat-h">SKU-based routing</h3>' +
          '<p class="cap-feat-p">Every SKU runs its own route. Insert a stage or an outside service between any two steps, drag to reorder, and the system routes work by the SKU’s own attributes - no two products forced down the same line.</p>' +
          '<div class="cap-more">Learn more <span aria-hidden="true">&rarr;</span></div>' +
        '</div>' +
        '<div class="cap-route">' +
          '<div class="cap-route-lbl">Process route · SKU-0007</div>' +
          '<div class="cap-route-row">' +
            '<span class="cap-plus">+</span>' +
            '<span class="cap-chip"><span class="cap-grip">⠿</span>Assembly<span class="cap-x">&times;</span></span>' +
            '<span class="cap-plus">+</span>' +
            '<span class="cap-chip"><span class="cap-grip">⠿</span>Finishing<span class="cap-x">&times;</span></span>' +
            '<span class="cap-plus">+</span>' +
            '<span class="cap-chip"><span class="cap-grip">⠿</span>Machining<span class="cap-x">&times;</span></span>' +
            '<span class="cap-plus">+</span>' +
            '<span class="cap-chip"><span class="cap-grip">⠿</span>Packaging<span class="cap-x">&times;</span></span>' +
            '<span class="cap-plus">+</span>' +
          '</div>' +
          '<p class="cap-route-note"><b>+</b> inserts a stage or service, <b>&times;</b> removes one, the six dots drag to reorder. Each SKU carries its own route.</p>' +
        '</div>' +
      '</a>' +

      /* Shop-floor visibility */
      '<a href="feature-floor-visibility.html" class="cap-tile" data-cta="cap_floor">' +
        '<div class="cap-ico"><svg viewBox="0 0 24 24"><path d="M3 21V9l6 4V9l6 4V4l6 3v14z"/><circle cx="12" cy="16.5" r="1.3" fill="currentColor" stroke="none"/></svg></div>' +
        '<h3 class="cap-h">Shop-floor visibility</h3>' +
        '<p class="cap-p">See every job, stage and machine in real time. Know what’s running, what’s queued and what’s stuck - without walking the floor to ask.</p>' +
        '<div class="cap-more">Learn more <span aria-hidden="true">&rarr;</span></div>' +
      '</a>' +

      /* Mobile app */
      '<a href="feature-mobile.html" class="cap-tile" data-cta="cap_mobile">' +
        '<div class="cap-ico"><svg viewBox="0 0 24 24"><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M10.5 5.2h3"/><path d="M9.3 12l1.9 1.9 3.5-3.5"/></svg></div>' +
        '<h3 class="cap-h">Mobile app</h3>' +
        '<p class="cap-p">Scan, receive, move stock and update job status straight from the floor. Works on any phone - no scanner terminal, no desktop required.</p>' +
        '<div class="cap-more">Learn more <span aria-hidden="true">&rarr;</span></div>' +
      '</a>' +

      /* Custom batch numbering */
      '<a href="feature-batch-numbering.html" class="cap-tile" data-cta="cap_batch">' +
        '<div class="cap-ico"><svg viewBox="0 0 24 24"><path d="M9 4L7 20M17 4l-2 16M4 9h16M3.5 15h16"/></svg></div>' +
        '<h3 class="cap-h">Custom batch numbering</h3>' +
        '<p class="cap-p">Build SKU and batch codes from your own logic - price code, brand, batch, design, colour, pack, size. One string that carries every attribute your team reads at a glance.</p>' +
        '<div class="cap-more">Learn more <span aria-hidden="true">&rarr;</span></div>' +
      '</a>' +

      /* Custom reports */
      '<a href="feature-reports.html" class="cap-tile" data-cta="cap_reports">' +
        '<div class="cap-ico"><svg viewBox="0 0 24 24"><path d="M4 20V4M4 20h16"/><rect x="7.5" y="12" width="3" height="5"/><rect x="13" y="8" width="3" height="9"/><rect x="18" y="14" width="0.2" height="3"/></svg></div>' +
        '<h3 class="cap-h">Custom reports</h3>' +
        '<p class="cap-p">Build any view your team needs. Filter, group and export by any field across inventory, costing, production and sales - no developer, no ticket.</p>' +
        '<div class="cap-more">Learn more <span aria-hidden="true">&rarr;</span></div>' +
      '</a>' +

    '</div>';
  return (
    <section className="section" id="capabilities" style={{ background: 'rgba(255,255,255,0.4)', paddingTop: 110, paddingBottom: 110 }}>
      <div className="container" dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
}
window.PlatformCapabilities = PlatformCapabilities;
