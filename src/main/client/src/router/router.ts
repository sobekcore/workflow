import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, createRoute, createRouter } from '@tanstack/react-router';
import { authQuery } from '@/hooks/auth/useAuth.ts';
import DefaultLayout from '@/layouts/DefaultLayout.tsx';
import ErrorRoute from '@/routes/Error.tsx';
import ExecutionsRoute from '@/routes/Exectuions.tsx';
import HomeRoute from '@/routes/Home.tsx';
import LoginRoute from '@/routes/Login.tsx';
import ProcessesRoute from '@/routes/Processes.tsx';
import ProfileRoute from '@/routes/Profile.tsx';
import { handleAuth } from '@/router/auth.ts';

export interface RouterContext {
  queryClient?: QueryClient;
}

const rootRoute = createRootRouteWithContext<RouterContext>()({
  errorComponent: ErrorRoute,
  notFoundComponent: ErrorRoute,
  async beforeLoad({ context }) {
    await context.queryClient?.ensureQueryData(authQuery());
  },
});

const defaultRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'default',
  component: DefaultLayout,
});

const routeTree = rootRoute.addChildren([
  createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: LoginRoute,
    beforeLoad({ context }): void {
      handleAuth(context, true);
    },
  }),
  defaultRoute.addChildren([
    createRoute({
      getParentRoute: () => defaultRoute,
      path: '/',
      component: HomeRoute,
    }),
    createRoute({
      getParentRoute: () => defaultRoute,
      path: '/processes',
      component: ProcessesRoute,
      beforeLoad({ context }): void {
        handleAuth(context);
      },
    }).addChildren([
      createRoute({
        getParentRoute: () => defaultRoute,
        path: '/processes/$processId',
        component: ProcessesRoute,
        beforeLoad({ context }): void {
          handleAuth(context);
        },
      }),
    ]),
    createRoute({
      getParentRoute: () => defaultRoute,
      path: '/executions',
      component: ExecutionsRoute,
      beforeLoad({ context }): void {
        handleAuth(context);
      },
    }).addChildren([
      createRoute({
        getParentRoute: () => defaultRoute,
        path: '/executions/$executionId',
        component: ExecutionsRoute,
        beforeLoad({ context }): void {
          handleAuth(context);
        },
      }),
    ]),
    createRoute({
      getParentRoute: () => defaultRoute,
      path: '/profile',
      component: ProfileRoute,
      beforeLoad({ context }): void {
        handleAuth(context);
      },
    }),
  ]),
]);

export const router = createRouter({
  routeTree,
});
