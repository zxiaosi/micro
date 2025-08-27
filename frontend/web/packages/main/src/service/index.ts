import { sdk } from '@zxiaosi/sdk';
import mockRoutes from '../../mock/production/getRoutes';

/** 获取路由 */
export const getRoutesApi = async () => {
  console.log('getRoutesApi', import.meta.env.MODE);

  if (import.meta.env.MODE === 'development') {
    return await sdk.api.request('/getRoutes', { method: 'get' });
  } else {
    return mockRoutes;
  }
};

/** 获取路由 */
export const loginApi = async (values: any) => {
  console.log('loginApi', import.meta.env.MODE);

  if (import.meta.env.MODE === 'development') {
    return await sdk.api.request('/login', { method: 'post', data: values });
  } else {
    return { token: '123456' };
  }
};
