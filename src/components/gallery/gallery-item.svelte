<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { PageData } from '../../routes/$types';
	import { isSm, isSmaller } from '../../stores/breakpoints';
	import { getPhotoVariantDimensions } from '../../utils/get-photo-dimensions';

	export let photo: PageData['photos'][0];
	export let transitionDelay = 0;
	let loaded = false;
	let flyParams =
		$isSmaller || $isSm ? { x: -400 } : { y: 400, duration: 200, delay: transitionDelay };

	const { width, height } = getPhotoVariantDimensions(photo);
</script>

<div class="relative mb-6" transition:fly|global={flyParams}>
	<a
		href={`/photos/${photo.id}`}
		data-sveltekit-noscroll
		class="block shadow-inset hover:shadow-inner group transition-shadow rounded overflow-hidden"
	>
		<img
			loading="lazy"
			{width}
			{height}
			src={photo.urls[!loaded ? 'thumb' : 'small']}
			on:load={() => (loaded = true)}
			alt="Temp alt"
			class="group-hover:scale-105 scale-100 transition-transform ease-in-out min-w-full relative -z-10"
		/>
	</a>
</div>
