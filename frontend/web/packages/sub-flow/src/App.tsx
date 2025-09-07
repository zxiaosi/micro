import { sdk } from '@zxiaosi/sdk';
import { ConfigProvider } from 'antd';
import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';
import { useStore } from 'zustand';
import './index.less';

const Home = lazy(() => import('@/pages/home'));
const Detail = lazy(() => import('@/pages/detail'));

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/detail', element: <Detail /> },
];

function App({ basename, container }: any) {
  const antdConfig = useStore(sdk.store, (state) => state.antdConfig);

  return (
    <ConfigProvider
      {...antdConfig}
      getPopupContainer={() => container || document.body}
    >
      <Suspense fallback={<>Loading...</>}>
        <RouterProvider
          router={createBrowserRouter(routes, {
            basename: basename ? `/${basename}` : '/',
          })}
          future={{ v7_startTransition: false }}
        />
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
