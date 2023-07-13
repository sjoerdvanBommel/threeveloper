import { debounce } from './debounce';

// TODO: Implement when `svelte-htm` package supports svelte 4
describe('debounce', () => {
	it.todo(
		'dispatches debounced event after specified amount of milliseconds of input change',
		() => {
			// const mock = vi.fn();
			// render(html` <input use:debounce=${5} on:debounced=${mock} /> `);
			// expect(mock).toHaveBeenCalledTimes(1);
		}
	);

	it.todo('returns destroy method to stop debouncing after input changes');

	it('throws when delay is 0', () => {
		expect(() => debounce(document.createElement('div'), 0)).toThrow();
	});

	it('throws when delay is negative', () => {
		expect(() => debounce(document.createElement('div'), -1)).toThrow();
	});
});
