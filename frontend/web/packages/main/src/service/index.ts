import sdk from '@zxiaosi/sdk';
import mockRoutes from '../../mock/production/getRoutes';

/** 获取路由 */
export const getRoutesApi = () => {
  console.log('getRoutesApi', import.meta.env.MODE);

  if (import.meta.env.MODE === 'development') {
    return sdk.api.request('/getRoutes', { method: 'get' });
  } else {
    return mockRoutes;
  }
};
