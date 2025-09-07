// 按需引入
import merge from 'lodash/merge';

import { Plugin, UserInfo } from '@/types';
import { AxiosResponse } from 'axios';
import { RouteObject } from 'react-router-dom';
import Http, { ApiConfig, ApiRequestOption } from './http';

interface ApiProps {
  /** Axios配置 */
  config?: ApiConfig;

  /**
   * 自定义请求实例
   * - 将替代 SDK 内置的请求实例
   * @example instance = axios.create(options)
   */
  instance?: any;

  /**
   * 获取用户信息
   * @example { data: { user: { ... }, permissions: [], roles: [], settings: {} }, code: 200 }
   */
  getUserInfoApi?: () => Promise<AxiosResponse<UserInfo>>;
  /**
   * 获取路由数据
   * @example { data: [{path: '/', name: '首页', element: 'Home'}], code: 200 }
   */
  getRoutesApi?: () => Promise<AxiosResponse<RouteObject[]>>;
  /**
   * 登录接口
   * @example { data: { token: 'xxxx' }, code: 200 }
   */
  loginApi?: (values: any) => Promise<any>;
}

interface ApiResult extends Required<Readonly<ApiProps>> {
  /**
   * 请求
   * @param  url 请求地址
   * @param options 自定义配置项
   */
  request: (
    url: string,
    options?: ApiRequestOption,
  ) => Promise<AxiosResponse<any, any>>;
}

/** 插件名称 */
const pluginName = 'api';

/**
 * 请求 插件
 * - 详情参考 {@link ApiProps} {@link ApiResult}
 * - 内置了请求, 通过 sdk.api.request 发起请求
 * - 可通过外部传入 instance 自定义请求实例
 * - 预置了获取用户信息, 获取路由, 登录接口等接口, 以便组件使用
 */
const ApiPlugin: Plugin<'api'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // Axios 配置
    const axiosConfig = {
      baseURL: '/api',
      timeout: 0,
      ...options.config,
    } satisfies ApiProps['config'];

    // 创建 Axios 实例
    const instance = options?.instance || new Http(axiosConfig).getInstance();

    // 默认插件配置
    const defaultOptions = {
      config: axiosConfig,
      instance: null,
      getUserInfoApi: async () => {
        return await sdk.api.request('/getUserInfo');
      },
      getRoutesApi: async () => {
        return await sdk.api.request('/routes');
      },
      loginApi: async (values) => {
        return await sdk.api.request('/login', {
          method: 'POST',
          data: values,
        });
      },
      request: async (url, options = {}) => {
        return await instance.request({
          url,
          isOriginalData: false,
          isShowFailMsg: true,
          ...options,
        });
      },
    } satisfies ApiResult;

    sdk[pluginName] = merge({}, defaultOptions, options);
  },
};

export { ApiPlugin, ApiProps, ApiResult };
