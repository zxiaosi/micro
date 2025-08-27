import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/zh';

const intlConfig = {
  'zh-CN': {
    hello: '你好，世界',
  },
  'en-US': {
    hello: 'Hello, World',
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
