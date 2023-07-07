import { UNSPLASH_ACCESS_KEY } from '$env/static/private';
import { createApi } from 'unsplash-js';

export const unsplash = createApi({
	accessKey: UNSPLASH_ACCESS_KEY
});
