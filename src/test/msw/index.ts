import { test as base, expect } from '@playwright/test';
import type { MockServiceWorker } from 'playwright-msw';
import { createWorkerFixture } from 'playwright-msw';
import { externalHandlers } from './external-handlers';

const test = base.extend<{
	worker: MockServiceWorker;
}>({
	worker: createWorkerFixture(externalHandlers),
	page: async ({ baseURL, page }, use) => {
		await page.goto(baseURL!);
		await use(page);
	}
});

export { expect, test };
