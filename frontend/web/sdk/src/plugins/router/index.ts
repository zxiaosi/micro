// 按需引入
import merge from 'lodash/merge';

import { Plugin } from '@/types';
import { ObjectType, RegistrableApp } from 'qiankun';
import { RouteObject } from 'react-router-dom';

interface Props {
  /** 路由信息 */
  routes?: RouteObject[];
  /** 微应用信息 */
  microApps?: RegistrableApp<ObjectType>[];
  /** 微应用加载状态 */
  microAppState?: boolean;
  /** 菜单数据 */
  menuData?: any[];
}

interface Result extends Required<Readonly<Props>> {
  /**
   * 添加路由
   * @param route 路由信息
   */
  readonly addRoute: (route: RouteObject) => void;
}

/** 插件名称 */
const pluginName = 'router';

/** 路由 插件 */
const RouterPlugin: Plugin<'router'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // 默认插件配置
    const defaultOptions = {
      routes: [],
      microApps: [],
      microAppState: false,
      menuData: [],

      addRoute: (route: RouteObject) => {
        sdk.router.routes.push(route);
      },
    } satisfies Result;

    sdk[pluginName] = merge({}, defaultOptions, options);
  },
};

export { RouterPlugin, Props as RouterProps, Result as RouterResult };
