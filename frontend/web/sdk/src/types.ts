import { ApiProps, ApiResult } from '@/plugins/api';
import { AppProps, AppResult } from '@/plugins/app';
import { ClientProps, ClientResult } from '@/plugins/client';
import { ComponentsProps, ComponentsResult } from '@/plugins/components';
import { I18nProps, I18nResult } from '@/plugins/i18n';
import { StorageProps, StorageResult } from '@/plugins/storage';
import { StoreProps, StoreResult } from '@/plugins/store';

export type ThemeProps = 'light' | 'dark';

export type LocaleProps = 'zh-CN' | 'en-US';

export type PluginName = keyof InstanceProps;

export interface Plugin<K extends PluginName> {
  /** 插件名字 */
  name: K;
  /** 插件安装方法 */
  install: (sdk: SdkResult, options?: InstanceProps[K]) => void;
  /** 插件配置项 */
  options?: InstanceProps[K];
}

export interface InstanceProps {
  /** Api 配置 */
  api?: ApiProps;
  /** 应用 配置 */
  app?: AppProps;
  /** Client 配置 */
  client?: ClientProps;
  /** 公用组件 */
  components?: ComponentsProps;
  /** 国际化 */
  i18n?: I18nProps;
  /** localStorage */
  storage?: StorageProps;
  /** 全局 Store */
  store?: StoreProps;
}

export interface InstanceResult {
  /** Api 配置 */
  api: ApiResult;
  /** 应用 配置 */
  app: AppResult;
  /** Client 配置 */
  client: ClientResult;
  /** 公用组件 */
  components: ComponentsResult;
  /** 国际化 */
  i18n: I18nResult;
  /** localStorage */
  storage: StorageResult;
  /** 全局 Store */
  store: StoreResult;
}

export interface BaseProps {
  /** SDK 名称 */
  name: string;
  /** 插件列表 */
  plugins: Map<string, Plugin<any>>;
  /** 挂载sdk - Window */
  mount: (name: string) => void;
  /** 卸载sdk - Window */
  unmount: () => void;
  /** 使用插件 - 初始化注入属性 */
  use: <K extends PluginName>(
    plugin: Plugin<K>,
    options?: InstanceProps[K],
  ) => this;
  /** 注册属性 - 运行时注入属性 */
  register: (options?: InstanceProps) => void;
}

export type SdkProps = BaseProps & InstanceProps;

export type SdkResult = BaseProps & InstanceResult;

export interface UserInfo {
  user?: any;
  /** 用户权限 */
  permissions?: string[];
  /** 用户角色 */
  roles?: string[];
  /** 用户设置 */
  settings?: { theme?: ThemeProps; locale?: LocaleProps };
}
