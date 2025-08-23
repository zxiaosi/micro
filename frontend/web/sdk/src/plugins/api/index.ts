// 按需引入
import merge from 'lodash/merge';

import { Plugin, SdkProps } from '@/types';
import { AxiosResponse } from 'axios';
import Http, { ApiConfig, ApiRequestOption } from './http';

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
/** 插件名称 */
const pluginName = 'api';

/** Api 插件 */
const ApiPlugin: Plugin<'api'> = {
  name: pluginName,
  install(sdk: SdkProps, options: Props = {}) {
    // Axios 配置
    const axiosConfig = {
      baseURL: '/api',
      timeout: 0,
      ...options.config,
    } satisfies Props['config'];

    // 创建 Axios 实例
    const instance = new Http(axiosConfig).getInstance();

    // 默认插件配置
    const defaultOptions = {
      config: axiosConfig,
      getUserInfoApi: async () => {
        return await sdk.instance.api.request('/userInfo');
      },
      getRoutesApi: async () => {
        return await sdk.instance.api.request('/routes');
      },
      request: async (url, options = {}) => {
        return await instance.request({
          url,
          isOriginalData: false,
          isShowFailMsg: true,
          ...options,
        });
      },
    } satisfies Result;

    sdk.instance[pluginName] = merge({}, defaultOptions, options);
  },
};

export { ApiPlugin, Props as ApiProps, Result as ApiResult };
