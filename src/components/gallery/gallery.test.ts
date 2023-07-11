import { render, screen } from '@testing-library/svelte';
import { mockPhotos } from '../../test/mock-data/photos';
import Gallery from './gallery.svelte';

describe('Gallery', () => {
	test('renders input field to search for photos', async () => {
		const photos = mockPhotos;

		render(Gallery, { photos });

		const input = screen.getByRole('textbox');

		expect(input).toHaveAttribute('placeholder', 'What are you looking for?');
	});
});
