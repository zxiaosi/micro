import { sdk } from '@zxiaosi/sdk';
import { ConfigProvider } from 'antd';
import { lazy, Suspense } from 'react';
import { IntlProvider } from 'react-intl';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';
import './index.less';

const User = lazy(() => import('@/pages/user'));
const Role = lazy(() => import('@/pages/role'));
const Resource = lazy(() => import('@/pages/resource'));

const routes: RouteObject[] = [
  { path: '/', element: <Navigate to="/user" /> },
  { path: '/user', element: <User /> },
  { path: '/role', element: <Role /> },
  { path: '/resource', element: <Resource /> },
];

function App({ basename }: any) {
  const [antdConfig, locale] = useStore(
    sdk.store,
    useShallow((state) => [state.antdConfig, state.locale]),
  );

  return (
    <IntlProvider locale={locale} messages={sdk.i18n.intlConfig[locale]}>
      <ConfigProvider {...antdConfig}>
        <Suspense>
          <RouterProvider
            router={createBrowserRouter(routes, {
              basename: basename ? `/${basename}` : '/',
            })}
          />
        </Suspense>
      </ConfigProvider>
    </IntlProvider>
  );
}

export default App;
