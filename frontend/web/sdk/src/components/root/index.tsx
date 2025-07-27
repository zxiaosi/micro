import { useRoot } from '@/hooks/useRoot';
import { memo, useEffect, useState } from 'react';
import {
  createBrowserRouter,
  createHashRouter,
  createMemoryRouter,
  Navigate,
  RouteObject,
  RouterProvider,
  RouterProviderProps,
} from 'react-router';

/** 根组件 */
const Root = () => {
  const sdk = useRoot();

  console.log('Root component initialized', sdk);

  const [router, setRouter] =
    useState<RouterProviderProps['router']>(undefined);

  /** 获取路由数据 */
  const getRoutes = async () => {
    try {
      const resp = await sdk.settings?.getRoutesApi?.();
      const data = resp?.data || [];

      // 子路由处理
      const subRoutes: RouteObject[] =
        data?.map((item) => {
          const Component = sdk.getComponent(item.component) || null;
          return { ...item, Component };
        }) || [];

      // 所有路由
      const allRoutes: RouteObject[] = [
        { path: '/login', Component: sdk.getComponent('Login') },
        { path: '/', element: <Navigate to="/dashboard" replace /> },
        {
          path: '/',
          Component: sdk.getComponent('Layout'),
          children: subRoutes,
          errorElement: <>找不到页面</>,
        },
        { path: '*', Component: sdk.getComponent('NotFound') },
      ];

      let newRouter = undefined;
      switch (sdk.settings?.routerMode) {
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

export default memo(Root);
