<script lang="ts">
	import { onMount } from 'svelte';
	import type { HTMLImgAttributes } from 'svelte/elements';

	export let lowQualityUrl: $$Props['lowQualityUrl'];
	export let highQualityUrl: $$Props['highQualityUrl'];
	export let alt: $$Props['alt'];

	interface $$Props extends HTMLImgAttributes {
		lowQualityUrl: string;
		highQualityUrl: string;
		alt: string;
	}

	let loaded = false;
	let imageElement: HTMLImageElement;

	onMount(() => {
		if (imageElement.complete) {
			loaded = true;
		}
	});
</script>

<img
	{...$$restProps}
	{alt}
	loading="lazy"
	src={!loaded ? lowQualityUrl : highQualityUrl}
	bind:this={imageElement}
	on:load={() => (loaded = true)}
/>
