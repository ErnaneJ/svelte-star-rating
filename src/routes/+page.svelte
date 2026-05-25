<script lang="ts">
	import StarRating from '$lib/Stars.svelte';
	import type { RatingConfig } from '$lib/types.js';

	// ── state ────────────────────────────────────────────────────────────────────
	let countStars = 5;
	let score = 3.785;
	let rangeMin = 0;
	let rangeMax = 5;
	let rangeStep = 0.001;
	let showScore = false;
	let readOnly = false;
	let size = 52;
	let fillColor = '#F9ED4F';
	let strokeColor = '#BB8511';
	let unfilledColor = '#1e2235';
	let strokeUnfilledColor = '#3a3f5c';

	$: config = {
		readOnly,
		countStars,
		range: { min: rangeMin, max: rangeMax, step: rangeStep },
		score,
		showScore,
		name: 'demo',
		starConfig: { size, fillColor, strokeColor, unfilledColor, strokeUnfilledColor }
	} satisfies RatingConfig;

	// ── events ────────────────────────────────────────────────────────────────────
	let pulse = false;
	let pulseId: ReturnType<typeof setTimeout>;

	function handleChange(e: Event) {
		score = parseFloat((e.currentTarget as HTMLInputElement).value);
		clearTimeout(pulseId);
		pulse = true;
		pulseId = setTimeout(() => (pulse = false), 700);
	}

	// ── derived ───────────────────────────────────────────────────────────────────
	$: pct = rangeMax > rangeMin ? Math.round(((score - rangeMin) / (rangeMax - rangeMin)) * 100) : 0;
	$: scoreFill = rangeMax > rangeMin ? ((score - rangeMin) / (rangeMax - rangeMin)) * 100 : 0;
	$: starsFill = ((countStars - 1) / 19) * 100;
	$: sizeFill = ((size - 16) / 104) * 100;

	// ── presets ───────────────────────────────────────────────────────────────────
	const presets = [
		{ label: 'Gold',   fill: '#F9ED4F', stroke: '#BB8511', empty: '#1e2235', eStroke: '#3a3f5c' },
		{ label: 'Ember',  fill: '#ff6b6b', stroke: '#c0392b', empty: '#1f0d0d', eStroke: '#3d1a1a' },
		{ label: 'Ocean',  fill: '#38bdf8', stroke: '#0284c7', empty: '#0c1a26', eStroke: '#1a3a55' },
		{ label: 'Mint',   fill: '#4ade80', stroke: '#16a34a', empty: '#0d1f13', eStroke: '#1a3d27' },
		{ label: 'Candy',  fill: '#f472b6', stroke: '#be185d', empty: '#1f0d17', eStroke: '#3d1a30' },
		{ label: 'Violet', fill: '#a78bfa', stroke: '#7c3aed', empty: '#130d1f', eStroke: '#281a3d' },
	];

	function applyPreset(p: typeof presets[0]) {
		fillColor = p.fill;
		strokeColor = p.stroke;
		unfilledColor = p.empty;
		strokeUnfilledColor = p.eStroke;
	}

	// ── reset ─────────────────────────────────────────────────────────────────────
	function reset() {
		countStars = 5; score = 3.785; rangeMin = 0; rangeMax = 5; rangeStep = 0.001;
		showScore = false; readOnly = false; size = 52;
		fillColor = '#F9ED4F'; strokeColor = '#BB8511';
		unfilledColor = '#1e2235'; strokeUnfilledColor = '#3a3f5c';
	}

	// ── code ──────────────────────────────────────────────────────────────────────
	$: code = `<script lang="ts">
  import { StarRating } from '@ernane/svelte-star-rating';
  import type { RatingConfig } from '@ernane/svelte-star-rating';

  let config: RatingConfig = {
    readOnly: ${readOnly},
    countStars: ${countStars},
    score: ${score.toFixed(3)},
    showScore: ${showScore},
    range: { min: ${rangeMin}, max: ${rangeMax}, step: ${rangeStep} },
    starConfig: {
      size: ${size},
      fillColor: '${fillColor}',
      strokeColor: '${strokeColor}',
      unfilledColor: '${unfilledColor}',
      strokeUnfilledColor: '${strokeUnfilledColor}',
    },
  };
<\/script>

<StarRating bind:config on:change={handleChange} />`;

	let copied = false;
	async function copyCode() {
		await navigator.clipboard.writeText(code);
		copied = true;
		setTimeout(() => (copied = false), 1600);
	}

	let codeOpen = false;
</script>

<svelte:head>
	<title>svelte-star-rating — playground</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet" />
</svelte:head>

<div class="app">

	<!-- ══ TOP BAR ════════════════════════════════════════════════════════════════ -->
	<header class="topbar">
		<div class="flex items-center gap-2 shrink-0">
			<span class="text-base">⭐</span>
			<span class="font-bold text-sm text-zinc-50 tracking-tight">svelte-star-rating</span>
			<span class="text-[11px] bg-zinc-800 text-zinc-500 rounded px-1.5 py-px font-mono">v2.0.0</span>
		</div>

		<code class="flex-1 text-center text-[12px] text-zinc-600 font-mono truncate hidden sm:block">
			npm i @ernane/svelte-star-rating
		</code>

		<nav class="flex gap-1 shrink-0">
			<a
				href="https://www.npmjs.com/package/@ernane/svelte-star-rating"
				target="_blank" rel="noopener"
				class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
			>
				<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M0 0v16h16V0H0zm13.5 13.5h-2.3v-9H8v9H2.5v-11h11v11z"/></svg>
				npm
			</a>
			<a
				href="https://github.com/ErnaneJ/svelte-star-rating"
				target="_blank" rel="noopener"
				class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
			>
				<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 .2A8 8 0 000 8.2c0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4v-1.4c-2.2.5-2.7-1.1-2.7-1.1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.6 7.6 0 014 0c1.5-1 2.2-.8 2.2-.8.5 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.8-3.7 4 .3.3.6.8.6 1.6v2.3c0 .2.1.5.5.4A8 8 0 0016 8.2 8 8 0 008 .2z"/></svg>
				GitHub
			</a>
		</nav>
	</header>

	<!-- ══ MAIN WORKSPACE ════════════════════════════════════════════════════════ -->
	<div class="workspace">

		<!-- ── PREVIEW ──────────────────────────────────────────────────────────── -->
		<div class="preview" style="background: radial-gradient(ellipse 55% 45% at 50% 50%, {fillColor}22 0%, transparent 70%), #0c0c0e;">

			<div
				class="preview-stage"
				style="box-shadow: 0 0 80px {fillColor}33, 0 0 0 1px #27272a inset;"
			>
				<StarRating bind:config on:change={handleChange} />
			</div>

			<div class="flex items-baseline gap-2">
				<span class="tabular-nums font-extrabold text-zinc-50 tracking-tight" style="font-size: 2.75rem; line-height: 1;">{score.toFixed(2)}</span>
				<span class="text-lg font-semibold text-zinc-600">/ {rangeMax}</span>
				<span class="text-xs text-zinc-700 font-mono ml-1">{pct}%</span>
			</div>

			<div class="flex items-center gap-4">
				<span class="live-badge" class:live-active={pulse}>
					<span class="live-dot"></span>
					live
				</span>

				<div class="flex gap-2 items-center">
					{#each presets as p}
						<button
							class="preset-dot"
							style="background: {p.fill}; outline-color: {fillColor === p.fill ? p.fill : 'transparent'}; outline-offset: 2px; outline-width: 2px; outline-style: solid;"
							title={p.label}
							on:click={() => applyPreset(p)}
							aria-label="Apply {p.label} preset"
						></button>
					{/each}
				</div>
			</div>
		</div>

		<!-- ── CONTROL PANEL ─────────────────────────────────────────────────────── -->
		<aside class="panel">

			<!-- Rating -->
			<section class="panel-section">
				<h3 class="section-title">Rating</h3>

				<div class="control-row">
					<label for="ctrl-stars" class="ctrl-label">Stars</label>
					<div class="slider-wrap">
						<input id="ctrl-stars" type="range" min="1" max="20" step="1"
							bind:value={countStars}
							class="slider" style="--fill: {starsFill}%" />
						<output class="ctrl-output">{countStars}</output>
					</div>
				</div>

				<div class="control-row">
					<label for="ctrl-score" class="ctrl-label">Score</label>
					<div class="slider-wrap">
						<input id="ctrl-score" type="range"
							min={rangeMin} max={rangeMax} step={rangeStep}
							bind:value={score}
							class="slider" style="--fill: {scoreFill}%" />
						<output class="ctrl-output">{score.toFixed(2)}</output>
					</div>
				</div>

				<div class="control-row items-start">
					<span class="ctrl-label mt-1">Range</span>
					<div class="grid grid-cols-3 gap-1.5 flex-1">
						{#each [['min', rangeMin], ['max', rangeMax], ['step', rangeStep]] as [lbl, _], i}
							<label class="flex flex-col gap-1">
								<span class="text-[10px] text-zinc-600 uppercase tracking-wider">{lbl}</span>
								{#if i === 0}
									<input type="number" bind:value={rangeMin} min="0" step="1" class="num-input" />
								{:else if i === 1}
									<input type="number" bind:value={rangeMax} min="1" step="1" class="num-input" />
								{:else}
									<input type="number" bind:value={rangeStep} min="0.001" step="0.001" class="num-input" />
								{/if}
							</label>
						{/each}
					</div>
				</div>
			</section>

			<!-- Appearance -->
			<section class="panel-section">
				<h3 class="section-title">Appearance</h3>

				<div class="control-row">
					<label for="ctrl-size" class="ctrl-label">Size</label>
					<div class="slider-wrap">
						<input id="ctrl-size" type="range" min="16" max="120" step="1"
							bind:value={size}
							class="slider" style="--fill: {sizeFill}%" />
						<output class="ctrl-output">{size}px</output>
					</div>
				</div>

				<div class="grid grid-cols-2 gap-2 mt-1">
					{#each [
						{ key: 'fillColor', label: 'Fill', color: fillColor },
						{ key: 'strokeColor', label: 'Stroke', color: strokeColor },
						{ key: 'unfilledColor', label: 'Empty fill', color: unfilledColor },
						{ key: 'strokeUnfilledColor', label: 'Empty stroke', color: strokeUnfilledColor },
					] as item}
						<label class="color-control">
							<span class="text-[10px] text-zinc-600 uppercase tracking-wider mb-1 block">{item.label}</span>
							<div class="color-row">
								{#if item.key === 'fillColor'}
									<input type="color" bind:value={fillColor} class="color-picker" />
								{:else if item.key === 'strokeColor'}
									<input type="color" bind:value={strokeColor} class="color-picker" />
								{:else if item.key === 'unfilledColor'}
									<input type="color" bind:value={unfilledColor} class="color-picker" />
								{:else}
									<input type="color" bind:value={strokeUnfilledColor} class="color-picker" />
								{/if}
								<span class="color-swatch" style="background: {item.color}; border-color: {item.color}22;"></span>
								<span class="text-[11px] font-mono text-zinc-500 uppercase truncate">{item.color}</span>
							</div>
						</label>
					{/each}
				</div>
			</section>

			<!-- Options -->
			<section class="panel-section">
				<h3 class="section-title">Options</h3>

				<div class="space-y-px">
					<div class="toggle-row">
						<span class="text-sm text-zinc-400">Read only</span>
						<button
							role="switch"
							aria-checked={readOnly}
							aria-label="Toggle read only"
							class="toggle {readOnly ? 'toggle-on' : ''}"
							on:click={() => (readOnly = !readOnly)}
						><span class="toggle-thumb"></span></button>
					</div>

					<div class="toggle-row">
						<span class="text-sm text-zinc-400">Show score</span>
						<button
							role="switch"
							aria-checked={showScore}
							aria-label="Toggle show score"
							class="toggle {showScore ? 'toggle-on' : ''}"
							on:click={() => (showScore = !showScore)}
						><span class="toggle-thumb"></span></button>
					</div>
				</div>
			</section>

			<!-- Actions -->
			<div class="flex gap-2 p-4 mt-auto border-t border-zinc-900">
				<button
					on:click={reset}
					class="flex-1 py-2 rounded-lg border border-zinc-800 text-zinc-500 text-xs font-medium hover:border-zinc-700 hover:text-zinc-300 transition-colors cursor-pointer"
				>Reset</button>
				<button
					on:click={copyCode}
					class="flex-[2] flex items-center justify-center gap-1.5 py-2 rounded-lg border border-indigo-700 bg-indigo-900/60 text-indigo-300 text-xs font-medium hover:bg-indigo-800/60 hover:border-indigo-500 transition-colors cursor-pointer"
				>
					{#if copied}
						<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M13.7 4.3l-8 8-3.4-3.4 1.4-1.4 2 2 6.6-6.6z"/></svg>
						Copied!
					{:else}
						<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2a2 2 0 00-2 2v9h1V4a1 1 0 011-1h7V2H4zm2 3a2 2 0 012-2h5a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V5z"/></svg>
						Copy code
					{/if}
				</button>
			</div>

		</aside>
	</div>

	<!-- ══ CODE DRAWER ═══════════════════════════════════════════════════════════ -->
	<div class="border-t border-zinc-900 bg-zinc-950 shrink-0" class:code-open={codeOpen}>
		<button
			on:click={() => (codeOpen = !codeOpen)}
			class="flex items-center gap-2 w-full px-5 py-2 text-zinc-600 text-xs hover:text-zinc-400 transition-colors cursor-pointer"
		>
			<svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor"
				style="transform: rotate({codeOpen ? 180 : 0}deg); transition: transform .2s">
				<path d="M8 10.7L2 4.7l1.4-1.4L8 7.9l4.6-4.6L14 4.7z"/>
			</svg>
			{codeOpen ? 'Hide' : 'Show'} code
		</button>

		{#if codeOpen}
			<pre class="px-5 pb-4 font-mono text-[11px] leading-relaxed text-zinc-500 overflow-x-auto max-h-56 overflow-y-auto"><code>{code}</code></pre>
		{/if}
	</div>

	<!-- ══ FOOTER ════════════════════════════════════════════════════════════════ -->
	<footer class="px-5 py-2.5 text-center text-[11px] text-zinc-700 border-t border-zinc-900 shrink-0">
		Developed with ❤️ by
		<a href="https://www.ernane.dev" target="_blank" rel="noopener" class="text-zinc-600 hover:text-indigo-400 transition-colors">Ernane Ferreira</a>
	</footer>

</div>

<style>
	/* ── app shell ──────────────────────────────────────────────────────────── */
	:global(*, *::before, *::after) { box-sizing: border-box; margin: 0; padding: 0; }
	:global(body) {
		font-family: 'Inter', system-ui, -apple-system, sans-serif;
		background: #09090b;
		color: #e4e4e7;
		height: 100dvh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.app {
		display: flex;
		flex-direction: column;
		height: 100dvh;
		overflow: hidden;
	}

	/* ── topbar ─────────────────────────────────────────────────────────────── */
	.topbar {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0 1.25rem;
		height: 48px;
		border-bottom: 1px solid #18181b;
		flex-shrink: 0;
		background: #09090b;
	}

	/* ── workspace split ────────────────────────────────────────────────────── */
	.workspace {
		display: grid;
		grid-template-columns: 1fr 300px;
		flex: 1;
		min-height: 0;
	}

	/* ── preview ────────────────────────────────────────────────────────────── */
	.preview {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.75rem;
		padding: 2.5rem;
		border-right: 1px solid #18181b;
		overflow: hidden;
		transition: background 0.5s ease;
	}

	.preview-stage {
		padding: 3.5rem 5rem;
		border-radius: 24px;
		background: #111113;
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 260px;
		transition: box-shadow 0.5s ease;
	}

	/* ── live indicator ─────────────────────────────────────────────────────── */
	.live-badge {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: #3f3f46;
	}
	.live-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #27272a;
		transition: background 0.3s, box-shadow 0.3s;
	}
	.live-active .live-dot {
		background: #4ade80;
		box-shadow: 0 0 10px #4ade8088;
	}

	/* ── presets ────────────────────────────────────────────────────────────── */
	.preset-dot {
		width: 18px;
		height: 18px;
		border-radius: 50%;
		border: none;
		cursor: pointer;
		transition: transform 0.15s, outline-color 0.15s;
		flex-shrink: 0;
	}
	.preset-dot:hover { transform: scale(1.25); }

	/* ── panel ──────────────────────────────────────────────────────────────── */
	.panel {
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		background: #0c0c0e;
		scrollbar-width: thin;
		scrollbar-color: #27272a transparent;
	}

	.panel-section {
		padding: 0.875rem 1rem;
		border-bottom: 1px solid #18181b;
	}

	.section-title {
		font-size: 0.6rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: #52525b;
		margin-bottom: 0.75rem;
	}

	/* ── control rows ───────────────────────────────────────────────────────── */
	.control-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.55rem;
	}
	.control-row:last-child { margin-bottom: 0; }

	.ctrl-label {
		font-size: 0.72rem;
		color: #71717a;
		width: 38px;
		flex-shrink: 0;
	}

	/* ── slider ─────────────────────────────────────────────────────────────── */
	.slider-wrap {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}

	.slider {
		flex: 1;
		-webkit-appearance: none;
		appearance: none;
		height: 3px;
		border-radius: 3px;
		background: linear-gradient(to right, #818cf8 var(--fill, 0%), #27272a var(--fill, 0%));
		outline: none;
		cursor: pointer;
	}
	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 13px;
		height: 13px;
		border-radius: 50%;
		background: #fafafa;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
		cursor: pointer;
		transition: transform 0.12s, box-shadow 0.12s;
	}
	.slider::-webkit-slider-thumb:hover {
		transform: scale(1.3);
		box-shadow: 0 0 0 5px rgba(129, 140, 248, 0.18), 0 1px 4px rgba(0, 0, 0, 0.6);
	}
	.slider::-moz-range-thumb {
		width: 13px;
		height: 13px;
		border-radius: 50%;
		border: none;
		background: #fafafa;
		cursor: pointer;
	}

	.ctrl-output {
		font-size: 0.68rem;
		font-family: 'Fira Code', monospace;
		color: #a1a1aa;
		min-width: 38px;
		text-align: right;
		flex-shrink: 0;
	}

	/* ── number inputs ──────────────────────────────────────────────────────── */
	.num-input {
		background: #18181b;
		border: 1px solid #27272a;
		border-radius: 6px;
		padding: 0.3rem 0.4rem;
		color: #e4e4e7;
		font-size: 0.7rem;
		width: 100%;
		outline: none;
		font-family: 'Fira Code', monospace;
		transition: border-color 0.15s;
	}
	.num-input:focus { border-color: #818cf8; }

	/* ── color controls ─────────────────────────────────────────────────────── */
	.color-control {
		cursor: pointer;
	}

	.color-row {
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.4rem;
		background: #18181b;
		border: 1px solid #27272a;
		border-radius: 7px;
		padding: 0.3rem 0.5rem;
		transition: border-color 0.15s;
		overflow: hidden;
	}
	.color-row:hover { border-color: #3f3f46; }

	.color-picker {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
	}

	.color-swatch {
		width: 13px;
		height: 13px;
		border-radius: 3px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		flex-shrink: 0;
	}

	/* ── toggles ────────────────────────────────────────────────────────────── */
	.toggle-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 0;
		border-bottom: 1px solid #18181b;
	}
	.toggle-row:last-child { border-bottom: none; }

	.toggle {
		position: relative;
		width: 36px;
		height: 20px;
		border-radius: 10px;
		border: 1px solid #27272a;
		background: #18181b;
		cursor: pointer;
		transition: background 0.2s, border-color 0.2s;
		padding: 0;
		flex-shrink: 0;
	}
	.toggle-on {
		background: #3730a3;
		border-color: #818cf8;
	}
	.toggle-thumb {
		position: absolute;
		top: 2px;
		left: 2px;
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background: #52525b;
		transition: transform 0.2s, background 0.2s;
	}
	.toggle-on .toggle-thumb {
		transform: translateX(16px);
		background: #c7d2fe;
	}

	/* ── responsive ─────────────────────────────────────────────────────────── */
	@media (max-width: 640px) {
		:global(body) { overflow: auto; height: auto; }
		.app { height: auto; }
		.workspace { grid-template-columns: 1fr; }
		.preview { border-right: none; border-bottom: 1px solid #18181b; min-height: 300px; }
		.panel { max-height: none; }
	}
</style>
