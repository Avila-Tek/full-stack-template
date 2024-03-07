import React from 'react';
import Page from '../app/page';
import { render, waitFor, screen } from './test-utils/test-utils';
import GraphqlClientExample from '@/components/example-connect-backend/GraphqlClientExample';

// Mock the Google Font loader
jest.mock('next/font/google', () => ({
  Inter: jest.fn(() => 'MockedInter'),
}));

it('renders homepage unchanged', () => {
  const { container } = render(<Page />);

  expect(container).toMatchSnapshot();
});

describe('Graphql', () => {
  it('renders user data correctly', async () => {
    render(<GraphqlClientExample />);

    // wait for the data to be loaded
    await waitFor(() => {
      // use a regex to match the email
      const regex = /juanperez@example\.com/;
      expect(screen.getByText(regex)).toBeInTheDocument();
    });
  });
});

// describe('REST', () => {
//   it('renders user data correctly', async () => {
//     render(<GraphqlClientExample />);

//     // wait for the data to be loaded
//     await waitFor(() => {
//       // use a regex to match the email
//       const regex = /juanperez@example\.com/;
//       expect(screen.getByText(regex)).toBeInTheDocument();
//     });
//   });
// });
