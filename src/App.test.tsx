import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Home link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/home/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders About link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/about/i);
  expect(linkElement).toBeInTheDocument();
});