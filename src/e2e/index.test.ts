import { expect, test } from '../test/msw';

test.describe.parallel('/', () => {
	test('filters photos based on query', async ({ page }) => {
		await page.getByPlaceholder('What are you looking for?').click();
		await page.getByPlaceholder('What are you looking for?').fill('blue');
		await page.getByTitle('Loading').waitFor({ state: 'hidden' });

		await expect(
			page.getByRole('link', { name: 'yellow labrador retriever puppy with blue collar' })
		).toBeVisible();
		await expect(
			page.getByRole('link', { name: 'golden retriever puppy on white background' })
		).not.toBeVisible();
	});

	test('changes to dark theme when theme switcher is pressed', async ({ page }) => {
		await expect(page.getByRole('img', { name: 'Threeveloper logo' })).toHaveAttribute(
			'src',
			'/images/threeveloper logo transparent.png'
		);

		await page.getByRole('switch', { name: 'Dark mode toggle' }).click();

		await expect(page.getByRole('img', { name: 'Threeveloper logo ' })).toHaveAttribute(
			'src',
			'/images/threeveloper logo transparent light.png'
		);
	});

	test('pressing photo sends user to photo page', async ({ page }) => {
		await page.getByPlaceholder('What are you looking for?').click();
		await page.getByPlaceholder('What are you looking for?').fill('blue');
		await page.getByRole('link', { name: 'blue weimariner' }).click();

		await expect(page).toHaveURL('/photos/5_nJw3UUgpQ');
	});
});
