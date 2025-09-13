import { Plugin } from '@/types';
import { createStore } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { createLocaleSlice, LocaleStoreProps } from './createLocale';
import { createThemeSlice, ThemeStoreProps } from './createTheme';

interface StoreProps extends LocaleStoreProps, ThemeStoreProps {
  /** 子应用加载状态 */
  microAppState: boolean;
  /** 设置子应用加载状态 */
  setMicroAppState: (state: boolean) => void;
}

type StoreResult = ReturnType<typeof initStore>;

/** 初始化 Store */
const initStore = () =>
  createStore<StoreProps>()(
    subscribeWithSelector((set, get, api) => ({
      ...createLocaleSlice(set, get, api),
      ...createThemeSlice(set, get, api),

      microAppState: false,
      setMicroAppState: (microAppState) => set(() => ({ microAppState })),
    })),
  );

/** 插件名称 */
const pluginName = 'store';

/**
 * 全局状态管理 插件
 * - 详情参考 {@link StoreProps} {@link StoreResult}
 * - 此插件不会合并属性
 * @example const setTheme = useStore(sdk.store, (state) => state.setTheme)
 * @example const { theme, setTheme } = useStore(sdk.store, useShallow((state) => { theme: state.theme, setTheme: state.setTheme }))
 * @example const [theme, setTheme] = useStore(sdk.store, useShallow((state) => [state.theme, state.setTheme]))
 * @example sdk.store?.getState()?.setTheme('light')
 * @example sdk.store.subscribe((state) => state.theme, (theme) => { console.log('theme', theme) }, { fireImmediately: true }) // fireImmediately 立即变更
 */
const StorePlugin: Plugin<'store'> = {
  name: pluginName,
  install(sdk, options = {}) {
    sdk[pluginName] = initStore() satisfies StoreResult;
  },
};

export { StorePlugin, StoreProps, StoreResult };
