import { error } from '@sveltejs/kit';
import { unsplash } from '../../../services/unsplash';

export async function load({ params }) {
	const { id } = params;

	const result = await unsplash.photos.get({ photoId: id });

	if (result.type === 'error') throw error(500, 'Internal server error');

	return {
		photo: result.response
	};
}
