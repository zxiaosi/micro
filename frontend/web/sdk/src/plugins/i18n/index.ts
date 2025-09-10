// 按需引入
import merge from 'lodash/merge';

import { Plugin } from '@/types';
import { createIntlCache, IntlCache, IntlShape } from 'react-intl';

interface I18nProps {
  /** intl 缓存 */
  cache?: IntlCache;
  /**
   * intl 实例
   * - 如果项目不使用 React Compiler, 可以直接使用 sdk.i18n.intl
   * - 默认应该在根组件去监听 locale, 然后传给 IntlProvider, 但是 IntlProvider 不能有多个
   * - 直接返回 sdk.i18n.intl 会被 React Compiler 优化, 导致组件不刷新, 使用 sdk.store.intl 代替
   */
  intl?: IntlShape;
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

interface I18nResult extends Required<I18nProps> {}

/** 插件名称 */
const pluginName = 'i18n';

/**
 * 国际化 插件
 * - 详情参考 {@link I18nProps} {@link I18nResult}
 * - 集成 React Intl 和 Antd 国际化
 * - 需要从外部引入语言包, 详见 intlConfig 和 loadLocale 配置项
 */
const I18nPlugin: Plugin<'i18n'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // 默认插件配置
    const defaultOptions = {
      cache: createIntlCache(),
      intl: null,
      intlConfig: {
        'zh-CN': {
          test: '测试国际化',
        },
        'en-US': {
          test: 'Test Intl',
        },
      },
      loadLocale: (locale: string) => undefined,
    } satisfies I18nResult;

    sdk[pluginName] = merge({}, defaultOptions, options);
  },
};

export { I18nPlugin, I18nProps, I18nResult };
