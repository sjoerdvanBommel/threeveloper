import { mockPhotos } from '../../test/mocks/photos';
import { expect, test } from '../../test/msw';

const photo = mockPhotos[0];

test.describe.parallel('/photos/{id}', () => {
	test.beforeEach(async ({ page, baseURL }) => {
		await page.goto(`${baseURL}/photos/${photo.id}`);
	});

	test('contains correct description of photo', async ({ page, baseURL }) => {
		await expect(page.getByText(photo.alt_description!)).toBeVisible();

		const photoWithoutAltDescription = mockPhotos[1];
		await page.goto(`${baseURL}/photos/${photoWithoutAltDescription.id}`);
		await expect(page.getByText(photoWithoutAltDescription.description!)).toBeVisible();

		const photoWithoutAnyDescription = mockPhotos[4];
		await page.goto(`${baseURL}/photos/${photoWithoutAnyDescription.id}`);
		await expect(page.getByTestId('description')).not.toBeVisible();
	});

	test('contains links to unsplash', async ({ page }) => {
		await expect(page.getByRole('link', { name: photo.user.name })).toHaveAttribute(
			'href',
			photo.user.portfolio_url!
		);
		await expect(page.getByRole('link', { name: 'Unsplash' })).toHaveAttribute(
			'href',
			'https://unsplash.com/?utm_source=Gallery%20App&utm_medium=referral'
		);
	});

	test('sends user back to homepage via back button', async ({ page }) => {
		await page.getByLabel('Go back').click();
		await expect(page).toHaveURL('/');
	});
});
