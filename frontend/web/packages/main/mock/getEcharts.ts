import { MockMethod } from 'vite-plugin-mock';

const chart = [
  {
    name: '邮件营销',
    type: 'line',
    stack: '总量',
    areaStyle: {},
    data: [120, 132, 101, 134, 90, 230, 210],
  },
  {
    name: '联盟广告',
    type: 'line',
    stack: '总量',
    areaStyle: {},
    data: [220, 182, 191, 234, 290, 330, 310],
  },
  {
    name: '视频广告',
    type: 'line',
    stack: '总量',
    areaStyle: {},
    data: [150, 232, 201, 154, 190, 330, 410],
  },
];

export default [
  {
    url: '/api/chart',
    method: 'get',
    timeout: 1000, // 模拟延时
    response: ({ query, headers }) => {
      if (!headers.authorization) {
        return { code: 200401, data: null, msg: '请先登录' };
      } else {
        return { code: 0, data: chart, msg: 'success' };
      }
    },
  },
] as MockMethod[];
