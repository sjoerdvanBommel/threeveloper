import { describe, expect, it } from 'vitest';
import { mockPhotos } from '../../../test/mock-data/photos';
import { getPhotos } from './get-photos';

describe('getPhotos', () => {
	it('fetches photos successfully', async () => {
		const { photos } = await getPhotos();

		// API only gets 30 photos per page
		expect(photos).toEqual([...mockPhotos].splice(0, 30));
	});

	it('filters photos by query', async () => {
		const { photos } = await getPhotos('Jack Russell');

		expect(photos.length).toEqual(1);
		expect(photos[0].id).toEqual('N04FIfHhv_k');
	});

	it('filters photos by query', async () => {
		const { photos } = await getPhotos(undefined, 2);

		expect(photos.length).toEqual(1);
		expect(photos[0].id).toEqual('qO-PIF84Vxg');
	});

	it('Does not return any photos if page is too big', async () => {
		const { photos } = await getPhotos(undefined, 3);

		expect(photos.length).toEqual(0);
	});
});
