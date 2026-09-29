import { useEffect, useState } from 'react';

type HealthResponse = {
  status: string;
  service: string;
  version: string;
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

export function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/v1/health`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Backend returned HTTP ${response.status}`);
        }
        return response.json() as Promise<HealthResponse>;
      })
      .then(setHealth)
      .catch(() => setError('Backend unavailable. Start the Spring Boot API and try again.'));
  }, []);

  return (
    <main className="shell">
      <p className="eyebrow">Code Classic</p>
      <h1>Local platform check</h1>
      <p className="lede">A small end-to-end signal from the React app to the Spring Boot API.</p>
      <section className={`status ${health ? 'status--up' : error ? 'status--down' : ''}`} aria-live="polite">
        {!health && !error && <p>Checking backend...</p>}
        {health && (
          <>
            <p className="status__label">Connected</p>
            <p>{health.service} is {health.status.toLowerCase()}.</p>
            <p className="status__meta">API version {health.version}</p>
          </>
        )}
        {error && <p>{error}</p>}
      </section>
    </main>
  );
}
