import Header from '@components/header/header.svelte';
import { Themes, theme } from '@stores/theme';
import { render, screen } from '@testing-library/svelte';

describe('Header', () => {
	it('shows dark logo when theme is light', () => {
		theme.set(Themes.Light);
		render(Header);

		const logo = screen.getByAltText('Threeveloper logo');
		expect(logo).toHaveAttribute('src', '/images/threeveloper logo transparent.png');
	});

	it('shows light logo when theme is dark', () => {
		theme.set(Themes.Dark);

		render(Header);

		const logo = screen.getByAltText('Threeveloper logo');
		expect(logo).toHaveAttribute('src', '/images/threeveloper logo transparent light.png');
	});
});
