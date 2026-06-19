import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AuthForm from './AuthForm';

// Mock the router and actions
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('../actions', () => ({
  loginAction: vi.fn().mockResolvedValue({ success: true }),
  signUpAction: vi.fn().mockResolvedValue({ success: true }),
}));

describe('AuthForm', () => {
  it('should render login form by default', () => {
    render(<AuthForm />);
    expect(screen.getByRole('heading', { name: 'Welcome back' })).toBeInTheDocument();
  });

  it('should switch to signup form when clicking Create Account', () => {
    render(<AuthForm />);
    fireEvent.click(screen.getByText('Create Account'));
    expect(screen.getByRole('heading', { name: 'Create an account' })).toBeInTheDocument();
  });
});
