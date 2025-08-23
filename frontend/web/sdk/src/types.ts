import { ApiProps, ApiResult } from '@/plugins/api';
import { AppProps, AppResult } from '@/plugins/app';
import { ComponentsProps, ComponentsResult } from '@/plugins/components';
import { HooksProps, HooksResult } from '@/plugins/hooks';
import { I18nProps, I18nResult } from '@/plugins/i18n';
import { LayoutProps, LayoutResult } from '@/plugins/layout';
import { RouterProps, RouterResult } from '@/plugins/router';
import { StorageProps, StorageResult } from '@/plugins/storage';
import { StoreProps, StoreResult } from '@/plugins/store';

export type ThemeProps = 'light' | 'dark';

export type LocaleProps = 'zh-CN' | 'en-US';

export type PluginName = keyof InstanceProps;

export interface InstanceProps {
  /** Api 配置 */
  api?: ApiProps;
  /** 应用 配置 */
  app?: AppProps;
  /** 公用组件 */
  components?: ComponentsProps;
  /** Hooks */
  hooks?: HooksProps;
  /** 国际化 */
  i18n?: I18nProps;
  /** ProLayout 配置 */
  layout?: LayoutProps;
  /** 路由 配置 */
  router?: RouterProps;
  /** localStorage */
  storage?: StorageProps;
  /** 全局 Store */
  store?: StoreProps;
}

export interface InstanceResult extends InstanceProps {
  /** Api 配置 */
  api: ApiResult;
  /** 应用 配置 */
  app: AppResult;
  /** 公用组件 */
  components: ComponentsResult;
  /** Hooks */
  hooks: HooksResult;
  /** 国际化 */
  i18n?: I18nResult;
  /** ProLayout 配置 */
  layout: LayoutResult;
  /** 路由 配置 */
  router: RouterResult;
  /** localStorage */
  storage: StorageResult;
  /** 全局 Store */
  store: StoreResult;
}

export interface Plugin<K extends PluginName> {
  /** 插件名字 */
  name: K;
  /** 插件安装方法 */
  install: (sdk: SdkProps, options?: InstanceProps[K]) => void;
  /** 插件配置项 */
  options?: InstanceProps[K];
}

export interface SdkProps {
  /** sdk 名称 */
  name: string;
  /** 插件列表 */
  plugins: Map<string, Plugin<any>>;
  /** 实例 */
  instance: InstanceResult;
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
