import { ComponentType } from 'react';
import { GlobalStore } from './store/index';

/** Sdk 接口 */
export interface SdkProps {
  /** sdk 名称 */
  name: string;
  /** 全局 Store */
  globalStore: GlobalStore;
  /** api 接口 */
  api: Record<string, any>;
  /** 公用组件 */
  components: Record<string, ComponentType>;
  /** 注入属性 */
  init: (args: Partial<SdkProps>) => void;
  /**
   * 设置组件
   * @param component 组件
   * @param name 组件名称
   */
  setComponent: (component: ComponentType, name?: string) => void;
  /** 
   * 获取组件
   */
  getComponent: (name?: string) => ComponentType;
  [key: string]: any;
}
