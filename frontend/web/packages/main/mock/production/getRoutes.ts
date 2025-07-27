import { MockMethod } from 'vite-plugin-mock';

const routes = [
  {
    path: '/dashboard',
    component: 'Dashboard',
    meta: {
      title: '首页',
      icon: 'DashboardOutlined',
    },
    hidden: false,
  },
  {
    path: '/user',
    component: 'Microapp',
    meta: {
      title: '测试页',
      icon: 'ControlOutlined',
    },
    hidden: false,
    routerAttr:
      '{"name": "user", "entry": "/user/", "activeRule": "/user", "rootId": "sub-app"}',
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
