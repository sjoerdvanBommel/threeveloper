// @ts-expect-error -- Export config is available in @sveltejs/kit/package.json
import { sveltekit } from '@sveltejs/kit/vite';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
		setupFiles: ['src/test/msw/setupTests.ts'],
		globals: true,
		environment: 'jsdom',
		coverage: {
			...configDefaults.coverage,
			exclude: [
				...configDefaults.coverage.exclude,
				'src/test/**/*',
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
			timers: './src/test/polyfills/timers.js'
		}
	}
});
