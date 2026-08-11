export type ResponseStatus = 'ok' | 'error';

export interface ResponseCheck {
  status: ResponseStatus;
  message?: string;
}

export interface HealthResponse {
  status: ResponseStatus;
  timestamp: string;
  checks: {
    database: ResponseCheck;
  };
}
