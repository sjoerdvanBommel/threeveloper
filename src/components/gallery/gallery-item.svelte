<script lang="ts">
	import { scale } from 'svelte/transition';
	import type { PageData } from '../../routes/$types';
	import { getPhotoVariantDimensions } from '../../utils/get-photo-dimensions';

	export let photo: PageData['photos'][0];
	let loaded = false;

	const { width, height } = getPhotoVariantDimensions(photo);
</script>

<div class="relative mb-6" in:scale={{ duration: 200 }} out:scale={{ duration: 200 }}>
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
