import type { Load } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { Photo } from '../utils/types';

export const load: Load = async ({ fetch, url }) => {
	const query = url.searchParams.get('query');

	if (!query?.length) return { photos: [] };

	const getResponse = await fetch(`api/unsplash-proxy/search/photos?query=${query}&page=1`);

	if (getResponse.status !== 200) {
		throw error(getResponse.status, 'Failed to fetch data from GET endpoint');
	}

	const { photos } = (await getResponse.json()) as { photos: Photo[] };

	return {
		photos
	};
};
