import { derived } from 'svelte/store';
import { createMediaQueryStore } from './media-query';

const querySmaller = createMediaQueryStore('(max-width: 639px)');
const querySm = createMediaQueryStore('(min-width: 640px) and (max-width: 767px)');
const queryMd = createMediaQueryStore('(min-width: 768px) and (max-width: 1023px)');
const queryLg = createMediaQueryStore('(min-width: 1024px) and (max-width: 1279px)');
const queryXl = createMediaQueryStore('(min-width: 1280px) and (max-width: 1535px)');
const query2Xl = createMediaQueryStore('(min-width: 1536px)');

export const isSmaller = derived(querySmaller, ($smaller) => $smaller);
export const isSm = derived(querySm, ($sm) => $sm);
export const isMd = derived(queryMd, ($md) => $md);
export const isLg = derived(queryLg, ($lg) => $lg);
export const isXl = derived(queryXl, ($xl) => $xl);
export const is2Xl = derived(query2Xl, ($twoXl) => $twoXl);
