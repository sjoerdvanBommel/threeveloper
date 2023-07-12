import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { get } from 'svelte/store';
import { theme } from '../../stores/theme';
import ThemeSwitch from './theme-switch.svelte';

describe('ThemeSwitch', () => {
	test('sets theme to light by default', () => {
		render(ThemeSwitch);

		const switchElement = screen.getByRole('switch');

		expect(switchElement).toHaveAttribute('aria-checked', 'false');
	});

	describe('Switch', () => {
		beforeEach(() => {
			theme.set('light');
		});

		test('changes theme when enter is pressed', async () => {
			render(ThemeSwitch);

			const switchElement = screen.getByRole('switch');
			// Tab to select the switch
			await userEvent.keyboard('{tab}{enter}');

			expect(switchElement).toHaveAttribute('aria-checked', 'true');
			expect(get(theme)).toBe('dark');
		});

		test('changes theme when space is pressed', async () => {
			render(ThemeSwitch);

			const switchElement = screen.getByRole('switch');
			// Tab to select the switch
			await userEvent.keyboard('{tab} ');

			expect(switchElement).toHaveAttribute('aria-checked', 'true');
			expect(get(theme)).toBe('dark');
		});

		test('changes theme when switch is clicked', async () => {
			render(ThemeSwitch);

			const switchElement = screen.getByRole('switch');
			await userEvent.pointer({ keys: '[MouseLeft]', target: switchElement });

			expect(switchElement).toHaveAttribute('aria-checked', 'true');
			expect(get(theme)).toBe('dark');
		});

		test('changes theme back when switch is clicked twice', async () => {
			render(ThemeSwitch);

			const switchElement = screen.getByRole('switch');
			await userEvent.pointer({ keys: '[MouseLeft][MouseLeft]', target: switchElement });

			expect(switchElement).toHaveAttribute('aria-checked', 'false');
			expect(get(theme)).toBe('light');
		});
	});
});
