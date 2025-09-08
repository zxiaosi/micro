// 使用按需加载的方式引入 lodash
import isEmpty from 'lodash/isEmpty';

import { LocaleProps, SdkResult, ThemeProps } from '@/types';
import * as Icons from '@ant-design/icons';
import { FrameworkLifeCycles, ObjectType, RegistrableApp } from 'qiankun';
import { createElement } from 'react';
import { Outlet } from 'react-router-dom';

type MicroAppsMap = Map<string, RegistrableApp<ObjectType>>;

/** 动态创建Icon */
export const dynamicIcon = (icon: string) => {
  const antIcon: { [key: string]: any } = Icons; // 防止类型报错
  return createElement(antIcon[icon]);
};

/** qiankun 生命周期 钩子函数 */
export const lifeCyclesUtil: FrameworkLifeCycles<ObjectType> = {
  beforeLoad: [
    async (app) => {
      console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
    },
  ],
  beforeMount: [
    async (app) => {
      console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
    },
  ],
  afterUnmount: [
    async (app) => {
      console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
    },
  ],
};

/**
 * 处理路由数据
 * @param routes 路由数据
 * @param sdk sdk
 */
export const handleRoutesUtil = (routes: any[], sdk: SdkResult) => {
  const microAppsMap: MicroAppsMap = new Map();
  const menuData = transformRoutesUtil(routes, microAppsMap, sdk);
  const microApps = [...microAppsMap.values()];
  return { microApps, menuData };
};

/**
 * 递归转换路由数据
 * @param routes 路由数据
 * @param microApps 子应用列表
 * @param sdk sdk
 */
export const transformRoutesUtil = (
  routes: any[],
  microAppsMap: MicroAppsMap,
  sdk: SdkResult,
) => {
  if (!routes || routes?.length === 0) return [];

  return routes.map((item) => {
    let element = null; //

    const { component, routeAttr, icon, children } = item;

    // 处理子应用路由
    if (routeAttr) {
      const { name, rootId, ...rest } = JSON.parse(routeAttr);

      // 子应用信息
      const microAppInfo = {
        name,
        container: `#${rootId}`,
        props: { sdk },
        loader: (loading) => sdk.store.getState().setMicroAppState(loading),
        ...rest,
      };

      // 添加子应用信息
      microAppsMap.set(name, microAppInfo);

      // 处理子应用挂载组件
      element = sdk.app.renderComponent('Microapp', { rootId });
    } else if (component === 'Outlet') {
      // 处理路由出口
      element = <Outlet />;
    } else {
      // 处理普通组件
      element = sdk.app.renderComponent(component);
    }

    // 转换子路由
    const processedChildren = children?.length
      ? transformRoutesUtil(children, microAppsMap, sdk)
      : [];

    return {
      ...item,
      element,
      icon: dynamicIcon(icon),
      children: processedChildren,
    };
  });
};

/**
 * 递归去掉 path 中的 /*
 * - 匹配整个路由时，如 path=/user/*，会导致 prolayout pathname 匹配不到，导致不能高亮
 * - 生成路由时需要，菜单不需要带 /*
 * @param routes 路由
 */
export function replacePathUtil(routes: any[]) {
  if (!routes || routes?.length === 0) return [];

  return routes.map((item) => {
    const { path } = item;
    if (path) {
      item.path = path.replace(/\/\*$/, '');
    }
    if (item.children) {
      item.children = replacePathUtil(item.children);
    }
    return item;
  });
}

/**
 * 获取第一个页面的路径
 * @param routes 路由数据
 */
export const getFirstPagePathUtil = (routes: any[]) => {
  let firstPagePath = '/';

  if (isEmpty(routes)) return firstPagePath;

  firstPagePath = routes?.[0]?.path;

  if (!isEmpty(routes?.[0]?.children)) {
    firstPagePath = getFirstPagePathUtil(routes?.[0]?.children);
  }

  return firstPagePath;
};

/** 获取主题默认值 */
export const getDefaultThemeUtil = (sdk): ThemeProps => {
  // localStorage > sdk中主题 > 系统主题 > 默认

  // 1. localStorage
  const localTheme = localStorage.getItem('theme') as ThemeProps;
  if (localTheme) return localTheme;

  // 2. sdk中主题
  const sdkTheme = sdk.app?.theme;
  if (sdkTheme) return sdkTheme;

  // 3. 系统主题
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  if (media.matches) return media.matches ? 'dark' : 'light';

  // 4. 默认
  return 'light';
};

/** 获取国际化默认值 */
export const getDefaultLocaleUtil = (sdk): LocaleProps => {
  // localStorage > sdk中主题 > 浏览器语言 > 默认

  // 1. localStorage
  const localLocale = localStorage.getItem('locale') as LocaleProps;
  if (localLocale) return localLocale;

  // 2. sdk中主题
  const sdkLocale = sdk.app?.locale;
  if (sdkLocale) return sdkLocale;

  // 3. 浏览器语言
  const browserLocale = navigator.language as LocaleProps;
  if (browserLocale) return browserLocale;

  // 4. 默认
  return 'zh-CN';
};
