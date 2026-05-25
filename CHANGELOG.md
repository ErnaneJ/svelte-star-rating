# Changelog

All notable changes to `@ernane/svelte-star-rating` are documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased] — v2.0.0

> Branch: `feat/v2-typescript-sveltekit-issue-18` · PR: [#19](https://github.com/ErnaneJ/svelte-star-rating/pull/19) · Fixes: [#18](https://github.com/ErnaneJ/svelte-star-rating/issues/18)

### Added
- Full **TypeScript** support — `RatingConfig`, `StarConfig`, and `ResolvedRatingConfig` interfaces exported from the package
- Named export `StarRating` alongside the existing default export
- Partial `RatingConfig` support — omitted fields fall back to sensible defaults (previously a full config was required)
- Interactive **GitHub Pages demo** at https://ernanej.github.io/svelte-star-rating/ — full config playground with live code snippet, event log, color pickers, and all toggles
- **23 unit tests** with Vitest + `@testing-library/svelte` covering render, readOnly, scoreFormat, slider range, gradient fills, and accessibility attributes
- **GitHub Actions CI/CD**:
  - `ci.yml` — type-check (svelte-check), tests, and library build on every push and pull request
  - `release.yml` — automatic npm publish when a GitHub Release is published
  - `deploy-demo.yml` — automatic GitHub Pages deploy on push to `main`
- `aria-label` on the range slider and `aria-hidden` on decorative SVG stars
- `.nvmrc` specifying Node.js 20

### Changed
- **Build tooling:** replaced manual Rollup configuration with `@sveltejs/kit` + `@sveltejs/package` (official Svelte library packaging tool)
- **`scoreFormat` signature** _(breaking)_: now receives `(score: number, countStars: number)` as function arguments instead of using `this`. Update: `function(){ return \`(\${this.score}/...\`; }` → `(score, total) => \`(\${score}/${total})\``
- **Peer dependency:** `svelte ^3` → `svelte >=4.0.0`
- **Node.js requirement:** `engines.node >=20.0.0`
- Default branch renamed from `master` to `main`
- `src/Stars.svelte` and `src/components/Star.svelte` moved to `src/lib/` (internal path, not public API)

### Fixed
- **#18** — "Cannot find module '@ernane/svelte-star-rating' or its corresponding type declarations": the package now ships `.d.ts` files and the `exports` field includes the `"types"` condition, making TypeScript able to resolve the package

### Removed
- `svelte-playground/` development sandbox (replaced by the `src/routes/` demo deployable to GitHub Pages)
- `rollup.config.js` (replaced by `svelte.config.js` + `vite.config.ts`)

---

## [1.1.9] — 2024-08-10

### Fixed
- Fixed exports condition for Svelte field (#16)
- Fixed missing end bracket in component

---

## [1.1.8] — 2024-08-08

### Fixed
- Fixed missing comma in configuration

---

## [1.1.7] — 2024-04-06

### Added
- Conditional rendering to keep `onClick` events working even when `readOnly` is `true` (PR #15 by [@Thiteago](https://github.com/Thiteago))

---

## [1.1.6] — 2024-03-30

### Fixed
- Updated dependencies and added `.npmignore` file

---

## [1.1.5] — 2023-12-18

### Added
- `svelte-playground/` — a development sandbox to test and demonstrate the package interactively

### Fixed
- Non-unique `linearGradient` id when multiple component instances are on the same page (#12)

---

## [1.1.4] — 2023-08-10

### Added
- `name` attribute on the range input (PR #11 by [@Yelinz](https://github.com/Yelinz))

---

## [1.1.3] — 2023-07-29

### Added
- `scoreFormat` — a custom function to format the displayed score label (PR #10)

---

## [1.1.2] — 2023-01-07

### Changed
- Updated default star colors (PR #4 by [@Jojoshua](https://github.com/Jojoshua))

### Added
- `unfilledColor` and `strokeUnfilledColor` props to control the appearance of empty stars (PR #5 by [@Thiteago](https://github.com/Thiteago))

### Fixed
- Typo in docs: "Ratting" → "Rating" (PR #6 by [@yanick](https://github.com/yanick))

---

## [1.1.1] — 2022-12-11

### Added
- Forward `change` event handler from the inner slider to the parent

---

## [1.0.3] — 2022-05-10

### Changed
- Standardized codebase and documentation to English
- Corrected `step` attribute usage on the range input

---

## [1.0.0] — 2022-04-13

### Added
- Initial release: simple Svelte 3 star rating component
- `readOnly` mode
- Configurable star count, score, colors, and size
- SVG star with linear gradient for fractional ratings
- Range slider for interactive rating input
- Score display with default percentage format

[Unreleased]: https://github.com/ErnaneJ/svelte-star-rating/compare/v1.1.9...HEAD
[1.1.9]: https://github.com/ErnaneJ/svelte-star-rating/compare/v1.1.8...v1.1.9
[1.1.8]: https://github.com/ErnaneJ/svelte-star-rating/compare/v1.1.7...v1.1.8
[1.1.7]: https://github.com/ErnaneJ/svelte-star-rating/compare/v1.1.6...v1.1.7
[1.1.6]: https://github.com/ErnaneJ/svelte-star-rating/compare/v1.1.5...v1.1.6
[1.1.5]: https://github.com/ErnaneJ/svelte-star-rating/compare/v1.1.4...v1.1.5
[1.1.4]: https://github.com/ErnaneJ/svelte-star-rating/compare/v1.1.3...v1.1.4
[1.1.3]: https://github.com/ErnaneJ/svelte-star-rating/compare/v1.1.2...v1.1.3
[1.1.2]: https://github.com/ErnaneJ/svelte-star-rating/compare/v1.0.3...v1.1.2
[1.1.1]: https://github.com/ErnaneJ/svelte-star-rating/compare/v1.0.3...v1.1.1
[1.0.3]: https://github.com/ErnaneJ/svelte-star-rating/compare/v1.0.0...v1.0.3
[1.0.0]: https://github.com/ErnaneJ/svelte-star-rating/releases/tag/v1.0.0
