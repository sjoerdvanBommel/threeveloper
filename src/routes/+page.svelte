<script lang="ts">
	let cookiesCollected = 0;
</script>

<div>
	<button on:click={() => cookiesCollected++}>Collect cookie</button>
	<span>{cookiesCollected} cookies collected</span>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100vh;
		justify-content: center;
		align-items: center;
	}

	button {
		border-radius: 9999px;
		aspect-ratio: 1;
		background-color: burlywood;
		padding: 1rem;
	}

	span {
		font-size: 3rem;
	}
</style>
