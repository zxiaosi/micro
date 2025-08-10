import Resource from '@/pages/resource';
import Role from '@/pages/role';
import User from '@/pages/user';
import sdk from '@zxiaosi/sdk';
import { ConfigProvider } from 'antd';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';
import { useStore } from 'zustand';

function App({ basename }: any) {
  const routes: RouteObject[] = [
    { path: '/', element: <Navigate to="/user" /> },
    { path: '/user', element: <User /> },
    { path: '/role', element: <Role /> },
    { path: '/resource', element: <Resource /> },
  ];

  const antdConfig = useStore(sdk.store, (state) => state.antdConfig);

  return (
    <ConfigProvider
      {...antdConfig}
      getPopupContainer={(node) =>
        (node ? node?.parentNode : document.body) as HTMLElement
      }
    >
      <RouterProvider
        router={createBrowserRouter(routes, {
          basename: basename ? `/${basename}` : '/',
        })}
      />
    </ConfigProvider>
  );
}

export default App;
