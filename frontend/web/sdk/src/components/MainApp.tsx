import { sdk } from '@/core';
import { LocaleProps, ThemeProps } from '@/types';
import {
  getDefaultLocaleUtil,
  getDefaultThemeUtil,
  getFirstPagePathUtil,
  handleRoutesUtil,
  lifeCyclesUtil,
} from '@/utils';
import { registerMicroApps, start } from 'qiankun';
import React, { Suspense, useEffect, useState } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';
import { AntdConfigProvider } from './AntdConfigProvider';

/** 主应用的根组件 */
const MainApp: React.FC = () => {
  const loginPath = sdk.config.loginPath;

  const defaulRoutes: RouteObject[] = [
    { path: loginPath, element: sdk.ui.renderComponent('Login') },
    { path: '*', element: sdk.ui.renderComponent('NotFound') },
    ...sdk.config.customRoutes,
  ];

  const [setTheme, setLocale] = useStore(
    sdk.store,
    useShallow((state) => [state.setTheme, state.setLocale]),
  );

  const [loading, setLoading] = useState(false);
  const [router, setRouter] = useState<RouteObject[]>(defaulRoutes);

  /** 设置图标组件 */

  /** 设置主题和国际化 */
  const setThemeLocale = (apiTheme?: ThemeProps, apiLocale?: LocaleProps) => {
    setTheme(apiTheme || getDefaultThemeUtil(sdk));
    setLocale(apiLocale || getDefaultLocaleUtil(sdk));
  };

  /** 初始化数据方法 */
  const initData = async () => {
    try {
      // 获取数据
      setLoading(() => true);
      const [{ data: userInfo = {} }, { data: routes = [] }] =
        await Promise.all([sdk.api.getUserInfoApi(), sdk.api.getRoutesApi()]);
      setLoading(() => false);

      // 设置主题和语言
      const { theme, locale } = userInfo?.settings || {};
      setThemeLocale(theme, locale);

      // 处理路由数据
      const { microApps, menuData } = handleRoutesUtil(routes, sdk);

      // 注册微应用
      registerMicroApps(microApps, lifeCyclesUtil);

      // 启动 qiankun
      start();

      // 获取首页路径
      const firstPath = getFirstPagePathUtil(menuData);

      // 合并所有路由
      const allRoutes: RouteObject[] = [
        ...defaulRoutes,
        { path: '/', element: <Navigate to={firstPath} replace /> },
        {
          path: '/',
          element: sdk.ui.renderComponent('Layout', { menuData }),
          children: menuData,
          errorElement: <>找不到页面</>,
        },
      ];

      setRouter(allRoutes);

      sdk.app = { ...sdk.app, allRoutes, microApps, menuData, ...userInfo };
    } catch (error) {
      setThemeLocale();
      setLoading(() => false);
      console.error('初始化数据错误:', error);
    }
  };

  // 设置初始值
  useEffect(() => {
    // 记录值
    sdk.app.initData = initData;
    sdk.app.allRoutes = defaulRoutes;

    const paths = sdk.config.customRoutes?.map((item) => item.path);
    const pathName = window.location.pathname;
    const noNeedAuth = [loginPath, ...paths]?.includes(pathName);

    // 如果时登录页面
    if (noNeedAuth) setThemeLocale();
    else initData();
  }, []);

  if (loading) return <>Loading...</>;

  return (
    <AntdConfigProvider>
      <Suspense fallback={<>Loading...</>}>
        <RouterProvider
          router={createBrowserRouter(router, { basename: '/' })}
        />
      </Suspense>
    </AntdConfigProvider>
  );
};

export { MainApp };
