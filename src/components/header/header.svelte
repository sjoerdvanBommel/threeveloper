<script>
	import { Themes, theme } from '../../stores/theme';
	import ThemeSwitch from './theme-switch.svelte';
</script>

<header class="flex justify-between h-24 w-full py-2 px-6">
	<img
		src={`/images/threeveloper logo transparent${$theme === Themes.Dark ? ' light' : ''}.png`}
		alt="Threeveloper logo"
	/>
	<h1
		class="bg-clip-text font-headings text-center bg-gradient-to-r from-title-primary to-title-secondary text-transparent break-all h-fit self-center"
	>
		Gallery App
	</h1>
	<div>
		<ThemeSwitch />
	</div>
</header>
