import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { ExecutionsRoute } from '@/routes/Exectuions.tsx';
import { HomeRoute } from '@/routes/Home.tsx';
import { ProcessesRoute } from '@/routes/Processes.tsx';
import '@/styles/styles.css';

const root: HTMLElement | null = document.getElementById('root');

if (root) {
  const queryClient: QueryClient = new QueryClient();

  const rootRoute = createRootRoute();
  const routeTree = rootRoute.addChildren([
    createRoute({
      getParentRoute: () => rootRoute,
      path: '/',
      component: HomeRoute,
    }),
    createRoute({
      getParentRoute: () => rootRoute,
      path: '/processes',
      component: ProcessesRoute,
    }),
    createRoute({
      getParentRoute: () => rootRoute,
      path: '/executions',
      component: ExecutionsRoute,
    }),
  ]);
  const router = createRouter({ routeTree });

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>,
  );
}
