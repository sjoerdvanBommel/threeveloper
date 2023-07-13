import type * as EnvironmentType from '$app/environment';
import type * as NavigationType from '$app/navigation';
import type * as StoresType from '$app/stores';
import type { Navigation, Page } from '@sveltejs/kit';
import '@testing-library/jest-dom';
import mediaQuery from 'css-mediaquery';
import { readable } from 'svelte/store';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from './server';

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

// Define mock implementations for methods that are not implemented by JSDOM yet
setScreenSize(1920);

export function setScreenSize(width: number) {
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: vi.fn().mockImplementation((query) => ({
			matches: mediaQuery.match(query, { width }),
			media: '',
			onchange: null,
			addListener: vi.fn(), // deprecated
			removeListener: vi.fn(), // deprecated
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn()
		}))
	});
}

// Mock SvelteKit runtime module $app/environment
vi.mock('$app/environment', (): typeof EnvironmentType => ({
	browser: false,
	dev: true,
	building: false,
	version: 'any'
}));

// Mock SvelteKit runtime module $app/navigation
export const navigationParams: typeof NavigationType = {
	afterNavigate: () => {},
	beforeNavigate: () => {},
	disableScrollHandling: () => {},
	goto: vi.fn(),
	invalidate: () => Promise.resolve(),
	invalidateAll: () => Promise.resolve(),
	preloadData: () => Promise.resolve(),
	preloadCode: () => Promise.resolve()
};

vi.mock('$app/navigation', () => navigationParams);

// Mock SvelteKit runtime module $app/stores
vi.mock('$app/stores', (): typeof StoresType => {
	const getStores: typeof StoresType.getStores = () => {
		const navigating = readable<Navigation | null>(null);
		const page = readable<Page>({
			url: new URL('http://localhost:5173'),
			params: {},
			route: {
				id: null
			},
			status: 200,
			error: null,
			data: {},
			form: undefined
		});
		const updated = { subscribe: readable(false).subscribe, check: async () => false };

		return { navigating, page, updated };
	};

	const page: typeof StoresType.page = {
		subscribe(fn) {
			return getStores().page.subscribe(fn);
		}
	};
	const navigating: typeof StoresType.navigating = {
		subscribe(fn) {
			return getStores().navigating.subscribe(fn);
		}
	};
	const updated: typeof StoresType.updated = {
		subscribe(fn) {
			return getStores().updated.subscribe(fn);
		},
		check: async () => false
	};

	return {
		getStores,
		navigating,
		page,
		updated
	};
});

vi.stubGlobal(
	'IntersectionObserver',
	vi.fn(() => ({
		disconnect: vi.fn(),
		observe: vi.fn(),
		takeRecords: vi.fn(),
		unobserve: vi.fn()
	}))
);
