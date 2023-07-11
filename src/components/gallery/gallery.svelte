<script lang="ts">
	import { browser } from '$app/environment';
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type Masonry from 'masonry-layout';
	import { onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import { getPhotos } from '../../clients/unsplash/search/get-photos';
	import type { PageData } from '../../routes/$types';
	import { infiniteScroll } from '../../utils/actions/infinite-scroll';
	import debounce from '../../utils/directives/debounce';
	import DiamondSpinner from '../spinners/diamond-spinner.svelte';
	import GalleryItem from './gallery-item.svelte';

	export let photos: PageData['photos'];
	let value = $page.url.searchParams.get('query');
	let loading = false;
	let photosPage = 1;
	let masonry: Masonry | undefined;

	$: if (value !== $page.url.searchParams.get('query')) {
		photos = [];
	}

	$: if (photos?.length && browser) {
		requestAnimationFrame(() => {
			masonry?.reloadItems?.();
			masonry?.layout?.();
		});
	}

	async function search() {
		await goto(`?query=${value}`, { keepFocus: true });
		loading = false;
	}

	async function loadMorePhotos() {
		photosPage++;

		photos = [...photos, ...(await getPhotos(value ?? undefined, photosPage)).photos];
	}

	afterNavigate(async () => {
		const Masonry = (await import('masonry-layout')).default;

		masonry = new Masonry('.gallery', {
			itemSelector: '.gallery-item',
			percentPosition: true,
			transitionDuration: 0,
			gutter: 24
		});
	});

	onDestroy(() => {
		masonry?.destroy?.();
	});
</script>

<div class="w-full flex justify-end">
	<input
		type="text"
		class="py-1 px-4 rounded shadow-lg max-w-xs w-full mb-6 text-white bg-black focus:outline-none"
		placeholder="What are you looking for?"
		bind:value
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
{:else if !photos.length}
	<span class="text-2xl text-center inline-block w-full">Search to get a list of photos</span>
{:else}
	<div class="gallery" use:infiniteScroll={loadMorePhotos}>
		{#each photos as photo, i}
			<div
				class="gallery-item [--cols:1] sm:[--cols:2] md:[--cols:3] lg:[--cols:4] xl:[--cols:5] [--gutter:24px]"
			>
				<GalleryItem {photo} transitionDelay={(photos.length - i) * 5} />
			</div>
		{/each}
	</div>
{/if}

<style>
	/* Correction for gutter which masonry-layout does not take into account */
	.gallery-item {
		width: calc((100% / var(--cols)) - (var(--gutter) * (var(--cols) - 1) / var(--cols)));
	}
</style>
