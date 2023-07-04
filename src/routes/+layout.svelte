<script>
	import '../app.postcss';
	import Header from '../components/header/header.svelte';
	import { theme } from '../stores/theme';
</script>

<div class={`${$theme}-theme h-full flex flex-col p-6`}>
	<div
		id="background"
		class="w-full h-full bg-gradient-to-br from-bg-primary to-bg-secondary fixed inset-0 -z-10"
	/>
	<Header />
	<slot />
</div>
