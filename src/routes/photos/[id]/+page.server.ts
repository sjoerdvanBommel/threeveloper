import { error } from '@sveltejs/kit';
import { unsplash } from '../../../services/unsplash/unsplash';
import type { DetailedPhoto } from '../../../utils/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }): Promise<{ photo: DetailedPhoto }> => {
	const { id } = params;

	const { response, type } = await unsplash.photos.get({ photoId: id });

	if (type === 'error') throw error(500, response);

	return {
		photo: {
			height: response.height,
			id: response.id,
			likes: response.likes,
			urls: response.urls,
			user: {
				name: response.user.name,
				portfolio_url: response.user.portfolio_url ?? undefined,
				profile_image: response.user.profile_image
			},
			links: {
				html: response.links.html
			},
			width: response.width,
			alt_description: response.alt_description ?? undefined,
			description: response.description ?? undefined
		}
	};
};
