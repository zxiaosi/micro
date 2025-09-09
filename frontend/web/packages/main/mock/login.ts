import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/login',
    method: 'post',
    timeout: 1000, // 模拟延时
    response: ({ query }) => {
      return {
        code: 200,
        data: {
          token: '123456',
        },
        msg: 'success',
      };
    },
  },
] as MockMethod[];
