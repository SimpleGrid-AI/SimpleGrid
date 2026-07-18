# ICP Mastersheet — Web Enrichment Report (MERGED)

**Date:** 2026-06-13
**Method:** Web research only (Apollo not used, per request)

## Color legend in the .xlsx
- 🟨 **Yellow** = verified data — contact names + titles, and the 22 emails actually seen on a real source.
- 🟧 **Orange/amber** = inferred email — the company's email **domain + format** were confirmed (often via a real sample address from the same company), but this person's exact address was **not seen**. **Verify before sending.**

---

## Totals

| Result | Count | Color |
|---|---|---|
| Contact **names + titles** added (companies that had no contact) | **43** | 🟨 |
| **Verified** emails added (seen on a real source) | **22** | 🟨 |
| **Inferred** emails added (pattern/domain confirmed, address not seen) | **154** | 🟧 |
| **Total rows edited / highlighted** | **192** | |
| Rows where nothing usable was found (left blank) | 54 | — |

- Of the 65 companies with no contact at all, a senior decision-maker was identified for **43**.
- Email coverage went from **22 → 176** of the 246 gaps (the 154 inferred are flagged orange).
- Existing data was **not modified** (0 existing emails overwritten); only blank cells were filled.

---

## Files

| File | What it is |
|---|---|
| `ICP_Mastersheet_enriched.xlsx` | **Main deliverable** — yellow = verified, orange = inferred email |
| `ICP_Mastersheet_enriched.csv` | Same data as CSV (no color) |
| `ICP_Mastersheet_source.csv` | Untouched original copy (for reference/diff) |
| `change_log.csv` | Every changed cell, with `emailType` (verified / pattern-guess), confidence, and source |
| `suggested_emails_unverified.csv` | The 154 inferred emails with reasoning (now also merged into the sheet) |
| `data_hygiene_flags.csv` | 38 existing rows flagged as outdated |

---

## Important: verify the orange (inferred) emails before outreach
They are educated inferences, not confirmed addresses. Some are explicitly low-confidence or tied to people who have since left/retired (see `change_log.csv` confidence column and `data_hygiene_flags.csv`).

## Data-hygiene flags (existing rows — NOT changed, per "don't change other data")
- **Hickory White** — contact on file (Buddy Sherrill) **died March 2023**.
- **E.J. Victor** — company **ceased operations / liquidating (2025)**.
- **Pulaski / Bradington-Young** — Paul Toms Jr. **retired 2021**.
- **Foliot Furniture** — Francis Arseneault **left as CEO ~2024**.
- **CP Manufacturing**, **American Baler**, **Pulaski (Page Wilson)** — execs on file **retired/stepped down**.
- **Heritage Home Group**, **Romweber**, **Charles Inc.**, **Fraenkel**, **Office Paper Systems** — **defunct/closed**.
- **Rockett, Inc.** — website on file is a **different (metal-fab) company**.

Full list of 38 in `data_hygiene_flags.csv`.
