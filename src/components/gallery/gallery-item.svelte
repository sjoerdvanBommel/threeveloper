<script lang="ts">
	import { isSm, isSmaller } from '@stores/breakpoints';
	import { getPhotoVariantDimensions } from '@utils/photo/get-photo-variant-dimensions';
	import type { Photo } from '@utils/photo/types';
	import { fly } from 'svelte/transition';
	import ProgressiveImage from './progressive-image.svelte';

	export let photo: Photo;
	export let transitionDelay = 0;

	let flyParams =
		$isSmaller || $isSm ? { x: -400 } : { y: 400, duration: 200, delay: transitionDelay };

	const { width, height } = getPhotoVariantDimensions(photo);
</script>

<div class="relative mb-6" transition:fly|global={flyParams}>
	<a
		href={`/photos/${photo.id}`}
		data-sveltekit-noscroll
		class="block shadow-inset hover:shadow-inner focus:shadow-inner group transition-shadow rounded overflow-hidden"
	>
		<ProgressiveImage
			{width}
			{height}
			lowQualityUrl={photo.urls['thumb']}
			highQualityUrl={photo.urls['small']}
			alt={photo.alt_description ?? photo.description ?? `Photo made by ${photo.user.name}`}
			class="group-hover:scale-105 scale-100 group-focus:scale-105 transition-transform ease-in-out min-w-full relative -z-10"
		/>
	</a>
</div>
