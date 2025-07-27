import sdk from '@zxiaosi/sdk';
import { useEffect } from 'react';
import { getRoutesApi } from './service';

function App() {
  const Root = sdk.getRootComponent();
  useEffect(() => {
    getRoutesApi().then((res) => {
      console.log('获取路由数据:', res);
    });
  }, []);
  return <Root />;
}

export default App;
