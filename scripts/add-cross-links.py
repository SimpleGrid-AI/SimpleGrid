#!/usr/bin/env python3
"""Inject 1-2 contextual cross-links into each blog body. The link is
a markdown-style [text](url) inserted by replacing a hand-picked phrase
in the body. PostMain parses the syntax at render time."""
import re
from pathlib import Path

BLOGS = Path(__file__).resolve().parent.parent / "data" / "blogs.js"

URL = {
    1:  "/blog/event-sourcing-why-simplegrid-stores-everything-that-ever-happened/",
    2:  "/blog/sg-schema-why-your-erp-should-speak-your-language/",
    3:  "/blog/entity-roots-the-building-blocks-of-an-sg-schema-erp/",
    4:  "/blog/multi-tenant-architecture-how-simplegrid-runs-100-clients-on-one-platform/",
    5:  "/blog/how-simplegrid-makes-erp-customization-take-minutes-not-months/",
    6:  "/blog/module-based-erp-vs-sg-schema-erp-two-architectures-two-outcomes/",
    7:  "/blog/how-we-built-an-erp-chatbot-with-claude-no-rag-and-full-context/",
    8:  "/blog/why-conversational-ux-does-not-change-user-behavior-and-why-that-is-the-point/",
    9:  "/blog/how-to-calculate-true-landed-cost-per-sku-and-why-most-manufacturers-cannot/",
    10: "/blog/inside-simplegrid-every-factory-floor-is-different-that-is-the-whole-point/",
    11: "/blog/why-mid-market-manufacturers-are-the-most-underserved-businesses-in-enterprise-software/",
    12: "/blog/the-real-cost-of-running-your-factory-on-spreadsheets/",
    13: "/blog/why-your-erp-vendor-charges-you-for-every-change-and-how-to-stop-paying/",
    14: "/blog/how-ai-changed-erp-deployment-not-features-deployment/",
    15: "/blog/what-happens-when-your-erp-cannot-keep-up-with-your-business/",
    16: "/blog/why-your-warehouse-manager-should-be-your-erp-s-first-user/",
    17: "/blog/the-myth-of-erp-best-practices-your-operation-is-not-generic/",
}

# (post_id, search_phrase, replacement_with_link)
# Every replacement is verified before applying; missing matches are reported.
INJECTIONS = [
    # Post 1: event sourcing -> SG Schema, customization
    (1, "The engine is built once and shared by every client.",
        "The engine is built once and shared by every client. The full picture: each client runs from their own [SG Schema](" + URL[2] + "), the operational blueprint our AI writes during onboarding."),
    (1, "When we deploy for a new client, we are not building an application. We are writing a configuration that describes their business.",
        "When we deploy for a new client, we are not building an application. We are writing the [SG Schema](" + URL[2] + ") that describes their business."),

    # Post 2: SG Schema -> entity roots, event sourcing, multi-tenant
    (2, "What rules must always be true? (These become invariants.)",
        "What rules must always be true? (These become invariants - enforced through [entity roots](" + URL[3] + ") that prevent impossible states by structure.)"),
    (2, "It is the executable contract that SG Engine reads to generate a complete ERP.",
        "It is the executable contract that SG Engine reads to generate a complete ERP. The runtime is [event-sourced](" + URL[1] + "), so every action your team takes is permanent."),

    # Post 3: entity roots -> event sourcing, SG Schema
    (3, "They communicate through events:",
        "They communicate through [events](" + URL[1] + "):"),
    (3, "This is how SG Engine can run completely different businesses from completely different SG Schemas.",
        "This is how SG Engine can run completely different businesses from completely different [SG Schemas](" + URL[2] + ")."),

    # Post 4: multi-tenant -> SG Schema, customization
    (4, "Each client's database contains their own configuration tables.",
        "Each client's database contains their own [SG Schema](" + URL[2] + ")."),
    (4, "Same engine, different rules.",
        "Same engine, different rules. ([How rule changes happen in minutes](" + URL[5] + ").)"),

    # Post 5: customization -> vendor charges, SG Schema
    (5, "In a traditional ERP, this goes through a scoping call with the vendor.",
        "In a traditional ERP, this goes through [a scoping call with the vendor](" + URL[13] + "). A change order is written. A developer modifies the dispatch module. Testing. Staging. Deployment. 3 to 6 weeks. $8,000 to $20,000."),
    (5, "It contains a model of your business.",
        "It contains [your SG Schema](" + URL[2] + ")."),

    # Post 6: modules vs SG Schema -> best practices, customization
    (6, "Modules create a perverse incentive.",
        "[Modules create a perverse incentive](" + URL[17] + ")."),
    (6, "Three rows in the SG Schema. Zero code changes. Done in minutes.",
        "Three rows in the SG Schema. Zero code changes. [Done in minutes](" + URL[5] + ")."),

    # Post 7: chatbot -> conversational UX, warehouse manager
    (7, "The behavior is identical to sending a WhatsApp message,",
        "The behavior is identical to sending a WhatsApp message - the same behavior your team [already uses 50 times a day](" + URL[8] + "),"),
    (7, "When the warehouse manager types",
        "When the [warehouse manager](" + URL[16] + ") types"),

    # Post 8: conversational UX -> chatbot, warehouse manager
    (8, "Hank, the AI assistant, reads that message",
        "[Hank, the AI assistant](" + URL[7] + "), reads that message"),
    (8, "We have seen warehouse managers who rejected previous ERPs",
        "We have seen [warehouse managers](" + URL[16] + ") who rejected previous ERPs"),

    # Post 9: landed cost -> event sourcing
    (9, "In SimpleGrid, every action is an event.",
        "In SimpleGrid, [every action is an event](" + URL[1] + ")."),

    # Post 10: inside SimpleGrid -> SG Schema, every factory
    (10, "Then AI writes a configuration that describes their operation.",
         "Then AI writes [an SG Schema](" + URL[2] + ") that describes their operation."),

    # Post 11: mid-market -> spreadsheets, vendor charges
    (11, "Don't charge me every time I need a change.",
         "Don't [charge me every time I need a change](" + URL[13] + ")."),

    # Post 12: spreadsheets -> ERP can't keep up, mid-market
    (12, "An ERP that takes 12 months to deploy, costs $300K, and requires the floor staff to navigate complex menus is not an upgrade from a spreadsheet.",
         "[An ERP that takes 12 months to deploy](" + URL[15] + "), costs $300K, and requires the floor staff to navigate complex menus is not an upgrade from a spreadsheet."),

    # Post 13: vendor charges -> customization
    (13, "If you move business rules out of code and into configuration, the change order disappears.",
         "If you move business rules out of code and [into your SG Schema](" + URL[5] + "), the change order disappears."),

    # Post 14: AI deployment -> SG Schema, modules vs
    (14, "AI changes ERP deployment only when paired with an architecture that was designed for it: spec-driven, event-sourced, single source of truth.",
         "AI changes ERP deployment only when paired with [an architecture that was designed for it](" + URL[6] + "): spec-driven, event-sourced, single source of truth."),

    # Post 15: ERP can't keep up -> spreadsheets, customization
    (15, "Six months after go-live, the same spreadsheets you eliminated during implementation have crept back.",
         "Six months after go-live, [the same spreadsheets you eliminated during implementation](" + URL[12] + ") have crept back."),

    # Post 16: warehouse manager -> conversational UX, chatbot
    (16, "Each input takes 10 seconds.",
         "Each input takes 10 seconds. ([Why conversational UX captures the behavior that already exists](" + URL[8] + ".)"),

    # Post 17: best practices -> modules vs SG Schema
    (17, "These are not \\\"customizations.\\\" They are the business.",
         "These are not \\\"customizations.\\\" They are the business. ([Module-based vs SG Schema architecture, in detail](" + URL[6] + ".)"),
]


def main():
    text = BLOGS.read_text(encoding="utf-8")
    misses = []
    for post_id, needle, replacement in INJECTIONS:
        # Skip if link already injected (idempotent re-runs).
        if replacement in text:
            continue
        if needle not in text:
            misses.append((post_id, needle[:60]))
            continue
        text = text.replace(needle, replacement, 1)
        print(f"  ok   post {post_id}: linked at '{needle[:50]}…'")
    if misses:
        print("\nMISSES (string not found):")
        for pid, n in misses:
            print(f"  post {pid}: {n}")
    BLOGS.write_text(text, encoding="utf-8")


if __name__ == "__main__":
    main()
