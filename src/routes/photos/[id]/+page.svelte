<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import BackIcon from '../../../components/icons/back-icon.svelte';
	import { isSm, isSmaller } from '../../../stores/breakpoints';
	import type { PageData } from './$types';

	export let data: PageData;

	let sharpImage: HTMLImageElement;

	onMount(() => {
		if (sharpImage.complete) {
			loaded = true;
		}
	});

	let loaded = false;
	const { photo } = data;
	let flyOptions = $isSmaller || $isSm ? { x: 600, duration: 200 } : { y: -1000, duration: 600 };
</script>

<div class="w-full h-full fixed flex">
	<img
		class="w-full h-full object-cover absolute"
		src={photo.urls[loaded ? 'full' : 'small']}
		alt={photo.alt_description}
		in:fly={flyOptions}
		out:fly={{ ...flyOptions, duration: 200 }}
	/>

	<img
		class="w-full h-full object-contain absolute backdrop-blur-3xl"
		src={photo.urls[loaded ? 'full' : 'small']}
		alt={photo.alt_description}
		bind:this={sharpImage}
		on:load={() => (loaded = true)}
		in:fly={flyOptions}
		out:fly={{ ...flyOptions, duration: 200 }}
	/>

	<div
		class="grow flex flex-col justify-between relative p-10 select-none bg-gradient-to-t from-white/70 from-0% to-white/0 to-25%"
		in:fade|global
	>
		<div>
			<BackIcon onSelect={() => history.back()} />
		</div>
		<div class="flex items-center flex-col md:flex-row">
			<a
				class="mb-2 md:mb-0 mr-4 shrink-0"
				target="_blank"
				href="https://unsplash.com/?utm_source=Gallery%20App&utm_medium=referral"
				><img
					src={photo.user.profile_image.medium}
					alt="User profile"
					class="h-16 w-16 rounded-full"
				/></a
			>
			<div class="flex flex-col select-text text-center md:text-start">
				<span class="text-3xl md:text-5xl mb-2">{photo.alt_description ?? photo.description}</span>
				<span class="text-lg md:text-xl"
					>Photo by
					{#if photo.user.portfolio_url}
						<a
							target="_blank"
							href={`https://unsplash.com/@${photo.user.username}?utm_source=Gallery%20App&utm_medium=referral`}
							class="underline cursor-pointer">{photo.user.name}</a
						>
					{:else}
						{photo.user.name}
					{/if}
					on
					<a
						target="_blank"
						href="https://unsplash.com/?utm_source=Gallery%20App&utm_medium=referral"
						class="underline cursor-pointer">Unsplash</a
					></span
				>
			</div>
		</div>
	</div>
</div>
