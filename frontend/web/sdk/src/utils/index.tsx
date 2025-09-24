import { sdk } from '@/core';
import { ApiRequestOption } from '@/plugins/api/http';
import { LocaleProps, SdkResult, ThemeProps } from '@/types';
import * as Icons from '@ant-design/icons';
import { AxiosResponse } from 'axios';
import { FrameworkLifeCycles, ObjectType, RegistrableApp } from 'qiankun';
import { createElement } from 'react';
import { Outlet } from 'react-router-dom';

type MicroAppsMap = Map<string, RegistrableApp<ObjectType>>;

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
 * 动态创建Icon
 * @param icon icon名称
 */
export const dynamicIcon = (icon: string) => {
  const antIcon: { [key: string]: any } = Icons; // 防止类型报错
  return createElement(antIcon[icon]);
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
    let element = null; // 组件

    const { locale, path, icon, component, routeAttr, children } = item;

    // 处理子应用路由
    if (routeAttr) {
      let newRouteAttr = {} as any;

      try {
        newRouteAttr = JSON.parse(routeAttr); // // 解析子应用路由属性
      } catch (error) {
        console.error('子应用路由属性格式错误：', routeAttr);
      }

      const { name, rootId, ...rest } = newRouteAttr;

      // 子应用信息
      const microAppInfo = {
        ...rest,
        name,
        container: `#${rootId}`,
        props: { sdk },
        loader: (loading) => sdk.store.getState().setMicroAppState(loading),
      };

      // 添加子应用信息
      microAppsMap.set(name, microAppInfo);

      element = sdk.ui.renderComponent('Microapp', { name, rootId }); // 子应用挂载组件
    } else if (component === 'Outlet') {
      element = <Outlet />; // 路由出口组件
    } else {
      element = sdk.ui.renderComponent(component); // 普通组件
    }

    // 转换子路由
    const processedChildren = children?.length
      ? transformRoutesUtil(children, microAppsMap, sdk)
      : [];

    return {
      ...item,
      key: `${locale}_${icon}_${path}`, // 唯一key, 判断菜单是否折叠
      element,
      icon: dynamicIcon(icon),
      children: processedChildren,
      handle: {
        // 用户面包屑 https://reactrouter.com/6.30.1/hooks/use-matches
        crumb: (data) => ({ ...item, ...data }),
      },
    };
  });
};

/**
 * 获取第一个页面的路径
 * @param routes 路由数据
 */
export const getFirstPagePathUtil = (routes: any[]) => {
  let firstPagePath = '/';

  if (!routes || routes.length === 0) return firstPagePath;

  firstPagePath = routes?.[0]?.path;

  if (routes?.[0]?.children && routes?.[0]?.children.length > 0) {
    firstPagePath = getFirstPagePathUtil(routes?.[0]?.children);
  }

  return firstPagePath;
};

/** 获取主题默认值 */
export const getDefaultThemeUtil = (sdk: SdkResult): ThemeProps => {
  // localStorage > sdk中主题 > 系统主题 > 默认

  // 1. localStorage
  const localTheme = localStorage.getItem('theme') as ThemeProps;
  if (localTheme) return localTheme;

  // 2. sdk中主题
  const sdkTheme = sdk.config?.theme;
  if (sdkTheme) return sdkTheme;

  // 3. 系统主题
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  if (media.matches) return media.matches ? 'dark' : 'light';

  // 4. 默认
  return 'light';
};

/** 获取国际化默认值 */
export const getDefaultLocaleUtil = (sdk): LocaleProps => {
  // localStorage > sdk中国际化 > 浏览器语言 > 默认

  // 1. localStorage
  const localLocale = localStorage.getItem('locale') as LocaleProps;
  if (localLocale) return localLocale;

  // 2. sdk中国际化
  const sdkLocale = sdk.config?.locale;
  if (sdkLocale) return sdkLocale;

  // 3. 浏览器语言
  const browserLocale = navigator.language as LocaleProps;
  if (browserLocale) return browserLocale;

  // 4. 默认
  return 'zh-CN';
};

/**
 * 生成请求id
 * @param config
 */
export const generateRequestIdUtil = (config: any) => {
  const { requestId, url, method, params, data } = config as ApiRequestOption;
  if (requestId) return requestId;

  return `${method}:${url}?${JSON.stringify(params)}&${JSON.stringify(data)}`;
};

/**
 * 取消请求
 * @param config
 */
export const cancelRequestUtil = (config: any) => {
  const requestId = generateRequestIdUtil(config);

  const controller = sdk.api.controllers.get(requestId);
  if (!controller) return;

  controller.abort();
  sdk.api.controllers.delete(requestId);
};

/**
 * 下载文件
 */
export const downloadFileUtil = (resp: AxiosResponse) => {
  // 1. 从响应头中解析文件名
  const contentDisposition = resp.headers['content-disposition'];
  let filename = 'data.txt';

  if (contentDisposition) {
    // 使用正则匹配文件名（兼容带引号和不带引号的情况）
    const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
    if (filenameMatch && filenameMatch[1]) {
      filename = filenameMatch[1];
    }
  }

  // 2. 创建 blob 对象
  const blob = new Blob([resp.data], { type: 'application/pdf' });

  // 3. 创建下载链接
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename; // Specify the file name
  document.body.appendChild(link);
  link.click();

  // 4. 释放 blob 对象
  window.URL.revokeObjectURL(url);
  document.body.removeChild(link);
};
