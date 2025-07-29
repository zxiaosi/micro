import { SdkProps } from '@/global';
import { Location, NavigateFunction } from 'react-router';

interface Props {
  /** 主应用 location */
  readonly location: Partial<Location>;
  /** 主应用navigate（解决子应用跳转问题） */
  readonly navigate: NavigateFunction;
}

/** 客户端配置 */
const createClient = (sdk: SdkProps, opt: Partial<Props> = {}): Props => {
  return {
    location: null,
    navigate: null,
    ...opt,
  };
};

export default createClient;

export type ClientProps = Props;
