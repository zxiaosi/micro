// 按需引入
import get from 'lodash/get';
import merge from 'lodash/merge';

import { LocaleProps, Plugin, ThemeProps, UserInfo } from '@/types';
import { ProLayoutProps } from '@ant-design/pro-layout';
import { ConfigProviderProps } from 'antd';
import { ObjectType, RegistrableApp } from 'qiankun';
import { ComponentType, createElement, ReactElement } from 'react';
import { RouteObject } from 'react-router-dom';

interface AppProps {
  /** 环境变量 */
  env?: Record<string, any>;

  /** 主题 */
  theme?: ThemeProps;
  /** 国际化 */
  locale?: LocaleProps;

  /** 登录页路由 */
  loginPath?: string;
  /** 登录后跳转的路由 */
  defaultPath?: string;
  /** 
   * 自定义路由信息 
   * - 会合并到 allRoutes 中 
   * - 目前只支持最外层路由自定义
   */
  customRoutes?: RouteObject[];
  /** 所有路由信息 */
  allRoutes?: RouteObject[];
  /** 微应用信息 */
  microApps?: RegistrableApp<ObjectType>[];
  /** 菜单数据 */
  menuData?: any[];

  /** 用户信息 */
  user?: UserInfo['user'];
  /** 用户权限 */
  permissions?: UserInfo['permissions'];
  /** 用户角色 */
  roles?: UserInfo['roles'];
  /** 用户设置 */
  settings?: UserInfo['settings'];

  /** Antd 配置 */
  antdConfig?: ConfigProviderProps;
  /** ProLayout 配置 */
  proLayoutConfig?: ProLayoutProps;

  /**
   * 初始化数据方法
   * - 获取用户信息和路由数据
   * - 自定义login页面时, 调用此方法获取数据
   */
  initData?: () => Promise<void>;
}

interface AppResult extends Required<Readonly<AppProps>> {
  /**
   * 获取组件
   * @param name 组件名称
   */
  getComponent?: (name: string) => ComponentType;
  /**
   * 渲染组件
   * @param name 组件名称
   */
  renderComponent?: (name: string, props?: any) => ReactElement;
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

      loginPath: '/login',
      defaultPath: '/',
      allRoutes: [],
      customRoutes: [],
      microApps: [],
      menuData: [],

      user: null,
      permissions: [],
      roles: [],
      settings: {},

      antdConfig: {},
      proLayoutConfig: {
        title: 'Demo',
      },

      initData: null,

      getComponent: (name) => {
        if (!name) throw new Error('getComponent -- 组件名称不能为空');

        return get(sdk.components, name);
      },
      renderComponent: (name, props = {}) => {
        const Component = sdk.app.getComponent(name);
        return createElement(Component, props);
      },
    } satisfies AppResult;

    sdk[pluginName] = merge({}, defaultOptions, options);
  },
};

export { AppPlugin, AppProps, AppResult };
