#!/usr/bin/env python3
"""Draw and install the twelve module icons.

The set is axonometric, on the same projection the hero art uses: the site's
own isometric grid plane, seen from the same corner. Each module is a state of
that plane — bays filled, blocks stacked, a path stepping across it — rather
than a picture of an object, so the marks belong to this product rather than to
an icon library. Every icon carries exactly one lit face, which is the thing
the module acts on.

Nothing here is hand-plotted. Icons are described in grid coordinates and
projected, so all twelve share one geometry and a change to the projection
moves the whole set together.

    python3 scripts/module-icons.py            # rewrite the pages
    python3 scripts/module-icons.py --check    # report, change nothing
    python3 scripts/module-icons.py --dump     # print the markup
"""
import pathlib
import re
import sys

# --------------------------------------------------------------------------
# The projection. x runs right-and-down, y left-and-down, z straight up, which
# is the hero plane's own orientation. Tuned so a 3x3 ground carrying a block
# two high fills the 16-unit box without touching its edges.
AX, AY, AZ = 2.28, 1.3, 2.5
CX, CY = 8.0, 7.25


def p(x, y, z=0.0):
    return (CX + (x - y) * AX, CY + (x + y) * AY - z * AZ)


def fmt(pts, close=True):
    d = 'M' + ' L'.join(f'{a:.2f} {b:.2f}' for a, b in pts)
    return d + ('Z' if close else '')


def block(x, y, z0, z1, w=1.0, d=1.0, lit=False):
    """A box standing on the plane, drawn as three shaded faces rather than as
    an outline. At 22px an outlined cube is three overlapping rhombi and a
    handful of internal edges — it silts up. Filled faces at descending
    strength read as a solid object at any size, and all three come from
    currentColor, so the whole set stays one accent in both themes.

    The lit block is at full strength; everything around it is dimmed, which is
    what carries the emphasis now that nothing is hollow."""
    x1, y1 = x + w, y + d
    t_back, t_right, t_front, t_left = p(x, y, z1), p(x1, y, z1), p(x1, y1, z1), p(x, y1, z1)
    b_right, b_front, b_left = p(x1, y, z0), p(x1, y1, z0), p(x, y1, z0)
    faces = [
        ([t_back, t_right, t_front, t_left], 1.0),      # top, into the light
        ([t_left, t_front, b_front, b_left], 0.58),     # left flank
        ([t_right, t_front, b_front, b_right], 0.34),   # right flank, turned away
    ]
    body = ''.join(f'<path d="{fmt(pts)}" fill="currentColor" fill-opacity="{o}" stroke="none"/>'
                   for pts, o in faces)
    return body if lit else f'<g opacity="0.62">{body}</g>'


def tile(x, y, w=1.0, d=1.0, z=0.0, lit=False):
    """A flat cell lying on the plane."""
    pts = [p(x, y, z), p(x + w, y, z), p(x + w, y + d, z), p(x, y + d, z)]
    o = 1.0 if lit else 0.4
    return f'<path d="{fmt(pts)}" fill="currentColor" fill-opacity="{o}" stroke="none"/>'


def line(points, dashed=False):
    d = fmt([p(*q) for q in points], close=False)
    return f'<path d="{d}"' + (' stroke-dasharray="1.6 1.4"' if dashed else '') + '/>'


def arrow(x0, y0, x1, y1, z=0.0, solid=False):
    """An arrow lying in the plane, so it reads as travel across the floor
    rather than as a flat glyph pasted over it."""
    dx, dy = (x1 - x0), (y1 - y0)
    n = max((dx * dx + dy * dy) ** 0.5, 0.001)
    hx, hy = x1 - dx / n * 0.75, y1 - dy / n * 0.75
    sx, sy = -dy / n, dx / n
    shaft = [p(x0 + sx * 0.16, y0 + sy * 0.16, z), p(hx + sx * 0.16, hy + sy * 0.16, z),
             p(hx - sx * 0.16, hy - sy * 0.16, z), p(x0 - sx * 0.16, y0 - sy * 0.16, z)]
    head = [p(hx + sx * 0.5, hy + sy * 0.5, z), p(x1, y1, z), p(hx - sx * 0.5, hy - sy * 0.5, z)]
    o = 1.0 if solid else 0.55
    return (f'<path d="{fmt(shaft)}" fill="currentColor" fill-opacity="{o}" stroke="none"/>'
            f'<path d="{fmt(head)}" fill="currentColor" fill-opacity="{o}" stroke="none"/>')


# --------------------------------------------------------------------------
# The twelve. Ground runs 0..3 in x and y; z is height in the same unit.
ICONS = {
    # Stock in the bays: two on the floor, one stacked and full.
    'inventory-management':
        block(0, 1.5, 0, 1.0, 1.5, 1.5)
        + block(1.5, 0, 0, 1.0, 1.5, 1.5)
        + block(1.5, 0, 1.0, 2.0, 1.5, 1.5, lit=True),

    # A delivery crossing onto the pad it lands on.
    'procurement':
        arrow(-0.15, 0.15, 0.7, 0.9, solid=True)
        + block(0.9, 0.9, 0, 1.6, 2.05, 2.05, lit=True),

    # A lane of orders; the one at the front is built.
    'planning-sales-order':
        block(0, 1.4, 0, 0.5, 1.4, 1.6)
        + block(1.5, 1.4, 0, 0.5, 1.4, 1.6)
        + block(1.5, 1.4, 0.5, 1.9, 1.4, 1.6, lit=True),

    # Money out across the floor, money back along it.
    # Two parties on the floor and the transfer running between them: out on
    # one line, back on the other.
    'finance':
        block(2.0, 0.95, 0, 1.0, 1.0, 1.1)
        + arrow(1.85, 2.35, 1.15, 2.35)
        + arrow(1.15, 1.6, 1.85, 1.6, solid=True)
        + block(0, 0.95, 0, 1.45, 1.0, 1.1, lit=True),

    # Cost stacked in layers, the last one landed.
    'costing':
        block(0.4, 0.4, 0, 0.7, 2.2, 2.2)
        + block(0.4, 0.4, 0.7, 1.4, 2.2, 2.2)
        + block(0.4, 0.4, 1.4, 2.1, 2.2, 2.2, lit=True),

    # A path stepping across the floor: a built start, an open end.
    'routing':
        block(1.85, 0, 0, 0.42, 1.15, 1.15)
        + block(1.85, 1.85, 0, 0.42, 1.15, 1.15)
        + block(0, 1.85, 0, 0.42, 1.15, 1.15)
        + block(0, 0, 0, 1.5, 1.15, 1.15, lit=True),

    # Two inputs converging into the one thing they make.
    'production':
        block(0, 0, 0, 0.75, 1.05, 1.05)
        + block(0, 2.0, 0, 0.75, 1.05, 1.05)
        + block(1.75, 0.95, 0, 1.9, 1.55, 1.55, lit=True),

    # Linked stations along the chain; the middle one is yours.
    'supply-chain-management':
        block(0, 2.0, 0, 0.8, 1.0, 1.0)
        + block(2.0, 0, 0, 0.8, 1.0, 1.0)
        + block(1.1, 1.1, 0, 1.6, 1.0, 1.0, lit=True),

    # A report: one band lifted clear of the rows.
    'custom-reports':
        tile(0, 0, 3, 0.85, z=0.15)
        + tile(0, 2.15, 3, 0.85, z=0.15)
        + block(0, 1.05, 0.15, 1.15, 3, 0.9, lit=True),

    # Columns standing off the floor, the measured one lit.
    'analytics':
        block(0.1, 2.0, 0, 0.9, 1.0, 1.0)
        + block(1.05, 1.05, 0, 2.25, 1.0, 1.0, lit=True)
        + block(2.0, 0.1, 0, 1.5, 1.0, 1.0),

    # The floor in plan: bays laid out, one station running.
    'floor-operations':
        tile(0, 0, 1.4, 1.4)
        + tile(1.6, 0, 1.4, 1.4)
        + tile(0, 1.6, 1.4, 1.4)
        + block(1.6, 1.6, 0, 1.3, 1.4, 1.4, lit=True),

    # What has been built, and the shape of what is expected.
    'demand-forecast':
        block(0, 2.0, 0, 0.65, 1.0, 1.0)
        + block(1.0, 1.0, 0, 1.5, 1.0, 1.0, lit=True)
        + block(2.0, 0, 0, 2.4, 1.0, 1.0),
}

# --------------------------------------------------------------------------
# The key is whichever of these last appeared before the icon: the button that
# opens a module, the panel it opens, or a card linking to one.
KEY = re.compile(r'data-mod-open="([a-z-]+)"|href="[^"]*#mod-([a-z-]+)"|id="mod-([a-z-]+)"')
ICON = re.compile(r'(<svg class="(?:module|get)__icon"[^>]*>)(.*?)(</svg>)', re.S)

# The role pages name their screens instead of keying them, and one name has no
# module of its own — Routing and QC is the routing screen with its checks.
BY_NAME = {
    'Inventory': 'inventory-management',
    'Procurement': 'procurement',
    'Sales orders and planning': 'planning-sales-order',
    'Payments and receivables': 'finance',
    'Costing': 'costing',
    'Routing': 'routing',
    'Routing and QC': 'routing',
    'Production': 'production',
    'Supply chain': 'supply-chain-management',
    'Reports': 'custom-reports',
    'Analytics': 'analytics',
    'Floor operations': 'floor-operations',
    'Demand forecast': 'demand-forecast',
}
ROLE_ICON = re.compile(
    r'(<svg class="role-screen__icon"[^>]*>)(.*?)(</svg>)(\s*<span class="role-screen__name">([^<]+)</span>)',
    re.S)


def rewrite(text):
    out, cursor, done, unknown = [], 0, 0, set()
    for m in ICON.finditer(text):
        keys = KEY.findall(text[cursor:m.start()])
        key = next((k for k in reversed([a or b or c for a, b, c in keys]) if k), None)
        out.append(text[cursor:m.start()])
        if key in ICONS:
            out.append(m.group(1) + ICONS[key] + m.group(3))
            done += 1
        else:
            out.append(m.group(0))
            unknown.add(key)
        cursor = m.end()
    out.append(text[cursor:])
    text = ''.join(out)

    # The role pages carry the same twelve screens, keyed by the name beside
    # the icon rather than by a module id.
    def by_name(m):
        nonlocal done
        key = BY_NAME.get(m.group(5).strip())
        if not key:
            unknown.add(m.group(5).strip())
            return m.group(0)
        done += 1
        return m.group(1) + ICONS[key] + m.group(3) + m.group(4)

    return ROLE_ICON.sub(by_name, text), done, unknown


if __name__ == '__main__':
    if '--dump' in sys.argv:
        for k, v in ICONS.items():
            print(f'{k}:\n{v}\n')
        sys.exit(0)

    check = '--check' in sys.argv
    total, skipped = 0, set()
    for path in sorted(pathlib.Path('.').rglob('*.html')):
        if '.git' in path.parts:
            continue
        before = path.read_text(encoding='utf-8')
        if not any(c in before for c in ('module__icon', 'get__icon', 'role-screen__icon')):
            continue
        after, done, unknown = rewrite(before)
        total += done
        skipped |= unknown
        if after != before and not check:
            path.write_text(after, encoding='utf-8')
        print(f'{path}: {done} icon(s)' + (' [check only]' if check else ''))

    print(f'\n{total} icon(s) redrawn')
    if skipped:
        print('unmatched keys (left alone):', ', '.join(sorted(str(s) for s in skipped)))
