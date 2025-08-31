// 按需引入
import merge from 'lodash/merge';

import { Plugin } from '@/types';
import { Location, NavigateFunction } from 'react-router-dom';

interface ClientProps {
  /** 主应用 location */
  location?: Location;
  /** 主应用navigate（解决子应用跳转问题） */
  navigate?: NavigateFunction;
}

interface ClientResult extends Required<Readonly<ClientProps>> {}

/** 插件名称 */
const pluginName = 'client';

/**
 * Client 插件
 * - 详情参考 {@link ClientProps} {@link ClientResult}
 * - TODO: 考虑合并到 AppPlugin 中
 */
const ClientPlugin: Plugin<'client'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // 默认插件配置
    const defaultOptions = {
      location: null,
      navigate: null,
    } satisfies ClientResult;

    sdk[pluginName] = merge({}, defaultOptions, options);
  },
};

export { ClientPlugin, ClientProps, ClientResult };
