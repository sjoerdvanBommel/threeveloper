import type { Photo } from '$lib/photo/types';
import { unsplash } from './unsplash';

export async function getPhotos(query: string) {
	const result = await unsplash.search.getPhotos({ query, perPage: 30 });

	if (result.type === 'error') throw new Error(result.errors[0]);

	const photos: Photo[] = result.response.results.map((photo) => ({
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
