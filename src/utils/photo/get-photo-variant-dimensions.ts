import type { Photo } from './types';

export const getPhotoVariantDimensions = (photo: Photo, size: keyof Photo['urls'] = 'small') => {
	const { width: originalWidth, height: originalHeight } = photo;
	const [, paramString] = photo.urls[size].split('?');
	const width = +(new URLSearchParams(paramString).get('w') ?? 400);
	const height = originalHeight * (width / originalWidth);

	return { width, height };
};
