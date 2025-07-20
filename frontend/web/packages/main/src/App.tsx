import Dashboard from '@/pages/dashboard';
import sdk from '@zxiaosi/sdk';
import { createBrowserRouter, RouterProvider } from 'react-router';

const Login = sdk.components.Login;
const NotFound = sdk.components.NotFound;
function App({ loading }: any) {
  const router = createBrowserRouter(
    [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/',
        element: <Dashboard />,
        children: [
          {
            path: 'user/*',
            element: <>{loading && <div>loading...</div>}</>, // 子应用挂载点
          },
          {
            path: 'test',
            element: <div>test</div>,
          },
        ],
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
}

export default App;
