import type { Photo } from '$lib/photo/types';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ fetch, url }) => {
	const query = url.searchParams.get('query');

	if (!query?.length) return { photos: [] };

	const response = await fetch(`api/search/photos?query=${query}`);

	if (response.status !== 200) {
		throw error(response.status, 'Failed to get photos');
	}

	const { photos } = (await response.json()) as { photos: Photo[] };

	return { photos };
}) satisfies PageLoad;
