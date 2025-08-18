import { MicroStateProvider, useMicroState } from '@/hooks/useMicroState';
import { useRoot } from '@/hooks/useRoot';
import {
  getFirstPagePathUtil,
  handleRoutesUtil,
  lifeCyclesUtil,
} from '@/utils';
import { ConfigProvider } from 'antd';
import { registerMicroApps, start } from 'qiankun';
import { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import {
  createBrowserRouter,
  createHashRouter,
  createMemoryRouter,
  Navigate,
  RouteObject,
  RouterProvider,
  RouterProviderProps,
} from 'react-router-dom';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

/** 根组件 */
const Root = () => {
  const sdk = useRoot();

  const { setMicroAppState } = useMicroState();

  const [router, setRouter] =
    useState<RouterProviderProps['router']>(undefined);

  /** 获取路由数据 */
  const getRoutes = async () => {
    try {
      // 获取路由数据
      const resp = await sdk.api.getRoutesApi();

      // 处理路由数据
      const { microApps, subRoutes } = handleRoutesUtil(resp?.data || [], sdk);

      // 子应用添加 loader
      const newMicroApps = microApps.map((item) => {
        return { ...item, loader: (loading) => setMicroAppState(loading) };
      });

      // 获取首页路径
      const firstPath = getFirstPagePathUtil(subRoutes);

      // 合并所有路由
      const allRoutes: RouteObject[] = [
        { path: '/login', Component: sdk.components.getComponent('Login') },
        { path: '/', element: <Navigate to={firstPath} replace /> },
        {
          path: '/',
          Component: sdk.components.getComponent('Layout'), // 使用懒加载会导致 Root 组件渲染多次
          children: subRoutes,
          errorElement: <>找不到页面</>,
        },
        { path: '*', Component: sdk.components.getComponent('NotFound') },
      ];

      // 注册微应用
      registerMicroApps(newMicroApps, lifeCyclesUtil);

      // 启动 qiankun
      start({ sandbox: true, singular: true, urlRerouteOnly: true });

      let newRouter = undefined;
      switch (sdk.app.routerMode) {
        case 'browser':
          newRouter = createBrowserRouter(allRoutes, { basename: '/' });
          break;
        case 'hash':
          newRouter = createHashRouter(allRoutes, { basename: '/' });
          break;
        case 'memory':
          newRouter = createMemoryRouter(allRoutes, { basename: '/' });
          break;
        default:
          break;
      }

      setRouter(newRouter);

      // 注入属性
      sdk.register({
        router: {
          routes: allRoutes,
          microApps: newMicroApps,
          menuData: subRoutes,
        },
      });
    } catch (error) {
      console.error('获取路由信息错误, 请配置路由接口:', error);
    }
  };

  useEffect(() => {
    getRoutes();
  }, []);

  if (!router) return <>Loading...</>;

  return <RouterProvider router={router} />;
};

const RootWrapper = () => {
  const sdk = useRoot();

  const [antdConfig, locale] = useStore(
    sdk.store,
    useShallow((state) => [state.antdConfig, state.locale])
  );

  if (!antdConfig || Object.keys(antdConfig).length === 0)
    return <>Loading...</>;

  console.log('antdConfig', locale, sdk.i18n[locale]);

  return (
    <IntlProvider locale={locale} messages={sdk.i18n[locale]}>
      <ConfigProvider {...antdConfig}>
        <MicroStateProvider>
          <Root />
        </MicroStateProvider>
      </ConfigProvider>
    </IntlProvider>
  );
};

export default RootWrapper;
