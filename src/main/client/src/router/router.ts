import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, createRoute, createRouter } from '@tanstack/react-router';
import { authQuery } from '@/hooks/auth/useAuth.ts';
import DefaultLayout from '@/layouts/DefaultLayout.tsx';
import ExecutionsRoute from '@/routes/Exectuions.tsx';
import HomeRoute from '@/routes/Home.tsx';
import ProcessesRoute from '@/routes/Processes.tsx';
import ProfileRoute from '@/routes/Profile.tsx';
import { handleAuth } from '@/router/auth.ts';

export interface RouterContext {
  queryClient?: QueryClient;
}

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: DefaultLayout,
  async beforeLoad({ context }) {
    await context.queryClient?.ensureQueryData(authQuery());
  },
});

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
    beforeLoad({ context }): void {
      handleAuth(context);
    },
  }).addChildren([
    createRoute({
      getParentRoute: () => rootRoute,
      path: '/processes/$processId',
      component: ProcessesRoute,
      beforeLoad({ context }): void {
        handleAuth(context);
      },
    }),
  ]),
  createRoute({
    getParentRoute: () => rootRoute,
    path: '/executions',
    component: ExecutionsRoute,
    beforeLoad({ context }): void {
      handleAuth(context);
    },
  }).addChildren([
    createRoute({
      getParentRoute: () => rootRoute,
      path: '/executions/$executionId',
      component: ExecutionsRoute,
      beforeLoad({ context }): void {
        handleAuth(context);
      },
    }),
  ]),
  createRoute({
    getParentRoute: () => rootRoute,
    path: '/profile',
    component: ProfileRoute,
    beforeLoad({ context }): void {
      handleAuth(context);
    },
  }),
]);

export const router = createRouter({
  routeTree,
});
