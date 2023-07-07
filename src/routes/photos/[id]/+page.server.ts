import { error } from '@sveltejs/kit';
import { unsplash } from '../../../services/unsplash/unsplash';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	const { response: photo, type } = await unsplash.photos.get({ photoId: id });

	if (type === 'error') throw error(500, 'Internal server error');

	return { photo };
};
