import { browser, dev } from '$app/environment';

/**
 * Lazy-inject the MSW handler so that no errors happen during
 * build/runtime due to invalid imports from server/client.
 */
export async function inject() {
	if (dev && browser) {
		const { worker } = await import('./worker');

		return worker.start().catch(console.warn);
	}
	if (dev && !browser) {
		const { server } = await import('./server');

		return server.listen();
	}
}
