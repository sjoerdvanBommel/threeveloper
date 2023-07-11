// @ts-expect-error -- Export config is available in @sveltejs/kit/package.json
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
		setupFiles: ['src/test/setupTests.ts'],
		globals: true,
		environment: 'jsdom'
	}
});
