import type { Photo } from '../../../utils/types';
import { baseUrl } from '../base-url';

export const getPhotos = async (query = '', page = 1): Promise<{ photos: Photo[] }> => {
	const url = new URL(`${baseUrl}/search/photos`);
	url.searchParams.set('query', query);
	url.searchParams.set('page', `${page}`);

	const result = await fetch(url.toString()).then((x) => x.json());

	return result;
};
