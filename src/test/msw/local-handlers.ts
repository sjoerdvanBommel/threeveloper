import { PUBLIC_BASE_URL } from '$env/static/public';
import { photosPerPage } from '@services/unsplash/constants';
import { mockPhotos } from '@test/mocks/photos';
import { rest } from 'msw';

export const localHandlers = [
	rest.get(`${PUBLIC_BASE_URL}/api/unsplash-proxy/search/photos`, (req, res, ctx) => {
		const query = req.url.searchParams.get('query')!;
		const page = +req.url.searchParams.get('page')!;

		const photos = mockPhotos
			.filter((x) => x.alt_description?.includes(query) || x.description?.includes(query))
			.splice((page - 1) * photosPerPage, page * photosPerPage);

		return res(ctx.status(200), ctx.json({ photos }));
	})
];
