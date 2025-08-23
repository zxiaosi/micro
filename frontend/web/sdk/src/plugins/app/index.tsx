// 按需引入
import get from 'lodash/get';
import merge from 'lodash/merge';
import set from 'lodash/set';

import { LocaleProps, Plugin, ThemeProps } from '@/types';
import { getDefaultThemeUtil } from '@/utils';
import { ConfigProviderProps } from 'antd';
import { ComponentType } from 'react';
import { Location, NavigateFunction } from 'react-router-dom';

interface Props {
  /** 环境变量 */
  env?: Record<string, any>;
  /** 主题 */
  theme?: ThemeProps;
  /** 国际化 */
  locale?: LocaleProps;
  /** 路由模式 */
  routerMode?: 'browser' | 'hash' | 'memory';
  /** Antd 配置 */
  antdConfig?: ConfigProviderProps;
  /** 主应用 location */
  location?: Location;
  /** 主应用navigate（解决子应用跳转问题） */
  navigate?: NavigateFunction;
}

interface Result extends Required<Readonly<Props>> {
  /**
   * 设置组件
   * @param component 组件
   * @param name 组件名称
   */
  setComponent?: (component: ComponentType, name?: string) => void;
  /**
   * 获取组件
   * @param name 组件名称
   */
  getComponent?: (name: string) => ComponentType;
  /**
   * 获取根组件
   */
  getRootComponent?: () => ComponentType;
}

/** 插件名称 */
const pluginName = 'app';

/** App 插件 */
const AppPlugin: Plugin<'app'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // 默认插件配置
    const defaultOptions = {
      env: {},
      theme: getDefaultThemeUtil(sdk),
      locale: null,
      routerMode: 'browser',
      antdConfig: {},
      location: null,
      navigate: null,

      setComponent: (component, name) => {
        if (!component) throw new Error('setComponent -- 组件不能为空');

        const componentName = name || component.displayName || component.name;
        if (!componentName) throw new Error('setComponent -- 组件名称不能为空');

        set(sdk.components, componentName, component);
      },
      getComponent: (name: string) => {
        if (!name) throw new Error('getComponent -- 组件名称不能为空');

        return get(sdk.components, name);
      },
      getRootComponent: () => {
        return sdk.app.getComponent('Root');
      },
    } satisfies Result;

    sdk[pluginName] = merge({}, defaultOptions, options);
  },
};

export { AppPlugin, Props as AppProps, Result as AppResult };
