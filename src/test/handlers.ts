import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { rest } from 'msw';
import { mockPhotos } from './mock-data/photos';

export const handlers = [
	rest.get(`${PUBLIC_API_BASE_URL}/unsplash-proxy/search/photos`, (req, res, ctx) => {
		const query = req.url.searchParams.get('query') ?? '';
		const page = +(req.url.searchParams.get('page') ?? 1);

		const photosPerPage = 30;

		const photos = mockPhotos
			.filter((x) => x.alt_description.includes(query) || x.description?.includes(query))
			.splice((page - 1) * photosPerPage, page * photosPerPage);

		console.log(photos);

		return res(ctx.status(200), ctx.json({ photos }));
	})
];
