// 按需引入
import get from 'lodash/get';
import merge from 'lodash/merge';

import { Plugin, UserInfo } from '@/types';
import { MenuDataItem } from '@ant-design/pro-layout';
import { ObjectType, RegistrableApp } from 'qiankun';
import { ComponentType, createElement, ReactElement } from 'react';
import { RouteObject } from 'react-router-dom';

interface AppProps {
  /** 微应用信息 */
  microApps?: RegistrableApp<ObjectType>[];
  /** 菜单数据 */
  menuData?: MenuDataItem[];
  /** 所有路由信息 */
  allRoutes?: RouteObject[];

  /** 用户信息 */
  user?: UserInfo['user'];
  /** 用户权限 */
  permissions?: UserInfo['permissions'];
  /** 用户角色 */
  roles?: UserInfo['roles'];
  /** 用户设置 */
  settings?: UserInfo['settings'];

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
      microApps: [],
      menuData: [],
      allRoutes: [],

      user: null,
      permissions: [],
      roles: [],
      settings: {},

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
