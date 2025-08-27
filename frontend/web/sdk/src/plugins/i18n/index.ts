// 按需引入
import merge from 'lodash/merge';

import { Plugin } from '@/types';

interface Props {
  /**
   * React Intl 配置的语言包
   * @example
   * {
   *  'zh-CN': {
   *    test: '测试国际化'
   *  },
   *  'en-US': {
   *    test: 'Test Intl'
   *  }
   * }
   */
  intlConfig?: Record<string, any>;
  /**
   * 加载 Antd 语言包
   * @param locale 语言包名
   * @example
   * import enUS from 'antd/es/locale/en_US';
   * import zhCN from 'antd/es/locale/zh_CN';
   * import dayjs from 'dayjs';
   * import 'dayjs/locale/en';
   * import 'dayjs/locale/zh';
   *
   * const loadLocale = (locale: string) => {
   *   switch (locale) {
   *     case 'en-US':
   *       dayjs.locale('en');
   *       return enUS;
   *     case 'zh-CN':
   *       dayjs.locale('zh');
   *       return zhCN;
   *     default:
   *       return undefined;
   *   }
   * }
   */
  loadLocale?: (locale: string) => any;
}

interface Result extends Required<Readonly<Props>> {}

/** 插件名称 */
const pluginName = 'i18n';

/**
 * 国际化 插件
 * - 集成 React Intl 和 Antd 国际化
 * - 需要从外部引入语言包, 详见 intlConfig 和 loadLocale 配置项
 */
const I18nPlugin: Plugin<'i18n'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // 默认插件配置
    const defaultOptions = {
      intlConfig: {
        'zh-CN': {
          test: '测试国际化',
        },
        'en-US': {
          test: 'Test Intl',
        },
      },
      loadLocale: (locale: string) => undefined,
    } satisfies Result;

    sdk[pluginName] = merge({}, defaultOptions, options);
  },
};

export { I18nPlugin, Props as I18nProps, Result as I18nResult };
