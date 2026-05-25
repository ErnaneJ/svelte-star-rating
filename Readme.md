# ⭐ svelte-star-rating

[![npm version](https://img.shields.io/npm/v/@ernane/svelte-star-rating?color=F9ED4F&logo=npm)](https://www.npmjs.com/package/@ernane/svelte-star-rating)
[![CI](https://img.shields.io/github/actions/workflow/status/ErnaneJ/svelte-star-rating/ci.yml?branch=main&color=22c55e&logo=github&label=CI)](https://github.com/ErnaneJ/svelte-star-rating/actions)
[![License: MIT](https://img.shields.io/npm/l/@ernane/svelte-star-rating?color=64748b)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-3178c6?logo=typescript)](https://www.typescriptlang.org/)

A lightweight, zero-dependency Svelte component for star ratings — with full **TypeScript** support, fractional stars, and flexible customization.

**[→ Live Demo](https://ernanej.github.io/svelte-star-rating/)**

---

## Features

- Full TypeScript support with exported types
- Fractional star ratings (e.g. 3.7 ★)
- Customizable colors, sizes, and score format
- Read-only mode for displaying ratings
- Zero runtime dependencies
- Works with Svelte 4 and Svelte 5
- Accessible (aria labels, aria-hidden on decorative SVGs)

## Installation

```bash
npm install @ernane/svelte-star-rating
```

## Basic Usage

```svelte
<script lang="ts">
  import { StarRating } from '@ernane/svelte-star-rating';
  import type { RatingConfig } from '@ernane/svelte-star-rating';

  let config: RatingConfig = {
    countStars: 5,
    score: 3,
    showScore: true
  };
</script>

<StarRating bind:config on:change={(e) => console.log('score:', e.target.value)} />
```

Or use the default export:

```svelte
<script lang="ts">
  import StarRating from '@ernane/svelte-star-rating';
</script>

<StarRating />
```

## Configuration

All fields are optional. Omitted fields use the defaults shown below.

```typescript
import type { RatingConfig } from '@ernane/svelte-star-rating';

const config: RatingConfig = {
  readOnly: false,              // disable interaction (display only)
  countStars: 5,                // number of stars
  score: 0,                     // current score (0 to countStars)
  showScore: true,              // show score label
  name: 'stars',                // HTML name attribute on the input
  range: {
    min: 0,
    max: 5,
    step: 0.001                 // precision of the slider
  },
  scoreFormat: (score, total) => `(${Math.round(score)}/${total})`,  // custom formatter
  starConfig: {
    size: 30,                   // px
    fillColor: '#F9ED4F',       // filled star color
    strokeColor: '#BB8511',     // filled star border
    unfilledColor: '#FFF',      // empty star color
    strokeUnfilledColor: '#000' // empty star border
  }
};
```

### `RatingConfig` type reference

| Property | Type | Default | Description |
|---|---|---|---|
| `readOnly` | `boolean` | `false` | Disables the slider |
| `countStars` | `number` | `5` | Number of stars |
| `score` | `number` | `0` | Current rating value |
| `showScore` | `boolean` | `true` | Display the score label |
| `name` | `string` | `'stars'` | `name` on the range input |
| `range.min` | `number` | `0` | Slider minimum |
| `range.max` | `number` | `5` | Slider maximum |
| `range.step` | `number` | `0.001` | Slider step (precision) |
| `scoreFormat` | `(score, total) => string` | — | Custom score formatter |
| `starConfig.size` | `number` | `30` | Star size in px |
| `starConfig.fillColor` | `string` | `'#F9ED4F'` | Color of filled stars |
| `starConfig.strokeColor` | `string` | `'#BB8511'` | Border of filled stars |
| `starConfig.unfilledColor` | `string` | `'#FFF'` | Color of empty stars |
| `starConfig.strokeUnfilledColor` | `string` | `'#000'` | Border of empty stars |

## Events

The component forwards events from the underlying range `<input>`:

```svelte
<StarRating
  bind:config
  on:change={(e) => console.log('Changed:', e.currentTarget.value)}
  on:click={() => console.log('Clicked')}
/>
```

## Examples

### Read-only (display mode)

```svelte
<StarRating config={{ readOnly: true, score: 4.3, countStars: 5 }} />
```

### Custom colors

```svelte
<StarRating config={{
  score: 3,
  starConfig: {
    fillColor: '#ff6b6b',
    strokeColor: '#c0392b',
    unfilledColor: '#f0f0f0',
    strokeUnfilledColor: '#ccc'
  }
}} />
```

### Custom score format

```svelte
<StarRating config={{
  score: 4,
  countStars: 5,
  scoreFormat: (score, total) => `${score.toFixed(1)} / ${total} stars`
}} />
```

### Multiple independent ratings

```svelte
<script lang="ts">
  import { StarRating } from '@ernane/svelte-star-rating';
  import type { RatingConfig } from '@ernane/svelte-star-rating';

  let quality: RatingConfig = { name: 'quality', score: 4 };
  let value: RatingConfig = { name: 'value', score: 3 };
</script>

<StarRating bind:config={quality} />
<StarRating bind:config={value} />
```

## SvelteKit

Works out of the box in SvelteKit. No additional configuration needed.

```svelte
<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { StarRating } from '@ernane/svelte-star-rating';
</script>

<StarRating />
```

---

## Migrating from v1

### `scoreFormat` signature changed

**v1** (no longer supported — uses `this` which is incompatible with TypeScript strict mode):
```js
scoreFormat: function() { return `(${this.score}/${this.countStars})`; }
```

**v2:**
```ts
scoreFormat: (score, total) => `(${score}/${total})`
```

### Partial config now supported

In v2, you can pass a partial `RatingConfig` — omitted fields fall back to defaults. Previously, a full config object was required.

---

## Development

```bash
git clone https://github.com/ErnaneJ/svelte-star-rating.git
cd svelte-star-rating
npm install

npm run dev          # start demo at localhost:5173
npm run check        # TypeScript type-check
npm test             # run tests
npm run package      # build the library into dist/
```

## License

[MIT](./LICENSE) — Ernane Ferreira
