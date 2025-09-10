import CustomActions from '@/components/customActions';
import CustomMenuFooter from '@/components/customMenuFooter';
import I18nConfig from '@/i18n/index';
import { getRoutesApi, loginApi } from '@/service/index.ts';
import '@/theme/index.less';
import theme from '@/theme/token';
import {
  ApiPlugin,
  AppPlugin,
  ComponentsPlugin,
  ConfigPlugin,
  I18nPlugin,
  sdk,
  StorePlugin,
} from '@zxiaosi/sdk';
import { lazy } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.less';

import { setupProdMockServer } from './mockProdServer';
if (!import.meta.env.DEV) {
  setupProdMockServer();
}

const Login = lazy(() => import('@/pages/login'));
const Dashboard = lazy(() => import('@/pages/dashboard/index.tsx'));
const Guide = lazy(() => import('@/pages/guide'));

sdk
  .use(ApiPlugin, { config: { baseURL: '/api' }, getRoutesApi, loginApi })
  .use(AppPlugin)
  .use(ConfigPlugin, {
    customRoutes: [{ path: '/guide', element: <Guide /> }],
    antdConfig: { theme },
    proLayoutConfig: {
      layout: 'mix',
      title: import.meta.env.VITE_APP_TITLE,
      logo: <img src="/logo.svg" style={{ height: 20 }} />,
      contentStyle: { height: 'calc(100vh - 56px)', overflowY: 'auto' },
      actionsRender: (props) => <CustomActions {...props} />,
      menuFooterRender: (props) => <CustomMenuFooter {...props} />,
    },
  })
  .use(ComponentsPlugin, { Dashboard })
  .use(I18nPlugin, I18nConfig)
  .use(StorePlugin)
  .mount('sdk');

createRoot(document.getElementById('root')!).render(<App />);
