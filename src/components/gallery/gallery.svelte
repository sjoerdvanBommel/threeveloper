<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import type { PageData } from '../../routes/$types';
	import debounce from '../../utils/directives/debounce';
	import DiamondSpinner from '../diamond-spinner.svelte';
	import GalleryItem from './gallery-item.svelte';

	export let photos: PageData['photos'];
	let value = $page.url.searchParams.get('query');
	let loading = false;

	$: if (value !== $page.url.searchParams.get('query')) {
		photos = [];
	}

	async function search() {
		await goto(`?query=${value}`);
		loading = false;
	}
</script>

<div class="w-full flex justify-end">
	<!-- svelte-ignore a11y-autofocus -->
	<input
		type="text"
		class="py-1 px-4 rounded shadow-lg max-w-xs w-full mb-6 text-white bg-black focus:outline-none"
		placeholder="What are you looking for?"
		bind:value
		autofocus
		use:debounce
		on:debounced={search}
		on:input={() => (loading = true)}
		transition:fade={{ duration: 200 }}
	/>
</div>
{#if loading}
	<div class="w-full grow flex justify-center items-center">
		<DiamondSpinner size={100} />
	</div>
{:else if $page.url.searchParams.get('query')?.length === 0}
	<span class="text-lg text-center inline-block w-full">Search to get a list of photos</span>
{:else}
	<div class="gap-6 columns-[15rem_auto]">
		{#each photos as photo, i}
			<GalleryItem {photo} transitionDelay={i * 10} />
		{/each}
	</div>
{/if}
