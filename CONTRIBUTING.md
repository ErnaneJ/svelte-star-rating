# Contributing to svelte-star-rating

Thank you for taking the time to contribute! Every bug report, suggestion, and pull request is appreciated.

---

## Table of contents

- [Code of Conduct](#code-of-conduct)
- [Reporting bugs](#reporting-bugs)
- [Suggesting features](#suggesting-features)
- [Submitting a pull request](#submitting-a-pull-request)
- [Local development](#local-development)
- [Commit conventions](#commit-conventions)
- [Project structure](#project-structure)

---

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you agree to uphold it. Please report unacceptable behavior to [ernane.junior25@gmail.com](mailto:ernane.junior25@gmail.com).

---

## Reporting bugs

Before opening an issue, please:

1. Search [existing issues](https://github.com/ErnaneJ/svelte-star-rating/issues) to avoid duplicates.
2. Reproduce the bug on the [live playground](https://ernanej.github.io/svelte-star-rating/) if possible.

When opening a bug report, include:

- A **minimal reproduction** (code snippet or StackBlitz link)
- Expected vs. actual behavior
- Your environment: Svelte version, SvelteKit version (if applicable), Node.js version, browser

---

## Suggesting features

Open a [GitHub Discussion](https://github.com/ErnaneJ/svelte-star-rating/discussions) or an issue with the `enhancement` label. Describe the use case and why the current API does not cover it.

---

## Submitting a pull request

1. **Fork** the repository and create a branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes.** See [Local development](#local-development) below.

3. **Add or update tests** in `tests/` for any new behavior.

4. **Ensure everything passes** before pushing:
   ```bash
   npm run check   # TypeScript
   npm test        # Vitest
   npm run package # library build
   ```

5. **Open a PR** against the `main` branch. Fill in the PR template (title, what changed, how to test).

6. A maintainer will review your PR. Please address any requested changes promptly.

> **Tip:** For large changes, open an issue or discussion first so we can align before you invest time in the implementation.

---

## Local development

```bash
git clone https://github.com/ErnaneJ/svelte-star-rating.git
cd svelte-star-rating
npm install

npm run dev          # interactive demo at localhost:5173
npm run check        # svelte-check + TypeScript
npm test             # Vitest (single run)
npm run test:watch   # Vitest (watch mode)
npm run package      # build library into dist/
```

The library source lives in `src/lib/`. The interactive demo lives in `src/routes/`.

---

## Commit conventions

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | When to use |
|---|---|
| `feat:` | New feature or behavior |
| `fix:` | Bug fix |
| `docs:` | Documentation only |
| `test:` | Adding or updating tests |
| `refactor:` | Code change that doesn't fix a bug or add a feature |
| `chore:` | Tooling, dependencies, CI changes |
| `perf:` | Performance improvement |

Example:

```
feat(config): support partial RatingConfig with defaults
```

---

## Project structure

```
src/
├── lib/                    # 📦 published library
│   ├── Stars.svelte        # main component
│   ├── components/
│   │   └── Star.svelte     # individual star SVG
│   ├── types.ts            # exported TypeScript interfaces
│   └── index.ts            # public entry point
└── routes/                 # 🌐 interactive demo (GitHub Pages)
    ├── +layout.svelte
    ├── +layout.ts
    └── +page.svelte

tests/                      # Vitest test suite
.github/workflows/          # CI, release, and deploy pipelines
```
