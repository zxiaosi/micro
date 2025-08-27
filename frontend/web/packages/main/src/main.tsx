import CustomActions from '@/components/customActions';
import CustomMenuFooter from '@/components/customMenuFooter';
import I18nConfig from '@/i18n/index';
import Dashboard from '@/pages/dashboard/index.tsx';
import { getRoutesApi, loginApi } from '@/service/index.ts';
import '@/theme/index.less';
import theme from '@/theme/token';
import {
  ApiPlugin,
  AppPlugin,
  ComponentsPlugin,
  I18nPlugin,
  sdk,
  StoragePlugin,
  StorePlugin,
} from '@zxiaosi/sdk';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.less';

sdk
  .use(ApiPlugin, { config: { baseURL: '/api' }, getRoutesApi, loginApi })
  .use(AppPlugin, {
    antdConfig: { theme },
    proLayoutConfig: {
      layout: 'mix',
      title: import.meta.env.VITE_APP_TITLE,
      logo: <img src="/logo.svg" style={{ height: 20 }} />,
      actionsRender: (props) => <CustomActions {...props} />,
      menuFooterRender: (props) => <CustomMenuFooter {...props} />,
    },
  })
  .use(ComponentsPlugin, { Dashboard })
  .use(I18nPlugin, I18nConfig)
  .use(StoragePlugin)
  .use(StorePlugin)
  .mount('sdk');

createRoot(document.getElementById('root')!).render(<App />);
