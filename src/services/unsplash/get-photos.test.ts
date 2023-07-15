import { server } from '@test/msw/server';
import type { Photo } from '@utils/photo/types';
import { rest } from 'msw';
import { getPhotos } from './get-photos';

describe('getPhotos', () => {
	it('returns photos based on query', async () => {
		const photos = (await getPhotos('blue')) as Photo[];

		expect(photos.length).toBe(2);
		expect(photos[0].id).toBe('JNm1dAElVtE');
	});

	it('returns empty array when page is too high', async () => {
		const photos = (await getPhotos('blue', 2)) as Photo[];

		expect(photos.length).toBe(0);
	});

	it('returns empty array when query is too difficult', async () => {
		const photos = (await getPhotos('There are no photos found by this text')) as Photo[];

		expect(photos.length).toBe(0);
	});

	it('throws HttpError when fetch failed', async () => {
		server.use(
			rest.get(`https://api.unsplash.com/search/photos`, (_, res, ctx) => {
				return res(ctx.status(400));
			})
		);

		await expect(getPhotos('query')).rejects.toThrowError('expected JSON response from server.');
	});
});
