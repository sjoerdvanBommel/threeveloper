import { render, screen } from '@testing-library/svelte';
import DiamondSpinner from './diamond-spinner.svelte';

describe('DiamondSpinner', () => {
	test('is accessible', () => {
		render(DiamondSpinner);

		expect(screen.getByTitle('Loading')).toBeDefined();
	});
});
