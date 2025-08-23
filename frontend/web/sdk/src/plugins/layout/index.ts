// 按需引入
import merge from 'lodash/merge';

import { Plugin, SdkProps } from '@/types';
import { ProLayoutProps } from '@ant-design/pro-components';

interface Props extends ProLayoutProps {}

interface Result extends Readonly<Props> {}

/** 插件名称 */
const pluginName = 'layout';

/** 布局 插件 */
const LayoutPlugin: Plugin<'layout'> = {
  name: pluginName,
  install(sdk, options = {}) {
    // 默认插件配置
    const defaultOptions = {
      title: 'Demo',
    } satisfies Result;

    sdk[pluginName] = merge({}, defaultOptions, options);
  },
};

export { LayoutPlugin, Props as LayoutProps, Result as LayoutResult };
