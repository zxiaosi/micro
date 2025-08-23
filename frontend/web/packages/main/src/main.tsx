import CustomActions from '@/components/customActions';
import CustomMenuFooter from '@/components/customMenuFooter';
import Dashboard from '@/pages/dashboard/index.tsx';
import { getRoutesApi } from '@/service/index.ts';
import {
  ApiPlugin,
  AppPlugin,
  ClientPlugin,
  ComponentsPlugin,
  HooksPlugin,
  I18nPlugin,
  LayoutPlugin,
  RouterPlugin,
  sdk,
  StoragePlugin,
  StorePlugin,
} from '@zxiaosi/sdk';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

sdk
  .use(ApiPlugin, {
    config: {
      baseURL: '/api',
    },
    getRoutesApi,
  })
  .use(AppPlugin, {
    antdConfig: {
      prefixCls: 'zxs',
      theme: {
        token: {
          colorPrimary: '#1e90ff',
          colorInfo: '#1e90ff',
          colorSuccess: '#2ed573',
          colorWarning: '#ffa502',
          colorError: '#ff4757',
        },
      },
    },
  })
  .use(ClientPlugin)
  .use(ComponentsPlugin, {
    Dashboard,
    // NotFound,
  })
  .use(HooksPlugin)
  .use(I18nPlugin)
  .use(LayoutPlugin, {
    title: import.meta.env.VITE_APP_TITLE,
    layout: 'mix',
    actionsRender: (props) => <CustomActions {...props} />,
    menuFooterRender: (props) => <CustomMenuFooter {...props} />,
    logo: <img src="/logo.svg" style={{ height: 20 }} />,
  })
  .use(RouterPlugin)
  .use(StoragePlugin)
  .use(StorePlugin)
  .mount('sdk');

createRoot(document.getElementById('root')!).render(<App />);
