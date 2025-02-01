import { Schema, TypeOf, ZodSchema } from 'zod';
import { HttpMethod, HttpStatus } from '@/enums/http.ts';
import { HttpException } from '@/exceptions/http.ts';
import { navigateToLogin } from '@/utils/auth.ts';

interface HttpClientConfig<T extends ZodSchema> {
  schema?: T;
  body?: Record<string, any> | unknown[];
  config?: RequestInit;
  allowUnauthorized?: boolean;
}

export async function httpClient<T extends ZodSchema>(
  method: HttpMethod,
  url: string,
  config?: HttpClientConfig<T>,
): Promise<TypeOf<Schema>> {
  const response: Response = await fetch(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_PREFIX}${url}`, {
    ...config?.config,
    ...(config?.body && { body: JSON.stringify(config.body) }),
    headers: {
      'Content-Type': 'application/json',
      ...config?.config?.headers,
    },
    credentials: 'include',
    method,
  });

  if (response.ok) {
    const data = await response.json();

    if (config?.schema) {
      return config.schema.parse(data);
    }

    return data;
  }

  if (response.status === HttpStatus.UNAUTHORIZED) {
    if (!config?.allowUnauthorized) {
      navigateToLogin();
    }

    return null;
  }

  throw new HttpException(response);
}
