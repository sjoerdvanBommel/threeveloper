import { readable } from 'svelte/store';

export const createMediaQueryStore = (mediaQueryString: string) => {
	const store = readable(false, (set) => {
		if (typeof window === 'undefined') {
			// Return a cleanup function that does nothing during SSR
			return () => {};
		}

		const mediaQueryList = window.matchMedia(mediaQueryString);

		const onchange = (event: MediaQueryListEvent) => {
			set(event.matches);
		};

		set(mediaQueryList.matches);
		mediaQueryList.addEventListener('change', onchange);

		return () => {
			mediaQueryList.removeEventListener('change', onchange);
		};
	});

	return store;
};
