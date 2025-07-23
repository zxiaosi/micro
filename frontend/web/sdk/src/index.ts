import Http from '@/api/index';
import { SdkProps } from '@/global';
import globalStore from '@/store/index';
import get from 'lodash/get'; // 使用按需加载的方式引入 lodash
import set from 'lodash/set'; // 使用按需加载的方式引入 lodash
import merge from 'lodash/merge'; // 使用按需加载的方式引入 lodash
import React, { ComponentType } from 'react';

class Sdk {
  /** sdk 实例 */
  _instance: SdkProps;

  constructor() {
    this._instance = {
      name: '',
      globalStore,
      api: new Http(),
      components: {
        Login: React.lazy(() => import('@/components/login/index')),
        NotFound: React.lazy(() => import('@/components/notFound/index')),
      },
      init: this.init.bind(this),
      setComponent: this.setComponent.bind(this),
      getComponent: this.getComponent.bind(this),
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
  init(newData: Partial<SdkProps> = {}) {
    const { api, ...rest } = newData;

    if (api && Object.keys(api).length > 0) {
      this._instance.api = new Http(api);
    }

    merge(this._instance, rest);
  }

  /**
   * 设置组件
   * @param component 组件
   * @param name 组件名称
   */
  setComponent(component: ComponentType, name?: string) {
    if (!component) throw new Error('setComponent -- 组件不能为空');

    const componentName = name || component.displayName || component.name;
    if (!componentName) throw new Error('setComponent -- 组件名称不能为空');

    set(this._instance.components, componentName, component);
  }

  /**
   * 获取组件
   */
  getComponent(name?: string) {
    if (!name) throw new Error('getComponent -- 组件名称不能为空');

    return get(this._instance.components, name);
  }
}

const sdk: SdkProps = new Sdk().registerSdk('sdk');

export default sdk;
