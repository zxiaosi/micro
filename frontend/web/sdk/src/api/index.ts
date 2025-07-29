import { DeepPartial, SdkProps } from '@/global';
import { AxiosResponse } from 'axios';
import Api, { ApiConfig, ApiRequestOption } from './http';

interface Props extends ApiConfig {
  /**
   * 请求
   * @param url 请求地址
   * @param options 自定义配置项
   */
  readonly request: (
    url: string,
    options?: ApiRequestOption,
  ) => Promise<AxiosResponse<any, any>>;
}

/** 请求配置 */
const createApi = (sdk: SdkProps, opt: DeepPartial<Props>): Props => {
  // 创建实例
  const api = new Api(opt).getInstance();

  return {
    baseURL: '/api', // 默认基础路径
    timeout: 0, // 默认不超时
    ...opt,

    request: (url, options) =>
      api.request({
        url,
        isOriginalData: false,
        isShowFailMsg: true,
        ...options,
      }),
  };
};

export default createApi;

export type ApiProps = Props;
