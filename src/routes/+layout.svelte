<script>
	import '../app.postcss';
	import { theme } from '../stores/theme';
</script>

<div class={`${$theme}-theme h-full flex flex-col`}>
	<div
		id="background"
		class="w-full h-full bg-gradient-to-br from-bg-primary to-bg-secondary fixed inset-0 -z-10"
	/>
	<slot />
</div>
