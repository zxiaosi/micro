// 按需引入
import merge from 'lodash/merge';

import { Plugin, SdkProps } from '@/types';
import { Location, NavigateFunction } from 'react-router-dom';

interface Props {
  /** 主应用 location */
  readonly location?: Location;
  /** 主应用navigate（解决子应用跳转问题） */
  readonly navigate?: NavigateFunction;
}

interface Result extends Required<Readonly<Props>> {}

/** 插件名称 */
const pluginName = 'client';

/** Client 插件 */
const ClientPlugin: Plugin<'client'> = {
  name: pluginName,
  install(sdk: SdkProps, options: Props = {}) {
    // 默认插件配置
    const defaultOptions = {
      location: null,
      navigate: null,
    } satisfies Result;

    sdk.instance[pluginName] = merge({}, defaultOptions, options);
  },
};

export { ClientPlugin, Props as ClientProps, Result as ClientResult };
