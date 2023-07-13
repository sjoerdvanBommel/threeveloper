import { getPhotoVariantDimensions } from './get-photo-dimensions';
import type { Photo } from './types';

describe('getPhotoVariantDimensions', () => {
	it('returns correct dimensions of photo variant', () => {
		const dimensions = getPhotoVariantDimensions({
			width: 2000,
			height: 1000,
			urls: { small: 'https://example.com?w=1000' }
		} as Photo);

		expect(dimensions.width).toBe(1000);
		expect(dimensions.height).toBe(500);
	});

	it('uses a default variant width of 400 if not set', () => {
		const dimensions = getPhotoVariantDimensions(
			{
				width: 2000,
				height: 1000,
				urls: { full: 'https://example.com' }
			} as Photo,
			'full'
		);

		expect(dimensions.width).toBe(400);
		expect(dimensions.height).toBe(200);
	});
});
