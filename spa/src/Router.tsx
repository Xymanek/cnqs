import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { WelcomePage } from './pages/Welcome.page';
import mainRoutes from './pages/main/_main-segment.routes';

const router = createBrowserRouter([
  ...mainRoutes,
  {
    path: '/welcome',
    element: <WelcomePage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
