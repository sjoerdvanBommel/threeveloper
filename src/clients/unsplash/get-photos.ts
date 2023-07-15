import { PUBLIC_BASE_URL } from '$env/static/public';
import type { Photo } from '@utils/photo/types';

export const getPhotos = async (query = '', page = 1): Promise<{ photos: Photo[] }> => {
	const url = `${PUBLIC_BASE_URL}/api/unsplash-proxy/search/photos?query=${query}&page=${page}`;

	const result = await fetch(url).then((x) => x.json());

	return result;
};
