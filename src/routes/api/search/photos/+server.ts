import { error, json } from '@sveltejs/kit';
import { getPhotos } from '../../../../services/unsplash/get-photos';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('query');

	if (!query?.length) return json({ photos: [] });

	try {
		const photos = await getPhotos(query);

		return json({ photos });
	} catch (e: unknown) {
		throw error(500, (e as Error).message);
	}
};
