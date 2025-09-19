import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { LoginScreen } from '../screens/LoginScreen';
import { ThemeProvider } from '../ThemeProvider';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('LoginScreen Component', () => {
  it('renders correctly with all elements', () => {
    const onLogin = jest.fn();
    const onSignup = jest.fn();
    const onForgotPassword = jest.fn();
    
    const { getByText, getByPlaceholderText } = renderWithTheme(
      <LoginScreen
        onLogin={onLogin}
        onSignup={onSignup}
        onForgotPassword={onForgotPassword}
      />
    );

    expect(getByText('Welcome Back')).toBeTruthy();
    expect(getByText('Sign in to continue your fitness journey')).toBeTruthy();
    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
    expect(getByPlaceholderText('Enter your password')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
    expect(getByText('Don\'t have an account? Sign up')).toBeTruthy();
    expect(getByText('Forgot Password?')).toBeTruthy();
  });

  it('shows validation errors for empty fields', async () => {
    const onLogin = jest.fn();
    const onSignup = jest.fn();
    const onForgotPassword = jest.fn();
    
    const { getByText } = renderWithTheme(
      <LoginScreen
        onLogin={onLogin}
        onSignup={onSignup}
        onForgotPassword={onForgotPassword}
      />
    );

    const signInButton = getByText('Sign In');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(getByText('Email is required')).toBeTruthy();
      expect(getByText('Password is required')).toBeTruthy();
    });
  });

  it('shows validation error for invalid email', async () => {
    const onLogin = jest.fn();
    const onSignup = jest.fn();
    const onForgotPassword = jest.fn();
    
    const { getByText, getByPlaceholderText } = renderWithTheme(
      <LoginScreen
        onLogin={onLogin}
        onSignup={onSignup}
        onForgotPassword={onForgotPassword}
      />
    );

    const emailInput = getByPlaceholderText('Enter your email');
    fireEvent.changeText(emailInput, 'invalid-email');

    const signInButton = getByText('Sign In');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(getByText('Please enter a valid email')).toBeTruthy();
    });
  });

  it('shows validation error for short password', async () => {
    const onLogin = jest.fn();
    const onSignup = jest.fn();
    const onForgotPassword = jest.fn();
    
    const { getByText, getByPlaceholderText } = renderWithTheme(
      <LoginScreen
        onLogin={onLogin}
        onSignup={onSignup}
        onForgotPassword={onForgotPassword}
      />
    );

    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');
    
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, '123');

    const signInButton = getByText('Sign In');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(getByText('Password must be at least 6 characters')).toBeTruthy();
    });
  });

  it('calls onLogin with valid credentials', async () => {
    const onLogin = jest.fn();
    const onSignup = jest.fn();
    const onForgotPassword = jest.fn();
    
    const { getByText, getByPlaceholderText } = renderWithTheme(
      <LoginScreen
        onLogin={onLogin}
        onSignup={onSignup}
        onForgotPassword={onForgotPassword}
      />
    );

    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');
    
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    const signInButton = getByText('Sign In');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(onLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('calls onSignup when sign up button is pressed', () => {
    const onLogin = jest.fn();
    const onSignup = jest.fn();
    const onForgotPassword = jest.fn();
    
    const { getByText } = renderWithTheme(
      <LoginScreen
        onLogin={onLogin}
        onSignup={onSignup}
        onForgotPassword={onForgotPassword}
      />
    );

    const signUpButton = getByText('Don\'t have an account? Sign up');
    fireEvent.press(signUpButton);

    expect(onSignup).toHaveBeenCalled();
  });

  it('calls onForgotPassword when forgot password button is pressed', () => {
    const onLogin = jest.fn();
    const onSignup = jest.fn();
    const onForgotPassword = jest.fn();
    
    const { getByText } = renderWithTheme(
      <LoginScreen
        onLogin={onLogin}
        onSignup={onSignup}
        onForgotPassword={onForgotPassword}
      />
    );

    const forgotPasswordButton = getByText('Forgot Password?');
    fireEvent.press(forgotPasswordButton);

    expect(onForgotPassword).toHaveBeenCalled();
  });
}); 