// 使用按需加载的方式引入 lodash
import get from 'lodash/get';
import merge from 'lodash/merge';
import set from 'lodash/set';

// SDK 相关模块
import Api from '@/api';
import apiConfig from '@/api/config';
import clientConfig from '@/client';
import defaultComponents from '@/components/index';
import Storage from '@/storage';
import globalStore from '@/store/index';

// 类型定义
import { ApiProps } from '@/api';
import { ApiConfigProps } from '@/api/config';
import { ClientConfigProps } from '@/client';
import { StorageProps } from '@/storage';
import { GlobalStore } from '@/store';
import { ComponentType } from 'react';

/** Sdk 接口 */
interface SdkProps {
  /** sdk 名称 */
  name: string;
  /** 请求 */
  readonly api: ApiProps;
  /** 请求配置 */
  apiConfig: ApiConfigProps;
  /** 客户端配置 */
  client: ClientConfigProps;
  /** 全局 Store */
  readonly store: GlobalStore;
  /** localStorage */
  readonly storage: StorageProps;
  /** 公用组件 */
  components: Record<string, ComponentType>;

  /**
   * 注入属性
   */
  readonly init: (
    args: Partial<
      Pick<SdkProps, 'name' | 'apiConfig' | 'client' | 'components'>
    >,
  ) => void;
  /**
   * 设置组件
   * @param component 组件
   * @param name 组件名称
   */
  readonly setComponent: (component: ComponentType, name?: string) => void;
  /**
   * 获取组件
   * @param name 组件名称
   */
  readonly getComponent: (name?: string) => ComponentType;
  /**
   * 获取根组件
   */
  readonly getRootComponent: () => ComponentType;
  [key: string]: any;
}

class Sdk {
  /** sdk 实例 */
  _instance: SdkProps;

  constructor() {
    this._instance = {
      name: '',
      api: new Api(apiConfig),
      apiConfig: apiConfig,
      client: clientConfig,
      store: globalStore,
      storage: new Storage(),
      components: defaultComponents,
      init: this.init.bind(this),
      setComponent: this.setComponent.bind(this),
      getComponent: this.getComponent.bind(this),
      getRootComponent: this.getRootComponent.bind(this),
    };
  }

  /** 注册sdk */
  registerSdk(name: string) {
    if (name && window[name]) {
      return window[name];
    } else {
      this._instance.name = name;

      // 1. 使用 new Proxy 禁止修改
      const instance = new Proxy(this._instance, {
        set: (target, key, value, receiver) => {
          return Reflect.set(target, key, value, receiver);
        },
        get: (target, key, receiver) => {
          if (!target) return null;
          return Reflect.get(target, key, receiver);
        },
        deleteProperty: (target, key) => {
          throw new Error('The SDK cannot be deleted.');
        },
      });

      // 2. 使用 Object.defineProperty 禁止 delete sdk 操作
      Object.defineProperty(window, name, {
        value: instance,
        writable: false, // 禁止修改
        configurable: false, // 禁止删除
      });

      return instance;
    }
  }

  /** 注入属性 */
  init: SdkProps['init'] = function (args = {}) {
    merge(this._instance, args); // 合并传入的属性

    const { apiConfig } = this._instance;

    if (apiConfig && Object.keys(apiConfig).length > 0) {
      this._instance.api = new Api(apiConfig);
    }
  };

  /** 设置组件 */
  setComponent: SdkProps['setComponent'] = function (component, name) {
    if (!component) throw new Error('setComponent -- 组件不能为空');

    const componentName = name || component.displayName || component.name;
    if (!componentName) throw new Error('setComponent -- 组件名称不能为空');

    set(this._instance.components, componentName, component);
  };

  /** 获取组件 */
  getComponent: SdkProps['getComponent'] = function (name?: string) {
    if (!name) throw new Error('getComponent -- 组件名称不能为空');

    return get(this._instance.components, name);
  };

  /** 获取根组件 */
  getRootComponent() {
    const Root = this.getComponent('Root') as ComponentType<{ sdk: SdkProps }>;
    // return <Root sdk={this._instance} />; // <>{sdk.getRootComponent()}</>
    return () => <Root sdk={this._instance} />; // const App = sdk.getRootComponent(); <App />
  }
}

const sdk: SdkProps = new Sdk().registerSdk('sdk');

export default sdk;
