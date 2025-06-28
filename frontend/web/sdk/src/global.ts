import { GlobalStore } from './store/index';

/** Sdk 接口 */
export interface SdkProps {
  /** sdk 名称 */
  name: string;
  /** 全局 Store */
  globalStore: GlobalStore;
  /** api 接口 */
  api: Record<string, any>;
  /** 初始化方法 */
  init: (args: Partial<SdkProps>) => void;
  [key: string]: any;
}
