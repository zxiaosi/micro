import globalStore, { GlobalStore } from './globalStore';

interface InstanceProps {
  a?: number;
  globalStore?: GlobalStore;
  [key: string]: any;
}

type SdkProps = {
  /** sdk 名称 */
  sdkName: string;
  /** sdk 实例 */
  instance: InstanceProps;
  /** sdk 挂载宿主  */
  _target: Window;
};

class Sdk {
  /** sdk 名称 */
  sdkName: string;
  /** sdk 实例 */
  instance: InstanceProps;
  /** sdk 挂载宿主  */
  _target: Window;

  constructor(sdkName?: string) {
    this.sdkName = sdkName;
    this.instance = {
      globalStore: globalStore,
    };

    const oldSdk = this.checkSdk();
    console.log('oldSdk', oldSdk);
    if (oldSdk) return oldSdk; // 存在实例则返回
    return this.registerSdk(); // 否则返回自身
  }

  /** sdk是否存在 */
  checkSdk() {
    try {
      this._target =
        typeof window !== 'undefined' && window.origin === window?.top?.origin
          ? window.top
          : window;
    } catch (e) {
      this._target = typeof window !== 'undefined' && window;
    }

    return this._target[this.sdkName];
  }

  /** 注册sdk */
  registerSdk() {
    // 1. 使用 new Proxy 禁止修改
    const sdk = new Proxy(this, {
      set: (target, key, value, receiver) => {
        // console.error('The SDK is not allowed to be modified!', key);
        return Reflect.set(target, key, value, receiver);
      },
      get: (target, key, receiver) => {
        // 使用 Reflect.get 防止报错
        return Reflect.get(target, key, receiver);
        // if (
        //   typeof key === 'string' &&
        //   ['sdkName', 'instance', '_target'].includes(key)
        // ) {
        //   return Reflect.get(target, key, receiver);
        // } else {
        //   return Reflect.get(this.instance, key, receiver);
        // }
      },
    });

    // 2. 使用 Object.defineProperty 禁止删除
    Object.defineProperty(this._target, this.sdkName, {
      value: sdk,
      configurable: false, // 禁止删除
    });

    return this._target[this.sdkName];
  }

  /** 注入属性 */
  init(args: InstanceProps = {}) {
    this.instance = { ...this.instance, ...args };
  }
}

const zxiaosiSdk = new Sdk('zxiaosiSdk') satisfies SdkProps;

export { zxiaosiSdk };
