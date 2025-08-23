// 按需引入
import merge from 'lodash/merge';

import { Plugin } from '@/types';
import { ComponentType } from 'react';

import Layout from './layout';
import Login from './login';
import Microapp from './microapp';
import NotFound from './notFound';
import Root from './root';
import { RootProvider } from './rootProvider';

interface Props {
  /** 组件 */
  [key: string]: ComponentType;
}

interface Result extends Required<Readonly<Props>> {}

/** 插件名称 */
const pluginName = 'components';

/** 组件库 插件 */
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

      RootProvider,
    } satisfies Result;

    sdk[pluginName] = merge({}, defaultOptions, options);
  },
};

export {
  ComponentsPlugin,
  Props as ComponentsProps,
  Result as ComponentsResult,
};
