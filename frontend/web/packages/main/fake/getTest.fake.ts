import mockjs from 'mockjs';
import { defineFakeRoute } from 'vite-plugin-fake-server/client';

export default defineFakeRoute([
  {
    url: '/test',
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
]);
