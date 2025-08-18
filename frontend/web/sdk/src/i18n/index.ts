// 使用按需加载的方式引入 lodash
import merge from 'lodash/merge';

import { SdkResult } from '@/global';

type KeyValue = Record<string, string>;

// 提取具体的 messages 类型
interface Props {
  'zh-CN'?: KeyValue;
  'en-US'?: KeyValue;
}

interface Result extends Required<Readonly<Props>> {}

/** 国际化 */
const createI18n = (sdk: SdkResult, opt: Props = {}): Result => {
  // 返回结果
  const result: Result = {
    'zh-CN': {
      test: '测试国际化',
    },
    'en-US': {
      test: 'Test Intl',
    },
  };

  // 合并属性
  return merge(result, sdk.i18n, opt);
};

export { createI18n, Props as I18nProps, Result as I18nResult };
