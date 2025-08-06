// 使用按需加载的方式引入 lodash
import merge from 'lodash/merge';

import { SdkResult } from '@/global';

interface Props {
  /** 环境变量 */
  env?: Record<string, any>;
  /** 主题 */
  theme?: 'light' | 'dark';
  /** 路由模式 */
  routerMode?: 'browser' | 'hash' | 'memory';
}

interface Result extends Required<Readonly<Props>> {}

/** App配置 */
const createApp = (sdk: SdkResult, opt: Props = {}): Result => {
  // 返回结果
  const result: Result = {
    env: {},
    theme: 'light',
    routerMode: 'browser',
  };

  // 合并属性
  return merge(result, opt);
};

export { Props as AppProps, Result as AppResult, createApp };
