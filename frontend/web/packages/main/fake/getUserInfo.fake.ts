import { defineFakeRoute } from 'vite-plugin-fake-server/client';

const useInfo = {
  user: {
    usename: 'admin',
    nickName: '管理员',
  },
  permissions: [
    '/dashboard',
    '/flow',
    '/flow/detail',
    '/system',
    '/system/user',
    '/system/role',
    '/system/resource',
  ],
  roles: ['admin'],
  system: {
    theme: 'light',
    locale: 'zh-CN',
  },
};

export default defineFakeRoute([
  {
    url: '/getUserInfo',
    method: 'get',
    timeout: 1000, // 模拟延时
    response: ({ query, headers }) => {
      if (!headers.authorization) {
        return { code: 401, data: null, msg: '请先登录' };
      } else {
        return { code: 200, data: useInfo, msg: 'success' };
      }
    },
  },
]);
