import type { ActionReturn } from 'svelte/action';

// eslint-disable-next-line @typescript-eslint/ban-types
function waitForMs(fn: Function, delay: number) {
	let timer: NodeJS.Timeout;

	return function (...args: []) {
		clearTimeout(timer);
		timer = setTimeout(() => fn(...args), delay);
	};
}

export function debounce(node: HTMLElement, delay = 500): ActionReturn {
	if (!delay || delay <= 0) {
		throw new Error('Debounce delay must be a positive number greater than zero.');
	}

	const debouncedFunction = waitForMs((event: Event) => {
		const customEvent = new CustomEvent('debounced', { detail: event });
		node.dispatchEvent(customEvent);
	}, delay);

	node.addEventListener('input', debouncedFunction);

	return {
		destroy() {
			removeEventListener('input', debouncedFunction);
		}
	};
}
