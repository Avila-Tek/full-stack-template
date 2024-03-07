import React from 'react';
import Page from '../app/page';
import { render } from './test-utils/test-utils';

// Mock the Google Font loader
jest.mock('next/font/google', () => ({
  Inter: jest.fn(() => 'MockedInter'),
}));

it('renders homepage unchanged', () => {
  const { container } = render(<Page />);

  expect(container).toMatchSnapshot();
});
