import { getPhotos } from '@services/unsplash/get-photos';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('query');
	const page = +(url.searchParams.get('page') ?? 1);

	if (!query?.length) return json({ photos: [] });

	const photos = await getPhotos(query, page);

	return json({ photos });
};
