import { MockMethod } from 'vite-plugin-mock';

const routes = [
  {
    name: '首页',
    path: '/dashboard',
    component: 'Dashboard',
    icon: 'DashboardOutlined',
    hidden: false,
  },
  {
    name: '系统模块',
    path: '/user',
    component: 'Microapp',
    icon: 'ControlOutlined',
    hidden: false,
    children: [
      {
        name: '用户管理',
        path: '/dashboard',
        component: 'Dashboard',
        icon: 'DashboardOutlined',
        hidden: false,
        routeAttr:
          '{"name": "user", "entry": "http://localhost:8001", "activeRule": "/user", "rootId": "sub-app"}',
      },
    ],
  },
  {
    name: '拓扑图模块',
    path: '/flow',
    component: 'Microapp',
    icon: 'BranchesOutlined',
    hidden: false,
    routeAttr:
      '{"name": "user", "entry": "http://localhost:8001", "activeRule": "/user", "rootId": "sub-app"}',
  },
];

export default [
  {
    url: '/api/getRoutes',
    method: 'get',
    timeout: 1000, // 模拟延时
    response: ({ query }) => {
      return { code: 200, data: routes, msg: 'success' };
    },
  },
] as MockMethod[];
