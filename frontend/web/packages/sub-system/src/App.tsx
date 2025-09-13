import { AntdConfigProvider } from '@zxiaosi/sdk';
import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';
import './index.less';

interface Props {
  basename: string;
  container: HTMLElement;
}

const User = lazy(() => import('@/pages/user'));
const Role = lazy(() => import('@/pages/role'));
const Resource = lazy(() => import('@/pages/resource'));

const routes: RouteObject[] = [
  { path: '/', element: <Navigate to="/user" /> },
  { path: '/user', element: <User /> },
  { path: '/role', element: <Role /> },
  { path: '/resource', element: <Resource /> },
];

function App({ basename, container }: Props) {
  return (
    <AntdConfigProvider getPopupContainer={() => container || document.body}>
      <Suspense fallback={<>Loading...</>}>
        <RouterProvider
          router={createBrowserRouter(routes, {
            basename: basename ? `/${basename}` : '/',
          })}
          future={{ v7_startTransition: false }}
        />
      </Suspense>
    </AntdConfigProvider>
  );
}

export default App;
