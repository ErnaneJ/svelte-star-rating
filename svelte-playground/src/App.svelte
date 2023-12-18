<script>
	// https://github.com/ErnaneJ/svelte-star-rating
	import StarRatting from "@ernane/svelte-star-rating";
	
	let config = {
		readOnly: false,
    countStars: 5,
    range: { min: 0, max: 5, step: 0.001 },
    score: 3.785,
		showScore: true,
		name: "star-configuration",
    scoreFormat: function(){ return `(${this.score.toFixed(0)}/${this.countStars})` },
		starConfig: {
      size: 30,
      fillColor: '#F9ED4F',
      strokeColor: "#000000",
			unfilledColor: '#FFFFFF',
      strokeUnfilledColor: '#000000F'
    }
  }
	
	const changeSliderInput = () => console.table(config);
</script>

<main>
	<div class="content">
		<div class="star-rating">
			<StarRatting bind:config on:change={changeSliderInput}/>
		</div>
		
		<div class="controllers">
			<div class="form-group">
				<label class="label-input" for="count-stars">Number of Stars</label>
				<input class="star-input" type="number" name="count-stars" bind:value={config.countStars} step="1" min="0"/>
			</div>
			<div class="form-group">
				<label class="label-input" for="range-min">Range - min</label>
				<input class="star-input" type="number" name="range-min" bind:value={config.range.min} step="{config.range.step}" min="0"/>
			</div>
			<div class="form-group">
				<label class="label-input" for="range-max">Range - max</label>
				<input class="star-input" type="number" name="range-max" bind:value={config.range.max} step="{config.range.step}" min="0"/>
			</div>
			<div class="form-group">
				<label class="label-input" for="range-step">Range - step</label>
				<input class="star-input" type="number" name="range-step" bind:value={config.range.step} step="0.001" min="0"/>
			</div>
			<div class="form-group">
				<label class="label-input" for="range-score">Score</label>
				<input class="star-input" type="number" name="range-score" bind:value={config.score} step="{config.range.step}" min="0"/>
			</div>
			<div class="form-group">
				<label class="label-input" for="size-stars">Stars - Size Stars</label>
				<input class="star-input" type="number" name="size-stars" bind:value={config.starConfig.size} step="1" min="0"/>
			</div>
			<div class="form-group">
				<label class="label-input" for="fill-color">Stars - Fill Collor</label>
				<input class="star-input input-color" type="color" name="fill-color" bind:value={config.starConfig.fillColor}  step="1" min="0"/>
			</div>
			<div class="form-group">
				<label class="label-input" for="stroke-color">Stars - Stroke Collor</label>
				<input class="star-input input-color" type="color" name="stroke-color" bind:value={config.starConfig.strokeColor} step="1" min="0"/>
			</div>
			<div class="form-group">
				<label class="label-input" for="fill-color">Stars - Unfilled Color</label>
				<input class="star-input input-color" type="color" name="fill-color" bind:value={config.starConfig.unfilledColor}  step="1" min="0"/>
			</div>
			<div class="form-group">
				<label class="label-input" for="stroke-color">Stars - Stroke Collor</label>
				<input class="star-input input-color" type="color" name="stroke-color" bind:value={config.starConfig.strokeUnfilledColor} step="1" min="0"/>
			</div>
			
			<button class="read-only" on:click={() => config.readOnly = !config.readOnly}>{config.readOnly ? "Enable" : "Disable (Read Only)"}</button>
		</div>
	</div>
</main>
<footer>
	<p>Developed with ❤️ by <a target="_blank" href="https://www.ernane.dev">Ernane Ferreira</a>.</p>
</footer>

<style>
	:global(*){ margin: 0; padding: 0; box-sizing: border-box; }
	:global(body){ color: #333; margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif; background-color: #161927; }
	
	input:not([type="color"]){ background-color: white; color: black; padding: .5rem; }
	
	.label-input{ margin-bottom: .5rem; }
	
	.input-color{ border: none; cursor: pointer; }
	.input-color::-webkit-color-swatch-wrapper { padding: 0; }
	.input-color::-webkit-color-swatch { border: none; }
	.input-color::-moz-color-swatch { border: none; }
	.input-color::-moz-focus-inner { border: none; padding: 0; }
	
	.star-input{ border-radius: .25rem; outline: none; border: 1px solid #ddd; width: 100%; }
	
	main { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; }
	
	.content{ background-color: white; padding: 1rem 2rem; border-radius: 1rem; }
	.controllers{ display: grid; grid-template-columns: repeat(2, 1fr); gap: .5rem; margin-top: 1rem; }
	
	.read-only{ grid-column: 1 / 3; color: white; border: none; background-color: #576EE0; padding: .5rem .75rem; border-radius: .5rem; cursor: pointer; }
	.read-only:hover{opacity: .98;}
	
	footer{ position: absolute; bottom: 1rem; width: 100%; display: flex; align-items: center; justify-content: center; color: #ccc; }
	footer p a{ color: #576EE0}
</style>