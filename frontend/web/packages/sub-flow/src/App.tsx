import { sdk } from '@zxiaosi/sdk';
import { ConfigProvider } from 'antd';
import { lazy, Suspense } from 'react';
import { IntlProvider } from 'react-intl';
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';
import './index.less';

const Home = lazy(() => import('@/pages/home'));
const Detail = lazy(() => import('@/pages/detail'));

function App({ basename }: any) {
  const routes: RouteObject[] = [
    { path: '/', element: <Home /> },
    { path: '/detail', element: <Detail /> },
  ];

  const [antdConfig, locale] = useStore(
    sdk.store,
    useShallow((state) => [state.antdConfig, state.locale]),
  );

  return (
    <IntlProvider locale={locale} messages={sdk.i18n?.[locale]}>
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
    </IntlProvider>
  );
}

export default App;
