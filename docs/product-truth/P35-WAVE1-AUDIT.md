# P35 Wave 1 — Product Truth Audit

Date: 2026-09-10
Scope: Farsio parent-brand authority, NeveshtYar 4.9.2, AvaYar 0.6.0 Stable

## Canonical authority model

- **Farsio** is the parent brand and canonical online product authority.
- **NeveshtYar** and **AvaYar** are official Farsio products.
- `farsio.ir` is the user-facing canonical brand/product surface.
- GitHub repositories and immutable releases are technical/release provenance.
- Store publication is intentionally out of scope for P35.

## NeveshtYar current truth

Canonical release: `v4.9.2`
Source SHA: `f47f64dbb504a87fa768e8ec119aa783b7ba7385`
Release URL: https://github.com/FarsioIR/NeveshtYar/releases/tag/v4.9.2

Evidence-backed current capability groups:

1. Bidirectional Persian/English keyboard-layout recovery.
2. Finglish conversion.
3. Preservation of already-correct Persian/English text.
4. Inline correction workflow across web text fields.
5. Personal dictionary management.
6. User-approved correction learning/memory.
7. Persian RTL / English LTR bilingual interface.
8. Local-first correction baseline with automatic third-party search/interception removed from the Store-safe runtime.
9. Chromium-family and Firefox release artifacts.
10. Manifest V3 with `storage` and `activeTab` permissions in the canonical 4.9.2 manifest.

## AvaYar current truth

Canonical release: `avayar-v0.6.0`
Source SHA: `20d9da845c32e9873d332fb12192b38521d21232`
Release date: 2026-09-10
Release URL: https://github.com/FarsioIR/AvaYar/releases/tag/avayar-v0.6.0

Evidence-backed current capability groups:

1. Persian-first active-webpage reading workflow.
2. Full-text mode.
3. Summary mode.
4. English-to-Persian preparation.
5. Real Persian TTS path.
6. Sulafat and Iapetus voice selection.
7. Progressive chunked playback.
8. Play / Pause / Resume / Stop controls.
9. Browser side-panel interface.
10. Manifest V3 with `activeTab`, `scripting`, `sidePanel`, and `storage` permissions; broad HTTP/HTTPS host access is optional.

## Important provenance conflict found

The AvaYar README at the accepted 0.6.0 source SHA still describes an older M2 / Pre-MVP state and package version `0.2.0`. That README is stale relative to the canonical Stable release published from the same accepted product line.

For Farsio website current-version authority, the immutable `AvaYar 0.6.0 — Stable` GitHub Release and browser-acceptance evidence take precedence over stale historical README copy. P35 must not regress the website back to M2/Pre-MVP wording.

## Website drift found

The current Farsio website already has strong canonical/hreflang, release-history and machine-readable authority infrastructure, but visible copy still under-describes the complete current capability sets. In particular:

- NeveshtYar is framed too narrowly around Finglish / keyboard-layout / spelling.
- Some generic release/SEO copy still describes AvaYar as merely a development path instead of the accepted 0.6.0 Stable product.
- Product facts are duplicated in multiple UI/SEO/machine-readable surfaces, creating drift risk.

## Wave 1 implementation decision

`src/product-truth.ts` is now the canonical in-repository product truth registry for P35.

The next waves should consume this registry from:

- Home product summaries
- Products page
- NeveshtYar product page
- AvaYar product page
- Feature matrix
- Docs / FAQ / Releases where current product facts appear
- SoftwareApplication / brand structured data
- AI entity/discovery generation
- `llms.txt` / `llms-full.txt` generation
- SEO/GEO regression tests

The registry must contain only claims supported by canonical release/source evidence. Future capabilities belong in roadmap content and must not be represented as current functionality.
