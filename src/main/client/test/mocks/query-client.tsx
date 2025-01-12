import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export let queryClient: QueryClient;

export function MockQueryClientProvider({ children }: PropsWithChildren) {
  queryClient = new QueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
