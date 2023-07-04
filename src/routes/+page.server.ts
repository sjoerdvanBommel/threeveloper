import { error } from '@sveltejs/kit';
import { unsplash } from '../services/unsplash';

export async function load({ url }) {
	const result = await unsplash.search.getPhotos({
		query: url.searchParams.get('query') ?? '',
		perPage: 25
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
