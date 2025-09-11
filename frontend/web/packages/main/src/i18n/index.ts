import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/zh';

const intlConfig = {
  'zh-CN': {
    hello: '你好，世界',
    'menu.home': '首页',
    'menu.flow': '拓扑图模块',
    'menu.flow.detail': '拓扑图模块详情',
    'menu.system': '系统模块',
    'menu.system.user': '用户管理',
    'menu.system.role': '角色管理',
    'menu.system.resource': '资源管理',
  },
  'en-US': {
    hello: 'Hello, World',
    'menu.home': 'Home',
    'menu.flow': 'Flow Module',
    'menu.flow.detail': 'Flow Module Detail',
    'menu.system': 'System Module',
    'menu.system.user': 'User Management',
    'menu.system.role': 'Role Management',
    'menu.system.resource': 'Resource Management',
  },
};

const loadLocale = (locale: string) => {
  switch (locale) {
    case 'en-US':
      dayjs.locale('en');
      return enUS;
    case 'zh-CN':
      dayjs.locale('zh');
      return zhCN;
    default:
      return undefined;
  }
};

export default { intlConfig, loadLocale };
