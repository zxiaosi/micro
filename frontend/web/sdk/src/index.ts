import globalStore, { GlobalStore } from './globalStore';

interface SdkProps {
  /** sdk 名称 */
  name: string;
  /** 全局 Store */
  globalStore: GlobalStore;
  /** 初始化方法 */
  init: (args: Partial<SdkProps>) => void;
  [key: string]: any;
}

class Sdk {
  /** sdk 实例 */
  _instance: SdkProps;

  constructor() {
    this._instance = {
      name: '',
      globalStore,
      init: this.init.bind(this),
      temp: {},
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
    this._instance = { ...this._instance, ...newData };
  }
}

const sdk: SdkProps = new Sdk().registerSdk('sdk');

export { sdk };
