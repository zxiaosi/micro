/** localStorage */
export interface StorageProps {
  /**
   * Token 名称
   */
  tokenName: string;
  /**
   * 设置缓存
   * @param key 缓存键
   * @param value 缓存值
   */
  setItem: (key: string, value: any) => void;
  /**
   * 获取缓存
   * @param key 缓存键
   */
  getItem: (key: string) => any;
  /**
   * 删除缓存
   * @param key 缓存键
   */
  removeItem: (key: string) => void;
  /**
   * 清除所有缓存
   */
  clear: () => void;
}

/** localStorage */
class Storage implements StorageProps {
  tokenName: string;

  constructor(tokenName: string = 'token') {
    this.tokenName = tokenName;
  }

  setItem: StorageProps['setItem'] = function (key, value) {
    if (value instanceof Object) value = JSON.stringify(value);
    return localStorage.setItem(key, value);
  };

  getItem: StorageProps['getItem'] = function (key) {
    try {
      if (key) return JSON.parse(key);
    } catch (e) {
      return key || null;
    }
  };

  removeItem: StorageProps['removeItem'] = function (key) {
    localStorage.removeItem(key);
  };

  clear() {
    localStorage.clear();
  }
}

export default Storage;
