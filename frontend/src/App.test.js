import App from './App';

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('renders login form', () => {
  const { getByLabelText, getByText } = render(<App />);
  const usernameInput = getByLabelText(/username/i);
  const passwordInput = getByLabelText(/password/i);
  const loginButton = getByText(/login/i);
  const signupLink = getByText(/sign up/i);

  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
  expect(signupLink).toBeInTheDocument();
});

test('updates input values on change', () => {
  const { getByLabelText } = render(<App />);
  const usernameInput = getByLabelText(/username/i);
  const passwordInput = getByLabelText(/password/i);

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'testpass' } });

  expect(usernameInput.value).toBe('testuser');
  expect(passwordInput.value).toBe('testpass');
});