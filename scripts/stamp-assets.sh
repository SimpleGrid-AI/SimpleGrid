#!/usr/bin/env bash
#
# stamp-assets.sh — put a version stamp on every local CSS and JS reference.
#
# The site is static and served straight off the deploy target, which sends a
# ten-minute max-age on the stylesheets. Nothing in a push tells a browser that
# already holds css/product.css that its copy is stale, so a CSS-only change
# can go live and still not be visible for the rest of that window — longer if
# something in front of it holds a copy too. A query string the browser has
# never seen is a different cache entry, so a stamped reference is fetched
# immediately.
#
# Run this before pushing anything that changes a file under css/ or js/:
#
#   ./scripts/stamp-assets.sh            # stamp = the current UTC minute
#   ./scripts/stamp-assets.sh 2026-08-14 # or any string you want
#
# It rewrites the ?v= on every <link>/<script> in the repo's HTML, so the whole
# site moves to one stamp at a time. External sources (unpkg, GTM) and anything
# under vendor/ are left alone — they carry their own versions.
set -euo pipefail

cd "$(dirname "$0")/.."

STAMP="${1:-$(date -u +%Y%m%d%H%M)}"

python3 - "$STAMP" <<'PY'
import pathlib
import re
import sys

stamp = sys.argv[1]

# href/src on a .css or .js that is ours: relative ("css/v3.css",
# "../../js/v3.js") or root-relative ("/js/v3.js"), never a scheme-carrying URL
# and never vendor/, which ships versioned already.
REF = re.compile(r'''(?P<attr>\b(?:href|src)=")(?P<path>(?!https?:|//)[^"?#]+\.(?:css|js))(?:\?[^"#]*)?(?P<tail>(?:#[^"]*)?")''')

changed = 0
for html in sorted(pathlib.Path('.').rglob('*.html')):
    if '.git' in html.parts or 'vendor' in html.parts or 'node_modules' in html.parts:
        continue
    before = html.read_text(encoding='utf-8')

    def stamped(m):
        if m.group('path').lstrip('./').startswith('vendor/'):
            return m.group(0)
        return f"{m.group('attr')}{m.group('path')}?v={stamp}{m.group('tail')}"

    after = REF.sub(stamped, before)
    if after != before:
        html.write_text(after, encoding='utf-8')
        changed += 1

print(f"stamped {changed} file(s) with ?v={stamp}")
PY
