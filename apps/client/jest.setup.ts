import '@testing-library/jest-dom';
import { worker } from '@/__test__/test-utils/browser';
import { server } from '@/__test__/test-utils/server';

// ----- Set up Mock Service Worker -----

// Establish API mocking before all tests.
beforeAll(() => worker.start());
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => worker.resetHandlers());
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => worker.stop());
afterAll(() => server.close());
