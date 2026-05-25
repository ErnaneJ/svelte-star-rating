<script lang="ts">
	import StarRating from '$lib/Stars.svelte';
	import type { RatingConfig } from '$lib/types.js';

	let config: RatingConfig = {
		readOnly: false,
		countStars: 5,
		range: { min: 0, max: 5, step: 0.001 },
		score: 3.785,
		showScore: true,
		name: 'demo',
		starConfig: {
			size: 40,
			fillColor: '#F9ED4F',
			strokeColor: '#BB8511',
			unfilledColor: '#1e2235',
			strokeUnfilledColor: '#4a5270'
		}
	};

	let eventLog: { score: string; time: string }[] = [];

	function handleChange(e: Event) {
		const val = parseFloat((e.currentTarget as HTMLInputElement).value);
		eventLog = [
			{ score: val.toFixed(3), time: new Date().toLocaleTimeString() },
			...eventLog.slice(0, 4)
		];
	}

	$: codeSnippet = `<script lang="ts">
  import { StarRating } from '@ernane/svelte-star-rating';
  import type { RatingConfig } from '@ernane/svelte-star-rating';

  let config: RatingConfig = {
    readOnly: ${config.readOnly},
    countStars: ${config.countStars},
    range: { min: ${config.range?.min}, max: ${config.range?.max}, step: ${config.range?.step} },
    score: ${config.score?.toFixed(3)},
    showScore: ${config.showScore},
    starConfig: {
      size: ${config.starConfig?.size},
      fillColor: '${config.starConfig?.fillColor}',
      strokeColor: '${config.starConfig?.strokeColor}',
      unfilledColor: '${config.starConfig?.unfilledColor}',
      strokeUnfilledColor: '${config.starConfig?.strokeUnfilledColor}'
    }
  };
<\/script>

<StarRating bind:config on:change={handleChange} />`;

	let copied = false;
	async function copyCode() {
		await navigator.clipboard.writeText(codeSnippet);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<svelte:head>
	<title>Svelte Star Rating — Interactive Demo</title>
</svelte:head>

<!-- Hero -->
<section class="hero">
	<h1><span class="star-icon">⭐</span> svelte-star-rating</h1>
	<p class="tagline">
		A lightweight, zero-dependency Svelte component for star ratings — with full TypeScript support.
	</p>
	<div class="badges">
		<a href="https://www.npmjs.com/package/@ernane/svelte-star-rating" target="_blank" rel="noopener">
			<img src="https://img.shields.io/npm/v/@ernane/svelte-star-rating?color=F9ED4F&labelColor=1a1d2e&logo=npm&logoColor=white" alt="npm" />
		</a>
		<a href="https://github.com/ErnaneJ/svelte-star-rating/actions" target="_blank" rel="noopener">
			<img src="https://img.shields.io/github/actions/workflow/status/ErnaneJ/svelte-star-rating/ci.yml?branch=main&color=22c55e&labelColor=1a1d2e&logo=github&logoColor=white&label=CI" alt="CI" />
		</a>
		<img src="https://img.shields.io/npm/l/@ernane/svelte-star-rating?color=576EE0&labelColor=1a1d2e" alt="MIT" />
		<img src="https://img.shields.io/badge/TypeScript-ready-3178c6?labelColor=1a1d2e&logo=typescript&logoColor=white" alt="TypeScript" />
	</div>
</section>

<!-- Main demo card -->
<div class="card demo-card">

	<!-- Star preview -->
	<div class="preview-area">
		<StarRating bind:config on:change={handleChange} />
	</div>

	<!-- Event log -->
	{#if eventLog.length > 0}
		<div class="event-log">
			{#each eventLog as entry, i}
				<span class="log-entry" style="opacity: {1 - i * 0.18}">
					<span class="log-score">{entry.score}</span>
					<span class="log-time">{entry.time}</span>
				</span>
			{/each}
		</div>
	{:else}
		<p class="event-hint">Move the slider to see change events</p>
	{/if}

	<div class="divider" />

	<!-- Controls grid -->
	<div class="controls-grid">

		<!-- Column 1: Rating settings -->
		<fieldset>
			<legend>Rating</legend>

			<div class="field">
				<label for="count-stars">Stars</label>
				<input id="count-stars" type="number" bind:value={config.countStars} min="1" max="20" step="1" />
			</div>

			<div class="field">
				<label for="score">Score</label>
				<input id="score" type="number" bind:value={config.score} min={config.range?.min} max={config.range?.max} step={config.range?.step} />
			</div>

			<div class="field">
				<label for="range-min">Range min</label>
				<input id="range-min" type="number" bind:value={config.range!.min} min="0" step="1" />
			</div>

			<div class="field">
				<label for="range-max">Range max</label>
				<input id="range-max" type="number" bind:value={config.range!.max} min="0" step="1" />
			</div>

			<div class="field">
				<label for="range-step">Step</label>
				<input id="range-step" type="number" bind:value={config.range!.step} min="0.001" step="0.001" />
			</div>
		</fieldset>

		<!-- Column 2: Star appearance -->
		<fieldset>
			<legend>Appearance</legend>

			<div class="field">
				<label for="star-size">Size (px)</label>
				<input id="star-size" type="number" bind:value={config.starConfig!.size} min="12" max="120" step="1" />
			</div>

			<div class="field color-field">
				<label for="fill-color">Fill color</label>
				<div class="color-input-wrap">
					<input id="fill-color" type="color" bind:value={config.starConfig!.fillColor} />
					<span class="color-hex">{config.starConfig?.fillColor}</span>
				</div>
			</div>

			<div class="field color-field">
				<label for="stroke-color">Stroke color</label>
				<div class="color-input-wrap">
					<input id="stroke-color" type="color" bind:value={config.starConfig!.strokeColor} />
					<span class="color-hex">{config.starConfig?.strokeColor}</span>
				</div>
			</div>

			<div class="field color-field">
				<label for="unfilled-color">Unfilled color</label>
				<div class="color-input-wrap">
					<input id="unfilled-color" type="color" bind:value={config.starConfig!.unfilledColor} />
					<span class="color-hex">{config.starConfig?.unfilledColor}</span>
				</div>
			</div>

			<div class="field color-field">
				<label for="stroke-unfilled-color">Unfilled stroke</label>
				<div class="color-input-wrap">
					<input id="stroke-unfilled-color" type="color" bind:value={config.starConfig!.strokeUnfilledColor} />
					<span class="color-hex">{config.starConfig?.strokeUnfilledColor}</span>
				</div>
			</div>
		</fieldset>

	</div>

	<!-- Options row -->
	<div class="options-row">
		<button
			class="toggle-btn {config.readOnly ? 'active' : ''}"
			on:click={() => (config = { ...config, readOnly: !config.readOnly })}
		>
			{config.readOnly ? '🔒 Read-only ON' : '🔓 Read-only OFF'}
		</button>

		<button
			class="toggle-btn {config.showScore ? 'active' : ''}"
			on:click={() => (config = { ...config, showScore: !config.showScore })}
		>
			{config.showScore ? '👁 Score visible' : '🙈 Score hidden'}
		</button>
	</div>

</div>

<!-- Code snippet -->
<div class="card code-card">
	<div class="code-header">
		<span class="code-title">Generated code</span>
		<button class="copy-btn" on:click={copyCode}>
			{copied ? '✓ Copied!' : 'Copy'}
		</button>
	</div>
	<pre class="code-block"><code>{codeSnippet}</code></pre>
</div>

<!-- Install card -->
<div class="card install-card">
	<span class="install-label">Install</span>
	<code class="install-cmd">npm install @ernane/svelte-star-rating</code>
</div>

<footer>
	<p>
		Developed with ❤️ by <a href="https://www.ernane.dev" target="_blank" rel="noopener">Ernane Ferreira</a>
		·
		<a href="https://github.com/ErnaneJ/svelte-star-rating" target="_blank" rel="noopener">GitHub</a>
		·
		<a href="https://www.npmjs.com/package/@ernane/svelte-star-rating" target="_blank" rel="noopener">npm</a>
	</p>
</footer>

<style>
	/* Hero */
	.hero {
		text-align: center;
		margin-bottom: 2.5rem;
	}
	h1 {
		font-size: 2.25rem;
		font-weight: 800;
		color: #f1f5f9;
		margin-bottom: 0.6rem;
		letter-spacing: -0.5px;
	}
	.star-icon {
		margin-right: 0.25rem;
	}
	.tagline {
		color: #8892b0;
		font-size: 1rem;
		max-width: 480px;
		margin: 0 auto 1.25rem;
		line-height: 1.65;
	}
	.badges {
		display: flex;
		gap: 0.5rem;
		justify-content: center;
		flex-wrap: wrap;
	}
	.badges img {
		height: 20px;
		border-radius: 3px;
	}

	/* Cards */
	.card {
		background: #1a1d2e;
		border: 1px solid #2a2d45;
		border-radius: 16px;
		padding: 2rem;
		margin-bottom: 1.25rem;
	}

	/* Demo card */
	.demo-card {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.preview-area {
		background: #0f1120;
		border-radius: 12px;
		padding: 2.5rem 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #2a2d45;
		min-height: 96px;
	}

	/* Event log */
	.event-log {
		display: flex;
		gap: 0.75rem;
		align-items: center;
		flex-wrap: wrap;
		min-height: 28px;
	}
	.log-entry {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-family: monospace;
		font-size: 0.8rem;
		background: #0f1120;
		border: 1px solid #2a2d45;
		border-radius: 6px;
		padding: 0.25rem 0.6rem;
	}
	.log-score {
		color: #f9ed4f;
		font-weight: 600;
	}
	.log-time {
		color: #4a5270;
	}
	.event-hint {
		font-size: 0.8rem;
		color: #3a3f5c;
		font-style: italic;
		text-align: center;
	}

	.divider {
		height: 1px;
		background: #2a2d45;
		margin: 0 -0.5rem;
	}

	/* Controls */
	.controls-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
	}

	fieldset {
		border: 1px solid #2a2d45;
		border-radius: 10px;
		padding: 1rem 1.25rem;
	}

	legend {
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #576ee0;
		padding: 0 0.4rem;
	}

	.field {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.45rem 0;
		border-bottom: 1px solid #1e2235;
		gap: 0.5rem;
	}
	.field:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	label {
		font-size: 0.8rem;
		color: #8892b0;
		white-space: nowrap;
		flex-shrink: 0;
	}

	input[type='number'] {
		background: #0f1120;
		border: 1px solid #2a2d45;
		border-radius: 6px;
		padding: 0.3rem 0.5rem;
		color: #e2e8f0;
		font-size: 0.82rem;
		width: 80px;
		text-align: right;
		font-family: monospace;
		outline: none;
		transition: border-color 0.15s;
	}
	input[type='number']:focus {
		border-color: #576ee0;
	}

	/* Color inputs */
	.color-field .color-input-wrap {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	input[type='color'] {
		appearance: none;
		-webkit-appearance: none;
		width: 32px;
		height: 28px;
		border: 1px solid #2a2d45;
		border-radius: 6px;
		padding: 2px;
		background: #0f1120;
		cursor: pointer;
		flex-shrink: 0;
	}
	input[type='color']::-webkit-color-swatch-wrapper {
		padding: 0;
	}
	input[type='color']::-webkit-color-swatch {
		border: none;
		border-radius: 4px;
	}
	.color-hex {
		font-family: monospace;
		font-size: 0.75rem;
		color: #4a5270;
		min-width: 52px;
	}

	/* Options row */
	.options-row {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.toggle-btn {
		flex: 1;
		min-width: 140px;
		padding: 0.55rem 1rem;
		border-radius: 8px;
		border: 1px solid #2a2d45;
		background: #0f1120;
		color: #8892b0;
		font-size: 0.82rem;
		cursor: pointer;
		transition: all 0.15s;
		font-family: inherit;
	}
	.toggle-btn:hover {
		border-color: #576ee0;
		color: #e2e8f0;
	}
	.toggle-btn.active {
		background: #576ee015;
		border-color: #576ee0;
		color: #576ee0;
	}

	/* Code card */
	.code-card {
		padding: 0;
		overflow: hidden;
	}
	.code-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1.25rem;
		border-bottom: 1px solid #2a2d45;
	}
	.code-title {
		font-size: 0.78rem;
		font-weight: 600;
		color: #4a5270;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}
	.copy-btn {
		background: none;
		border: 1px solid #2a2d45;
		border-radius: 6px;
		padding: 0.25rem 0.7rem;
		color: #8892b0;
		font-size: 0.78rem;
		cursor: pointer;
		font-family: inherit;
		transition: all 0.15s;
	}
	.copy-btn:hover {
		border-color: #576ee0;
		color: #576ee0;
	}
	.code-block {
		margin: 0;
		padding: 1.25rem 1.5rem;
		overflow-x: auto;
		font-family: 'Fira Code', 'Cascadia Code', monospace;
		font-size: 0.78rem;
		line-height: 1.65;
		color: #8892b0;
	}
	.code-block code {
		white-space: pre;
	}

	/* Install card */
	.install-card {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 1.5rem;
	}
	.install-label {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #4a5270;
		white-space: nowrap;
	}
	.install-cmd {
		font-family: monospace;
		font-size: 0.9rem;
		color: #f9ed4f;
	}

	/* Footer */
	footer {
		text-align: center;
		padding: 1.5rem 0 2rem;
		color: #3a3f5c;
		font-size: 0.85rem;
	}
	footer a {
		color: #576ee0;
		text-decoration: none;
	}
	footer a:hover {
		text-decoration: underline;
	}

	/* Responsive */
	@media (max-width: 600px) {
		.controls-grid {
			grid-template-columns: 1fr;
		}
		h1 {
			font-size: 1.75rem;
		}
		.install-card {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
