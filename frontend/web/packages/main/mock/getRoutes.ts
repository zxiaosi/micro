import { MockMethod } from 'vite-plugin-mock';

const handleRoutesData = (isDev = true) => {
  const flowEntry = isDev ? 'http://localhost:8001' : '/subapp/sub-flow/';
  const systemEntry = isDev ? 'http://localhost:8002' : '/subapp/sub-system/';

  return [
    {
      name: '首页',
      path: '/dashboard',
      component: 'Dashboard',
      icon: 'DashboardOutlined',
      locale: 'menu.home',
      hideInMenu: false,
    },
    {
      name: '拓扑图模块',
      path: '/flow',
      component: 'Microapp',
      icon: 'NodeIndexOutlined',
      locale: 'menu.flow',
      hideInMenu: false,
      routeAttr: `{"name": "flow", "entry": "${flowEntry}", "activeRule": "/flow", "rootId": "sub-app"}`,
      children: [
        {
          name: '拓扑图模块详情',
          path: '/flow/detail',
          component: 'Microapp',
          icon: 'NodeIndexOutlined',
          locale: 'menu.flow.detail',
          hideInMenu: true,
          routeAttr: `{"name": "flow", "entry": "${flowEntry}", "activeRule": "/flow", "rootId": "sub-app"}`,
        },
      ],
    },
    {
      name: '系统模块',
      path: '/',
      component: 'Outlet',
      icon: 'SettingOutlined',
      locale: 'menu.system',
      hideInMenu: false,
      children: [
        {
          name: '用户管理',
          path: '/system/user',
          component: 'Microapp',
          icon: 'UserOutlined',
          locale: 'menu.system.user',
          hideInMenu: false,
          routeAttr: `{"name": "system", "entry": "${systemEntry}", "activeRule": "/system", "rootId": "sub-app"}`,
        },
        {
          name: '角色管理',
          path: '/system/role',
          component: 'Microapp',
          icon: 'DeploymentUnitOutlined',
          hideInMenu: false,
          locale: 'menu.system.role',
          routeAttr: `{"name": "system", "entry": "${systemEntry}", "activeRule": "/system", "rootId": "sub-app"}`,
        },
        {
          name: '资源管理',
          path: '/system/resource',
          component: 'Microapp',
          icon: 'FundViewOutlined',
          locale: 'menu.system.resource',
          hideInMenu: false,
          routeAttr: `{"name": "system", "entry": "${systemEntry}", "activeRule": "/system", "rootId": "sub-app"}`,
        },
      ],
    },
  ];
};

export default [
  {
    url: '/api/getRoutes',
    method: 'get',
    timeout: 1000, // 模拟延时
    response: ({ query, headers }) => {
      if (!headers.authorization) {
        return { code: 200401, data: null, msg: '请先登录' };
      } else {
        const routes = handleRoutesData(query['isDev'] === 'true');
        return { code: 0, data: routes, msg: 'success' };
      }
    },
  },
] as MockMethod[];
