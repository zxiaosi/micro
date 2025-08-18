import { ApiProps, ApiResult } from '@/api';
import { AppProps, AppResult } from '@/app';
import { ClientProps, ClientResult } from '@/client';
import { ComponentsProps, ComponentsResult } from '@/components';
import { HooksProps, HooksResult } from '@/hooks';
import { RouterProps, RouterResult } from '@/router';
import { StorageProps, StorageResult } from '@/storage';
import { StoreProps, StoreResult } from '@/store';
import { UIProps, UIResult } from '@/ui';
import { I18nProps, I18nResult } from '@/i18n';

export type ThemeProps = 'light' | 'dark';

export type LocaleProps = 'zh-CN' | 'en-US';

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
  /** 国际化 */
  i18n?: I18nProps;
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
  /** 国际化 */
  i18n?: I18nResult;
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

  /**
   * 挂载sdk
   */
  readonly mount: () => void;

  /**
   * 卸载sdk
   */
  readonly unmount: () => void;
}

export interface ModuleProps {
  key: keyof SdkProps;
  value: any;
  creator: (sdk: SdkResult, opt: ModuleProps['value']) => any;
}
