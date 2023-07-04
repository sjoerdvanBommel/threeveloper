<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { PageData } from '../../routes/$types';
	import debounce from '../../utils/directives/debounce';
	import GalleryItem from './gallery-item.svelte';

	let value = $page.url.searchParams.get('query');

	export let photos: PageData['photos'];

	$: if (value !== $page.url.searchParams.get('query')) {
		photos = [];
	}

	function search() {
		goto(`?query=${value}`);
	}
</script>

<div class="px-6">
	<div class="w-full flex justify-end">
		<input
			type="text"
			class="py-1 px-4 rounded shadow-lg max-w-xs w-full mb-6 text-white bg-black"
			placeholder="What are you looking for?"
			bind:value
			use:debounce
			on:debounced={search}
		/>
	</div>
	<div class="gap-6 columns-[15rem_auto]">
		{#each photos as photo}
			<GalleryItem {photo} />
		{/each}
	</div>
</div>
