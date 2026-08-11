import type { HealthResponse } from '@content-platform/shared';

export interface ApiClientOptions {
  baseUrl: string;
  fetchFn?: typeof fetch;
}

export function createApiClient(options: ApiClientOptions) {
  const baseUrl = options.baseUrl.replace(/\/$/, '');
  const fetchFn = options.fetchFn ?? fetch;

  return {
    async getHealth(): Promise<HealthResponse> {
      const response = await fetchFn(`${baseUrl}/health`);

      if (!response.ok) {
        throw new Error(`Health check failed with status ${response.status}`);
      }

      return response.json() as Promise<HealthResponse>;
    },
  };
}

export type ApiClient = ReturnType<typeof createApiClient>;
