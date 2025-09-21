import { MockMethod } from 'vite-plugin-mock';

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
    // 后端保存的系统设置
    // theme: 'light',
    // locale: 'zh-CN',
  },
};

export default [
  {
    url: '/api/getUserInfo',
    method: 'get',
    timeout: 1000, // 模拟延时
    response: ({ query, headers }) => {
      if (!headers.authorization) {
        return { code: 200401, data: null, msg: '请先登录' };
      } else {
        return { code: 0, data: useInfo, msg: 'success' };
      }
    },
  },
] as MockMethod[];
