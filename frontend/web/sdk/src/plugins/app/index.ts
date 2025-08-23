// 按需引入
import merge from 'lodash/merge';

import { LocaleProps, Plugin, SdkProps, ThemeProps } from '@/types';
import { ConfigProviderProps } from 'antd';

interface Props {
  /** 环境变量 */
  env?: Record<string, any>;
  /** 主题 */
  theme?: ThemeProps;
  /** 国际化 */
  locale?: LocaleProps;
  /** 路由模式 */
  routerMode?: 'browser' | 'hash' | 'memory';
  /** Antd 配置 */
  antdConfig?: ConfigProviderProps;
}

interface Result extends Required<Readonly<Props>> {}

/** 插件名称 */
const pluginName = 'app';

/** App 插件 */
const AppPlugin: Plugin<'app'> = {
  name: pluginName,
  install(sdk: SdkProps, options: Props = {}) {
    // 默认插件配置
    const defaultOptions = {
      env: {},
      theme: null,
      locale: null,
      routerMode: 'browser',
      antdConfig: {},
    } satisfies Result;

    sdk.instance[pluginName] = merge({}, defaultOptions, options);
  },
};

export { AppPlugin, Props as AppProps, Result as AppResult };
