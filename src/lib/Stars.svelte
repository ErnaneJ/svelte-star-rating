<script lang="ts">
	import Star from './components/Star.svelte';
	import type { RatingConfig, StarConfig } from './types.js';

	const DEFAULT_STAR_CONFIG: Required<StarConfig> = {
		size: 30,
		fillColor: '#F9ED4F',
		strokeColor: '#BB8511',
		unfilledColor: '#FFF',
		strokeUnfilledColor: '#000'
	};

	export let config: RatingConfig = {};

	$: readOnly = config.readOnly ?? false;
	$: countStars = config.countStars ?? 5;
	$: range = config.range ?? { min: 0, max: 5, step: 0.001 };
	$: score = config.score ?? 0;
	$: showScore = config.showScore ?? true;
	$: name = config.name ?? 'stars';
	$: starConfig = { ...DEFAULT_STAR_CONFIG, ...(config.starConfig ?? {}) };

	function getFormattedScore(): string {
		if (config.scoreFormat) return config.scoreFormat(score, countStars);
		return `(${parseFloat(((score / countStars) * 100).toFixed(2))}%)`;
	}

	function onInput(e: Event) {
		config = { ...config, score: +(e.currentTarget as HTMLInputElement).value };
	}
</script>

<section class="stars-container">
	<div class="range-stars">
		<div class="stars">
			{#each Array(countStars) as _, id}
				{#if Math.floor(score) === id}
					<Star
						id={name + id}
						{readOnly}
						{starConfig}
						fillPercentage={score - Math.floor(score)}
					/>
				{:else if Math.floor(score) > id}
					<Star id={name + id} {readOnly} {starConfig} fillPercentage={1} />
				{:else}
					<Star id={name + id} {readOnly} {starConfig} fillPercentage={0} />
				{/if}
			{/each}
		</div>
		<input
			{name}
			class="slider"
			type="range"
			min={readOnly ? score : range.min}
			max={readOnly ? score : range.max}
			step={range.step}
			value={score}
			on:input={onInput}
			on:change
			on:click
			aria-label="Star rating: {score} out of {countStars}"
		/>
	</div>
	{#if showScore}
		<span class="show-score" style="font-size: {starConfig.size / 2}px;">
			{getFormattedScore()}
		</span>
	{/if}
</section>

<style>
	.stars-container {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}
	.range-stars {
		position: relative;
	}
	.stars {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}
	.slider {
		opacity: 0;
		cursor: pointer;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 100%;
	}
	.show-score {
		user-select: none;
		color: #888;
	}
</style>
