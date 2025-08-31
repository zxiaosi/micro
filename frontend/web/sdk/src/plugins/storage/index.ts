// 按需引入
import merge from 'lodash/merge';

import { Plugin } from '@/types';

interface StorageProps {
  /** Token 名称 */
  tokenName?: string;
}

interface StorageResult extends Required<Readonly<StorageProps>> {
  /**
   * 设置缓存
   * @param key 缓存键
   * @param value 缓存值
   */
  readonly setItem: (key: string, value: any) => void;
  /**
   * 获取缓存
   * @param key 缓存键
   */
  readonly getItem: (key: string) => any;
  /**
   * 删除缓存
   * @param key 缓存键
   */
  readonly removeItem: (key: string) => void;
  /**
   * 清除所有缓存
   */
  readonly clear: () => void;
}
/** 插件名称 */
const pluginName = 'storage';

/**
 * localStorage 插件
 * - 详情参考 {@link StorageProps} {@link StorageResult}
 */
const StoragePlugin: Plugin<'storage'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // 默认插件配置
    const defaultOptions = {
      tokenName: 'token',

      setItem: (key, value) => {
        if (value instanceof Object) value = JSON.stringify(value);
        return localStorage.setItem(key, value);
      },
      getItem: (key) => {
        const value = localStorage.getItem(key);
        if (value) {
          try {
            return JSON.parse(value);
          } catch (error) {
            return value;
          }
        }
        return value;
      },
      removeItem: (key) => {
        return localStorage.removeItem(key);
      },
      clear: () => {
        return localStorage.clear();
      },
    } satisfies StorageResult;

    sdk[pluginName] = merge({}, defaultOptions, options);
  },
};

export { StoragePlugin, StorageProps, StorageResult };
