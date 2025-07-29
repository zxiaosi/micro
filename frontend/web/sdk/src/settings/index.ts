import { SdkProps } from '@/global';
import { AxiosRequestConfig } from 'axios';

interface Props {
  /** 路由模式 */
  routerMode: 'browser' | 'hash' | 'memory';
  /** 登录接口 */
  loginApi: (options?: AxiosRequestConfig) => any;
  /** 获取用户信息接口 */
  getUserInfoApi: (options?: AxiosRequestConfig) => any;
  /** 获取路由数据接口 */
  getRoutesApi: (options?: AxiosRequestConfig) => any;
}

/** 额外配置 */
const createSettings = (sdk: SdkProps, opt: Partial<Props> = {}): Props => {
  return {
    routerMode: 'browser',
    loginApi: async (options) => {
      return await sdk.api.request('/api/login', options);
    },
    getUserInfoApi: async (options) => {
      return await sdk.api.request('/api/userInfo', options);
    },
    getRoutesApi: async (options) => {
      return await sdk.api.request('/api/routes', options);
    },
    ...opt,
  };
};

export default createSettings;

export type SettingsProps = Props;
