import { fireEvent, render, screen } from '@testing-library/svelte';
import { mockPhotos } from '../../test/mock-data/photos';
import { getPhotoVariantDimensions } from '../../utils/get-photo-dimensions';
import type { Photo } from '../../utils/types';
import GalleryItem from './gallery-item.svelte';

describe('GalleryItem', () => {
	let photo: Photo;

	beforeEach(() => {
		photo = mockPhotos[0];
	});

	test('links to the photo URL', () => {
		render(GalleryItem, { photo });

		expect(screen.getByRole('link')).toHaveAttribute('href', `/photos/${photo.id}`);
	});

	test('has correct image dimensions', () => {
		render(GalleryItem, { photo });

		const { width, height } = getPhotoVariantDimensions(photo);
		const image = screen.getByRole('img');
		expect(image).toHaveAttribute('width', `${width}`);
		expect(image).toHaveAttribute('height', `${height}`);
	});

	test('changes to better quality image once initial image is loaded', async () => {
		render(GalleryItem, { photo });

		const image = screen.getByRole('img');

		expect(image).toHaveAttribute('src', photo.urls.thumb);
		await fireEvent.load(image);
		expect(image).toHaveAttribute('src', photo.urls.small);
	});

	test('sets alt_description as alt text', async () => {
		render(GalleryItem, { photo });

		const image = screen.getByRole('img');

		expect(image).toHaveAttribute('alt', photo.alt_description);
	});

	test('sets description as alt text when alt_description is not set', async () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { alt_description, ...photoWithoutAltDescription } = photo;
		render(GalleryItem, { photo: photoWithoutAltDescription });

		const image = screen.getByRole('img');

		expect(image).toHaveAttribute('alt', photo.description);
	});

	test('sets custom alt text when description and alt_description are not set', async () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { alt_description, description, ...photoWithoutAnyDescription } = photo;
		render(GalleryItem, { photo: photoWithoutAnyDescription });

		const image = screen.getByRole('img');

		expect(image).toHaveAttribute('alt', `Photo made by ${photo.user.name}`);
	});
});
