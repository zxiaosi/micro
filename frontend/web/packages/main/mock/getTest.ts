import mockjs from 'mockjs';
import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/test',
    method: 'get',
    timeout: 3 * 1000, // 模拟延时
    response: ({ query }) => {
      return {
        code: 200,
        data: mockjs.mock('@datetime'),
        msg: 'success',
      };
    },
  },
] as MockMethod[];
