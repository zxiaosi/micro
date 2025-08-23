import Detail from '@/pages/detail';
import Home from '@/pages/home';
import { sdk } from '@zxiaosi/sdk';
import { ConfigProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

function App({ basename }: any) {
  const routes: RouteObject[] = [
    { path: '/', element: <Home /> },
    { path: '/detail', element: <Detail /> },
  ];

  const [antdConfig, locale] = useStore(
    sdk.instance.store,
    useShallow((state) => [state.antdConfig, state.locale]),
  );

  return (
    <IntlProvider locale={locale} messages={sdk.instance.i18n?.[locale]}>
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
    </IntlProvider>
  );
}

export default App;
