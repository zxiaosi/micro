import { ApiProps, ApiResult } from '@/api';
import { AppProps, AppResult } from '@/app';
import { ClientProps, ClientResult } from '@/client';
import { ComponentsProps, ComponentsResult } from '@/components';
import { HooksProps, HooksResult } from '@/hooks';
import { RouterProps, RouterResult } from '@/router';
import { StorageProps, StorageResult } from '@/storage';
import { StoreProps, StoreResult } from '@/store';
import { UIProps, UIResult } from '@/ui';

export interface SdkProps {
  /** sdk 名称 */
  name?: string;
  /** Api 请求 */
  api?: ApiProps;
  /** App 配置 */
  app?: AppProps;
  /** 客户端 配置 */
  client?: ClientProps;
  /** 公用组件 */
  components?: ComponentsProps;
  /** Hooks */
  hooks?: HooksProps;
  /** 路由 配置 */
  router?: RouterProps;
  /** localStorage */
  storage?: StorageProps;
  /** 全局 Store */
  store?: StoreProps;
  /** ProLayout 配置 */
  ui?: UIProps;
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
  /** 公用组件 */
  components: ComponentsResult;
  /** Hooks */
  hooks: HooksResult;
  /** 路由 配置 */
  router: RouterResult;
  /** localStorage */
  storage: StorageResult;
  /** 全局 Store */
  store: StoreResult;
  /** ProLayout 配置 */
  ui: UIResult;

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
