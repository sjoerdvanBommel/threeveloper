<script lang="ts">
	import { fade } from 'svelte/transition';
	import Gallery from '../components/gallery/gallery.svelte';
	import ThemeSwitch from '../components/header/theme-switch.svelte';
	import { Themes, theme } from '../stores/theme';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<header class="flex justify-between h-28 md:h-32 lg:h-36 xl:h-40 w-full py-4 px-6" transition:fade>
	<img
		src={`/images/threeveloper logo transparent${$theme === Themes.Dark ? ' light' : ''}.png`}
		alt="Threeveloper logo"
	/>
	<h1
		class="bg-clip-text font-headings text-center bg-gradient-to-r from-title-primary to-title-secondary text-transparent break-all h-full flex items-center"
	>
		Gallery App
	</h1>
	<div>
		<ThemeSwitch />
	</div>
</header>

<main class="w-full grow mt-8 flex flex-col px-6 pb-6">
	<Gallery photos={data.photos} />
</main>
