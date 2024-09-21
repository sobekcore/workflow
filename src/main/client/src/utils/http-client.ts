import { Schema, TypeOf, ZodSchema } from 'zod';
import { HttpMethod } from '@/enums/http.ts';
import { HttpException } from '@/exceptions/http.ts';

interface HttpClientConfig<T extends ZodSchema> {
  schema?: T;
  body?: Record<string, unknown> | unknown[];
  config?: RequestInit;
}

export async function httpClient<T extends ZodSchema>(
  method: HttpMethod,
  url: string,
  config?: HttpClientConfig<T>,
): Promise<TypeOf<Schema>> {
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
    const data = await response.json();

    if (config?.schema) {
      return config.schema.parse(data);
    }

    return data;
  }

  throw new HttpException('Something went wrong during request');
}
