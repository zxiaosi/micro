// 使用按需加载的方式引入 lodash
import merge from 'lodash/merge';

import { SdkResult } from '@/global';
import { Location, NavigateFunction } from 'react-router-dom';

interface Props {
  /** 主应用 location */
  readonly location?: Location;
  /** 主应用navigate（解决子应用跳转问题） */
  readonly navigate?: NavigateFunction;
}

interface Result extends Required<Readonly<Props>> {}

/** 客户端配置 */
const createClient = (sdk: SdkResult, opt: Props = {}): Props => {
  // 返回结果
  const result: Result = {
    location: null,
    navigate: null,
  };

  // 合并属性
  return merge(result, sdk.client, opt);
};

export { Props as ClientProps, Result as ClientResult, createClient };
