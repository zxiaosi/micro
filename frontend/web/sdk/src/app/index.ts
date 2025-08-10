// 使用按需加载的方式引入 lodash
import merge from 'lodash/merge';

import { LocaleProps, SdkResult, ThemeProps } from '@/global';
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

/** App配置 */
const createApp = (sdk: SdkResult, opt: Props = {}): Result => {
  // 默认值
  const result: Result = {
    env: {},
    theme: null,
    locale: null,
    routerMode: 'browser',
    antdConfig: {},
  };

  return merge(result, sdk.app, opt);
};

export { Props as AppProps, Result as AppResult, createApp };
