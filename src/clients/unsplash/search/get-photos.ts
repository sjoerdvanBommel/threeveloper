import { PUBLIC_API_BASE_URL } from '$env/static/public';
import type { Photo } from '../../../utils/types';

export const getPhotos = async (query = '', page = 1): Promise<{ photos: Photo[] }> => {
	const url = new URL(`${PUBLIC_API_BASE_URL}/unsplash-proxy/search/photos`);
	url.searchParams.set('query', query);
	url.searchParams.set('page', `${page}`);

	const result = await fetch(url.toString()).then((x) => x.json());

	return result;
};
