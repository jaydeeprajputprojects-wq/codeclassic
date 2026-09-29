import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { App } from './App';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('App health status', () => {
  it('shows connected state when the backend responds successfully', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        status: 'UP',
        service: 'codeclassic-backend',
        version: '0.0.1-SNAPSHOT',
      }),
    }));

    render(<App />);

    expect(await screen.findByText('Connected')).toBeTruthy();
    expect(screen.getByText('codeclassic-backend is up.')).toBeTruthy();
  });

  it('shows a controlled error when the backend is unavailable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network unavailable')));

    render(<App />);

    expect(await screen.findByText('Backend unavailable. Start the Spring Boot API and try again.')).toBeTruthy();
    expect(screen.queryByText('Connected')).toBeNull();
  });
});
