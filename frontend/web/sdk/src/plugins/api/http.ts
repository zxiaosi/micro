// 使用按需加载的方式引入 lodash
import isEmpty from 'lodash/isEmpty';

import sdk from '@/core';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosInterceptorOptions,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';

export interface ApiConfig extends CreateAxiosDefaults {
  /** 添加请求拦截器 */
  addRequestInterceptor?: {
    /**
     * 请求拦截器成功回调
     * @param config 请求配置
     */
    onFulfilled?: (
      config: InternalAxiosRequestConfig<any>,
    ) =>
      | InternalAxiosRequestConfig<any>
      | Promise<InternalAxiosRequestConfig<any>>;
    /**
     * 请求拦截器失败回调
     * @param error 错误信息
     */
    onRejected?: ((error: AxiosError) => any) | null;
    /**
     * 拦截器选项
     */
    options?: AxiosInterceptorOptions;
  };
  /** 添加响应拦截器 */
  addResponseInterceptor?: {
    /**
     * 响应拦截器成功回调
     * @param response 响应信息
     */
    onFulfilled?: (
      response: AxiosResponse<any, any>,
    ) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>;
    /**
     * 响应拦截器失败回调
     * @param error 错误信息
     */
    onRejected?: ((error: AxiosError) => any) | null;
  };
}

export interface ApiRequestOption extends AxiosRequestConfig {
  /** 是否需要原始数据 */
  isOriginalData?: boolean;
  /** 是否显示错误信息 */
  isShowFailMsg?: boolean;
}

/** 请求类 */
class Http {
  instance: AxiosInstance;

  constructor(options: ApiConfig = {}) {
    const { addRequestInterceptor, addResponseInterceptor, ...rest } = options;

    this.instance = axios.create(rest); // 创建实例
    this.defaultRequestInterceptor(); // 添加默认请求拦截器
    this.defaultResponseInterceptor(); // 添加默认响应拦截器
    this.addRequestInterceptor(addRequestInterceptor); // 添加自定义请求拦截器
    this.addResponseInterceptor(addResponseInterceptor); // 添加自定义响应拦截器
  }

  /** 默认请求拦截器 */
  defaultRequestInterceptor() {
    this.instance.interceptors.request.use(
      function (config: InternalAxiosRequestConfig) {
        const authorization = localStorage.getItem('token');
        config.headers.Authorization = authorization;
        config.headers.lang = sdk.app.locale;
        return config;
      },
      function (error: AxiosError) {
        console.error(`请求错误`);
        return Promise.reject(error);
      },
    );
  }

  /** 默认响应拦截器 */
  defaultResponseInterceptor() {
    this.instance.interceptors.response.use(
      function (response: AxiosResponse) {
        const { data, config } = response;
        const { isOriginalData, isShowFailMsg } = config as ApiRequestOption;

        const { code, msg } = data;

        if (code !== 200 && isShowFailMsg) console.error(msg);

        return isOriginalData ? response : response.data;
      },
      function (error: AxiosError) {
        const { response, config } = error;
        const { isShowFailMsg } = config as ApiRequestOption;

        if (response) {
          const { status, data } = response as AxiosResponse;

          if (status == 401) {
            sdk.register({
              app: {
                settings: {},
                roles: [],
                permissions: [],
                user: {},
              },
            });
            localStorage.removeItem('token'); // 清除本地存储
            sdk.client.navigate('/login'); // 跳转登录页
          }
          if (isShowFailMsg) console.error('请求出错--', config.url, data.msg);
        } else {
          if (isShowFailMsg)
            console.error(`请求超时或服务器异常，请检查网络或联系管理员！`);
        }

        return Promise.reject(error);
      },
    );
  }

  /** 添加请求拦截器 */
  addRequestInterceptor(interceptor) {
    if (!isEmpty(interceptor)) {
      const { onFulfilled, onRejected, options } = interceptor;
      this.instance.interceptors.request.use(onFulfilled, onRejected, options);
    }
  }

  /** 添加响应拦截器 */
  addResponseInterceptor(interceptor) {
    if (!isEmpty(interceptor)) {
      const { onFulfilled, onRejected } = interceptor;
      this.instance.interceptors.response.use(onFulfilled, onRejected);
    }
  }

  /** 获取实例 */
  getInstance() {
    return this.instance;
  }
}

export default Http;
