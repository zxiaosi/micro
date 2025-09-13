// 按需引入
import merge from 'lodash/merge';

import { Plugin } from '@/types';
import { Location, NavigateFunction, UIMatch } from 'react-router-dom';

interface ClientProps {}

interface ClientResult extends Required<ClientProps> {
  /** 主应用 location */
  location: Location;
  /** 主应用navigate（解决子应用跳转问题） */
  navigate: NavigateFunction;
  /** 路由匹配（用于面包屑） */
  matches: UIMatch[];
}

/** 插件名称 */
const pluginName = 'client';

/**
 * 客户端
 * - 详情参考 {@link ClientProps} {@link ClientResult}
 * - 全局路由相关信息
 */
const ClientPlugin: Plugin<'client'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // 默认插件配置
    const defaultOptions = {
      location: null,
      navigate: null,
      matches: null,
    } satisfies ClientResult;

    sdk[pluginName] = merge({}, defaultOptions, options);
  },
};

export { ClientPlugin, ClientProps, ClientResult };
