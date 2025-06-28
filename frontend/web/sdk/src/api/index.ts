import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import axios, { AxiosError } from 'axios';

/** 自定义配置项 */
export interface ExtraRequestOption extends AxiosRequestConfig {
  /** 是否需要原始数据 */
  isOriginalData?: boolean;
  /** 是否显示错误信息 */
  isShowFailMsg?: boolean;
}

class Http {
  _instance: AxiosInstance;

  constructor(options: AxiosRequestConfig = {}) {
    this._instance = axios.create(options);
    this.requestInterceptors(); // 请求拦截器
    this.responseInterceptors(); // 响应拦截器
  }

  /** 请求拦截器 */
  requestInterceptors() {
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

  /** 响应拦截器 */
  responseInterceptors() {
    this._instance.interceptors.response.use(
      function (response: AxiosResponse) {
        const { data, config } = response;
        const { isOriginalData, isShowFailMsg } = config as ExtraRequestOption;
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

  request(
    url: string,
    data: string | object = {},
    options: ExtraRequestOption = {
      isOriginalData: false,
      isShowFailMsg: true,
    },
  ) {
    return this._instance.request({ url, data, ...options });
  }
}

export default Http;
