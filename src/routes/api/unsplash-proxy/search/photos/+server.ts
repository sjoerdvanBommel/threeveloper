import { error, json } from '@sveltejs/kit';
import type { Photo } from '../../../../../components/gallery/types';
import { unsplash } from '../../../../../services/unsplash/unsplash';

export interface SearchPhotosType {
	photos: Photo[];
}

export async function GET({ url }) {
	const query = url.searchParams.get('query');
	const page = +(url.searchParams.get('page') ?? 1);

	if (!query?.length) return json({ photos: [] });

	const result = await unsplash.search.getPhotos({
		query,
		perPage: 30,
		page
	});

	if (result.type === 'error') throw error(500, 'Internal server error');

	const photos = result.response.results.map(
		({ id, description, alt_description, urls, likes, user: { name }, width, height }) => ({
			id,
			description,
			alt_description,
			urls,
			likes,
			name,
			width,
			height
		})
	);

	return json({ photos });
}
