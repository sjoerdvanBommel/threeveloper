import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess({})],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			'@clients': path.resolve('./src/clients'),
			'@components': path.resolve('./src/components'),
			'@services': path.resolve('./src/services'),
			'@stores': path.resolve('./src/stores'),
			'@utils': path.resolve('./src/utils'),
			'@test': path.resolve('./src/test')
		}
	}
};

export default config;
