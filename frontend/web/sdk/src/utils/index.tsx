// 使用按需加载的方式引入 lodash
import isEmpty from 'lodash/isEmpty';

import { LocaleProps, SdkResult, ThemeProps } from '@/global';
import * as Icons from '@ant-design/icons';
import { FrameworkLifeCycles, ObjectType, RegistrableApp } from 'qiankun';
import { createElement } from 'react';
import { Outlet } from 'react-router-dom';

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
  const microApps: RegistrableApp<ObjectType>[] = [];
  const subRoutes = transformRoutesUtil(routes, microApps, sdk);
  return { microApps, subRoutes };
};

/**
 * 递归转换路由数据
 * @param routes 路由数据
 * @param microApps 子应用列表
 * @param sdk sdk
 */
export const transformRoutesUtil = (
  routes: any[],
  microApps: RegistrableApp<ObjectType>[],
  sdk: SdkResult,
) => {
  return routes.map((item) => {
    let element = null; //

    const { component, routeAttr, icon, children } = item;

    // 处理子应用路由
    if (routeAttr) {
      const { name, rootId, ...rest } = JSON.parse(routeAttr);

      // 避免重复注册
      if (!microApps.some((app) => app.name === name)) {
        microApps.push({ name, container: `#${rootId}`, ...rest });
      }

      const Microapp: any = sdk.components.getComponent('Microapp');
      element = <Microapp rootId={rootId} />;
    } else if (component === 'Outlet') {
      // 处理路由出口
      element = <Outlet />;
    } else {
      // 处理普通组件
      const Element = sdk.components.getComponent(component) || null;
      element = <Element />;
    }

    // 转换子路由
    const processedChildren = children?.length
      ? transformRoutesUtil(children, microApps, sdk)
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

/** 获取语言包 */
export const getLocaleUtil = async (locale: string) => {
  // 语言前缀
  const localePrefix = locale.split('_')[0] || 'zh';
  // 语言包
  let antdLocale = null;

  switch (localePrefix) {
    case 'zh':
      antdLocale = await import(`antd/es/locale/zh_CN`);
      await import(`dayjs/locale/zh`);
      break;
    case 'en':
      antdLocale = await import(`antd/es/locale/en_US`);
      await import(`dayjs/locale/en`);
      break;
  }

  return antdLocale.default;
};

/** 获取主题默认值 */
export const getDefaultThemeUtil = (sdk): ThemeProps => {
  // localStorage > sdk中主题 > 系统主题 > 默认

  // 1. localStorage
  const localTheme = localStorage.getItem('theme') as ThemeProps;
  if (localTheme) return localTheme;

  // 2. sdk中主题
  const sdkTheme = sdk.app.theme;
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
  const sdkLocale = sdk.app.locale;
  if (sdkLocale) return sdkLocale;

  // 3. 浏览器语言
  const browserLocale = navigator.language.replace('-', '_') as LocaleProps;
  if (browserLocale) return browserLocale;

  // 4. 默认
  return 'zh_CN';
};
