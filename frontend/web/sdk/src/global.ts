import { ApiProps } from '@/api';
import { ClientProps } from '@/client';
import { ComponentsProps } from '@/components';
import { HooksProps } from '@/hooks';
import { SettingsProps } from '@/settings';
import { StorageProps } from '@/storage';
import { GlobalStore } from '@/store';

export type DeepPartial<T> = T extends (...args: any[]) => any
  ? T // 函数类型不变
  : T extends Array<infer U>
    ? Array<DeepPartial<U>> // 数组递归处理元素
    : T extends object
      ? { [P in keyof T]?: DeepPartial<T[P]> } // 对象递归
      : T; // 基础类型直接返回

/** Sdk 接口 */
export interface SdkProps {
  /** sdk 名称 */
  name: string;
  /** 请求 */
  api: ApiProps;
  /** 客户端配置 */
  client: ClientProps;
  /** Hooks */
  hooks: HooksProps;
  /** 全局 Store */
  store: GlobalStore;
  /** localStorage */
  storage: StorageProps;
  /** 额外配置 */
  settings: SettingsProps;
  /** 公用组件 */
  components: ComponentsProps;

  /**
   * 注册属性
   */
  readonly register: (options?: DeepPartial<SdkProps>) => void;

  [key: string]: any;
}
