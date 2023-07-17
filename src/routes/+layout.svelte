<script>
	import { dev } from '$app/environment';
	import { PUBLIC_E2E_TESTING, PUBLIC_MSW_ENABLED } from '$env/static/public';
	import { theme } from '@stores/theme';
	import '../app.postcss';

	const isMswEnabled = (dev && PUBLIC_MSW_ENABLED === 'true') || PUBLIC_E2E_TESTING === 'true';
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
		class={`${$theme}-theme overflow-y-scroll h-screen`}
		data-sveltekit-reload={dev && PUBLIC_MSW_ENABLED === 'true' ? true : 'off'}
	>
		<div class={`h-full flex flex-col text-black`}>
			<div id="background" class="w-full h-full bg-white fixed inset-0 -z-10" />
			<slot />
		</div>
	</div>
{/if}
