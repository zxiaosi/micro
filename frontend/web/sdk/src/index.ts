import Http from '@/api/index';
import { SdkProps } from '@/global';
import globalStore from '@/store/index';

class Sdk {
  /** sdk 实例 */
  _instance: SdkProps;

  constructor() {
    this._instance = {
      name: '',
      globalStore,
      api: new Http(),
      init: this.init.bind(this),
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

      // 2. 使用 Object.preventExtensions 禁止第一层属性扩展
      Object.preventExtensions(instance);

      // 3. 使用 Object.defineProperty 禁止 delete sdk 操作
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
    
    this._instance = { ...this._instance, ...rest };
  }
}

const sdk: SdkProps = new Sdk().registerSdk('sdk');

export default sdk;
