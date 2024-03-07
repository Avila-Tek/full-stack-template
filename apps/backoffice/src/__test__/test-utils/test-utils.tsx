import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, RenderOptions } from '@testing-library/react';
import { QueryProvider } from '@/context/query-context';
import { QueryClientProvider } from '@tanstack/react-query';

// mock @apollo/experimental-nextjs-app-support/rsc
jest.mock('@apollo/experimental-nextjs-app-support/rsc', () => ({
  registerApolloClient: jest.fn(() => ({
    getClient: jest.fn(() => ({
      query: jest.fn(),
    })),
  })),
}));

// mock next-auth/react
jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { name: 'admin' },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: 'authenticated' };
    }),
  };
});

// // -----------------------------------------------------------------------------
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
      <QueryProvider>{children}</QueryProvider>
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
