// 按需引入
import merge from 'lodash/merge';

import { BaseProps, InstanceProps, Plugin, SdkResult } from '@/types';

class Sdk implements BaseProps {
  name: BaseProps['name'];
  plugins: BaseProps['plugins'];

  constructor() {
    this.name = '';
    this.plugins = new Map();
  }

  mount(name: string) {
    // 如果已经存在同名的sdk实例，则直接返回（子应用）
    if (name && window[name]) {
      Object.assign(this, window[name]); // 合并实例属性
    } else {
      // 否则创建一个新的sdk实例, 并手动挂载到window上 （主应用）
      this.name = name;

      // 使用 new Proxy 禁止修改
      const _this = new Proxy(this, {
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

      // 挂载到 Window 上
      window[this.name] = _this;
    }
  }

  unmount() {
    // 清空插件
    this.plugins.clear();
    // 删除window上的实例
    delete window[this.name];
  }

  use<K extends keyof InstanceProps>(
    plugin: Plugin<K>,
    options?: InstanceProps[K],
  ) {
    const { name, install } = plugin;

    if (!name) throw new Error(`${name} plugin has no name`);

    if (typeof install !== 'function')
      throw new Error(`${name} plugin is not a function`);

    // 插件安装
    install(this as any, options);

    // 添加到插件列表
    this.plugins.set(name, { ...plugin, options });

    // 链式调用
    return this;
  }
  register(args: InstanceProps) {
    merge(this, args);
  }
}

const sdk = new Sdk() as SdkResult;

export default sdk;
