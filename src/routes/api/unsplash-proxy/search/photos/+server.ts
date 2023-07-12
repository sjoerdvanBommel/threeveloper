import { MSW_ENABLED } from '$env/static/private';
import { error, json } from '@sveltejs/kit';
import { photosPerPage } from '../../../../../services/unsplash/constants';
import { unsplash } from '../../../../../services/unsplash/unsplash';
import { mockPhotos } from '../../../../../test/mock-data/photos';
import type { Photo } from '../../../../../utils/types';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	if (MSW_ENABLED === 'true') {
		return json({ photos: mockPhotos });
	}

	const query = url.searchParams.get('query');
	const page = +(url.searchParams.get('page') ?? 1);

	if (!query?.length) return json({ photos: [] });

	const result = await unsplash.search.getPhotos({
		query,
		perPage: photosPerPage,
		page
	});

	if (result.type === 'error') throw error(500, 'Internal server error');

	const photos: Photo[] = result.response.results.map(
		({ id, description, alt_description, urls, likes, user: { name }, width, height }) => ({
			id,
			description: description ?? undefined,
			alt_description: alt_description ?? undefined,
			urls,
			likes,
			name,
			width,
			height
		})
	);

	return json({ photos });
};
