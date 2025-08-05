import { SdkResult } from '@/global';

interface Props {
  /** 环境变量 */
  env?: Record<string, any>;
  /** 路由模式 */
  routerMode?: 'browser' | 'hash' | 'memory';
}

interface Result extends Required<Readonly<Props>> {}

/** App配置 */
const createApp = (sdk: SdkResult, opt: Props = {}): Result => {
  return {
    env: {},

    routerMode: 'browser',

    ...opt,
  };
};

export { Props as AppProps, Result as AppResult, createApp };
