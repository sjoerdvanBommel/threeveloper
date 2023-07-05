<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { isSm, isSmaller } from '../../../stores/breakpoints';
	import { pickContrastingColor } from '../../../utils/pick-contrasting-color';
	import type { PageData } from './$types';

	export let data: PageData;

	let loaded = false;
	const { photo } = data;
	let flyDirection = $isSmaller || $isSm ? { x: 600 } : { y: -1000 };
</script>

<div class="w-full h-full absolute">
	<img
		class="w-full h-full object-cover fixed blur-3xl"
		src={photo.urls[loaded ? 'full' : 'small']}
		alt={photo.alt_description}
		on:load={() => (loaded = true)}
		in:fade={{ duration: 200, delay: $isSmaller || $isSm ? 0 : 400 }}
		out:fade={{ duration: 200 }}
	/>

	<img
		class="w-full h-full object-contain fixed"
		src={photo.urls[loaded ? 'full' : 'small']}
		alt={photo.alt_description}
		on:load={() => (loaded = true)}
		in:fly={{ ...flyDirection, delay: $isSmaller || $isSm ? 0 : 400 }}
		out:fly={{ ...flyDirection, duration: 200 }}
	/>

	<div class="w-full h-full flex items-end relative">
		<div class="flex items-center mb-10 ml-10">
			<img
				src={photo.user.profile_image.medium}
				alt="User profile"
				class="aspect-square h-16 rounded-full mr-4"
			/>
			<div class="flex flex-col">
				<span
					class="text-5xl mb-2"
					style={`color: ${photo.color ? pickContrastingColor(photo.color) : '#fff'}`}
					>{photo.alt_description ?? photo.description}</span
				>
				<span
					class="text-xl"
					style={`color: ${photo.color ? pickContrastingColor(photo.color) : '#fff'}`}
					>{photo.user.name}</span
				>
			</div>
		</div>
	</div>
</div>
