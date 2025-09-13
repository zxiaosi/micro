import { ApiProps, ApiResult } from '@/plugins/api';
import { AppProps, AppResult } from '@/plugins/app';
import { ClientProps, ClientResult } from '@/plugins/client';
import { ConfigProps, ConfigResult } from '@/plugins/config';
import { I18nProps, I18nResult } from '@/plugins/i18n';
import { StoreProps, StoreResult } from '@/plugins/store';
import { UIProps, UIResult } from '@/plugins/ui';

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
  /** Config 配置 */
  config?: ConfigProps;
  /** 国际化 */
  i18n?: I18nProps;
  /** 全局 Store */
  store?: StoreProps;
  /** 公用组件 */
  ui?: UIProps;
}

export interface InstanceResult {
  /** Api 配置 */
  api: ApiResult;
  /** 应用 配置 */
  app: AppResult;
  /** Client 配置 */
  client: ClientResult;
  /** Config 配置 */
  config: ConfigResult;
  /** 国际化 */
  i18n: I18nResult;
  /** 全局 Store */
  store: StoreResult;
  /** 公用组件 */
  ui: UIResult;
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
