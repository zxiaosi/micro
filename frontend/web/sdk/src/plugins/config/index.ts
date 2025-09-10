// 按需引入
import merge from 'lodash/merge';

import { LocaleProps, Plugin, ThemeProps } from '@/types';
import { ProLayoutProps } from '@ant-design/pro-layout';
import { ConfigProviderProps } from 'antd';
import { RouteObject } from 'react-router-dom';

interface ConfigProps {
  /** 环境变量 */
  env?: Record<string, any>;

  /** 主题 */
  theme?: ThemeProps;
  /** 国际化 */
  locale?: LocaleProps;

  /** 登录页路由 */
  loginPath?: string;
  /**
   * 登录后跳转的路由
   * - 优先使用指定值
   * - 其次使用重定向的值
   * - 最后使用菜单中第一项
   */
  defaultPath?: string;
  /**
   * 自定义路由信息
   * - 目前只支持最外层路由自定义
   * - 会合并到 sdk.app.allRoutes 中
   */
  customRoutes?: RouteObject[];

  /** Antd 配置 */
  antdConfig?: ConfigProviderProps;
  /** ProLayout 配置 */
  proLayoutConfig?: ProLayoutProps;
}

interface ConfigResult extends Required<ConfigProps> {}

/** 插件名称 */
const pluginName = 'config';

/**
 * 配置 插件
 * - 详情参考 {@link ConfigProps} {@link ConfigResult}
 * - TODO: 考虑合并到 AppPlugin 中
 */
const ConfigPlugin: Plugin<'config'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // 默认插件配置
    const defaultOptions = {
      env: {},

      theme: null,
      locale: null,

      loginPath: '/login',
      defaultPath: '',
      customRoutes: [],

      antdConfig: {},
      proLayoutConfig: {
        title: 'Demo',
      },
    } satisfies ConfigResult;

    sdk[pluginName] = merge({}, defaultOptions, options);
  },
};

export { ConfigPlugin, ConfigProps, ConfigResult };
