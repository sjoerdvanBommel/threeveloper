<script lang="ts">
	import { page } from '$app/stores';

	let photos = $page.data.photos ?? [];
</script>

<div class="w-full">
	{#each photos as photo}
		<img src={photo.urls.small} alt={photo.alt_description} class="inline-block" />
	{:else}
		<span>There are currently no photos to show</span>
	{/each}
</div>
