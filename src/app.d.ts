// See https://kit.svelte.dev/docs/types#app

import type { Photo } from '$lib/photo/types';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			photos?: Photo[];
		}
		// interface Platform {}
	}
}

export {};
