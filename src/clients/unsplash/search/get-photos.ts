import type { SearchPhotosType } from '../../../routes/api/unsplash-proxy/search/photos/+server';
import { baseUrl } from '../base-url';

interface Props {
	query: string;
	page: number;
}

export const getPhotos = async ({ query, page }: Props): Promise<SearchPhotosType> => {
	const url = new URL(`${baseUrl}/search/photos`);
	url.searchParams.set('query', query);
	url.searchParams.set('page', `${page}`);

	const result = await fetch(url).then((x) => x.json());

	return result;
};
