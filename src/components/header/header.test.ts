import { render, screen } from '@testing-library/svelte';
import Page from '../../routes/+page.svelte';
import { Themes, theme } from '../../stores/theme';
import { mockPhotos } from '../../test/mocks/photos';

describe('Header', () => {
	it('shows dark logo when theme is light', () => {
		theme.set(Themes.Light);
		render(Page, { data: { photos: mockPhotos } });

		const logo = screen.getByAltText('Threeveloper logo');
		expect(logo).toHaveAttribute('src', '/images/threeveloper logo transparent.png');
	});

	it('shows light logo when theme is dark', () => {
		theme.set(Themes.Dark);

		render(Page, { data: { photos: mockPhotos } });

		const logo = screen.getByAltText('Threeveloper logo');
		expect(logo).toHaveAttribute('src', '/images/threeveloper logo transparent light.png');
		const galleryImages = screen.getAllByRole('img');
		expect(galleryImages.length).toBe(mockPhotos.length + 1);
	});
});
