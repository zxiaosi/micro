import Home from '@/pages/Home';
import sdk from '@zxiaosi/sdk';
import { ConfigProvider } from 'antd';
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';
import { useStore } from 'zustand';

function App({ basename }: any) {
  const routes: RouteObject[] = [{ path: '/', element: <Home /> }];

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
