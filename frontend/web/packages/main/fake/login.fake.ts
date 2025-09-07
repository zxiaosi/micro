import { defineFakeRoute } from 'vite-plugin-fake-server/client';

export default defineFakeRoute([
  {
    url: '/login',
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
]);
