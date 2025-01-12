import { User } from '@/interfaces/auth.ts';

export function mockUser(): User {
  return {
    id: 'user',
    createdAt: new Date(0),
    email: 'user@test.com',
    name: 'User',
  };
}
