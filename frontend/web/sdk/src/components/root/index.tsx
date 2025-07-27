import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

/** 根组件 */
const Root = ({ sdk }: any) => {
  console.log('Root component initialized', sdk);

  const Login = sdk.getComponent('Login');
  const NotFound = sdk.getComponent('NotFound');

  useEffect(() => {
    sdk.settings.getRoutesApi().then((res) => {
      console.log('获取路由数据:', res);
    });
  }, []);

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
