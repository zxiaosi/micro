import Dashboard from '@/pages/dashboard';
import Login from '@/pages/login';
import { createBrowserRouter, RouterProvider } from 'react-router';

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
    ],
    {
      basename: '/',
    },
  );

  return <RouterProvider router={router} />;
}

export default App;
