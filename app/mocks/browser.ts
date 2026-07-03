import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Setup browser service worker with our CRUD handlers
export const worker = setupWorker(...handlers);
