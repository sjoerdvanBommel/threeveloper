<script lang="ts">
	import ProgressiveImage from '@components/gallery/progressive-image.svelte';
	import BackIcon from '@components/icons/back-icon.svelte';
	import { isSm, isSmaller } from '@stores/breakpoints';
	import { fade, fly } from 'svelte/transition';
	import type { PageData } from './$types';

	export let data: PageData;
	const { photo } = data;

	let flyOptions = $isSmaller || $isSm ? { x: 600, duration: 200 } : { y: -1000, duration: 600 };
</script>

<div class="w-full h-full fixed flex">
	<div
		class="w-full h-full absolute"
		in:fly={flyOptions}
		out:fly={{ ...flyOptions, duration: 200 }}
	>
		<ProgressiveImage
			class="w-full h-full absolute object-cover"
			lowQualityUrl={photo.urls.small}
			highQualityUrl={photo.urls.full}
			alt={photo.alt_description ?? photo.description ?? `Photo made by ${photo.user.name}`}
		/>

		<ProgressiveImage
			class="w-full h-full object-contain backdrop-blur-3xl"
			lowQualityUrl={photo.urls.small}
			highQualityUrl={photo.urls.full}
			alt={photo.alt_description ?? photo.description ?? `Photo made by ${photo.user.name}`}
		/>
	</div>

	<div
		class="grow flex flex-col justify-between relative p-10 select-none bg-gradient-to-t from-white/70 from-0% to-white/0 to-25%"
		in:fade|global
	>
		<div>
			<BackIcon onSelect={() => history.back()} />
		</div>
		<div class="flex items-center flex-col md:flex-row">
			<img
				src={photo.user.profile_image.medium}
				alt="User profile"
				class="h-16 w-16 rounded-full mb-2 md:mb-0 mr-4 shrink-0"
			/>
			<div class="flex flex-col select-text text-center md:text-start">
				<span class="text-3xl md:text-5xl mb-2" data-testid="description"
					>{photo.alt_description ?? photo.description}</span
				>
				<span class="text-lg md:text-xl"
					>Photo by
					{#if photo.user.portfolio_url || photo.links.html}
						<a
							target="_blank"
							href={photo.user.portfolio_url ??
								`${photo.links.html}?utm_source=Gallery%20App&utm_medium=referral`}
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
