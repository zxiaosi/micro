import { ApiProps, ApiResult } from '@/api';
import { AppProps, AppResult } from '@/app';
import { ClientProps, ClientResult } from '@/client';
import { ComponentsProps, ComponentsResult } from '@/components';
import { HooksProps, HooksResult } from '@/hooks';
import { StorageProps, StorageResult } from '@/storage';
import { StoreProps, StoreResult } from '@/store';

export interface SdkProps {
  /** sdk 名称 */
  name?: string;
  /** Api 请求 */
  api?: ApiProps;
  /** App 配置 */
  app?: AppProps;
  /** 客户端 配置 */
  client?: ClientProps;
  /** Hooks */
  hooks?: HooksProps;
  /** 全局 Store */
  store?: StoreProps;
  /** localStorage */
  storage?: StorageProps;
  /** 公用组件 */
  components?: ComponentsProps;
}

export interface SdkResult extends SdkProps {
  /** sdk 名称 */
  name: string;
  /** Api 请求 */
  api: ApiResult;
  /** App 配置 */
  app: AppResult;
  /** 客户端 配置 */
  client: ClientResult;
  /** Hooks */
  hooks: HooksResult;
  /** 全局 Store */
  store: StoreResult;
  /** localStorage */
  storage: StorageResult;
  /** 公用组件 */
  components: ComponentsResult;

  /**
   * 注册属性
   */
  readonly register: (options?: SdkProps) => void;
}

export interface ModuleProps {
  key: keyof SdkProps;
  value: any;
  creator: (sdk: SdkResult, opt: ModuleProps['value']) => any;
}
