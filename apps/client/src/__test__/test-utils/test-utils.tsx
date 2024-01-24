import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { worker } from './browser';
import userEvent from '@testing-library/user-event';

// ----- Set up Mock Service Worker -----

// Establish API mocking before all tests.
beforeAll(() => worker.start());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => worker.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => worker.stop());

// -----------------------------------------------------------------------------
// This file re-exports everything from React Testing Library and then overrides
// its render method. In tests that require global context providers, import
// this file instead of React Testing Library.
//
// For further details, see:
// https://testing-library.com/docs/react-testing-library/setup/#custom-render
// -----------------------------------------------------------------------------

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Suspense fallback={<div>Loading ...</div>}>
      {children}
    </React.Suspense>
  );
};

/**
 * Custom render method that includes global context providers
 */
type CustomRenderOptions = {
  initialRoute?: string;
  renderOptions?: Omit<RenderOptions, 'wrapper'>;
};

function customRender(ui: React.ReactElement, options?: CustomRenderOptions) {
  const opts = options || {};
  const { initialRoute, renderOptions } = opts;

  if (initialRoute) {
    window.history.pushState({}, 'Initial Route', initialRoute);
  }

  return render(ui, { wrapper: AllProviders, ...renderOptions });
}

export * from '@testing-library/react';
export { customRender as render, userEvent };
