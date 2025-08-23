// 按需引入
import merge from 'lodash/merge';

import { InstanceProps, Plugin, SdkProps } from '@/types';

class Sdk implements SdkProps {
  name;
  plugins;
  instance;

  constructor() {
    this.name = '';
    this.plugins = new Map();
    this.instance = {};
  }

  mount(name: string) {
    // 如果已经存在同名的sdk实例，则直接返回（子应用）
    if (name && window[name]) {
      Object.assign(this, window[name]); // 合并实例属性
    } else {
      // 否则创建一个新的sdk实例, 并手动挂载到window上 （主应用）
      this.name = name;

      const _this = new Proxy(this, {
        get: (target, key, receiver) => {
          console.log('get', target, key, receiver);
          
          if (!target) return null;

          // sdk.plugins.xxx => sdk.plugins.xxx
          if (key in target) return Reflect.get(target, key, receiver);

          if (Object.keys(target.instance).length === 0) return null;

          // sdk.instance.api.xxx => sdk.api.xxx
          return Reflect.get(target.instance, key, receiver);
        },
      });

      Object.defineProperty(window, this.name, {
        value: _this,
        writable: false, // 禁止修改
        configurable: true, // 禁止删除
      });
    }
  }

  unmount() {
    this.plugins.clear();
    this.instance = {};

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
    install(this, options);

    // 添加到插件列表
    this.plugins.set(name, { ...plugin, options });

    // 链式调用
    return this;
  }

  register(args: InstanceProps) {
    merge(this.instance, args);
  }
}

export default Sdk;
