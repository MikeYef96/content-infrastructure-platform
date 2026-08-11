import { createApiClient } from '@content-platform/api-client';
import { useQuery } from '@tanstack/react-query';

const apiBaseUrl = import.meta.env.VITE_API_URL ?? '/api';
const apiClient = createApiClient({ baseUrl: apiBaseUrl });

export function App() {
  const healthQuery = useQuery({
    queryKey: ['health'],
    queryFn: () => apiClient.getHealth(),
  });

  return (
    <main className="app">
      <header>
        <h1>Content Infrastructure Platform</h1>
        <p>Developer-focused headless content platform</p>
      </header>

      <section className="panel">
        <h2>API Health</h2>

        {healthQuery.isLoading && <p>Checking API connection…</p>}

        {healthQuery.isError && (
          <p className="error">
            API unreachable:{' '}
            {healthQuery.error instanceof Error ? healthQuery.error.message : 'Unknown error'}
          </p>
        )}

        {healthQuery.data && (
          <dl>
            <div>
              <dt>Status</dt>
              <dd className={healthQuery.data.status}>{healthQuery.data.status}</dd>
            </div>
            <div>
              <dt>Timestamp</dt>
              <dd>{healthQuery.data.timestamp}</dd>
            </div>
            <div>
              <dt>Database</dt>
              <dd className={healthQuery.data.checks.database.status}>
                {healthQuery.data.checks.database.status}
                {healthQuery.data.checks.database.message
                  ? ` — ${healthQuery.data.checks.database.message}`
                  : ''}
              </dd>
            </div>
          </dl>
        )}
      </section>
    </main>
  );
}
