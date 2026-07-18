/* ============================================================================
   SimpleGrid shared site navigation - SINGLE SOURCE OF TRUTH.

   Every page (static HTML + the React pages) renders its top nav from THIS
   file. To change a nav link, label, or order, edit it HERE once and it
   updates across the whole site. Do not hand-write <header class="nav"> into
   pages any more.

   How a page opts in:
     1. Put an empty placeholder where the nav should go (top of <body>):
          <div id="sg-nav" data-page="home"></div>
        data-page is one of: home | product | solutions | syncs | tools | cases | blog | competitors
        (omit / leave blank on pages that aren't in the nav, e.g. legal pages).
     2. Load this script with the correct relative path for the page's depth:
          <script src="components/site-nav.js" defer></script>        (root page)
          <script src="../../components/site-nav.js" defer></script>  (nested page)
        The link prefix is derived automatically from that src, so links work
        at any folder depth with no per-page editing.

   "Try our ERP" uses [data-sg-try-erp], handled by components/TryErpModal.js
   (already loaded site-wide). Styling comes from styles.css (.nav* classes),
   which every page already loads.
   ========================================================================== */
(function () {
  // --- find this script tag so we can derive the relative path prefix -------
  var me = document.currentScript;
  if (!me) {
    var all = document.getElementsByTagName('script');
    for (var i = all.length - 1; i >= 0; i--) {
      if (/(^|\/)components\/site-nav\.js(\?|$)/.test(all[i].getAttribute('src') || '')) {
        me = all[i];
        break;
      }
    }
  }
  var srcAttr = (me && me.getAttribute('src')) || 'components/site-nav.js';
  // everything before "components/site-nav.js" is the prefix ("", "../", "../../", ...)
  var prefix = srcAttr.replace(/components\/site-nav\.js.*$/, '');

  // --- site-wide aurora theme: the fluid brand-gradient ribbon behind every
  // page (components/site-aurora.js). Loaded from here so all ~88 pages get it
  // at any folder depth with zero per-page wiring. Runs even on pages without
  // a nav mount, so it sits ABOVE the "no #sg-nav" early-return below.
  if (!document.getElementById('sg-aurora-loader')) {
    var auroraScript = document.createElement('script');
    auroraScript.id = 'sg-aurora-loader';
    auroraScript.src = prefix + 'components/site-aurora.js';
    auroraScript.defer = true;
    document.head.appendChild(auroraScript);
  }

  // --- site-wide checks: ONE continuous graph-paper layer behind every page.
  // It sits behind the silk ribbon, runs the full page, and fades out as the
  // footer wordmark approaches so it never collides with the SimpleGrid mark.
  if (!document.getElementById('sg-checks') && document.body) {
    var checksEl = document.createElement('div');
    checksEl.id = 'sg-checks';
    checksEl.setAttribute('aria-hidden', 'true');
    document.body.appendChild(checksEl);
    var checksCss = document.createElement('style');
    checksCss.textContent =
      '#sg-checks{position:fixed;inset:0;z-index:-2;pointer-events:none;' +
      'background-image:linear-gradient(rgba(167,151,117,0.11) 1px,transparent 1px),' +
      'linear-gradient(90deg,rgba(167,151,117,0.11) 1px,transparent 1px);' +
      'background-size:56px 56px;opacity:1;transition:opacity 700ms ease;' +
      'animation:sg-checks-drift 18s linear infinite;}' +
      '@keyframes sg-checks-drift{from{background-position:0 0,0 0}to{background-position:56px 56px,56px 56px}}' +
      '@media (prefers-reduced-motion: reduce){#sg-checks{animation:none}}';
    document.head.appendChild(checksCss);
    if ('IntersectionObserver' in window) {
      var checksIO = new IntersectionObserver(function (entries) {
        for (var ei = 0; ei < entries.length; ei++) {
          checksEl.style.opacity = entries[ei].isIntersecting ? '0' : '1';
        }
      }, { threshold: 0 });
      var checksTarget = null;
      var checksTries = 0;
      var checksTimer = setInterval(function () {
        checksTarget = document.querySelector('.footer-wordmark') || document.querySelector('.footer');
        checksTries++;
        if (checksTarget) { checksIO.observe(checksTarget); clearInterval(checksTimer); }
        else if (checksTries > 16) { clearInterval(checksTimer); }
      }, 500);
    }
  }

  var mount = document.getElementById('sg-nav');
  if (!mount) return;
  var page = mount.getAttribute('data-page') || '';

  var p = function (href) { return prefix + href; };
  var on = function (key) { return page === key ? ' active' : ''; };
  var resourcesActive = (page === 'tools' || page === 'cases' || page === 'blog' || page === 'about' || page === 'competitors' || page === 'careers') ? ' active' : '';

  var chevron =
    '<svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">' +
    '<path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';

  // ---- Rich dropdown items: an icon tile + label + one-liner. Applied to the
  // FIRST layer of every top dropdown only; the nested side flyouts stay plain.
  function ic(inner) {
    return '<svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + '</svg>';
  }
  var ICONS = {
    'why-erp': ic('<path d="M2.5 10S5.5 5 10 5s7.5 5 7.5 5-3 5-7.5 5-7.5-5-7.5-5Z"/><circle cx="10" cy="10" r="2.3"/>'),
    'onboarding': ic('<path d="M3.5 4.5h13l-5 6v5l-3 1.5v-6.5z"/>'),
    'how-it-works': ic('<circle cx="10" cy="10" r="7.5"/><path d="M8.5 7l4.5 3-4.5 3z"/>'),
    'not-an-erp': ic('<path d="M10 2.5l6 2.2v4.5c0 4-2.7 6.8-6 8.3-3.3-1.5-6-4.3-6-8.3V4.7z"/>'),
    'who-its-for': ic('<circle cx="10" cy="10" r="7.5"/><circle cx="10" cy="10" r="3"/>'),
    'case-studies': ic('<path d="M3.5 3v13.5h13"/><path d="M7 13.5v-3.5M11 13.5v-6.5M15 13.5v-5"/>'),
    'founder': ic('<circle cx="10" cy="7" r="3"/><path d="M4.5 16.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/>'),
    'home-faq': ic('<path d="M4 4.5h12v8.5H8.5L5 16.5V13H4z"/>'),
    'hank': ic('<path d="M3.5 16.5V9l4 2.4V9l4 2.4V9l4 2.4v5.1z"/>'),
    'integrations': ic('<path d="M8.3 11.7l-1.8 1.8a2.7 2.7 0 01-3.8-3.8l1.8-1.8M11.7 8.3l1.8-1.8a2.7 2.7 0 013.8 3.8l-1.8 1.8M7.8 12.2l4.4-4.4"/>'),
    'security': ic('<rect x="4.5" y="9" width="11" height="7.5" rx="1.5"/><path d="M7 9V6.5a3 3 0 016 0V9"/>'),
    'ledger': ic('<path d="M4.5 6h2M4.5 10h2M4.5 14h2M8.5 6h7M8.5 10h7M8.5 14h7"/>'),
    'ability': ic('<path d="M5.5 5l8.5 3.4-3.6 1.4-1.4 3.6z"/><path d="M11.5 11.5l3 3"/>'),
    'rules': ic('<path d="M4 7h6M14 7h2M4 13h2M10 13h6"/><circle cx="11.5" cy="7" r="1.6"/><circle cx="8" cy="13" r="1.6"/>'),
    'roles': ic('<rect x="3.5" y="4.5" width="13" height="11" rx="2"/><circle cx="7.5" cy="9.2" r="1.7"/><path d="M5 13c0-1.3 1.1-2.1 2.5-2.1s2.5.8 2.5 2.1"/><path d="M11.5 8.5h3M11.5 11h3"/>'),
    'visibility': ic('<path d="M2.5 10S5.5 5 10 5s7.5 5 7.5 5-3 5-7.5 5-7.5-5-7.5-5Z"/><circle cx="10" cy="10" r="2.3"/>'),
    'planning': ic('<rect x="3.5" y="5" width="13" height="11" rx="1.8"/><path d="M3.5 8.5h13M7 3.5v3M13 3.5v3"/>'),
    'connected': ic('<circle cx="5" cy="10" r="2"/><circle cx="15" cy="5.5" r="2"/><circle cx="15" cy="14.5" r="2"/><path d="M6.8 9l6.4-2.6M6.8 11l6.4 2.6"/>'),
    'costing': ic('<circle cx="10" cy="10" r="7.5"/><path d="M10 5.8v8.4M12.2 7.5c-.5-.8-1.3-1.1-2.2-1.1-1.2 0-2.2.6-2.2 1.7 0 2.3 4.4 1 4.4 3.5 0 1.1-1 1.8-2.2 1.8-1 0-1.9-.4-2.4-1.2"/>'),
    'adoption': ic('<circle cx="7.5" cy="8" r="2.2"/><circle cx="13.8" cy="8" r="1.9"/><path d="M3.5 15.5c0-2.2 1.8-3.6 4-3.6s4 1.4 4 3.6M12.3 11.9c2 0 3.9 1.2 3.9 3.6"/>'),
    'evolve': ic('<path d="M10 3l1.6 4.4L16 9l-4.4 1.6L10 15l-1.6-4.4L4 9l4.4-1.6z"/>'),
    'tools': ic('<rect x="4" y="4" width="5" height="5" rx="1.2"/><rect x="11" y="4" width="5" height="5" rx="1.2"/><rect x="4" y="11" width="5" height="5" rx="1.2"/><rect x="11" y="11" width="5" height="5" rx="1.2"/>'),
    'cases': ic('<path d="M5.5 3.5h6l3.5 3.5v9.5h-9.5z"/><path d="M11.5 3.5V7h3.5M7.5 11h5M7.5 13.5h5"/>'),
    'blog': ic('<path d="M13.4 4.6l2 2-8 8-2.6.6.6-2.6z"/><path d="M12 6l2 2"/>'),
    'about': ic('<circle cx="10" cy="10" r="7.5"/><path d="M10 9.2v4M10 6.4h.01"/>'),
    'competitors': ic('<path d="M10 4v12"/><path d="M4 7h12"/><path d="M4 7l-1.6 3.6h3.2zM16 7l-1.6 3.6h3.2"/><path d="M5 16h10"/>'),
    'careers': ic('<rect x="3.5" y="7" width="13" height="8.5" rx="1.5"/><path d="M7.5 7V5.6A1.6 1.6 0 0 1 9.1 4h1.8A1.6 1.6 0 0 1 12.5 5.6V7"/><path d="M3.5 10.5h13"/>'),
    'scorecard': ic('<rect x="5" y="3.8" width="10" height="12.4" rx="1.5"/><path d="M8 3.8h4v1.8H8z"/><path d="M7.6 9h4.8M7.6 12h4.8"/>'),
    'po': ic('<path d="M5.5 3.5h6l3.5 3.5v9.5h-9.5z"/><path d="M11.5 3.5V7h3.5"/><path d="M7.8 11h4.4M7.8 13.3h3"/>'),
    'gauge': ic('<path d="M3.5 14a6.5 6.5 0 0 1 13 0"/><path d="M10 14l3.2-3.4"/><circle cx="10" cy="14" r="1.1"/>')
  };
  function richItem(href, title, desc, iconKey) {
    return '<a href="' + href + '" class="nav-mi" role="menuitem">' +
      '<span class="nav-mi-ic">' + (ICONS[iconKey] || '') + '</span>' +
      '<span class="nav-mi-tx"><span class="nav-mi-t">' + title + '</span><span class="nav-mi-d">' + desc + '</span></span></a>';
  }
  function richTrigger(href, title, desc, iconKey, cls) {
    return '<a href="' + href + '" class="nav-mi ' + cls + '" aria-haspopup="true">' +
      '<span class="nav-mi-ic">' + (ICONS[iconKey] || '') + '</span>' +
      '<span class="nav-mi-tx"><span class="nav-mi-t">' + title + '</span><span class="nav-mi-d">' + desc + '</span></span>' +
      '<span class="nav-mi-chev">' + chevronRight + '</span></a>';
  }
  // Group items into a DualEntry-style category: an uppercase label + a grid of tiles.
  function byId(list, id) { for (var bi = 0; bi < list.length; bi++) { if (list[bi][0] === id) return list[bi]; } return null; }
  function itemById(list, hrefFn, id) { var s = byId(list, id); return s ? richItem(hrefFn(s[0]), s[1], s[2], s[3]) : ''; }
  function catBlock(label, inner) { return '<div class="nav-cat"><p class="nav-cat-label">' + label + '</p><div class="nav-cat-grid">' + inner + '</div></div>'; }
  function catFromIds(label, list, hrefFn, ids) { var h = ''; for (var ci = 0; ci < ids.length; ci++) { h += itemById(list, hrefFn, ids[ci]); } return catBlock(label, h); }

  // "Home" is a section-jump dropdown on EVERY page: hover (or focus) opens it,
  // and the chevron is always shown. On the home page the links scroll in-page;
  // on other pages they point at index.html#section so they navigate home + land.
  var homeSections = [
    ['why-erp', 'Why ERPs are broken', 'The problems we remove, one by one.', 'why-erp'],
    ['how-it-works', 'How it goes live', 'Your 3 weeks with us, step by step.', 'how-it-works'],
    ['hank', 'Meet Hank', 'The AI assistant your team texts.', 'hank'],
    ['case-studies', 'Case studies', 'Real deployments, real numbers.', 'case-studies']
  ];
  var homeHref = function (id) { return (page === 'home') ? ('#' + id) : (p('index.html') + '#' + id); };
  var homeMenuLinks =
    catFromIds('Why SimpleGrid', homeSections, homeHref, ['why-erp']) +
    catFromIds('See it', homeSections, homeHref, ['how-it-works', 'hank', 'case-studies']);
  var homeNavDesktop =
    '<div class="nav-home">' +
      '<a href="' + p('index.html') + '" class="nav-link' + on('home') + ' nav-home-trigger" aria-haspopup="true">Home ' + chevron + '</a>' +
      '<div class="nav-home-menu" role="menu">' + homeMenuLinks + '</div>' +
    '</div>';
  var homeMobileSub = homeSections.map(function (s) {
    return '<a href="' + homeHref(s[0]) + '" class="nav-mobile-link nav-mobile-sub">' + s[1] + '</a>';
  }).join('');

  // "Product" is also a section-jump dropdown: hover/focus opens it and the
  // trigger still links to product.html. On the product page the links scroll
  // in-page; elsewhere they point at product.html#section so they navigate +
  // land. Section ids live in the product page components (app/product.js).
  // Right-pointing chevron for the nested side-flyout (Syncs with -> Syncs).
  var chevronRight =
    '<svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">' +
    '<path d="M3.5 2L6.5 5L3.5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
  // Syncs (what SimpleGrid connects to) - surfaced as a side flyout under the
  // Product dropdown's "Syncs with" item (no longer its own top-level tab).
  var syncsSections = [
    ['accounting', 'Accounting & books'],
    ['spreadsheets', 'Spreadsheets'],
    ['commerce', 'Sales & e-commerce'],
    ['messaging', 'Messaging & marketing'],
    ['shipping', 'Shipping & logistics'],
    ['data', 'Data & files']
  ];
  var syncsHref = function (id) { return (page === 'syncs') ? ('#' + id) : (p('syncs.html') + '#' + id); };
  var syncsSubMenu = syncsSections.map(function (s) {
    return '<a href="' + syncsHref(s[0]) + '">' + s[1] + '</a>';
  }).join('');
  var productSections = [
    ['hank', 'Meet Hank', 'The AI assistant your team texts.', 'hank'],
    ['integrations', 'Integrations', 'Connects to the tools you run.', 'integrations'],
    ['security', 'Data security', 'Your data, locked down.', 'security'],
    ['rules', 'Your process', 'Built around how you already run.', 'rules'],
    ['ability', 'Your language', 'We use your words - nothing new to learn.', 'adoption']
  ];
  var productHref = function (id) { return (page === 'product') ? ('#' + id) : (p('product.html') + '#' + id); };
  // "Syncs with" is the one item with a nested flyout - render it full-width at
  // the top so its side flyout opens cleanly to the right of the panel.
  var productMenuLinks =
    catBlock('The platform',
      itemById(productSections, productHref, 'hank') +
      richItem(p('syncs.html'), 'Syncs with', 'Connects to the tools you run.', 'integrations')
    ) +
    catFromIds('Configured &amp; adopted', productSections, productHref, ['security', 'rules', 'ability']);
  var productNavDesktop =
    '<div class="nav-product">' +
      '<a href="' + p('product.html') + '" class="nav-link' + on('product') + ' nav-product-trigger" aria-haspopup="true">Platform ' + chevron + '</a>' +
      '<div class="nav-product-menu" role="menu">' + productMenuLinks + '</div>' +
    '</div>';
  var productMobileSub = productSections.map(function (s) {
    if (s[0] === 'integrations') {
      return '<a href="' + p('syncs.html') + '" class="nav-mobile-link nav-mobile-sub">Syncs with</a>';
    }
    return '<a href="' + productHref(s[0]) + '" class="nav-mobile-link nav-mobile-sub">' + s[1] + '</a>';
  }).join('');

  // "Solutions" is a section-jump dropdown over the solutions.html page
  // (organised by operational pain point). Same hover/focus behaviour as
  // Product; section ids live in solutions.html.
  // Order mirrors the on-page section order (the role hub now sits at the top).
  var solutionsSections = [
    ['roles', 'Built for your role', 'See it from your seat.', 'roles'],
    ['built-for-you', 'Built for you', "Nothing your team doesn't need.", 'evolve'],
    ['costing', 'Costing & margins', 'Your formulas. Real margin.', 'costing'],
    ['visibility', 'Real-time visibility', 'Live numbers, on a simple app.', 'visibility'],
    ['planning', 'Planning', 'One live plan, not five spreadsheets.', 'planning'],
    ['pay-before', 'See it before you pay', '$0 up front. 30-day trial.', 'evolve']
  ];
  // The role deep-dive pages were removed - role detail now lives in an in-page
  // popup on solutions.html (#roles). "Built for your role" just jumps there.
  // Use in-page anchors only when literally on solutions.html. The role pages
  // also carry data-page="solutions" (to keep the Solutions tab highlighted),
  // but they don't contain these sections - so their dropdown links must
  // navigate to solutions.html#section instead of a dead in-page #anchor.
  var onSolutionsHtml = /(^|\/)solutions\.html(?:[?#]|$)/.test(location.pathname);
  var solutionsHref = function (id) { return onSolutionsHtml ? ('#' + id) : (p('solutions.html') + '#' + id); };
  // "Built for your role" carries the nested flyout - render it full-width at the
  // top so its side flyout opens cleanly to the right of the panel.
  var solutionsMenuLinks =
    catBlock('By role',
      richItem(solutionsHref('roles'), 'Built for your role', 'See it from your seat.', 'roles')
    ) +
    catFromIds('What we fix', solutionsSections, solutionsHref, ['built-for-you', 'costing', 'visibility', 'planning', 'pay-before']);
  var solutionsNavDesktop =
    '<div class="nav-solutions">' +
      '<a href="' + p('solutions.html') + '" class="nav-link' + on('solutions') + ' nav-solutions-trigger" aria-haspopup="true">Why SimpleGrid ' + chevron + '</a>' +
      '<div class="nav-solutions-menu" role="menu">' + solutionsMenuLinks + '</div>' +
    '</div>';
  var solutionsMobileSub = solutionsSections.map(function (s) {
    return '<a href="' + solutionsHref(s[0]) + '" class="nav-mobile-link nav-mobile-sub">' + s[1] + '</a>';
  }).join('');

  mount.outerHTML =
    '<a href="#main" class="skip-link">Skip to main content</a>' +
    '<header class="nav" role="banner">' +
      '<div class="nav-inner">' +
        '<a class="nav-logo" href="' + p('index.html') + '" aria-label="SimpleGrid home" ' +
          'title="SimpleGrid - The Adaptive ERP. Built around your business.">' +
          '<img src="' + p('assets/simplegrid-logo-horizontal.svg') + '" ' +
            'alt="SimpleGrid - Adaptive ERP and operations cloud logo" width="160" height="32" ' +
            'fetchpriority="high" decoding="async"></a>' +
        '<nav class="nav-links" aria-label="Main navigation">' +
          homeNavDesktop +
          productNavDesktop +
          solutionsNavDesktop +
          '<a href="' + p('pricing.html') + '" class="nav-link' + on('pricing') + '">Pricing</a>' +
          '<div class="nav-resources">' +
            '<button type="button" class="nav-link' + resourcesActive + ' nav-resources-trigger" aria-haspopup="true">Resources ' + chevron + '</button>' +
            '<div class="nav-resources-menu" role="menu">' +
              '<div class="nav-res-cols">' +
                catBlock('Resources',
                  richItem(p('case-studies.html'), 'Case studies', 'Real deployments. Real numbers.', 'cases') +
                  richItem(p('blog.html'), 'Blog', 'Field notes on ERP and ops.', 'blog')
                ) +
                catBlock('About',
                  richItem(p('about.html'), 'About Us', "Operators who've run the floor.", 'about') +
                  richItem(p('competitors.html'), 'Competitors', 'How we compare, honestly.', 'competitors') +
                  richItem(p('hiring.html'), 'Careers', 'Build the Adaptive ERP with us.', 'careers')
                ) +
                '<div class="nav-cat">' +
                  '<p class="nav-cat-label">Tools</p>' +
                  '<div class="nav-cat-grid">' +
                    richItem(p('tools/erp-readiness-scorecard/'), 'ERP Readiness Scorecard', 'Are you ready to switch?', 'scorecard') +
                    richItem(p('tools/erp-needs-assessment/'), 'ERP Needs Assessment', 'Find the right ERP fit.', 'home-faq') +
                    richItem(p('tools/purchase-order-generator/'), 'Purchase Order Generator', 'Clean POs in seconds.', 'po') +
                    richItem(p('tools/oee-calculator/'), 'OEE Calculator', 'Measure equipment effectiveness.', 'gauge') +
                  '</div>' +
                  '<a class="nav-cat-foot" href="' + p('tools/') + '" role="menuitem">View all 35+ tools <span aria-hidden="true">&rarr;</span></a>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</nav>' +
        '<div class="nav-right">' +
          '<button type="button" class="btn btn-sm btn-primary" data-sg-try-erp title="Try a live SimpleGrid setup">See It</button>' +
          '<button type="button" class="nav-burger" aria-label="Open menu" aria-expanded="false" data-sg-burger>' +
            '<span></span><span></span><span></span></button>' +
        '</div>' +
      '</div>' +
    '</header>' +
    '<div class="nav-mobile" data-sg-mobile-menu hidden>' +
      '<nav class="nav-mobile-panel" aria-label="Mobile navigation">' +
        '<a href="' + p('index.html') + '" class="nav-mobile-link' + on('home') + '">Home</a>' +
        homeMobileSub +
        '<a href="' + p('product.html') + '" class="nav-mobile-link' + on('product') + '">Platform</a>' +
        productMobileSub +
        '<a href="' + p('solutions.html') + '" class="nav-mobile-link' + on('solutions') + '">Why SimpleGrid</a>' +
        solutionsMobileSub +
        '<a href="' + p('pricing.html') + '" class="nav-mobile-link' + on('pricing') + '">Pricing</a>' +
        '<div class="nav-mobile-section">Resources</div>' +
        '<a href="' + p('case-studies.html') + '" class="nav-mobile-link nav-mobile-sub' + on('cases') + '">Case studies</a>' +
        '<a href="' + p('blog.html') + '" class="nav-mobile-link nav-mobile-sub' + on('blog') + '">Blog</a>' +
        '<div class="nav-mobile-section">About</div>' +
        '<a href="' + p('about.html') + '" class="nav-mobile-link nav-mobile-sub' + on('about') + '">About Us</a>' +
        '<a href="' + p('competitors.html') + '" class="nav-mobile-link nav-mobile-sub' + on('competitors') + '">Competitors</a>' +
        '<a href="' + p('hiring.html') + '" class="nav-mobile-link nav-mobile-sub' + on('careers') + '">Careers</a>' +
        '<div class="nav-mobile-section">Tools</div>' +
        '<a href="' + p('tools/erp-readiness-scorecard/') + '" class="nav-mobile-link nav-mobile-sub">ERP Readiness Scorecard</a>' +
        '<a href="' + p('tools/erp-needs-assessment/') + '" class="nav-mobile-link nav-mobile-sub">ERP Needs Assessment</a>' +
        '<a href="' + p('tools/purchase-order-generator/') + '" class="nav-mobile-link nav-mobile-sub">Purchase Order Generator</a>' +
        '<a href="' + p('tools/oee-calculator/') + '" class="nav-mobile-link nav-mobile-sub">OEE Calculator</a>' +
        '<a href="' + p('tools/') + '" class="nav-mobile-link nav-mobile-sub' + on('tools') + '">View all 35+ tools &rarr;</a>' +
        '<div class="nav-mobile-sep"></div>' +
        '<a href="#" data-sg-try-erp role="button" class="nav-mobile-link">See It</a>' +
      '</nav>' +
    '</div>';

  // --- mobile hamburger toggle (same behaviour as the old inline script) ----
  var burger = document.querySelector('[data-sg-burger]');
  var menu = document.querySelector('[data-sg-mobile-menu]');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = burger.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open);
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (open) menu.removeAttribute('hidden'); else menu.setAttribute('hidden', '');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.addEventListener('click', function (e) { if (e.target === menu) burger.click(); });
    // Tapping a section-jump link should close the menu so the section is visible.
    var jumpLinks = menu.querySelectorAll('a[href^="#"]');
    for (var jl = 0; jl < jumpLinks.length; jl++) {
      jumpLinks[jl].addEventListener('click', function () {
        if (burger.classList.contains('is-open')) burger.click();
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.classList.contains('is-open')) burger.click();
    });
  }

  // --- Resources dropdown: click the trigger to toggle (open AND close) -----
  // It opens on hover/focus too, but clicking the trigger a second time used to
  // do nothing (hover/focus kept it open). is-shut forcibly closes it; is-open
  // forcibly opens it; both are cleared when the pointer leaves so hover resets.
  var resWrap = document.querySelector('.nav-resources');
  var resTrigger = resWrap && resWrap.querySelector('.nav-resources-trigger');
  var resMenu = resWrap && resWrap.querySelector('.nav-resources-menu');
  if (resWrap && resTrigger && resMenu) {
    var closeRes = function () {
      resWrap.classList.remove('is-open');
      resWrap.classList.add('is-shut');
      resTrigger.setAttribute('aria-expanded', 'false');
      resTrigger.blur();
    };
    var openRes = function () {
      resWrap.classList.remove('is-shut');
      resWrap.classList.add('is-open');
      resTrigger.setAttribute('aria-expanded', 'true');
    };
    resTrigger.setAttribute('aria-expanded', 'false');
    resTrigger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      // getClientRects() is non-empty only when the menu is actually displayed
      // (covers hover-open, focus-open and class-open in one check).
      if (resMenu.getClientRects().length > 0) closeRes(); else openRes();
    });
    // Leaving the trigger area resets the click state so the next hover works.
    resWrap.addEventListener('mouseleave', function () {
      resWrap.classList.remove('is-open');
      resWrap.classList.remove('is-shut');
      resTrigger.setAttribute('aria-expanded', 'false');
    });
    document.addEventListener('click', function (e) {
      if (!resWrap.contains(e.target)) {
        resWrap.classList.remove('is-open');
        resWrap.classList.remove('is-shut');
        resTrigger.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && resWrap.classList.contains('is-open')) closeRes();
    });
  }
})();
