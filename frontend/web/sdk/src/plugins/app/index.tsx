// 按需引入
import merge from 'lodash/merge';

import { Plugin, UserInfo } from '@/types';
import { MenuDataItem } from '@ant-design/pro-layout';
import { ObjectType, RegistrableApp } from 'qiankun';
import { RouteObject } from 'react-router-dom';

interface AppProps {
  /** 菜单数据 */
  menuData?: MenuDataItem[];
  /** 微应用信息 */
  microApps?: RegistrableApp<ObjectType>[];
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

interface AppResult extends Required<AppProps> {
  /**
   * 跳转登录页
   */
  readonly pageToLogin: () => void;
  /**
   * 获取重定向路径
   */
  readonly getRedirectPath: () => string;
}

/** 插件名称 */
const pluginName = 'app';

/**
 * 应用数据于逻辑
 * - 详情参考 {@link AppProps} {@link AppResult}
 */
const AppPlugin: Plugin<'app'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // 默认插件配置
    const defaultOptions = {
      menuData: [],
      microApps: [],
      allRoutes: [],

      user: null,
      permissions: [],
      roles: [],
      settings: {},

      initData: null,

      pageToLogin: () => {
        // 清除 Token
        localStorage.removeItem(sdk.config.tokenName);

        // 获取当前页路由
        const path = window.location.pathname;
        const redirect = encodeURIComponent(path || '/');
        const loginPath = `${sdk.config.loginPath}?redirect=${redirect}`;

        // 跳转登录页(这里必须刷新一下页面, 否则qiankun实例不会销毁, 登录后会直接mount子应用, 而不是bootstrap子应用)
        window.location.replace(loginPath);
      },
      getRedirectPath: () => {
        // 1. 优先使用指定值
        const defaultPath = sdk.config.defaultPath;
        if (defaultPath) return defaultPath;

        // 2. 其次使用重定向的值
        const param = new URLSearchParams(window.location.search);
        const redirect = decodeURIComponent(param.get('redirect') || '');
        if (redirect) return redirect;

        // 3. 最后使用菜单中第一项
        return '/';
      },
    } satisfies AppResult;

    sdk[pluginName] = merge({}, defaultOptions, options);
  },
};

export { AppPlugin, AppProps, AppResult };
