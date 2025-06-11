import { registerMicroApps, start } from 'qiankun';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);

/** 注册子应用 */
registerMicroApps(
  [
    {
      name: 'user',
      entry: 'http://localhost:8001',
      container: '#sub-app',
      activeRule: '/user',
    },
  ],
  {
    beforeLoad: [
      async (app) => {
        console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
      },
    ],
    beforeMount: [
      async (app) => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
      },
    ],
    afterUnmount: [
      async (app) => {
        console.log(
          '[LifeCycle] after unmount %c%s',
          'color: green;',
          app.name,
        );
      },
    ],
  },
);

start({ sandbox: true });
