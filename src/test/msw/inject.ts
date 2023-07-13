import { browser, dev } from '$app/environment';
import { customOnUnhandledRequest } from './custom-on-unhandled-request';

/**
 * Lazy-inject the MSW handler so that no errors happen during
 * build/runtime due to invalid imports from server/client.
 */
export async function inject() {
	if (dev && browser) {
		const { worker } = await import('./worker');

		return worker.start({ onUnhandledRequest: customOnUnhandledRequest });
	}
	if (dev && !browser) {
		const { server } = await import('./server');

		return server.listen({ onUnhandledRequest: customOnUnhandledRequest });
	}
}
