import { HttpMethod } from '@/enums/http.ts';
import { User } from '@/interfaces/auth.ts';
import { userSchema } from '@/schemas/auth.ts';
import { httpClient } from '@/utils/http-client.ts';

export function readUser(): Promise<User | undefined> {
  return httpClient(HttpMethod.GET, '/auth/user', {
    schema: userSchema,
    allowUnauthorized: true,
  });
}
