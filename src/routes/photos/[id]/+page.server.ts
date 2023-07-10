import { MSW_ENABLED } from '$env/static/private';
import { error } from '@sveltejs/kit';
import { unsplash } from '../../../services/unsplash/unsplash';
import { mockPhotoWithDetails } from '../../../test/mock-data/photo-with-details';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	if (MSW_ENABLED === 'true') {
		return { photo: mockPhotoWithDetails };
	}

	const { id } = params;

	const { response: photo, type } = await unsplash.photos.get({ photoId: id });

	if (type === 'error') throw error(500, 'Internal server error');

	return { photo };
};
