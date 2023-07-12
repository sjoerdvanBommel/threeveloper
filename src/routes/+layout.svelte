<script>
	import { dev } from '$app/environment';
	import { PUBLIC_MSW_ENABLED } from '$env/static/public';
	import '../app.postcss';
	import { theme } from '../stores/theme';

	const isMswEnabled = dev && PUBLIC_MSW_ENABLED === 'true';
	let isReady = !isMswEnabled;

	if (isMswEnabled) {
		import('../test/msw/inject')
			.then((res) => res.inject())
			.then(() => (isReady = true));
	}
</script>

{#if isReady}
	<div
		id="scroll-root"
		class="overflow-y-scroll h-screen"
		data-sveltekit-reload={dev && PUBLIC_MSW_ENABLED === 'true' ? true : 'off'}
	>
		<div class={`${$theme}-theme h-full flex flex-col text-black`}>
			<div
				id="background"
				class="w-full h-full bg-gradient-to-br from-bg-primary to-bg-secondary fixed inset-0 -z-10"
			/>
			<slot />
		</div>
	</div>
{/if}
