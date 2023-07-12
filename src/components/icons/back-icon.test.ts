import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import BackIcon from './back-icon.svelte';

describe('BackIcon', () => {
	test('performs onSelect on click', async () => {
		const onSelect = vi.fn();
		render(BackIcon, { onSelect });

		const iconButton = screen.getByRole('button');
		await userEvent.pointer({ keys: '[MouseLeft]', target: iconButton });

		expect(onSelect).toBeCalledTimes(1);
	});

	test('performs onSelect on enter press', async () => {
		const onSelect = vi.fn();
		render(BackIcon, { onSelect });

		await userEvent.keyboard('{tab}{enter}');

		expect(onSelect).toBeCalledTimes(1);
	});

	test('performs onSelect on space press', async () => {
		const onSelect = vi.fn();
		render(BackIcon, { onSelect });

		await userEvent.keyboard('{tab} ');

		expect(onSelect).toBeCalledTimes(1);
	});
});
