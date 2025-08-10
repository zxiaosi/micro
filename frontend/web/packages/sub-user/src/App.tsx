import Home from '@/pages/Home';
import sdk from '@zxiaosi/sdk';
import { ConfigProvider } from 'antd';
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';

function App({ basename }: any) {
  const routes: RouteObject[] = [{ path: '/', element: <Home /> }];

  return (
    <ConfigProvider
      {...sdk.app.antdConfig}
      getPopupContainer={(node) =>
        (node ? node?.parentNode : document.body) as HTMLElement
      }
    >
      <RouterProvider
        router={createBrowserRouter(routes, { basename: `/${basename}` })}
      />
    </ConfigProvider>
  );
}

export default App;
