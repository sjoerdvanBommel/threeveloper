import { photosPerPage } from '@services/unsplash/constants';
import { mockPhotos } from '@test/mocks/photos';
import { rest } from 'msw';

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
