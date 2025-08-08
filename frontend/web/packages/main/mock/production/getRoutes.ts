const routes = [
  {
    name: '首页',
    path: '/dashboard',
    component: 'Dashboard',
    icon: 'DashboardOutlined',
    hidden: false,
  },
  {
    name: '测试页',
    path: '/user',
    component: 'Microapp',
    icon: 'ControlOutlined',
    hidden: false,
    routeAttr:
      '{"name": "user", "entry": "/subapp/sub-user/", "activeRule": "/user", "rootId": "sub-app"}',
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
