import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('checkout', 'routes/checkout.tsx'),
  route('success', 'routes/success.tsx'),
] satisfies RouteConfig;
