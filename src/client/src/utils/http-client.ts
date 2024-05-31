import { HttpMethod } from '@/enums/http.ts';
import { HttpException } from '@/exceptions/http.ts';

interface HttpClientConfig {
  body?: Record<string, unknown> | unknown[];
  config?: RequestInit;
}

export async function httpClient<T>(method: HttpMethod, url: string, config?: HttpClientConfig): Promise<T> {
  const response: Response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
    ...config?.config,
    ...(config?.body && { body: JSON.stringify(config.body) }),
    headers: {
      'Content-Type': 'application/json',
      ...config?.config?.headers,
    },
    method,
  });

  if (response.ok) {
    return await response.json();
  }

  throw new HttpException('Something went wrong during request');
}
