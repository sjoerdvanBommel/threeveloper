import { mockPhotos } from '@test/mocks/photos';
import { server } from '@test/msw/server';
import { rest } from 'msw';
import { getPhoto } from './get-photo';

describe('getPhoto', () => {
	const id = mockPhotos[0].id;

	it('returns photo based on id', async () => {
		const photo = await getPhoto(id);

		expect(photo).toEqual(mockPhotos[0]);
	});

	it.todo('returns undefined when photo is not found');

	it('throws HttpError when fetch failed', async () => {
		server.use(
			rest.get(`https://api.unsplash.com/photos/:id`, (_, res, ctx) => res(ctx.status(400)))
		);

		await expect(getPhoto(id)).rejects.toThrowError('expected JSON response from server.');
	});
});
