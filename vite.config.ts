// @ts-expect-error -- sveltekit is exported via package.json. TS only checks folder structure
import { sveltekit } from '@sveltejs/kit/vite';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
		exclude: ['src/e2e/**/*'],
		setupFiles: ['src/test/msw/setupTests.ts'],
		globals: true,
		environment: 'jsdom',
		coverage: {
			...configDefaults.coverage,
			exclude: [
				...configDefaults.coverage.exclude,
				'src/test/**/*',
				'src/e2e/**/*',
				'.svelte-kit/**/*',
				'playwright.config.ts',
				'postcss.config.cjs',
				'svelte.config.js',
				'tailwind.config.cjs',
				'static/**/*',
				'**/types.ts'
			]
		}
	},
	resolve: {
		alias: {
			timers: 'rollup-plugin-node-polyfills/polyfills/timers'
		}
	}
});
