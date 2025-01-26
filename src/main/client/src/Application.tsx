import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from '@tanstack/react-router';
import { router } from '@/router/router.ts';
import { toastifyConfig } from '@/configs/toastify.tsx';

const queryClient: QueryClient = new QueryClient();

export default function Application() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ queryClient }} />
      <ToastContainer {...toastifyConfig} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
