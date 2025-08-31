// 按需引入
import get from 'lodash/get';
import merge from 'lodash/merge';
import set from 'lodash/set';

import { LocaleProps, Plugin, ThemeProps } from '@/types';
import { ProLayoutProps } from '@ant-design/pro-layout';
import { ConfigProviderProps } from 'antd';
import { ObjectType, RegistrableApp } from 'qiankun';
import { ComponentType } from 'react';
import { RouteObject } from 'react-router-dom';

interface AppProps {
  /** 环境变量 */
  env?: Record<string, any>;

  /** 主题 */
  theme?: ThemeProps;
  /** 国际化 */
  locale?: LocaleProps;

  /** 路由模式 */
  routerMode?: 'browser' | 'hash' | 'memory';
  /** 路由信息 */
  routes?: RouteObject[];
  /** 微应用信息 */
  microApps?: RegistrableApp<ObjectType>[];
  /** 菜单数据 */
  menuData?: any[];

  /** Antd 配置 */
  antdConfig?: ConfigProviderProps;
  /** ProLayout 配置 */
  proLayoutConfig?: ProLayoutProps;
}

interface AppResult extends Required<Readonly<AppProps>> {
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

/**
 * 常用配置 插件
 * - 详情参考 {@link AppProps} {@link AppResult}
 */
const AppPlugin: Plugin<'app'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // 默认插件配置
    const defaultOptions = {
      env: {},

      theme: null,
      locale: null,

      routerMode: 'browser',
      routes: [],
      microApps: [],
      menuData: [],

      antdConfig: {},
      proLayoutConfig: {
        title: 'Demo',
      },

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
    } satisfies AppResult;

    sdk[pluginName] = merge({}, defaultOptions, options);
  },
};

export { AppPlugin, AppProps, AppResult };
