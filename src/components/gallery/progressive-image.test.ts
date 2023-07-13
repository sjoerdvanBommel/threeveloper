import { fireEvent, render, screen } from '@testing-library/svelte';
import ProgressiveImage from './progressive-image.svelte';

describe('ProgressiveImage', () => {
	test('changes to better quality image once low quality image is loaded', async () => {
		render(ProgressiveImage, {
			lowQualityUrl: 'Low Quality URL',
			highQualityUrl: 'High Quality URL',
			alt: 'Alt text'
		});

		const image = screen.getByRole('img');

		expect(image).toHaveAttribute('src', 'Low Quality URL');
		await fireEvent.load(image);
		expect(image).toHaveAttribute('src', 'High Quality URL');
	});

	test('accepts native img properties', async () => {
		render(ProgressiveImage, {
			lowQualityUrl: 'Low Quality URL',
			highQualityUrl: 'High Quality URL',
			alt: 'Alt text',
			'aria-label': 'Would throw a compile error if not accepted'
		});

		const image = screen.getByRole('img');

		expect(image).toHaveAttribute('aria-label', 'Would throw a compile error if not accepted');
	});
});
