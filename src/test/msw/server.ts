import { setupServer } from 'msw/node';
import { externalHandlers, localHandlers } from './handlers';

// Use localHandlers here so that unit tests don't call the local API
// Use externalHandlers here so that SSR and the local API don't call external API's
export const server = setupServer(...[...localHandlers, ...externalHandlers]);
