import { User } from '@/interfaces/auth.ts';

export function mockUser(): User {
  return {
    id: 'user',
    createdAt: new Date(),
    email: 'user@test.com',
    name: 'User',
  };
}
