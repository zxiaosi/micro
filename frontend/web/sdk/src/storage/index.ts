// 使用按需加载的方式引入 lodash
import merge from 'lodash/merge';

import { SdkResult } from '@/global';

interface Props {
  /** Token 名称 */
  tokenName?: string;
}

interface Result extends Props {
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

/** localStorage */
const createStorage = (sdk: SdkResult, opt: Props = {}): Result => {
  // 返回结果
  const result: Result = {
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
  };

  // 合并属性
  return merge(result, sdk.storage, opt);
};

export { createStorage, Props as StorageProps, Result as StorageResult };
