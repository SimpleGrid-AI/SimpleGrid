#!/usr/bin/env python3
"""One-shot SEO refresh for the 17 live blog posts.

Each entry below is (slug-dir, new-title, new-description).
The script reads each file, finds the existing title and description by
parsing the meta tags, and replaces every instance with the new values
across all six places they appear (title, og:title, twitter:title,
og:image:alt, JSON-LD headline, JSON-LD breadcrumb name; meta/og/twitter/
JSON-LD description).
"""
import re
from pathlib import Path

BLOG = Path(__file__).resolve().parent.parent / "blog"

# (dirname, new title (no " | SimpleGrid Blog" suffix), new description)
POSTS = [
    ("event-sourcing-why-simplegrid-stores-everything-that-ever-happened",
     "Event Sourcing: Why SimpleGrid Stores Every Action Forever",
     "Most ERPs store today's state. SimpleGrid stores every event that ever happened. Immutable. Permanent. The audit trail IS the architecture."),
    ("sg-schema-why-your-erp-should-speak-your-language",
     "SG Schema: Why Your ERP Should Speak Your Language",
     "An SG Schema is the complete operational blueprint of one factory: entities, states, transitions, rules, chain reactions. AI writes it. SG Engine runs it."),
    ("entity-roots-the-building-blocks-of-an-sg-schema-erp",
     "Entity Roots: Building Blocks of an SG Schema ERP",
     "Most ERPs let records exist in isolation - orphans, broken parents, impossible states. An SG Schema does not. Every entity has a root and a boundary."),
    ("multi-tenant-architecture-how-simplegrid-runs-100-clients-on-one-platform",
     "Multi-Tenant Architecture: 100 Clients, One Platform",
     "When you sign up for an ERP, there's a question nobody asks: is my data sharing a database with other companies? The answer matters more than vendors say."),
    ("how-simplegrid-makes-erp-customization-take-minutes-not-months",
     "ERP Customization in Minutes, Not Months",
     "In most ERPs, changing a business rule is a software project. In SimpleGrid, it is a row in a table. Here is the architecture that makes that possible."),
    ("module-based-erp-vs-sg-schema-erp-two-architectures-two-outcomes",
     "Module-Based ERP vs. SG Schema ERP",
     "Module-based ERPs hardcode workflows and charge per change. SG Schema generates the system from your operation. Two architectures. Two outcomes."),
    ("how-we-built-an-erp-chatbot-with-claude-no-rag-and-full-context",
     "Building an ERP Chatbot With Claude, No RAG",
     "Most AI chatbots use RAG: chunk documents, embed, retrieve. We skipped it. Here is what we built instead, and why it works better for live operations."),
    ("why-conversational-ux-does-not-change-user-behavior-and-why-that-is-the-point",
     "Why Conversational UX Does Not Change Behavior",
     "Most ERPs fail because the floor staff do not use them. SimpleGrid does not change behavior - it captures the behavior that already exists. Here is how."),
    ("how-to-calculate-true-landed-cost-per-sku-and-why-most-manufacturers-cannot",
     "True Landed Cost Per SKU (And Why Most Cannot)",
     "Most manufacturers running 200+ SKUs cannot tell you which products actually make money. The data exists, scattered. Here is how to connect it."),
    ("inside-simplegrid-every-factory-floor-is-different-that-is-the-whole-point",
     "Inside SimpleGrid: Every Factory Is Different",
     "Most ERP companies start with software and look for customers who fit. We started with factories and built software that fits them. How that shapes us."),
    ("why-mid-market-manufacturers-are-the-most-underserved-businesses-in-enterprise-software",
     "Why Mid-Market Manufacturers Are Underserved",
     "Too big for spreadsheets. Too small for SAP. The mid-market manufacturer has been the ERP industry's blind spot for 20 years. Here is what fixes it."),
    ("the-real-cost-of-running-your-factory-on-spreadsheets",
     "The Real Cost of Running Your Factory on Spreadsheets",
     "Nobody plans to run a $10M manufacturing operation on spreadsheets. It just happens. The hidden costs - planner bottlenecks, $200K gaps - add up fast."),
    ("why-your-erp-vendor-charges-you-for-every-change-and-how-to-stop-paying",
     "Why Your ERP Vendor Charges You for Every Change",
     "$8K-$20K per change order. $64K-$300K per year. Vendor lock-in by architecture, not contract. The fix: store rules in tables, not application code."),
    ("how-ai-changed-erp-deployment-not-features-deployment",
     "How AI Changed ERP Deployment (Not Features)",
     "Every ERP vendor adds AI features to 20-year-old architectures. What AI actually changes is deployment - from 18 months and $500K to days. Here's how."),
    ("what-happens-when-your-erp-cannot-keep-up-with-your-business",
     "When Your ERP Cannot Keep Up With Your Business",
     "Your business changes. Your ERP does not. The 5-stage decline: workarounds, spreadsheets, change orders, trust erosion. Here is the alternative."),
    ("why-your-warehouse-manager-should-be-your-erp-s-first-user",
     "Your Warehouse Manager Should Be Your ERP's First User",
     "Most ERPs are designed for the executive dashboard and die at the warehouse. Build for the floor first - and the dashboards take care of themselves."),
    ("the-myth-of-erp-best-practices-your-operation-is-not-generic",
     "The Myth of ERP Best Practices",
     "ERP \"best practices\" is just an average of 50 manufacturers' processes - then you pay to make it fit yours. 96% of manufacturers need customization."),
]


def html_escape_attr(s: str) -> str:
    """Encode a string for safe inclusion in an HTML attribute or JSON string."""
    return (s
            .replace("&", "&amp;")
            .replace('"', "&quot;")
            .replace("'", "&#39;"))


def json_escape(s: str) -> str:
    """Encode a string for safe inclusion as a JSON string value."""
    return s.replace("\\", "\\\\").replace('"', '\\"')


def update(path: Path, new_title: str, new_desc: str):
    text = path.read_text(encoding="utf-8")

    # Extract the current title and description so we know what to replace.
    m_title = re.search(r"<title>(.+?)\s*\|\s*SimpleGrid Blog</title>", text)
    if not m_title:
        raise SystemExit(f"{path}: cannot parse title")
    old_title_html = m_title.group(1).strip()  # HTML-encoded form

    m_desc = re.search(r'<meta name="description" content="([^"]+)"', text)
    if not m_desc:
        raise SystemExit(f"{path}: cannot parse description")
    old_desc_html = m_desc.group(1)  # HTML-encoded form
    old_desc_json = old_desc_html.replace("&quot;", '\\"').replace("&#39;", "'")  # JSON-LD form

    new_title_html = html_escape_attr(new_title)
    new_desc_html = html_escape_attr(new_desc)
    new_desc_json = json_escape(new_desc)

    before = text

    # Replace title (appears in <title>, og:title, twitter:title,
    # og:image:alt prefix, JSON-LD headline, breadcrumb name).
    text = text.replace(old_title_html, new_title_html)

    # Replace description (meta description, og:description,
    # twitter:description, JSON-LD description). HTML-encoded form first.
    text = text.replace(old_desc_html, new_desc_html)
    # JSON-LD description uses JSON-string encoding (\" instead of &quot;).
    if old_desc_json != old_desc_html:
        text = text.replace(old_desc_json, new_desc_json)

    if text == before:
        print(f"  WARN: no replacements in {path.name}")
    else:
        path.write_text(text, encoding="utf-8")
        print(f"  ok   {path.parent.name}: title {len(new_title)}c, desc {len(new_desc)}c")


def main():
    for slug, new_title, new_desc in POSTS:
        f = BLOG / slug / "index.html"
        if not f.exists():
            print(f"  SKIP missing: {f}")
            continue
        update(f, new_title, new_desc)


if __name__ == "__main__":
    main()
