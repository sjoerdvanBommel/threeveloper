import { browser } from '$app/environment';

export const baseUrl = browser ? `${window.location.origin}/api/unsplash-proxy` : '';
