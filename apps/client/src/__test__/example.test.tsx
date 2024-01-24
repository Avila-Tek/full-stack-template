import React from 'react';
import { render } from '@testing-library/react';
import Page from '../app/page';

jest.mock('next/font/google', () => ({
  Inter: jest.fn(() => 'MockedInter'),
}));

it('renders homepage unchanged', () => {
  const { container } = render(<Page />);
  expect(container).toMatchSnapshot();
});
