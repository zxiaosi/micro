import { AntdConfigProvider } from '@zxiaosi/sdk';
import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';
import './index.less';

interface Props {
  basename: string;
  container: HTMLElement;
}

const Home = lazy(() => import('@/pages/home'));
const Detail = lazy(() => import('@/pages/detail'));

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/detail', element: <Detail /> },
];

function App({ basename = '/', container }: Props) {
  return (
    <AntdConfigProvider getPopupContainer={() => container || document.body}>
      <Suspense fallback={<>Loading...</>}>
        <RouterProvider
          router={createBrowserRouter(routes, { basename })}
          future={{ v7_startTransition: false }}
        />
      </Suspense>
    </AntdConfigProvider>
  );
}

export default App;
