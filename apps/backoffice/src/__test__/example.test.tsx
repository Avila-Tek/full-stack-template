import React from 'react';
import nock from 'nock';
import { render, waitFor, screen, renderHook } from './test-utils/test-utils';
import ReactQueryClientExample from '@/components/example-connect-backend/ReactQueryClientExample';
import { useUsers } from '@/services/user/hooks';
import { QueryProvider } from '@/context/query-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import fetchMock from 'jest-fetch-mock';

// Mock the Google Font loader
jest.mock('next/font/google', () => ({
  Inter: jest.fn(() => 'MockedInter'),
}));

// Mock the Next.js router
fetchMock.enableMocks();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
});
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('Rest mock', () => {
  it('renders user data correctly', async () => {
    render(<ReactQueryClientExample users={[]} />);
    jest.spyOn(console, 'error').mockImplementation(() => {});

    fetchMock.mockResponseOnce(JSON.stringify({ data: 'mockedData' }));

    const { result: result1 } = renderHook(() => useUsers(), { wrapper });

    await waitFor(() => expect(result1.current.isSuccess).toBe(true));

    expect(result1.current.data).toEqual({ data: 'mockedData' });
  });
});
