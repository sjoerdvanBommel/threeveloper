import { get } from 'svelte/store';
import { Themes, localStorageKey } from './theme';

describe('theme', () => {
	beforeEach(() => {
		// This file contains dynamic import('./theme').theme because it needs to be reset to test the default value
		vi.resetModules();
		vi.doMock('$app/environment', () => ({ browser: true }));
	});

	afterEach(() => {
		vi.doUnmock('$app/environment');
		localStorage.clear();
	});

	it('sets theme to light by default if not in browser', async () => {
		const { theme } = await import('./theme');
		vi.doMock('$app/environment', () => ({ browser: false }));

		expect(get(theme)).toBe(Themes.Light);
	});

	it('sets theme to light by default if in browser but local storage is not set', async () => {
		const { theme } = await import('./theme');

		expect(get(theme)).toBe(Themes.Light);
	});

	it('sets theme to light if in browser and local storage is set to light', async () => {
		localStorage.setItem(localStorageKey, Themes.Light);
		const { theme } = await import('./theme');

		expect(get(theme)).toBe(Themes.Light);
	});

	it('sets theme to dark if in browser and local storage is set to dark', async () => {
		localStorage.setItem(localStorageKey, Themes.Dark);
		const { theme } = await import('./theme');

		expect(get(theme)).toBe(Themes.Dark);
	});

	it('updates localStorage when value changes', async () => {
		const { theme } = await import('./theme');
		expect(localStorage.getItem(localStorageKey)).toBe(Themes.Light);

		theme.set(Themes.Dark);

		expect(localStorage.getItem(localStorageKey)).toBe(Themes.Dark);
	});
});
