// 按需引入
import merge from 'lodash/merge';

import { Plugin } from '@/types';
import { ComponentType, createElement, ReactElement } from 'react';

import Layout from './layout';
import Login from './login';
import Microapp from './microapp';
import NotFound from './notFound';
import Root from './root';

interface UIProps {
  /** 组件 */
  [key: string]: ComponentType | ((name: string) => ComponentType);
}

interface UIResult extends Required<UIProps> {
  /**
   * 获取组件
   * @param name 组件名称
   */
  readonly getComponent: (name: string) => ComponentType;
  /**
   * 渲染组件
   * @param name 组件名称
   */
  readonly renderComponent: (name: string, props?: any) => ReactElement;
}

/** 插件名称 */
const pluginName = 'ui';

/**
 * 组件
 * - 详情参考 {@link UIProps} {@link UIResult}
 * - 内置了 Login、NotFound、Microapp 等组件, 可传入覆盖
 * - 组件共享
 *    - 在主应用中, 可通过 use(UIPlugin, { MyComponent }) 传入组件
 *    - 在子应用中, 可通过 sdk.ui.renderComponent('MyComponent') 使用组件
 */
const UIPlugin: Plugin<'ui'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // 默认插件配置
    const defaultOptions = {
      Login,
      NotFound,
      Root,
      Layout, // 不要使用懒加载 - 防止多次渲染
      Microapp, // 不要使用懒加载 - 防止qiankun挂载不上

      getComponent: (name) => {
        if (!name) throw new Error('Component name cannot be empty');
        return sdk.ui[name] as ComponentType;
      },
      renderComponent: (name, props = {}) => {
        const Component = sdk.ui.getComponent(name);
        if (!Component) throw new Error(`Component ${name} not found`);
        return createElement(Component, props);
      },
    } satisfies UIResult;

    sdk[pluginName] = merge({}, defaultOptions, options);
  },
};

export { UIPlugin, UIProps, UIResult };
