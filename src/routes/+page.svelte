<script lang="ts">
	let cookiesCollected = 0;
</script>

<div class="flex flex-col items-center justify-center h-screen w-screen">
	<button on:click={() => cookiesCollected++} class="rounded-full aspect-square bg-amber-200 p-4">
		Collect cookie
	</button>
	<span class="text-5xl">{cookiesCollected} cookies collected</span>
</div>
