import { error } from '@sveltejs/kit';
import { unsplash } from '../../../services/unsplash/unsplash';
import type { DetailedPhoto } from '../../../utils/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }): Promise<{ photo: DetailedPhoto }> => {
	const { id } = params;

	const { response: photo, type } = await unsplash.photos.get({ photoId: id });

	if (type === 'error') throw error(500, 'Internal server error');

	return {
		photo: {
			height: photo.height,
			id: photo.id,
			likes: photo.likes,
			urls: photo.urls,
			user: {
				name: photo.user.name,
				portfolio_url: photo.user.portfolio_url ?? undefined,
				profile_image: photo.user.profile_image
			},
			links: {
				html: photo.links.html
			},
			width: photo.width,
			alt_description: photo.alt_description ?? undefined,
			description: photo.description ?? undefined
		}
	};
};
