import CustomActions from '@/components/customActions';
import CustomMenuFooter from '@/components/customMenuFooter';
import Dashboard from '@/pages/dashboard/index.tsx';
import NotFound from '@/pages/notFound/index.tsx';
import { getRoutesApi } from '@/service/index.ts';
import sdk from '@zxiaosi/sdk';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

sdk.register({
  api: {
    config: {
      baseURL: '/api',
    },
    getRoutesApi,
  },
  app: {
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
  },
  components: {
    Dashboard,
    NotFound,
  },
  ui: {
    title: import.meta.env.VITE_APP_TITLE,
    layout: 'mix',
    actionsRender: (props) => <CustomActions {...props} />,
    menuFooterRender: (props) => <CustomMenuFooter {...props} />,
  },
});

createRoot(document.getElementById('root')!).render(<App />);
