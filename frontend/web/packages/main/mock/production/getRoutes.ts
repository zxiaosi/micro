const routes = [
  {
    name: '首页',
    path: '/dashboard',
    component: 'Dashboard',
    icon: 'DashboardOutlined',
    hideInMenu: false,
  },
  {
    name: '拓扑图模块',
    path: '/flow/*',
    component: 'Microapp',
    icon: 'NodeIndexOutlined',
    hideInMenu: false,
    routeAttr:
      '{"name": "flow", "entry": "/subapp/sub-flow/", "activeRule": "/flow", "rootId": "sub-app"}',
  },
  {
    name: '系统模块',
    path: '/system',
    component: 'Outlet',
    icon: 'SettingOutlined',
    hideInMenu: false,
    children: [
      {
        name: '用户管理',
        path: '/system/user',
        component: 'User',
        icon: 'UserOutlined',
        hideInMenu: false,
        routeAttr:
          '{"name": "system", "entry": "/subapp/sub-system/", "activeRule": "/system", "rootId": "sub-app"}',
      },
      {
        name: '角色管理',
        path: '/system/role',
        component: 'Role',
        icon: 'DeploymentUnitOutlined',
        hideInMenu: false,
        routeAttr:
          '{"name": "system", "entry": "/subapp/sub-system/", "activeRule": "/system", "rootId": "sub-app"}',
      },
      {
        name: '资源管理',
        path: '/system/resource',
        component: 'Resource',
        icon: 'FundViewOutlined',
        hideInMenu: false,
        routeAttr:
          '{"name": "system", "entry": "/subapp/sub-system/", "activeRule": "/system", "rootId": "sub-app"}',
      },
    ],
  },
];

export default { code: 200, data: routes, msg: 'success' };

// export default [
//   {
//     url: '/api/getRoutes',
//     method: 'get',
//     response: ({ query }) => {
//       return { code: 200, data: routes, msg: 'success' };
//     },
//   },
// ] as MockMethod[];
