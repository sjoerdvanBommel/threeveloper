import { MOCKED_API } from '$env/static/private';
import { error } from '@sveltejs/kit';
import { unsplash } from '../../../services/unsplash/unsplash';
import { mockPhotoWithDetails } from '../../api/unsplash-proxy/search/photos/mock-photos';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	if (MOCKED_API === 'true') {
		return { photo: mockPhotoWithDetails };
	}

	const { id } = params;

	const { response: photo, type } = await unsplash.photos.get({ photoId: id });

	if (type === 'error') throw error(500, 'Internal server error');

	return { photo };
};
