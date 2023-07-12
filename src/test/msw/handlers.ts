import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { rest } from 'msw';
import { photosPerPage } from '../../services/unsplash/constants';
import { mockPhotos } from '../mock-data/photos';

export const localHandlers = [
	rest.get(`${PUBLIC_API_BASE_URL}/unsplash-proxy/search/photos`, (req, res, ctx) => {
		const query = req.url.searchParams.get('query')!;
		const page = +req.url.searchParams.get('page')!;

		const photos = mockPhotos
			.filter((x) => x.alt_description?.includes(query) || x.description?.includes(query))
			.splice((page - 1) * photosPerPage, page * photosPerPage);

		return res(ctx.status(200), ctx.json({ photos }));
	})
];

export const externalHandlers = [
	rest.get(`https://api.unsplash.com/search/photos`, (req, res, ctx) => {
		const query = req.url.searchParams.get('query')!;
		const page = +req.url.searchParams.get('page')!;
		const photos = mockPhotos
			.filter((x) => x.alt_description?.includes(query) || x.description?.includes(query))
			.splice((page - 1) * photosPerPage, page * photosPerPage);

		return res(ctx.status(200), ctx.json({ results: photos }));
	}),
	rest.get(`https://api.unsplash.com/photos/:id`, (req, res, ctx) => {
		const photo = mockPhotos.find((x) => x.id === req.params.id);
		return res(ctx.status(200), ctx.json(photo));
	})
];
