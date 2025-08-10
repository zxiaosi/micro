// 使用按需加载的方式引入 lodash
import merge from 'lodash/merge';

import { SdkResult } from '@/global';
import { AntdConfigProvider, useAntdConfig } from './useAntdConfig';
import { LocaleProvider, useLocale } from './useLocale';
import { MicroStateProvider, useMicroState } from './useMicroState';
import { RootProvider, useRoot } from './useRoot';
import { ThemeProvider, useTheme } from './useTheme';

interface Props {
  /** 根组件 hook */
  useRoot?: typeof useRoot;
  /** 根组件 provider */
  RootProvider?: typeof RootProvider;
  /** 子应用状态 hook */
  useMicroState?: typeof useMicroState;
  /** 子应用状态 provider */
  MicroStateProvider?: typeof MicroStateProvider;
  /** 主题状态 */
  useTheme?: typeof useTheme;
  /** 主题状态 provider */
  ThemeProvider?: typeof ThemeProvider;
  /** 国际化状态 */
  useLocale?: typeof useLocale;
  /** 国际化状态 provider */
  LocaleProvider?: typeof LocaleProvider;
  /** Antd配置 */
  useAntdConfig?: typeof useAntdConfig;
  /** Antd配置 provider */
  AntdConfigProvider?: typeof AntdConfigProvider;
}

interface Result extends Required<Readonly<Props>> {}

const createHooks = (sdk: SdkResult, opt: Props = {}): Result => {
  // 返回结果
  const result: Result = {
    useRoot,
    RootProvider,

    useMicroState,
    MicroStateProvider,

    useTheme,
    ThemeProvider,

    useLocale,
    LocaleProvider,

    useAntdConfig,
    AntdConfigProvider,
  };

  // 合并属性
  return merge(result, sdk.hooks, opt);
};

export { createHooks, Props as HooksProps, Result as HooksResult };
