// 使用按需加载的方式引入 lodash
import merge from 'lodash/merge';

import { LocaleProps, SdkResult, ThemeProps } from '@/global';
import { ConfigProviderProps, theme as antdTheme } from 'antd';
import { createStore as createStoreZustand } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/zh';

interface Props {}

type Result = ReturnType<typeof createStore>;

interface GlobalStoreProps {
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
}

/**
 * 全局 Store
 * @description 不要多次创建！！！
 * @param sdk sdk 实例
 * @param options 配置项
 * @example const setTheme = useStore(globalStore, (state) => state.setTheme)
 * @example const { theme, setTheme } = useStore(globalStore, useShallow((state) => { theme: state.theme, setTheme: state.setTheme }))
 * @example const [theme, setTheme] = useStore(globalStore, useShallow((state) => [state.theme, state.setTheme]))
 * @example globalStore?.getState()?.setTheme('light')
 * @example globalStore.subscribe((state) => state.theme, (theme) => { console.log('theme', theme) }, { fireImmediately: true }) // fireImmediately 立即变更
 */
const createStore = (sdk: SdkResult, opt: Props = {}) => {
  return createStoreZustand<GlobalStoreProps>()(
    subscribeWithSelector((set, get) => ({
      theme: 'light',
      setTheme: (theme) => {
        set(() => ({ theme })); // 自动合并其他
        sdk.register({ app: { theme } }); // 注入属性

        // 设置Antd配置
        const algorithm =
          theme === 'light'
            ? antdTheme.defaultAlgorithm
            : antdTheme.darkAlgorithm;
        get().setAntdConfig({ theme: { algorithm } });

        // 设置属性
        document.documentElement.setAttribute('theme', theme);
        localStorage.setItem('theme', theme);
      },

      locale: 'zh-CN',
      setLocale: (locale) => {
        set(() => ({ locale })); // 自动合并其他
        sdk.register({ app: { locale } }); // 注入属性

        // 语言前缀
        const localePrefix = locale.split('-')[0] || 'zh';
        dayjs.locale(localePrefix);

        // 语言包
        let localeData = locale === 'en-US' ? enUS : zhCN;
        get().setAntdConfig({ locale: localeData });

        // 设置属性
        localStorage.setItem('locale', locale);
      },

      antdConfig: {},
      setAntdConfig: (antdConfig) => {
        set((state) => {
          const newAntdConfig = merge({}, state.antdConfig, antdConfig); // 合并并创建新的 antdConfig 对象
          return { ...state, antdConfig: newAntdConfig };
        });

        sdk.register({ app: { antdConfig } }); // 注入属性
      },
    })),
  );
};

export { Props as StoreProps, Result as StoreResult, createStore };
