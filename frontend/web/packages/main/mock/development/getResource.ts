import { MockMethod } from 'vite-plugin-mock';

const resources = [
  {
    key: '1',
    title: '一级菜单 1',
    children: [
      {
        key: '1-1',
        title: '二级菜单 1-1',
        children: [
          {
            key: '1-1-1',
            title: '三级菜单 1-1-1',
          },
          {
            key: '1-1-2',
            title: '三级菜单 1-1-2',
          },
          {
            key: '1-1-3',
            title: '三级菜单 1-1-3',
          },
          {
            key: '1-1-4',
            title: '三级菜单 1-1-4',
          },
          {
            key: '1-1-5',
            title: '三级菜单 1-1-5',
          },
        ],
      },
      {
        key: '1-2',
        title: '二级菜单 1-2',
        children: [
          {
            key: '1-2-1',
            title: '三级菜单 1-2-1',
          },
          {
            key: '1-2-2',
            title: '三级菜单 1-2-2',
          },
        ],
      },
      {
        key: '1-3',
        title: '二级菜单 1-3',
        children: [
          {
            key: '1-3-1',
            title: '三级菜单 1-3-1',
          },
          {
            key: '1-3-2',
            title: '三级菜单 1-3-2',
          },
        ],
      },
    ],
  },
  {
    key: '2',
    title: '一级菜单 2',
    children: [
      {
        key: '2-1',
        title: '二级菜单 2-1',
        children: [
          {
            key: '2-1-1',
            title: '三级菜单 2-1-1',
          },
          {
            key: '2-1-2',
            title: '三级菜单 2-1-2',
          },
        ],
      },
      {
        key: '2-2',
        title: '二级菜单 2-2',
      },
    ],
  },
  {
    key: '3',
    title: '一级菜单 3',
  },
];

export default [
  {
    url: '/api/getResources',
    method: 'get',
    timeout: 1000, // 模拟延时
    response: ({ query }) => {
      return { code: 200, data: resources, msg: 'success' };
    },
  },
] as MockMethod[];
