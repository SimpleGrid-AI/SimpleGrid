function RadialBurst({
  palette
}) {
  // A dense 360° splatter of fine rays radiating from the centre, filling the
  // whole band. Tip nodes are small and "blink inward" - each diffuses to zero
  // and swells back on its own slow cycle. Colours come from `palette` (the
  // nature presets in BurstBand) and can change live without re-seeding.
  const DEFAULT = {
    deep: [36, 76, 173],
    bright: [46, 86, 198]
  };
  const pal = palette || DEFAULT;
  const palRef = React.useRef(pal);
  palRef.current = pal;
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrame, resizeTimeout;
    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr();
      canvas.height = rect.height * dpr();
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(dpr(), 0, 0, dpr(), 0, 0);
    };
    resize();
    const W = () => canvas.width / dpr();
    const H = () => canvas.height / dpr();

    // Build the static line set once (and re-seed on resize)
    let lines = [];
    const seed = () => {
      lines = [];
      // Dense splatter; trimmed on phones to hold ~5% CPU.
      const COUNT = typeof window !== 'undefined' && window.innerWidth < 768 ? 130 : 220;
      for (let i = 0; i < COUNT; i++) {
        const a = Math.random() * Math.PI * 2; // full 360°
        const lenRatio = 0.32 + Math.random() * 0.72; // reach toward the corners
        const tone = Math.random();
        const baseAlpha = 0.48 + Math.random() * 0.45; // 0.48-0.93 - a touch denser

        // Breathing oscillation: opacity sways over a 3-6s period
        const phase = Math.random() * Math.PI * 2;
        const period = 3 + Math.random() * 3;
        const freq = Math.PI * 2 / (period * 60);

        // Angle sway: gently rotate this line by ±0.04 rad (~2.3°) over 8-14s
        const swayPhase = Math.random() * Math.PI * 2;
        const swayPeriod = 8 + Math.random() * 6;
        const swayFreq = Math.PI * 2 / (swayPeriod * 60);
        const swayAmp = 0.025 + Math.random() * 0.025; // 0.025-0.05 rad

        // Length sway: lines also extend/contract by ±2% over a slow period
        const lenPhase = Math.random() * Math.PI * 2;
        const lenPeriod = 6 + Math.random() * 6;
        const lenFreq = Math.PI * 2 / (lenPeriod * 60);

        // Node "blink inward": diffuses to ~0 and swells back, each on its own cycle.
        const nodePhase = Math.random() * Math.PI * 2;
        const nodePeriod = 2.4 + Math.random() * 3.4;
        const nodeFreq = Math.PI * 2 / (nodePeriod * 60);
        const lw = 0.7 + Math.random() * 0.7; // fine lines
        const nodeSize = 1.1 + Math.random() * 1.4; // small tips
        lines.push({
          a,
          lenRatio,
          tone,
          baseAlpha,
          phase,
          freq,
          swayPhase,
          swayFreq,
          swayAmp,
          lenPhase,
          lenFreq,
          nodePhase,
          nodeFreq,
          lw,
          nodeSize
        });
      }
    };
    seed();
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resize();
        seed();
      }, 150);
    };
    window.addEventListener('resize', onResize);

    // Ray colour, lerped from the active palette's deep→bright. Read live from
    // palRef so a palette swap recolours the splatter without re-seeding.
    const lerp = (a, b, t) => Math.round(a + (b - a) * t);
    const lineRGBA = (tone, alpha, darken = 1) => {
      const p = palRef.current;
      const r = Math.round(lerp(p.deep[0], p.bright[0], tone) * darken);
      const g = Math.round(lerp(p.deep[1], p.bright[1], tone) * darken);
      const b = Math.round(lerp(p.deep[2], p.bright[2], tone) * darken);
      return `rgba(${r},${g},${b},${alpha})`;
    };

    // Pause loop when canvas scrolls off-screen or the tab is hidden so we don't
    // keep burning CPU drawing 100 lines/frame for nothing.
    let isVisible = true;
    let isTabActive = typeof document !== 'undefined' ? !document.hidden : true;
    const onVisibility = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibility);
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, {
      threshold: 0
    });
    if (canvas) observer.observe(canvas);

    // Start the splatter 5s into its cycle - the first ~5s reads as the burst
    // "growing in"; skipping past it means it opens already settled and dense.
    let frame = 300;
    const draw = () => {
      if (!isVisible || !isTabActive) {
        animFrame = requestAnimationFrame(draw);
        return;
      }
      const w = W(),
        h = H();
      const cx = w / 2;
      const cy = h / 2; // origin at centre - splatter radiates the full 360°
      const reach = Math.sqrt(w * w + h * h) / 2; // far corner
      ctx.clearRect(0, 0, w, h);
      const p = palRef.current;
      lines.forEach(l => {
        // Breathing on opacity (±15% - visible but soft)
        const breath = 0.85 + 0.15 * Math.sin(frame * l.freq + l.phase);
        const alpha = l.baseAlpha * breath;

        // Sway: angle drifts ±swayAmp over the sway period
        const angleNow = l.a + l.swayAmp * Math.sin(frame * l.swayFreq + l.swayPhase);
        const lenMul = 1 + 0.03 * Math.sin(frame * l.lenFreq + l.lenPhase);
        const len = reach * l.lenRatio * lenMul;
        const x = cx + Math.cos(angleNow) * len;
        const y = cy + Math.sin(angleNow) * len;

        // Line: a balanced ray - a soft colour presence at the centre, fullest
        // through the middle, easing back at the tip. Mild darkening near the
        // origin lifts to the full palette colour outward.
        const g = ctx.createLinearGradient(cx, cy, x, y);
        g.addColorStop(0, lineRGBA(l.tone, alpha * 0.32, 0.9));
        g.addColorStop(0.5, lineRGBA(l.tone, alpha * 0.5, 0.95));
        g.addColorStop(1, lineRGBA(l.tone, alpha * 0.55));
        ctx.strokeStyle = g;
        ctx.lineWidth = l.lw;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Tip node blinks inward: diffuses to 0, then swells back to full.
        const pulse = (1 - Math.cos(frame * l.nodeFreq + l.nodePhase)) / 2; // 0..1
        const nodeAlpha = pulse * pulse * 0.65; // moderate - between the bright and dimmed looks
        if (nodeAlpha > 0.01) {
          const nodeRadius = l.nodeSize * (0.15 + 0.85 * pulse);
          ctx.fillStyle = `rgba(${p.bright[0]},${p.bright[1]},${p.bright[2]},${nodeAlpha})`;
          ctx.beginPath();
          ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      frame++;
      animFrame = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
    };
  }, []);

  // Soft radial vignette so the splatter feathers into the section edges.
  const mask = 'radial-gradient(circle at center, #000 58%, rgba(0,0,0,0.25) 100%)';
  // Backdrop: a strong colour core at the centre that eases out to white, so the
  // middle of the burst reads dense and the edges stay light.
  const [bR, bG, bB] = pal.bright;
  // Dark palettes (Night, Space, Moon) stay pitch black - no backdrop glow, so the only
  // colour on screen comes from the rays themselves.
  const backdrop = pal.dark ? 'none' : `radial-gradient(circle at center, rgba(${bR},${bG},${bB},0.34) 0%, rgba(${bR},${bG},${bB},0.18) 18%, rgba(${bR},${bG},${bB},0.06) 42%, rgba(255,255,255,0) 70%)`;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      background: backdrop
    }
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      maskImage: mask,
      WebkitMaskImage: mask
    }
  }));
}
window.RadialBurst = RadialBurst;

// Nature presets for the splatter. `deep`/`bright` are the ray gradient
// endpoints and `bg` is the band background - white for all but the dark
// themes (Night = blue, Space = violet, Moon = silver burst), which go pitch black.
const BURST_PALETTES = [{
  name: 'Ocean',
  deep: [36, 76, 173],
  bright: [46, 86, 198],
  bg: '#fff',
  icon: '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1C7 13 7 11 9.5 11c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1C7 19 7 17 9.5 17c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>'
}, {
  name: 'Sky',
  deep: [14, 116, 200],
  bright: [56, 189, 248],
  bg: '#fff',
  icon: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>'
}, {
  name: 'Lagoon',
  deep: [15, 118, 110],
  bright: [45, 212, 191],
  bg: '#fff',
  icon: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>'
}, {
  name: 'Forest',
  deep: [6, 59, 40],
  bright: [21, 128, 61],
  bg: '#fff',
  icon: '<path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7Z"/><path d="M12 22v-3"/>'
}, {
  name: 'Sunset',
  deep: [194, 65, 12],
  bright: [251, 146, 60],
  bg: '#fff',
  icon: '<path d="M12 10V2"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m16 6-4 4-4-4"/><path d="M16 18a4 4 0 0 0-8 0"/>'
}, {
  name: 'Sunrise',
  deep: [180, 83, 9],
  bright: [251, 191, 36],
  bg: '#fff',
  icon: '<path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m8 6 4-4 4 4"/><path d="M16 18a4 4 0 0 0-8 0"/>'
}, {
  name: 'Mountain',
  deep: [51, 65, 85],
  bright: [148, 163, 184],
  bg: '#fff',
  icon: '<path d="M2 20 C6 12 10 10 13 14 C16 17.5 19 16 22 20 Z" fill="#8B5A2B" stroke="none"/>'
}, {
  name: 'Night',
  deep: [29, 78, 240],
  bright: [80, 150, 255],
  bg: '#000',
  dark: true,
  icon: '<path d="M12 3a6.4 6.4 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M18.5 3.5v3"/><path d="M17 5h3"/>'
}, {
  name: 'Space',
  deep: [88, 28, 135],
  bright: [192, 132, 252],
  bg: '#000',
  dark: true,
  icon: '<circle cx="12" cy="12" r="3"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><path d="M10.4 21.9a10 10 0 0 0 9.941-15.416"/><path d="M13.5 2.1a10 10 0 0 0-9.841 15.416"/>'
}, {
  name: 'Moon',
  deep: [71, 85, 105],
  bright: [203, 213, 225],
  bg: '#000',
  dark: true,
  icon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#FFD23F" stroke="none"/>'
}];

// A small nature icon (waves, pine, sun...) in the palette's own colour, used
// both on the picker button and in each menu row.
function BurstIcon({
  p,
  size
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: `rgb(${p.bright[0]},${p.bright[1]},${p.bright[2]})`,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: {
      flexShrink: 0
    },
    dangerouslySetInnerHTML: {
      __html: p.icon
    }
  });
}

// Standalone burst band between the "Why ERP Keeps Failing" and "Selective
// Onboarding" sections. The splatter fills the whole section; a top-right
// dropdown (default Ocean) recolours it live, each option icon-tagged.
function BurstBand() {
  const [idx, setIdx] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(-1);
  const menuRef = React.useRef(null);
  const pal = BURST_PALETTES[idx];
  React.useEffect(() => {
    if (!open) return;
    const onDoc = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);
  return /*#__PURE__*/React.createElement("section", {
    className: "burst-band",
    style: {
      position: 'relative',
      overflow: 'hidden',
      height: 'calc(85dvh - 52px)',
      minHeight: 'calc(85vh - 52px)',
      background: pal.bg,
      transition: 'background 200ms ease'
    }
  }, /*#__PURE__*/React.createElement(RadialBurst, {
    palette: pal
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    className: "burst-fade-top",
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: '46%',
      background: `linear-gradient(180deg, ${pal.bg} 0%, color-mix(in srgb, ${pal.bg} 85%, transparent) 28%, color-mix(in srgb, ${pal.bg} 40%, transparent) 62%, transparent 100%)`,
      pointerEvents: 'none',
      zIndex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    className: "burst-fade-bottom",
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '46%',
      background: `linear-gradient(0deg, ${pal.bg} 0%, color-mix(in srgb, ${pal.bg} 85%, transparent) 28%, color-mix(in srgb, ${pal.bg} 40%, transparent) 62%, transparent 100%)`,
      pointerEvents: 'none',
      zIndex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    className: "burst-picker",
    style: {
      position: 'absolute',
      top: 18,
      right: 18,
      zIndex: 4
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOpen(o => !o),
    "aria-haspopup": "listbox",
    "aria-expanded": open,
    "aria-label": `Splatter colour: ${pal.name}`,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9,
      padding: '8px 12px',
      borderRadius: 10,
      cursor: 'pointer',
      background: 'rgba(255,255,255,0.82)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      border: '1px solid var(--border)',
      boxShadow: '0 6px 20px rgba(15,20,25,0.08)',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--fg1)'
    }
  }, /*#__PURE__*/React.createElement(BurstIcon, {
    p: pal,
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 60,
      textAlign: 'left'
    }
  }, pal.name), /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: {
      transform: open ? 'rotate(180deg)' : 'none',
      transition: 'transform 160ms'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6"
  }))), open && /*#__PURE__*/React.createElement("ul", {
    role: "listbox",
    "aria-label": "Splatter colour",
    style: {
      position: 'absolute',
      top: 'calc(100% + 6px)',
      right: 0,
      margin: 0,
      padding: 6,
      listStyle: 'none',
      minWidth: 170,
      borderRadius: 12,
      background: 'rgba(255,255,255,0.96)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: '1px solid var(--border)',
      boxShadow: '0 14px 36px rgba(15,20,25,0.16)'
    }
  }, BURST_PALETTES.map((p, i) => /*#__PURE__*/React.createElement("li", {
    key: p.name,
    role: "option",
    "aria-selected": i === idx,
    onClick: () => {
      setIdx(i);
      setOpen(false);
    },
    onMouseEnter: () => setHover(i),
    onMouseLeave: () => setHover(-1),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '8px 10px',
      borderRadius: 8,
      cursor: 'pointer',
      fontSize: 13,
      fontWeight: i === idx ? 700 : 500,
      color: 'var(--fg1)',
      background: i === idx ? 'var(--bg-alt)' : i === hover ? 'rgba(0,0,0,0.04)' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement(BurstIcon, {
    p: p,
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, p.name), i === idx && /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--sg-blue)",
    strokeWidth: "2.6",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6L9 17l-5-5"
  })))))));
}
window.BurstBand = BurstBand;