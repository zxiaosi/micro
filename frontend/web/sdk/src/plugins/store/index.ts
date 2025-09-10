// 按需引入
import merge from 'lodash/merge';

import { LocaleProps, Plugin, SdkResult, ThemeProps } from '@/types';
import { theme as antdTheme, ConfigProviderProps } from 'antd';
import { createStore } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface StoreProps {
  /** 主题 */
  theme: ThemeProps;
  /** 设置主题 */
  setTheme: (theme: ThemeProps) => void;
  /** 国际化 */
  locale: LocaleProps;
  /** 设置国际化 */
  setLocale: (locale: LocaleProps) => void;
  /** Antd配置 */
  antdConfig: ConfigProviderProps;
  /** 设置Antd配置 */
  setAntdConfig: (antdConfig: ConfigProviderProps) => void;
  /** 子应用加载状态 */
  microAppState: boolean;
  /** 设置子应用加载状态 */
  setMicroAppState: (state: boolean) => void;
}

type StoreResult = ReturnType<typeof initStore>;

/** 初始化 Store */
const initStore = (sdk: SdkResult) =>
  createStore<StoreProps>()(
    subscribeWithSelector((set, get) => ({
      theme: null,
      setTheme: (theme) => {
        set(() => ({ theme })); // 自动合并其他
        sdk.config.theme = theme; // 记录值

        // 设置属性
        document.documentElement.setAttribute('theme', theme);
        localStorage.setItem('theme', theme);

        // 设置Antd配置
        const algorithm =
          theme === 'light'
            ? antdTheme.defaultAlgorithm
            : antdTheme.darkAlgorithm;
        get().setAntdConfig({ theme: { algorithm } });
      },

      locale: null,
      setLocale: (locale) => {
        set(() => ({ locale })); // 自动合并其他
        sdk.config.locale = locale; // 记录值

        // 设置属性
        localStorage.setItem('locale', locale);

        try {
          const localeData = sdk.i18n.loadLocale?.(locale);
          if (!localeData) return;
          get().setAntdConfig({ locale: localeData });
        } catch (e) {
          throw new Error('loadLocale -- 加载语言包失败', e);
        }
      },

      antdConfig: null,
      setAntdConfig: (antdConfig) => {
        set((state) => {
          const newAntdConfig = merge({}, state.antdConfig, antdConfig); // 合并并创建新的 antdConfig 对象
          return { ...state, antdConfig: newAntdConfig };
        });

        sdk.config.antdConfig = antdConfig; // 记录值
      },

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
    sdk[pluginName] = initStore(sdk) satisfies StoreResult;
  },
};

export { StorePlugin, StoreProps, StoreResult };
