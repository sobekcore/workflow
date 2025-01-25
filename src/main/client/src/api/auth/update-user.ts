import { HttpMethod } from '@/enums/http.ts';
import { UserToUpdate } from '@/interfaces/auth.ts';
import { userSchema } from '@/schemas/auth.ts';
import { httpClient } from '@/utils/http-client.ts';

export function updateUser(user: UserToUpdate) {
  return httpClient(HttpMethod.PUT, '/auth/user', {
    schema: userSchema,
    body: user,
  });
}
