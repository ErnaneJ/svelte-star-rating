<script lang="ts">
	// intentionally empty — layout only provides app shell
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="shell">
	<slot />
</div>

<style>
	:global(*, *::before, *::after) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
	:global(body) {
		font-family: 'Inter', system-ui, -apple-system, sans-serif;
		background: #0f1120;
		color: #e2e8f0;
		min-height: 100vh;
	}
	.shell {
		max-width: 780px;
		margin: 0 auto;
		padding: 3rem 1.25rem 1rem;
	}
</style>
