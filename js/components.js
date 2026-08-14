/* ==========================================================================
   SimpleGrid — shared chrome as custom elements.

   Any page can drop in <sg-header></sg-header> / <sg-footer></sg-footer>.
   No build step and no fetch: works over http:// and file:// alike, so the
   Live Server preview and GitHub Pages behave identically.

   Markup is authored as static string literals and parsed with DOMParser,
   which never executes scripts. No user input reaches this file.
   ========================================================================== */

(function () {
  'use strict';

  /** Parse an author-controlled markup literal into a detached fragment. */
  function frag(markup) {
    var parsed = new DOMParser().parseFromString('<body>' + markup + '</body>', 'text/html');
    var out = document.createDocumentFragment();
    while (parsed.body.firstChild) out.appendChild(parsed.body.firstChild);
    return out;
  }

  /* The logo lockup is inlined rather than <img>-referenced for two reasons:
     it inherits currentColor (black on light, #FAFAFA on dark, per guidelines
     p.005), and the Merriweather wordmark resolves against the page's loaded
     webfont — an external SVG would fall back to a system serif. */
  var LOGO = [
    '<svg viewBox="0 0 232 44" role="img" aria-label="SimpleGrid" focusable="false">',
      '<g fill="none" stroke="currentColor">',
        '<rect x="3.2" y="7.2" width="31.6" height="31.6" rx="6" stroke-width="2.4"/>',
        '<path d="M13.7 7.2v31.6M24.3 7.2v31.6M3.2 17.7h31.6M3.2 28.3h31.6" stroke-width="2"/>',
      '</g>',
      '<text x="47" y="36" fill="currentColor" font-family="Merriweather, Georgia, serif"',
        ' font-size="30" font-weight="700" letter-spacing="-0.4">SimpleGrid</text>',
    '</svg>'
  ].join('');

  var CARET = '<svg class="nav__caret" viewBox="0 0 12 12" aria-hidden="true" focusable="false">' +
    '<path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.6" ' +
    'stroke-linecap="round" stroke-linejoin="round"/></svg>';


  var NAV = [
    { label: 'Product',   href: 'product.html', caret: false },
    { label: 'Pricing',   href: 'pricing.html', caret: false },
    /* Two columns: the seats on the by-role page, and the head-to-heads. */
    { label: 'Solutions', caret: true, columns: [
      { title: 'By role', items: [
        { label: 'Owner / MD',     href: 'role-owner-md.html' },
        { label: 'COO / Ops head', href: 'role-coo-ops.html' },
        { label: 'CFO / Finance',  href: 'role-cfo-finance.html' },
        { label: 'Sales head',     href: 'role-sales-head.html' },
        { label: 'Plant manager',  href: 'role-plant-manager.html' },
        { label: 'CIO / Systems',  href: 'role-cio.html' }
      ] },
      { title: 'Competitors', items: [
        { label: 'SAP',                     href: 'competitors/sap-business-one/' },
        { label: 'NetSuite',                href: 'competitors/netsuite/' },
        { label: 'Microsoft Dynamics 365',  href: 'competitors/dynamics-365/' },
        { label: 'Acumatica',               href: 'competitors/acumatica/' },
        { label: 'Odoo',                    href: 'competitors/odoo/' },
        { label: 'Infor',                   href: 'competitors/infor/' },
        { label: 'DOSS',                    href: 'competitors/doss/' }
      ] }
    ] },
    /* Five audiences, a page each — the label opens the list and goes nowhere
       itself. */
    { label: 'Partners', caret: true, menu: [
      { label: 'Accountants & advisors',  href: 'partners/accountants/' },
      { label: 'QuickBooks ProAdvisors',  href: 'partners/proadvisors/' },
      { label: 'ERP & ops consultants',   href: 'partners/consultants/' },
      { label: 'Private equity',          href: 'partners/private-equity/' },
      { label: 'Become a partner',        href: 'partners/become-a-partner/' }
    ] },
    /* Menu only — the label opens the list and goes nowhere itself. */
    { label: 'Resources', caret: true, menu: [
      { label: 'Case Studies', href: 'case-studies.html' },
      { label: 'Blogs',        href: 'blogs.html' },
      { label: 'Tools',        href: 'tools.html' },
      { label: 'Careers',      href: 'careers.html' }
    ] }
  ];


  /* Small inline marks for the contact rows. Stroke-drawn from currentColor so
     they pick up the link colour and its hover, except LinkedIn — that is the
     official mark (Simple Icons, CC0) and has to keep its own filled shape. */
  var ICON = {
    mail: '<svg class="footer__icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">' +
      '<rect x="1.5" y="3.5" width="13" height="9" rx="1.5" fill="none" stroke="currentColor" ' +
      'stroke-width="1.3"/><path d="m2.5 4.5 5.5 4 5.5-4" fill="none" stroke="currentColor" ' +
      'stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    linkedin: '<svg class="footer__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 ' +
      '0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 ' +
      '4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 ' +
      '2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z' +
      'M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 ' +
      '24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    call: '<svg class="footer__icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">' +
      '<rect x="2" y="3.5" width="12" height="10.5" rx="1.5" fill="none" stroke="currentColor" ' +
      'stroke-width="1.3"/><path d="M2 6.5h12M5.5 2v3M10.5 2v3" fill="none" stroke="currentColor" ' +
      'stroke-width="1.3" stroke-linecap="round"/></svg>',
    place: '<svg class="footer__icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">' +
      '<path d="M8 14.5s5-4.35 5-8a5 5 0 0 0-10 0c0 3.65 5 8 5 8Z" fill="none" stroke="currentColor" ' +
      'stroke-width="1.3" stroke-linejoin="round"/><circle cx="8" cy="6.4" r="1.7" fill="none" ' +
      'stroke="currentColor" stroke-width="1.3"/></svg>'
  };

  /* Every entry points at a page or a section that exists — the footer is a map
     of the site, so a link that goes nowhere is worse than one less link. */
  var FOOTER_COLUMNS = [
    { title: 'Company', links: [
      { label: 'Home',     href: 'index.html' },
      { label: 'Product',  href: 'product.html' },
      { label: 'Syncs',    href: 'syncs.html' },
      { label: 'Pricing',  href: 'pricing.html' },
      { label: 'About Us', href: 'about.html' }
    ] },
    { title: 'Resources', links: [
      { label: 'Case Studies', href: 'case-studies.html' },
      { label: 'Blogs',        href: 'blogs.html' },
      { label: 'Tools',        href: 'tools.html' },
      { label: 'Careers',      href: 'careers.html' }
    ] }
  ];

  /* Carries real destinations, so it is authored as {label, href} rather than
     slugged from the label like the nav columns above. */
  var FOOTER_CONTACT = {
    title: 'Get in touch',
    links: [
      { label: 'hello@simplegrid.ai', href: 'mailto:hello@simplegrid.ai', icon: 'mail' },
      { label: 'LinkedIn',    href: 'https://www.linkedin.com/company/simplegridai', icon: 'linkedin' },
      /* Opened by js/book-demo.js, which matches on the label; the href is
         the fallback for anyone without it. */
      { label: 'Book a call', href: 'pricing.html#demo', icon: 'call' }
    ],
    address: ['2810 N Church St STE 88778', 'Wilmington, DE 19802']
  };

  /* ------------------------------------------------------------------ header */

  class SGHeader extends HTMLElement {
    connectedCallback() {
      /* Compared as paths, not filenames: the competitor pages are directories
         (competitors/netsuite/), so a filename alone would never match them.
         index.html and its directory are the same page, so both reduce to the
         directory — that way "/" and "/index.html" both read as home. */
      function norm(path) {
        return path.split('#')[0].split('?')[0].toLowerCase()
          .replace(/^\.?\//, '')
          .replace(/(^|\/)index\.html$/, '$1');
      }

      var here = norm(location.pathname);

      function isHere(href) { return norm(href) === here; }

      /* A detail page belongs to the listing it came from: a post under blog/
         is still Blogs, a case study is still Case Studies. Without this, every
         one of those pages would show nothing marked in the nav at all. */
      var UNDER = [
        { prefix: 'blog/',  href: 'blogs.html' },
        { prefix: 'tools/', href: 'tools.html' },
        { prefix: 'case-',  href: 'case-studies.html' }
      ];

      /* A section link inside a page (pricing.html#demo) belongs to that page's
         own nav entry, not to the menu it is listed in. */
      function owns(href) {
        if (href.indexOf('#') > -1) return false;
        if (isHere(href)) return true;
        return UNDER.some(function (map) {
          return here.indexOf(map.prefix) === 0 && norm(map.href) === norm(href);
        });
      }

      var links = NAV.map(function (item) {
        /* Two-column mega menu: same open/close behaviour as the simple one,
           only the panel inside it differs. */
        if (item.columns) {
          /* The parent reads as current while any of the pages it lists is
             open, exactly as the simple menu below does. */
          var openHere = item.columns.some(function (col) {
            return col.items.some(function (sub) { return owns(sub.href); });
          });
          var cols = item.columns.map(function (col) {
            var rows = col.items.map(function (sub) {
              return '<a class="nav__row" href="' + sub.href + '"' +
                (owns(sub.href) ? ' aria-current="page"' : '') + '>' + sub.label + '</a>';
            }).join('');
            return '<div class="nav__col">' +
              '<p class="nav__col-title">' + col.title + '</p>' + rows + '</div>';
          }).join('');
          return '<span class="nav__item">' +
            '<button class="nav__link nav__link--menu" type="button"' +
            (openHere ? ' aria-current="page"' : '') +
            ' aria-expanded="false" aria-haspopup="true">' +
            item.label + (item.caret ? CARET : '') + '</button>' +
            '<span class="nav__menu nav__menu--mega">' + cols + '</span></span>';
        }

        if (!item.menu) {
          return '<a class="nav__link" href="' + item.href + '"' +
            (isHere(item.href) ? ' aria-current="page"' : '') + '>' + item.label + '</a>';
        }

        /* The parent is a control, not a destination: it opens the list. It
           still reads as current while one of its own pages is open. */
        var current = item.menu.some(function (sub) { return owns(sub.href); });
        var link = '<button class="nav__link nav__link--menu" type="button"' +
          (current ? ' aria-current="page"' : '') +
          ' aria-expanded="false" aria-haspopup="true">' +
          item.label + (item.caret ? CARET : '') + '</button>';

        var subs = item.menu.map(function (sub) {
          return '<a class="nav__sub" href="' + sub.href + '"' +
            (owns(sub.href) ? ' aria-current="page"' : '') + '>' + sub.label + '</a>';
        }).join('');
        return '<span class="nav__item">' + link +
          '<span class="nav__menu">' + subs + '</span></span>';
      }).join('');

      /* Links and the CTA share one outlined box: no dividers, transparent
         fill, and the CTA as a filled blue block inset at the right end. */
      this.appendChild(frag(
        '<header class="site-header" data-open="false" data-stuck="false">' +
          /* Wide container so the header shares the hero's edges: the nav box
             ends on the hero's right edge, the logo starts on its left. */
          '<div class="container container--wide site-header__inner">' +
            '<a class="logo" href="index.html" aria-label="SimpleGrid home">' + LOGO + '</a>' +
            '<nav class="nav" aria-label="Primary">' + links +
              /* Absolute rather than "#demo": about and resources carry no
                 closing CTA of their own for it to land on. */
              /* The same jump the previous site's "See It" made: straight into the
                 sandbox tenant, no email gate. */
              '<a class="nav__link nav__link--cta" href="https://erp.simplegrid.ai/?sandbox=true" rel="noopener">See it live</a>' +
            '</nav>' +
            '<button class="nav-toggle" type="button" aria-expanded="false" aria-label="Open menu">' +
              '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">' +
                '<path d="M3 6h14M3 10h14M3 14h14" fill="none" stroke="currentColor" ' +
                'stroke-width="1.7" stroke-linecap="round"/></svg>' +
            '</button>' +
          '</div>' +
        '</header>'
      ));

      var header = this.querySelector('.site-header');
      var toggle = this.querySelector('.nav-toggle');

      toggle.addEventListener('click', function () {
        var open = header.getAttribute('data-open') !== 'true';
        header.setAttribute('data-open', String(open));
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        /* The drawer opens on its collections closed, every time. Without
           this, whichever one was opened last stays expanded behind the
           closed drawer and is there again on the next tap. */
        closeAll();
      });

      this.querySelectorAll('.nav a').forEach(function (link) {
        link.addEventListener('click', function () {
          header.setAttribute('data-open', 'false');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.setAttribute('aria-label', 'Open menu');
        });
      });

      /* One source of truth for which menu is open.

         It used to be three: a CSS :hover rule, a CSS :focus-within rule, and
         this data-open attribute, and they could disagree. Clicking a parent
         toggled data-open to false while :hover still held the menu open, so
         the click appeared to do nothing or to snap it shut; and since a
         clicked button keeps focus, :focus-within kept that menu open while
         the pointer moved on to the next one, leaving two panels down at
         once. The CSS now honours data-open alone and every path through
         here sets it, so only one menu can be open at a time. */
      var items = Array.prototype.slice.call(this.querySelectorAll('.nav__item'));

      function open(item) {
        items.forEach(function (other) {
          var on = other === item;
          other.setAttribute('data-open', String(on));
          other.querySelector('.nav__link').setAttribute('aria-expanded', String(on));
        });
      }
      function closeAll() { open(null); }

      /* Below this width the nav is a drawer, and a drawer is not a hover
         surface: hovering a row there would open it and the tap that follows
         would read as "already open" and close it again. */
      var drawer = window.matchMedia('(max-width: 900px)');

      /* Whether the focus about to arrive came from a finger or a keyboard.
         Tapping a <button> focuses it, so focusin fired, opened the menu, and
         then the click saw it already open and shut it — which is why tapping
         a collection appeared to do nothing at all. */
      var fromPointer = false;
      document.addEventListener('pointerdown', function () { fromPointer = true; }, true);
      document.addEventListener('keydown', function () { fromPointer = false; }, true);

      items.forEach(function (item) {
        var parent = item.querySelector('.nav__link');

        item.addEventListener('pointerenter', function (event) {
          if (drawer.matches || event.pointerType === 'touch') return;
          open(item);
        });
        item.addEventListener('pointerleave', function (event) {
          if (drawer.matches || event.pointerType === 'touch') return;
          /* A keyboard user tabbing through keeps their menu; a mouse leaving
             does not, even if the button it clicked still holds focus. */
          if (item.contains(document.activeElement)) document.activeElement.blur();
          item.setAttribute('data-open', 'false');
          parent.setAttribute('aria-expanded', 'false');
        });

        item.addEventListener('focusin', function () {
          if (fromPointer) return;          /* the click below owns that case */
          open(item);
        });
        item.addEventListener('focusout', function (event) {
          if (!item.contains(event.relatedTarget)) {
            item.setAttribute('data-open', 'false');
            parent.setAttribute('aria-expanded', 'false');
          }
        });

        /* The parent goes nowhere on its own, so opening and closing is its
           only job — and with hover and focus kept out of the way above, it
           is a plain toggle however it was pressed. */
        parent.addEventListener('click', function () {
          open(item.getAttribute('data-open') === 'true' ? null : item);
        });
      });

      /* Anywhere else on the page, and Escape, put every menu away. */
      document.addEventListener('pointerdown', function (event) {
        if (!event.target.closest('.nav__item')) closeAll();
      });
      document.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape') return;
        var item = document.activeElement && document.activeElement.closest('.nav__item');
        closeAll();
        if (item) item.querySelector('.nav__link').focus();
      });

      var onScroll = function () {
        header.setAttribute('data-stuck', String(window.scrollY > 8));
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  /* ------------------------------------------------------------------ footer */

  class SGFooter extends HTMLElement {
    connectedCallback() {
      var columns = FOOTER_COLUMNS.map(function (col) {
        var items = col.links.map(function (item) {
          return '<li><a href="' + item.href + '">' + item.label + '</a></li>';
        }).join('');
        return '<div class="footer__col">' +
          '<h2 class="footer__col-title">' + col.title + '</h2>' +
          '<ul class="footer__links">' + items + '</ul>' +
        '</div>';
      }).join('');

      var contactLinks = FOOTER_CONTACT.links.map(function (item) {
        return '<li><a class="footer__contact" href="' + item.href + '">' +
          ICON[item.icon] + '<span>' + item.label + '</span></a></li>';
      }).join('');
      var contact = '<div class="footer__col footer__col--contact">' +
        '<h2 class="footer__col-title">' + FOOTER_CONTACT.title + '</h2>' +
        '<ul class="footer__links">' + contactLinks + '</ul>' +
        '<address class="footer__address">' + ICON.place +
          '<span>' + FOOTER_CONTACT.address.join('<br>') + '</span>' +
        '</address>' +
      '</div>';

      /* The wordmark sits inside the card, behind the columns, rather than
         under it — see .footer__watermark. */
      this.appendChild(frag(
        '<footer class="site-footer">' +
          '<div class="card footer__panel">' +
            '<p class="footer__watermark" aria-hidden="true">SIMPLEGRID</p>' +
            '<div class="container">' +
              '<div class="footer__top">' +
                '<div class="footer__brand">' +
                  '<a class="logo" href="index.html" aria-label="SimpleGrid home">' + LOGO + '</a>' +
                  '<p class="footer__blurb">The Operations Cloud/Adaptive ERP. Built around ' +
                    'your business. Live in 3 weeks or less.</p>' +
                '</div>' +
                columns + contact +
              '</div>' +
              '<div class="footer__bottom">' +
                '<p class="footer__copy">© 2026 SimpleGrid. All rights reserved.</p>' +
                '<span class="footer__legal">' +
                  '<a href="privacy.html">Privacy Policy</a>' +
                  '<a href="terms.html">Terms of Service</a>' +
                '</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</footer>' +
        /* Fixed to the viewport, so it sits outside the footer card even though
           it is authored with it — one place for every page's chrome. */
        '<button class="to-top" type="button" data-to-top hidden aria-label="Back to top">' +
          '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">' +
            '<path d="M8 13V3.5M3.8 7.7 8 3.5l4.2 4.2" fill="none" stroke="currentColor" ' +
            'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '</button>'
      ));

      var toTop = this.querySelector('[data-to-top]');
      var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      /* One viewport down is the point where "back to top" beats scrolling —
           above that the header is still in reach. */
      var onScroll = function () {
        var past = window.scrollY > window.innerHeight * 0.9;
        if (past === !toTop.hidden) return;   /* nothing to do */
        toTop.hidden = !past;
        if (past) {
          /* Reading a layout property flushes the style change above, so the
             fade has a start value to run from. Without it the button would
             appear already at opacity 1. */
          void toTop.offsetHeight;
          toTop.setAttribute('data-show', 'true');
        } else {
          toTop.removeAttribute('data-show');
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      toTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        /* Send focus back to the top of the document, or the keyboard user
           lands where the button was and has to tab the whole page again. */
        var first = document.querySelector('.site-header a, .site-header button');
        if (first) first.focus({ preventScroll: true });
      });
    }
  }

  /* ---------------------------------------------------------------------- */

  if (!customElements.get('sg-header')) customElements.define('sg-header', SGHeader);
  if (!customElements.get('sg-footer')) customElements.define('sg-footer', SGFooter);
})();
