import { PropsWithChildren } from 'react';
import { RouterProvider, createRootRoute, createRouter } from '@tanstack/react-router';

export function MockRouterProvider({ children }: PropsWithChildren) {
  const rootRoute = createRootRoute({
    component: () => children,
  });

  const router = createRouter({
    routeTree: rootRoute,
  });

  return <RouterProvider router={router} />;
}
