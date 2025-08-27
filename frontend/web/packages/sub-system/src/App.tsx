import { sdk } from '@zxiaosi/sdk';
import { ConfigProvider } from 'antd';
import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';
import { useStore } from 'zustand';
import './index.less';

const User = lazy(() => import('@/pages/user'));
const Role = lazy(() => import('@/pages/role'));
const Resource = lazy(() => import('@/pages/resource'));

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
      <Suspense>
        <RouterProvider
          router={createBrowserRouter(routes, {
            basename: basename ? `/${basename}` : '/',
          })}
        />
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
