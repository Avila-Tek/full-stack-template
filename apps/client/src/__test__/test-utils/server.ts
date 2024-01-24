import { setupServer } from 'msw/node';
import { handlers } from '../mocks/handlers';

// This configures a Service Worker with the given request handlers.
export const server = setupServer(...handlers);

