import type { Load } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { Photo } from '@utils/photo/types';

export const load: Load = async ({ fetch, url }) => {
	const query = url.searchParams.get('query');

	if (!query?.length) return { photos: [] };

	const response = await fetch(`api/unsplash-proxy/search/photos?query=${query}&page=1`);

	if (response.status !== 200) {
		throw error(response.status, 'Failed to fetch data from GET endpoint');
	}

	const { photos } = (await response.json()) as { photos: Photo[] };

	return { photos };
};
