import sdk from '@/sdk';
import { createBrowserRouter, RouterProvider } from 'react-router';

/** 根组件 */
const Root = () => {
  console.log('Root component initialized');

  const Login = sdk.getComponent('Login');
  const NotFound = sdk.getComponent('NotFound');

  const router = createBrowserRouter(
    [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/',
        element: <>Dashboard</>,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
    {
      basename: '/',
    },
  );

  return <RouterProvider router={router} />;
};
export default Root;
