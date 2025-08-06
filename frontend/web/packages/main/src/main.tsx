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
  components: {
    Dashboard,
    NotFound,
  },
  ui: {
    title: import.meta.env.VITE_APP_TITLE,
    layout: 'mix',
    menuFooterRender: (props) => {
      if (props?.collapsed) return undefined;

      return (
        <div style={{ textAlign: 'center' }}>
          ©2020 - {new Date().getFullYear()} By Mr.XiaoSi
        </div>
      );
    },
  },
});

createRoot(document.getElementById('root')!).render(<App />);

// production mock server
if (process.env.NODE_ENV === 'production') {
  import('./mockProdServer').then(({ setupProdMockServer }) => {
    setupProdMockServer();
  });
}
