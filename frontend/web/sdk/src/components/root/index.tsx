import { useRoot } from '@/hooks/useRoot';
import { registerMicroApps, start } from 'qiankun';
import { memo, useEffect, useState } from 'react';
import {
  createBrowserRouter,
  createHashRouter,
  createMemoryRouter,
  Navigate,
  RouteObject,
  RouterProviderProps,
} from 'react-router';
import { RouterProvider } from 'react-router/dom';

/** 根组件 */
const Root = () => {
  const sdk = useRoot();

  console.log('Root component initialized', sdk);

  const [router, setRouter] =
    useState<RouterProviderProps['router']>(undefined);

  /** 获取路由数据 */
  const getRoutes = async () => {
    try {
      const resp = await sdk.api.getRoutesApi();
      const data = resp?.data || [];

      // 微应用信息
      const microApps = [];

      // 子路由处理
      const subRoutes: RouteObject[] =
        data?.map((item) => {
          // 微应用
          if (item.routerAttr) {
            const routerAttr = JSON.parse(item.routerAttr) || {};
            const id = routerAttr.rootId || 'sub-app';

            microApps.push({ ...routerAttr, container: `#${id}` });
            const Element: any =
              sdk.components.getComponent(item.component) ||
              sdk.components.getComponent('Microapp');
            return { ...item, element: <Element rootId={id} /> }; // 不能使用懒加载
          } else {
            const Component =
              sdk.components.getComponent(item.component) || null;
            return { ...item, Component };
          }
        }) || [];

      // 所有路由
      const allRoutes: RouteObject[] = [
        { path: '/login', Component: sdk.components.getComponent('Login') },
        { path: '/', element: <Navigate to="/dashboard" replace /> },
        {
          path: '/',
          Component: sdk.components.getComponent('Layout'), // 使用懒加载会导致 Root 组件渲染多次
          children: subRoutes,
          errorElement: <>找不到页面</>,
        },
        { path: '*', Component: sdk.components.getComponent('NotFound') },
      ];

      // 注册微应用
      registerMicroApps(microApps, {
        beforeLoad: [
          async (app) => {
            console.log(
              '[LifeCycle] before load %c%s',
              'color: green;',
              app.name,
            );
          },
        ],
        beforeMount: [
          async (app) => {
            console.log(
              '[LifeCycle] before mount %c%s',
              'color: green;',
              app.name,
            );
          },
        ],
        afterUnmount: [
          async (app) => {
            console.log(
              '[LifeCycle] after unmount %c%s',
              'color: green;',
              app.name,
            );
          },
        ],
      });

      // 启动 qiankun
      start({ sandbox: { experimentalStyleIsolation: true } });

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
