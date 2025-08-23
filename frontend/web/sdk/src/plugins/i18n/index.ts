// 按需引入
import merge from 'lodash/merge';

import { Plugin, SdkProps } from '@/types';

type KeyValue = Record<string, string>;

// 提取具体的 messages 类型
interface Props {
  'zh-CN'?: KeyValue;
  'en-US'?: KeyValue;
}

interface Result extends Required<Readonly<Props>> {}

/** 插件名称 */
const pluginName = 'i18n';

/** 国际化 插件 */
const I18nPlugin: Plugin<'i18n'> = {
  name: pluginName,
  install(sdk: SdkProps, options: Props = {}) {
    // 默认插件配置
    const defaultOptions = {
      'zh-CN': {
        test: '测试国际化',
      },
      'en-US': {
        test: 'Test Intl',
      },
    } satisfies Result;

    sdk.instance[pluginName] = merge({}, defaultOptions, options);
  },
};

export { I18nPlugin, Props as I18nProps, Result as I18nResult };
