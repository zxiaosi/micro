import { MockMethod } from 'vite-plugin-mock';

const chartZh = {
  key: 'chart',
  name: '堆叠区域图',
  list: [
    {
      groupKey: 'direct',
      groupName: '直接访问',
      source: [
        { name: '周一', value: 120, label: '', unit: '' },
        { name: '周二', value: 132, label: '', unit: '' },
        { name: '周三', value: 101, label: '', unit: '' },
        { name: '周四', value: 134, label: '', unit: '' },
        { name: '周五', value: 90, label: '', unit: '' },
        { name: '周六', value: 230, label: '', unit: '' },
        { name: '周日', value: 210, label: '', unit: '' },
      ],
    },
    {
      groupKey: 'email',
      groupName: '邮件营销',
      source: [
        { name: '周一', value: 220, label: '', unit: '' },
        { name: '周二', value: 182, label: '', unit: '' },
        { name: '周三', value: 191, label: '', unit: '' },
        { name: '周四', value: 234, label: '', unit: '' },
        { name: '周五', value: 290, label: '', unit: '' },
        { name: '周六', value: 330, label: '', unit: '' },
        { name: '周日', value: 310, label: '', unit: '' },
      ],
    },
    {
      groupKey: 'advertising',
      groupName: '视频广告',
      source: [
        { name: '周一', value: 150, label: '', unit: '' },
        { name: '周二', value: 232, label: '', unit: '' },
        { name: '周三', value: 201, label: '', unit: '' },
        { name: '周四', value: 154, label: '', unit: '' },
        { name: '周五', value: 190, label: '', unit: '' },
        { name: '周六', value: 330, label: '', unit: '' },
        { name: '周日', value: 410, label: '', unit: '' },
      ],
    },
  ],
};

const chartEn = {
  key: 'chart',
  name: 'Stacked area chart',
  list: [
    {
      groupKey: 'direct',
      groupName: 'Direct',
      source: [
        { name: 'Monday', value: 120, label: '', unit: '' },
        { name: 'Tuesday', value: 132, label: '', unit: '' },
        { name: 'Wednesday', value: 101, label: '', unit: '' },
        { name: 'Thursday', value: 134, label: '', unit: '' },
        { name: 'Friday', value: 90, label: '', unit: '' },
        { name: 'Saturday', value: 230, label: '', unit: '' },
        { name: 'Sunday', value: 210, label: '', unit: '' },
      ],
    },
    {
      groupKey: 'email',
      groupName: 'Email',
      source: [
        { name: 'Monday', value: 220, label: '', unit: '' },
        { name: 'Tuesday', value: 182, label: '', unit: '' },
        { name: 'Wednesday', value: 191, label: '', unit: '' },
        { name: 'Thursday', value: 234, label: '', unit: '' },
        { name: 'Friday', value: 290, label: '', unit: '' },
        { name: 'Saturday', value: 330, label: '', unit: '' },
        { name: 'Sunday', value: 310, label: '', unit: '' },
      ],
    },
    {
      groupKey: 'advertising',
      groupName: 'Advertising',
      source: [
        { name: 'Monday', value: 150, label: '', unit: '' },
        { name: 'Tuesday', value: 232, label: '', unit: '' },
        { name: 'Wednesday', value: 201, label: '', unit: '' },
        { name: 'Thursday', value: 154, label: '', unit: '' },
        { name: 'Friday', value: 193, label: '', unit: '' },
        { name: 'Saturday', value: 330, label: '', unit: '' },
        { name: 'Sunday', value: 410, label: '', unit: '' },
      ],
    },
  ],
};

export default [
  {
    url: '/api/chart',
    method: 'get',
    timeout: 1000, // 模拟延时
    response: ({ query, headers }) => {
      if (!headers.authorization) {
        return { code: 200401, data: null, msg: '请先登录' };
      } else {
        console.log('headers', headers['lang']);
        const chart = headers['lang'] === 'zh-CN' ? chartZh : chartEn;
        return { code: 0, data: chart, msg: 'success' };
      }
    },
  },
] as MockMethod[];
