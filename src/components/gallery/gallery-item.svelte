<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { PageData } from '../../routes/$types';
	import { getPhotoVariantDimensions } from '../../utils/get-photo-dimensions';

	export let photo: PageData['photos'][0];
	export let transitionDelay = 0;
	let loaded = false;

	const { width, height } = getPhotoVariantDimensions(photo);
</script>

<div
	class="relative mb-6"
	transition:fly|global={{ duration: 200, delay: transitionDelay, y: 400 }}
>
	<a
		href={`/photos/${photo.id}`}
		class="block shadow-inset hover:shadow-inner group transition-shadow rounded overflow-hidden"
	>
		<img
			loading="lazy"
			{width}
			{height}
			src={photo.urls[loaded ? 'small' : 'thumb']}
			on:load={() => (loaded = true)}
			alt="Temp alt"
			class="group-hover:scale-105 scale-100 transition-transform ease-in-out min-w-full relative -z-10"
		/>
	</a>
</div>
