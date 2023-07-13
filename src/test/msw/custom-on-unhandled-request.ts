import type { DefaultBodyType, MockedRequest } from 'msw';

const hideCallsStartingWith = [
	'https://images.unsplash.com/photo',
	'/fonts',
	'/node_modules',
	'/images',
	'/api/unsplash-proxy/search/photos'
];

export const customOnUnhandledRequest = (
	req: MockedRequest<DefaultBodyType>,
	print: { warning: () => void; error: () => void }
) => {
	if (
		hideCallsStartingWith.find(
			(x) =>
				(x.startsWith('/') && req.url.pathname.startsWith(x)) ||
				(x.startsWith('http') && req.url.toString().startsWith(x))
		)
	)
		return;

	print.warning();
};
