// 按需引入
import merge from 'lodash/merge';

import { Plugin } from '@/types';
import { ComponentType } from 'react';

import Layout from './layout';
import Login from './login';
import Microapp from './microapp';
import NotFound from './notFound';
import Root from './root';

interface ComponentsProps {
  /** 组件 */
  [key: string]: ComponentType;
}

interface ComponentsResult extends Required<Readonly<ComponentsProps>> {}

/** 插件名称 */
const pluginName = 'components';

/**
 * 组件 插件
 * - 详情参考 {@link ComponentsProps} {@link ComponentsResult}
 * - 内置了登录组件, 404组件等常用组件, 可传入覆盖
 */
const ComponentsPlugin: Plugin<'components'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // 默认插件配置
    const defaultOptions = {
      Login,
      NotFound,
      Root,
      Layout, // 不使用懒加载 - 防止多次渲染
      Microapp, // 不使用懒加载 - 防止qiankun挂载不上
    } satisfies ComponentsResult;

    sdk[pluginName] = merge({}, defaultOptions, options);
  },
};

export { ComponentsPlugin, ComponentsProps, ComponentsResult };
