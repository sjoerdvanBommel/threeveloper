import { error } from '@sveltejs/kit';
import { unsplash } from '../services/unsplash';

export async function load({ url }) {
	const query = url.searchParams.get('query');

	if (!query?.length) return { photos: [] };

	const result = await unsplash.search.getPhotos({
		query,
		perPage: 30
	});

	if (result.type === 'error') throw error(500, 'Internal server error');

	return {
		photos: result.response.results.map(
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
		)
	};
}
