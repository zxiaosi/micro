// 使用按需加载的方式引入 lodash
import merge from 'lodash/merge';

import { SdkResult } from '@/global';
import { ProLayoutProps } from '@ant-design/pro-components';

interface Props extends ProLayoutProps {}

interface Result extends Partial<Props> {}

/** ProLayout 配置项 */
const createUI = (sdk: SdkResult, opt: Props | any = {}): Result => {
  // 返回结果
  const result: Result = {
    title: 'Demo',
  };

  // 合并属性
  return merge(result, sdk.ui, opt);
};

export { createUI, Props as UIProps, Result as UIResult };
