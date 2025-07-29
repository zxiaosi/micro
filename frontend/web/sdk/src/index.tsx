// 使用按需加载的方式引入 lodash
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';

import createApi from '@/api';
import createClient from '@/client';
import createComponents from '@/components';
import { SdkProps } from '@/global';
import hooks from '@/hooks';
import createSettings from '@/settings';
import createStorage from '@/storage';
import globalStore from '@/store';

class Sdk {
  /** sdk 实例 */
  _instance: SdkProps = {
    name: '',
    api: null,
    client: null,
    components: null,
    hooks: null,
    store: null,
    storage: null,
    settings: null,
    register: null,
  };

  constructor(name: string) {
    this.register({
      name,
      hooks: hooks,
      store: globalStore,
      register: this.register.bind(this),
    });

    this.mountSdk();
  }

  /** 注册属性 */
  register: SdkProps['register'] = function (options = {}) {
    const { api, client, settings, storage, components, ...rest } = options;

    const opt: Partial<SdkProps> = {};

    if (isEmpty(this._instance?.api) || !isEmpty(api)) {
      opt['api'] = createApi(this._instance, api);
    }

    if (isEmpty(this._instance?.client) || !isEmpty(client)) {
      opt['client'] = createClient(this._instance, client);
    }

    if (isEmpty(this._instance?.settings) || !isEmpty(hooks)) {
      opt['settings'] = createSettings(this._instance, settings);
    }

    if (isEmpty(this._instance?.storage) || !isEmpty(storage)) {
      opt['storage'] = createStorage(this._instance, storage);
    }

    if (isEmpty(this._instance?.components) || !isEmpty(components)) {
      opt['components'] = createComponents(this._instance, components);
    }

    merge(this._instance, opt, rest); // 合并传入的属性
  };

  /** 挂载sdk */
  mountSdk() {
    const name = this._instance?.name;

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
}

const sdk: SdkProps = new Sdk('sdk').mountSdk();

export default sdk;
