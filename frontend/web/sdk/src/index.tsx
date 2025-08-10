// 使用按需加载的方式引入 lodash
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';

import { createApi } from '@/api';
import { createApp } from '@/app';
import { createClient } from '@/client';
import { createComponents } from '@/components';
import { ModuleProps, SdkProps, SdkResult } from '@/global';
import { createHooks } from '@/hooks';
import { createRouter } from '@/router';
import { createStorage } from '@/storage';
import { createStore } from '@/store';
import { createUI } from '@/ui';

class Sdk implements SdkResult {
  /** sdk 实例 */
  name = '';
  api = null;
  app = null;
  client = null;
  components = null;
  hooks = null;
  router = null;
  storage = null;
  store = null;
  ui = null;

  constructor(name: string) {
    this.register({ name });
    this.mount();
  }

  /** 注册属性 */
  register(options: SdkProps = {}) {
    const {
      api,
      app,
      client,
      components,
      hooks,
      router,
      storage,
      store,
      ui,
      ...rest
    } = options;

    const modules = [
      { key: 'api', value: api, creator: createApi },
      { key: 'app', value: app, creator: createApp },
      { key: 'client', value: client, creator: createClient },
      { key: 'components', value: components, creator: createComponents },
      { key: 'hooks', value: hooks, creator: createHooks },
      { key: 'router', value: router, creator: createRouter },
      { key: 'storage', value: storage, creator: createStorage },
      { key: 'store', value: store, creator: createStore },
      { key: 'ui', value: ui, creator: createUI },
    ] satisfies ModuleProps[];

    modules.forEach(({ key, value, creator }) => {
      if (isEmpty(this[key]) || !isEmpty(value)) {
        this[key] = creator(this, value);
      }
    });

    merge(this, rest); // 合并传入的属性
  }

  /** 挂载sdk */
  mount() {
    const name = this.name;

    if (name && window[name]) {
      return window[name];
    } else {
      this.name = name;

      // 1. 使用 new Proxy 禁止修改
      const instance = new Proxy(this, {
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
        configurable: true, // 禁止删除
      });

      return instance;
    }
  }

  /** 卸载sdk */
  unmount() {
    delete window[this.name];
  }
}

const sdk: SdkResult = new Sdk('sdk').mount();

export default sdk;
