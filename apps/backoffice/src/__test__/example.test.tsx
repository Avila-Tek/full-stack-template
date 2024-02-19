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

// describe('Graphql', () => {
//   it('renders user data correctly', async () => {
//     render(<GraphqlClientExample />);

//     // Espera a que los datos de los usuarios se rendericen
//     await waitFor(() => {
//       expect(screen.getByText('juanperez@example.com')).toBeInTheDocument();
//     });
//   });
// });
