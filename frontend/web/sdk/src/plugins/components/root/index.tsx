import sdk from '@/core';
import {
  getDefaultLocaleUtil,
  getDefaultThemeUtil,
  getFirstPagePathUtil,
  handleRoutesUtil,
  lifeCyclesUtil,
} from '@/utils';
import { ConfigProvider } from 'antd';
import { registerMicroApps, start } from 'qiankun';
import { memo, useEffect, useState } from 'react';
import { RawIntlProvider } from 'react-intl';
import {
  BrowserRouter,
  HashRouter,
  MemoryRouter,
  Navigate,
  RouteObject,
  useLocation,
  useNavigate,
  useRoutes,
} from 'react-router-dom';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

/** 路由渲染组件 */
const Element = memo(({ router }: { router: RouteObject[] }) => {
  const element = useRoutes(router || []);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 注入父组件的 navigate 方法到 SDK
    sdk.register({ client: { navigate, location } });
  }, [location]);

  return <>{element}</>;
});

/** 根组件 */
const Root = () => {
  const [
    locale,
    setTheme,
    setLocale,
    antdConfig,
    setAntdConfig,
    setMicroAppState,
    intl,
  ] = useStore(
    sdk.store,
    useShallow((state) => [
      state.locale,
      state.setTheme,
      state.setLocale,
      state.antdConfig,
      state.setAntdConfig,
      state.setMicroAppState,
      state.intl,
    ]),
  );

  const [router, setRouter] = useState<RouteObject[]>(undefined);

  /** 获取路由数据 */
  const getRoutes = async () => {
    try {
      // 获取路由数据
      const resp = await sdk.api.getRoutesApi();

      // 处理路由数据
      const { microApps, subRoutes } = handleRoutesUtil(resp?.data || [], sdk);

      // 子应用添加 loader
      const newMicroApps = microApps.map((item) => {
        return {
          ...item,
          props: { sdk },
          loader: (loading) => setMicroAppState(loading),
        };
      });

      // 获取首页路径
      const firstPath = getFirstPagePathUtil(subRoutes);

      const Login = sdk.app.getComponent('Login');
      const Layout = sdk.app.getComponent('Layout'); // 使用懒加载会导致 Root 组件渲染多次
      const NotFound = sdk.app.getComponent('NotFound');

      // 合并所有路由
      const allRoutes: RouteObject[] = [
        { path: '/login', element: <Login /> },
        { path: '/', element: <Navigate to={firstPath} replace /> },
        {
          path: '/',
          element: <Layout />,
          children: subRoutes,
          errorElement: <>找不到页面</>,
        },
        { path: '*', element: <NotFound /> },
      ];

      // 注册微应用
      registerMicroApps(newMicroApps, lifeCyclesUtil);

      // 启动 qiankun
      start({ sandbox: true, singular: true, urlRerouteOnly: true });

      setRouter(allRoutes);

      // 注入属性
      sdk.register({
        app: {
          routes: allRoutes,
          microApps: newMicroApps,
          menuData: subRoutes,
        },
      });
    } catch (error) {
      console.error('获取路由信息错误, 请配置路由接口:', error);
    }
  };

  // 设置初始值
  useEffect(() => {
    const deafultTheme = getDefaultThemeUtil(sdk);
    setTheme(deafultTheme);

    const deafultLocale = getDefaultLocaleUtil(sdk);
    setLocale(deafultLocale);

    setAntdConfig(sdk.app.antdConfig);

    getRoutes();
  }, []);

  if (!router) return <>Loading...</>;

  const routerMode = sdk.app.routerMode || 'browser';
  const RouterWrapper =
    routerMode === 'memory'
      ? MemoryRouter
      : routerMode === 'hash'
        ? HashRouter
        : BrowserRouter;

  return (
    <RawIntlProvider value={intl}>
      <ConfigProvider {...antdConfig}>
        <RouterWrapper basename="/">
          <Element router={router} />
        </RouterWrapper>
      </ConfigProvider>
    </RawIntlProvider>
  );
};

export default Root;
