import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { ExecutionsRoute } from '@/routes/Exectuions.tsx';
import { HomeRoute } from '@/routes/Home.tsx';
import { ProcessesRoute } from '@/routes/Processes.tsx';

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

export const router = createRouter({ routeTree });
