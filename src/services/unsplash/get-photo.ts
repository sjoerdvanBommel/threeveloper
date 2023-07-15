import { error } from '@sveltejs/kit';
import { unsplash } from './unsplash';

export const getPhoto = async (id: string) => {
	const { response, type } = await unsplash.photos.get({ photoId: id });

	if (type === 'error') throw error(500, response);

	return {
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
	};
};
