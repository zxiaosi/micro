// 按需引入
import merge from 'lodash/merge';

import { Plugin, SdkProps } from '@/types';
import { MicroStateProvider, useMicroState } from './useMicroState';
import { RootProvider, useRoot } from './useRoot';

interface Props {
  /** 根组件 hook */
  useRoot?: typeof useRoot;
  /** 根组件 provider */
  RootProvider?: typeof RootProvider;
  /** 子应用状态 hook */
  useMicroState?: typeof useMicroState;
  /** 子应用状态 provider */
  MicroStateProvider?: typeof MicroStateProvider;
}

interface Result extends Required<Readonly<Props>> {}

/** 插件名称 */
const pluginName = 'hooks';

/** Hooks 插件 */
const HooksPlugin: Plugin<'hooks'> = {
  name: pluginName,
  install(sdk: SdkProps, options: Props = {}) {
    // 默认插件配置
    const defaultOptions = {
      useRoot,
      RootProvider,

      useMicroState,
      MicroStateProvider,
    } satisfies Result;

    sdk.instance[pluginName] = merge({}, defaultOptions, options);
  },
};

export { HooksPlugin, Props as HooksProps, Result as HooksResult };
