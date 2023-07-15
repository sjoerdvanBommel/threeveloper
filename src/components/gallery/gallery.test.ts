import type { Page } from '@sveltejs/kit';
import { mockPhotos } from '@test/mocks/photos';
import { navigationParams } from '@test/msw/setupTests';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import type { Photo } from '@utils/photo/types';
import { readable } from 'svelte/store';
import Gallery from './gallery.svelte';

const defaultPageValues: Page = vi.hoisted(() => ({
	url: new URL('http://localhost:5173'),
	params: {},
	route: {
		id: null
	},
	status: 200,
	error: null,
	data: {},
	form: undefined
}));

vi.mock('$app/stores', () => ({ page: readable(defaultPageValues) }));

describe('Gallery', () => {
	let photos: Photo[];

	beforeEach(() => {
		photos = mockPhotos;
	});

	test('renders input field to search for photos', async () => {
		render(Gallery, { photos });

		const input = screen.getByRole('textbox');
		expect(input).toHaveAttribute('placeholder', 'What are you looking for?');
	});

	test('renders photos when passed', async () => {
		render(Gallery, { photos });

		expect(screen.getAllByRole('img')).toHaveLength(photos.length);
	});

	test('renders a loader when input changes', async () => {
		userEvent.setup();
		render(Gallery, { photos });

		const input = screen.getByRole('textbox');
		await userEvent.type(input, 'Dog');

		expect(screen.getByTitle('Loading')).toBeDefined();
		expect(screen.queryByText('Search to get a list of photos')).toBeNull();
	});

	test('sets search input value if query is passed in URL', () => {
		vi.mock('$app/stores', () => ({
			page: readable<Page>({
				...defaultPageValues,
				url: new URL('http://localhost:5173?query=Cat')
			})
		}));

		render(Gallery, { photos });

		const input = screen.getByRole('textbox');
		expect(input).toHaveValue('Cat');
	});

	test('renders instructions when no photos are passed', async () => {
		render(Gallery, { photos: [] });

		expect(screen.getByText('Search to get a list of photos')).toBeDefined();
		expect(screen.queryByTitle('Loading')).toBeNull();
		expect(screen.queryAllByRole('img')).toHaveLength(0);
	});

	test('navigates to same page with different query params on searchbox change', async () => {
		userEvent.setup();
		render(Gallery, { photos: [] });

		const input = screen.getByRole('textbox');
		await userEvent.clear(input);
		await userEvent.type(input, 'Dog');

		expect(await screen.findByText('Search to get a list of photos')).toBeDefined();
		expect(screen.queryByTitle('Loading')).toBeNull();
		expect(navigationParams.goto).toBeCalledWith('?query=Dog', { keepFocus: true });
	});
});
