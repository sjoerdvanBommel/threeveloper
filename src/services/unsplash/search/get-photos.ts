import { error } from '@sveltejs/kit';
import type { DetailedPhoto } from '../../../utils/types';
import { photosPerPage } from '../constants';
import { unsplash } from '../unsplash';

export async function getPhotos(query: string, page?: number) {
	const result = await unsplash.search.getPhotos({
		query,
		perPage: photosPerPage,
		page
	});

	if (result.type === 'error') throw error(500, 'Internal server error');

	const photos: DetailedPhoto[] = result.response.results.map((photo) => ({
		id: photo.id,
		description: photo.description ?? undefined,
		alt_description: photo.alt_description ?? undefined,
		urls: {
			full: photo.urls.full,
			small: photo.urls.small,
			thumb: photo.urls.thumb
		},
		likes: photo.likes,
		user: {
			name: photo.user.name,
			portfolio_url: photo.user.portfolio_url ?? undefined,
			profile_image: { medium: photo.user.profile_image.medium }
		},
		links: { html: photo.links.html },
		width: photo.width,
		height: photo.height
	}));

	return photos;
}
