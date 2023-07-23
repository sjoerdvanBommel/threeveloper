<script lang="ts">
	import { Themes, theme } from '@stores/theme';
	import { fade } from 'svelte/transition';
	import ThemeSwitch from './theme-switch.svelte';
</script>

<header
	class="flex justify-between h-28 md:h-32 lg:h-36 xl:h-40 py-4 px-6 lg:px-10"
	transition:fade
>
	<img
		class="p-4"
		src={`/images/logo${$theme === Themes.Dark ? ' light' : ''}.svg`}
		alt="Threeveloper logo"
	/>
	<h1 class="text-center self-center text-black">Unsplash gallery</h1>
	<div>
		<ThemeSwitch />
	</div>
</header>
