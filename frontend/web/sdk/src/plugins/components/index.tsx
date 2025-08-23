// 按需引入
import get from 'lodash/get';
import merge from 'lodash/merge';
import set from 'lodash/set';

import { Plugin, SdkProps } from '@/types';
import { ComponentType } from 'react';

import { RootProvider } from '@/plugins/hooks/useRoot';
import Layout from './layout';
import Login from './login';
import Microapp from './microapp';
import NotFound from './notFound';
import Root from './root';

interface Props {
  /** 组件 */
  [key: string]: ComponentType | any;
}

interface Result extends Required<Readonly<Props>> {
  /**
   * 设置组件
   * @param component 组件
   * @param name 组件名称
   */
  readonly setComponent: (component: ComponentType, name?: string) => void;
  /**
   * 获取组件
   * @param name 组件名称
   */
  readonly getComponent: (name: string) => ComponentType;
  /**
   * 获取根组件
   */
  readonly getRootComponent: () => ComponentType;
}

/** 插件名称 */
const pluginName = 'components';

/** 组件库 插件 */
const ComponentsPlugin: Plugin<'components'> = {
  name: pluginName,
  install(sdk: SdkProps, options: Props = {}) {
    // 默认插件配置
    const defaultOptions = {
      Login,
      NotFound,
      Root,
      Layout, // 不使用懒加载 - 防止多次渲染
      Microapp, // 不使用懒加载 - 防止qiankun挂载不上

      setComponent: (component, name) => {
        if (!component) throw new Error('setComponent -- 组件不能为空');

        const componentName = name || component.displayName || component.name;
        if (!componentName) throw new Error('setComponent -- 组件名称不能为空');

        set(sdk.instance.components, componentName, component);
      },
      getComponent: (name: string) => {
        if (!name) throw new Error('getComponent -- 组件名称不能为空');

        return get(sdk.instance.components, name) as ComponentType;
      },
      getRootComponent: () => {
        console.log('getRootComponent');
        return () => (
          <RootProvider sdk={sdk}>
            <Root />
          </RootProvider>
        );
      },
    } satisfies Result;

    sdk.instance[pluginName] = merge({}, defaultOptions, options);
  },
};

export {
  ComponentsPlugin,
  Props as ComponentsProps,
  Result as ComponentsResult,
};
