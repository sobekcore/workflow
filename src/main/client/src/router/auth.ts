import { redirect } from '@tanstack/react-router';
import { QueryKey } from '@/enums/query.ts';
import { RouterContext } from '@/router/router.ts';

export function handleAuth(context: RouterContext): void {
  if (!context.queryClient?.getQueryData([QueryKey.AUTH])) {
    throw redirect({ to: '/' });
  }
}
