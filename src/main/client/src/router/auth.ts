import { redirect } from '@tanstack/react-router';
import { QueryKey } from '@/enums/query.ts';
import { User } from '@/interfaces/auth.ts';
import { RouterContext } from '@/router/router.ts';

export function handleAuth(context: RouterContext, allowUnauthorized?: boolean): void {
  const user: User | undefined = context.queryClient?.getQueryData([QueryKey.AUTH]);

  if (allowUnauthorized ? user : !user) {
    throw redirect({ to: '/' });
  }
}
