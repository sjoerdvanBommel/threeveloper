import { setScreenSize } from '@test/msw/setupTests';
import { get } from 'svelte/store';
import { createMediaQueryStore } from './media-query';

describe('createMediaQueryStore', () => {
	beforeEach(() => {
		setScreenSize(1920);
	});

	it('always returns false if window is undefined', () => {
		const tempWindow = global.window;
		// @ts-expect-error
		global.window = undefined;
		const store = createMediaQueryStore('(min-width: 0px)');

		expect(get(store)).toBe(false);

		global.window = tempWindow;
	});

	it('updates value when screen size changes', () => {
		const store = createMediaQueryStore('(min-width: 400px)');
		expect(get(store)).toBe(true);

		setScreenSize(200);

		expect(get(store)).toBe(false);
	});

	it('correctly sets value on edge cases', () => {
		setScreenSize(400);
		const store = createMediaQueryStore('(max-width: 400px)');
		expect(get(store)).toBe(true);

		setScreenSize(401);

		expect(get(store)).toBe(false);
	});

	// Additional tests for other media queries will be added if used in this codebase
});
