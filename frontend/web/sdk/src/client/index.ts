import { SdkResult } from '@/global';
import { Location, NavigateFunction } from 'react-router';

interface Props {
  /** 主应用 location */
  readonly location?: Location;
  /** 主应用navigate（解决子应用跳转问题） */
  readonly navigate?: NavigateFunction;
}

interface Result extends Required<Readonly<Props>> {}

/** 客户端配置 */
const createClient = (sdk: SdkResult, opt: Props = {}): Props => {
  return {
    location: null,

    navigate: null,

    ...opt,
  };
};

export { Props as ClientProps, Result as ClientResult, createClient };
