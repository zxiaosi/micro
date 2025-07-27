import {
  AxiosInterceptorOptions,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

/** 请求配置 */
export interface ApiConfigProps extends AxiosRequestConfig {
  /**
   * 添加请求拦截器
   * @param onFulfilled 请求拦截器成功回调
   * @param onRejected 请求拦截器失败回调
   * @param options 拦截器选项
   */
  addRequestInterceptor?: (
    onFulfilled?: (
      value: InternalAxiosRequestConfig<any>,
    ) =>
      | InternalAxiosRequestConfig<any>
      | Promise<InternalAxiosRequestConfig<any>>,
    onRejected?: ((error: any) => any) | null,
    options?: AxiosInterceptorOptions,
  ) => void;

  /**
   * 添加响应拦截器
   * @param onFulfilled 响应拦截器成功回调
   * @param onRejected 响应拦截器失败回调
   */
  addResponseInterceptor?: (
    onFulfilled?:
      | ((value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>)
      | null,
    onRejected?: ((error: any) => any) | null,
  ) => void;
}

/** 请求配置 */
const apiConfig: ApiConfigProps = {
  /** 请求地址 */
  baseURL: '/',
  /** 请求超时时间 0 表示不超时 */
  timeout: 0,
};

export default apiConfig;
