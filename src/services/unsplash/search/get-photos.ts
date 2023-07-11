import { error } from '@sveltejs/kit';
import { photosPerPage } from '../constants';
import { unsplash } from '../unsplash';

export async function getPhotos(query: string, page?: number) {
	const result = await unsplash.search.getPhotos({
		query,
		perPage: photosPerPage,
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

	return { photos };
}
