import sdk from '@zxiaosi/sdk';

/** 获取路由 */
export const getRoutesApi = () => {
  return sdk.api.request('/getRoutes', { method: 'get' });
};
