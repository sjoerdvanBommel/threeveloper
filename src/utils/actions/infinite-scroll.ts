import type { ActionReturn } from 'svelte/action';

export function infiniteScroll(node: HTMLElement, callback: () => void): ActionReturn {
	const handleIntersection: IntersectionObserverCallback = (entries) => {
		entries.forEach((entry) => {
			// Checking for not intersecting because of root top margin of -100%,
			// which means the bottom of the screen "left" the element and therefore we reached the end of the element
			// An additional 10% is added so the callback is triggered slightly earlier
			if (!entry.isIntersecting) {
				callback();
			}
		});
	};

	const observer = new IntersectionObserver(handleIntersection, {
		rootMargin: `-110% 0px 10% 0px`,
		threshold: 0,
		root: document.querySelector('#scroll-root')
	});
	observer.observe(node);

	return {
		destroy: () => {
			observer.disconnect();
		}
	};
}
