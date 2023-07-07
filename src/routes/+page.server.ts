import { error } from '@sveltejs/kit';

// TODO: Can I make this a page.ts file?
export async function load({ fetch, url }) {
	const query = url.searchParams.get('query');

	if (!query?.length) return { photos: [] };

	const getResponse = await fetch(`api/unsplash-proxy/search/photos?query=${query}&page=1`);

	if (getResponse.status !== 200) {
		throw error(getResponse.status, 'Failed to fetch data from GET endpoint');
	}

	const { photos } = await getResponse.json();

	return {
		photos
	};
}
