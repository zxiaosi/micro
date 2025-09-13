import { sdk } from '@/core';
import { LocaleProps, ThemeProps } from '@/types';
import {
  getDefaultLocaleUtil,
  getDefaultThemeUtil,
  getFirstPagePathUtil,
  handleRoutesUtil,
  lifeCyclesUtil,
} from '@/utils';
import { ConfigProvider } from 'antd';
import { registerMicroApps, start } from 'qiankun';
import { Suspense, useEffect, useState } from 'react';
import { createIntl, RawIntlProvider } from 'react-intl';
import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

/** 根组件 */
const Root = () => {
  const loginPath = sdk.config.loginPath;

  const defaulRoutes: RouteObject[] = [
    { path: loginPath, element: sdk.ui.renderComponent('Login') },
    { path: '*', element: sdk.ui.renderComponent('NotFound') },
    ...sdk.config.customRoutes,
  ];

  const [locale, setTheme, setLocale, antdConfig, setAntdConfig] = useStore(
    sdk.store,
    useShallow((state) => [
      state.locale,
      state.setTheme,
      state.setLocale,
      state.antdConfig,
      state.setAntdConfig,
    ]),
  );

  const [loading, setLoading] = useState(false);
  const [router, setRouter] = useState<RouteObject[]>(defaulRoutes);

  /** 设置图标组件 */

  /** 设置主题和国际化 */
  const setThemeLocale = (apiTheme?: ThemeProps, apiLocale?: LocaleProps) => {
    setTheme(apiTheme || getDefaultThemeUtil(sdk));
    setLocale(apiLocale || getDefaultLocaleUtil(sdk));
    setAntdConfig(sdk.config.antdConfig);
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
          element: sdk.ui.renderComponent('Layout'),
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

  if (!locale || loading) return <>Loading...</>;

  // 创建 Intl 对象
  const intl = createIntl(
    { locale, messages: sdk.i18n.intlConfig[locale] },
    sdk.i18n.cache,
  );

  // 记录值
  sdk.i18n.intl = intl;

  return (
    <RawIntlProvider value={intl}>
      <ConfigProvider {...antdConfig}>
        <Suspense fallback={<>Loading...</>}>
          <RouterProvider
            router={createBrowserRouter(router, { basename: '/' })}
          />
        </Suspense>
      </ConfigProvider>
    </RawIntlProvider>
  );
};

export default Root;
