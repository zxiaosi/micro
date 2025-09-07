import { sdk } from '@zxiaosi/sdk';

/** 获取路由 */
export const getRoutesApi = async () => {
  return await sdk.api.request('/getRoutes', {
    method: 'get',
    params: { isDev: import.meta.env.MODE === 'development' },
  });
};

/** 获取路由 */
export const loginApi = async (values: any) => {
  return await sdk.api.request('/login', { method: 'post', data: values });
};
