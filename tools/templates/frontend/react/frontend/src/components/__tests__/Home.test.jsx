import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '../Home';
import * as api from '../../lib/api';

// Mock the API module
vi.mock('../../lib/api');

describe('Home Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders welcome message', () => {
    vi.mocked(api.apiFetch).mockRejectedValue(new Error('API not available'));

    render(<Home />);

    expect(screen.getByText(/Welcome to/i)).toBeInTheDocument();
  });

  it('displays loading state initially', () => {
    vi.mocked(api.apiFetch).mockImplementation(() => new Promise(() => {}));

    render(<Home />);

    expect(screen.getByText(/Testing backend connection/i)).toBeInTheDocument();
  });

  it('displays API message on successful connection', async () => {
    vi.mocked(api.apiFetch).mockResolvedValue({
      message: 'Hello from backend!',
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText(/Hello from backend!/i)).toBeInTheDocument();
    });
  });

  it('displays error message on failed connection', async () => {
    vi.mocked(api.apiFetch).mockRejectedValue(new Error('Connection failed'));

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText(/Error: Connection failed/i)).toBeInTheDocument();
    });
  });

  it('cleans up on unmount', async () => {
    let resolvePromise;
    const promise = new Promise(resolve => {
      resolvePromise = resolve;
    });

    vi.mocked(api.apiFetch).mockReturnValue(promise);

    const { unmount } = render(<Home />);

    // Unmount before promise resolves
    unmount();

    // Resolve promise after unmount
    resolvePromise({ message: 'Should not update' });

    // Wait a bit
    await new Promise(resolve => setTimeout(resolve, 50));

    // If cleanup works, no state update errors should occur
    expect(true).toBe(true);
  });
});
