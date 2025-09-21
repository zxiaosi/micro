import { Plugin } from '@/types';
import { createStore } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { AppStateStoreProps, createAppStateSlice } from './createAppState';
import { createInitStateSlice, InitStateStoreProps } from './createInitState';
import { createLocaleSlice, LocaleStoreProps } from './createLocale';
import { createThemeSlice, ThemeStoreProps } from './createTheme';

type StoreProps = AppStateStoreProps &
  InitStateStoreProps &
  LocaleStoreProps &
  ThemeStoreProps;

type StoreResult = typeof globalStore;

/**
 * 创建 Store
 * - 这里单独声明变量, 主要是为了使用返回类型 StoreResult 🤔
 */
const globalStore = createStore<StoreProps>()(
  subscribeWithSelector((...a) => ({
    ...createAppStateSlice(...a),
    ...createInitStateSlice(...a),
    ...createLocaleSlice(...a),
    ...createThemeSlice(...a),
  })),
);

/** 插件名称 */
const pluginName = 'store';

/**
 * 全局状态管理 插件
 * - 详情参考 {@link StoreProps} {@link StoreResult}
 * - 此插件不会合并传入属性
 * @example const setTheme = useStore(sdk.store, (state) => state.setTheme)
 * @example const { theme, setTheme } = useStore(sdk.store, useShallow((state) => { theme: state.theme, setTheme: state.setTheme }))
 * @example const [theme, setTheme] = useStore(sdk.store, useShallow((state) => [state.theme, state.setTheme]))
 * @example sdk.store?.getState()?.setTheme('light')
 * @example sdk.store.subscribe((state) => state.theme, (theme) => { console.log('theme', theme) }, { fireImmediately: true }) // fireImmediately 立即变更
 */
const StorePlugin: Plugin<'store'> = {
  name: pluginName,
  install(sdk, options = {}) {
    sdk[pluginName] = globalStore satisfies StoreResult;
  },
};

export { StorePlugin, StoreProps, StoreResult };
