import { setupWorker } from 'msw';
import { externalHandlers } from './handlers';

// Use externalHandlers here so the front-end is calling the backend even when PUBLIC_MSW_ENABLED is set to true
export const worker = setupWorker(...externalHandlers);
