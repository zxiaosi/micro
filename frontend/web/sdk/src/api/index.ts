import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import axios, { AxiosError } from 'axios';
import { ApiConfigProps } from './config';

/** 自定义配置项 */
interface ExtraRequestOption extends AxiosRequestConfig {
  /** 是否需要原始数据 */
  isOriginalData?: boolean;
  /** 是否显示错误信息 */
  isShowFailMsg?: boolean;
}

/** 请求类 */
export interface ApiProps {
  /**
   * 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param options 自定义配置项
   */
  request(
    url: string,
    options?: ExtraRequestOption,
  ): Promise<AxiosResponse<any, any>>;
}

/** 请求类 */
class Api implements ApiProps {
  _instance: AxiosInstance;

  constructor(options: AxiosRequestConfig = {}) {
    this._instance = axios.create(options);
    this._defaultRequestInterceptors();
    this._defaultResponseInterceptors();
  }

  /** 默认请求拦截器 */
  _defaultRequestInterceptors() {
    this._instance.interceptors.request.use(
      function (config: InternalAxiosRequestConfig) {
        return config;
      },
      function (error: AxiosError) {
        console.error(`请求错误`);
        return Promise.reject(error);
      },
    );
  }

  /** 默认响应拦截器 */
  _defaultResponseInterceptors() {
    this._instance.interceptors.response.use(
      function (response: AxiosResponse) {
        const { data, config } = response;
        const { isOriginalData, isShowFailMsg } = config as ExtraRequestOption;
        console.log('响应数据:', response);

        const { code, msg } = data;

        if (code !== 200 && isShowFailMsg) console.error(msg);

        return isOriginalData ? response : response.data;
      },
      function (error: AxiosError) {
        const { response, config } = error;
        const { isShowFailMsg } = config as ExtraRequestOption;

        if (response) {
          const { status, data } = response as AxiosResponse;

          if (status == 401) {
            localStorage.clear(); // 清除本地存储
            window.location.href = '/login';
          }
          if (isShowFailMsg) console.error(data.msg);
        } else {
          if (isShowFailMsg)
            console.error(`请求超时或服务器异常，请检查网络或联系管理员！`);
        }

        return Promise.reject(error);
      },
    );
  }

  request: ApiProps['request'] = async function (url, options) {
    return this._instance.request({
      url,
      isOriginalData: false,
      isShowFailMsg: true,
      ...options,
    });
  };

  /** 添加请求拦截器 */
  addRequestInterceptor: ApiConfigProps['addRequestInterceptor'] = function (
    onFulfilled,
    onRejected,
    options,
  ) {
    this._instance.interceptors.request.use(onFulfilled, onRejected, options);
  };

  /** 添加响应拦截器 */
  addResponseInterceptor: ApiConfigProps['addResponseInterceptor'] = function (
    onFulfilled,
    onRejected,
  ) {
    this._instance.interceptors.response.use(onFulfilled, onRejected);
  };
}

export default Api;
