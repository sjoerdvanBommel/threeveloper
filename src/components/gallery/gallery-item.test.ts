import { fireEvent, render, screen } from '@testing-library/svelte';
import { mockPhotoWithDetails } from '../../test/mock-data/photo-with-details';
import { getPhotoVariantDimensions } from '../../utils/get-photo-dimensions';
import GalleryItem from './gallery-item.svelte';

describe('GalleryItem', () => {
	test('links to the photo URL', () => {
		const photo = mockPhotoWithDetails;

		render(GalleryItem, { photo });

		expect(screen.getByRole('link')).toHaveAttribute('href', `/photos/${photo.id}`);
	});

	test('has correct image dimensions', () => {
		const photo = mockPhotoWithDetails;

		render(GalleryItem, { photo });

		const { width, height } = getPhotoVariantDimensions(photo);
		const image = screen.getByRole('img');
		expect(image).toHaveAttribute('width', `${width}`);
		expect(image).toHaveAttribute('height', `${height}`);
	});

	test('changes to better quality image once initial image is loaded', async () => {
		const photo = mockPhotoWithDetails;

		render(GalleryItem, { photo });

		const image = screen.getByRole('img');

		expect(image).toHaveAttribute('src', photo.urls.thumb);
		await fireEvent.load(image);
		expect(image).toHaveAttribute('src', photo.urls.small);
	});
});
