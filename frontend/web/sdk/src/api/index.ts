// 使用按需加载的方式引入 lodash
import merge from 'lodash/merge';

import { SdkResult } from '@/global';
import { AxiosResponse } from 'axios';
import Api, { ApiConfig, ApiRequestOption } from './http';

interface Props {
  /** Axios配置 */
  config?: ApiConfig;
  /**
   * 获取用户信息
   */
  getUserInfoApi?: () => Promise<any>;
  /**
   * 获取路由数据
   */
  getRoutesApi?: () => Promise<any>;
}

interface Result extends Required<Readonly<Props>> {
  /**
   * 请求
   * @param  url 请求地址
   * @param options 自定义配置项
   */
  readonly request: (
    url: string,
    options?: ApiRequestOption,
  ) => Promise<AxiosResponse<any, any>>;
}

/** Api配置 */
const createApi = (sdk: SdkResult, opt: Props = {}): Result => {
  const { config = {}, ...restOpt } = opt;

  // 合并配置
  const allConfig = {
    baseURL: '/api',
    timeout: 0,
    ...config,
  } satisfies ApiConfig;

  // 创建实例
  const api = new Api(allConfig).getInstance();

  // 返回结果
  const result: Result = {
    config: allConfig,
    getUserInfoApi: async () => {
      return await sdk.api.request('/userInfo');
    },
    getRoutesApi: async () => {
      return await sdk.api.request('/routes');
    },
    request: async (url, options = {}) => {
      return await api.request({
        url,
        isOriginalData: false,
        isShowFailMsg: true,
        ...options,
      });
    },
  };

  // 合并属性
  return merge(result, sdk.api, restOpt);
};

export { Props as ApiProps, Result as ApiResult, createApi };
