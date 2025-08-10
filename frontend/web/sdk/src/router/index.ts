// 使用按需加载的方式引入 lodash
import merge from 'lodash/merge';

import { SdkResult } from '@/global';
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

/** 路由 配置 */
const createRouter = (sdk: SdkResult, opt: Props = {}): Result => {
  // 返回结果
  const result: Result = {
    routes: [],
    microApps: [],
    microAppState: false,
    menuData: [],

    addRoute: (route: RouteObject) => {
      sdk.router.routes.push(route);
    },
  };

  // 合并属性
  return merge(result, sdk.router, opt);
};

export { createRouter, Props as RouterProps, Result as RouterResult };
