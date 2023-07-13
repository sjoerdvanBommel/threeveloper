import { browser } from '$app/environment';
import { PUBLIC_E2E_TESTING, PUBLIC_MSW_ENABLED } from '$env/static/public';
import { customOnUnhandledRequest } from './custom-on-unhandled-request';

/**
 * Lazy-inject the MSW handler so that no errors happen during
 * build/runtime due to invalid imports from server/client.
 */
export async function inject() {
	if (browser && (PUBLIC_MSW_ENABLED === 'true' || PUBLIC_E2E_TESTING === 'true')) {
		const { worker } = await import('./worker');

		return worker.start({ onUnhandledRequest: customOnUnhandledRequest });
	}
	if (!browser && (PUBLIC_MSW_ENABLED === 'true' || PUBLIC_E2E_TESTING === 'true')) {
		const { server } = await import('./server');

		return server.listen({ onUnhandledRequest: customOnUnhandledRequest });
	}
}
