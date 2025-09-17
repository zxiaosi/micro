import { sdk } from '@/core';
import { LocaleProps } from '@/types';
import intl from 'react-intl-universal';
import { StateCreator } from 'zustand';

interface LocaleStoreProps {
  /** 国际化 */
  locale: LocaleProps;
  /** 设置国际化 */
  setLocale: (locale: LocaleProps) => void;
}

/** 国际化状态切片 */
const createLocaleSlice: StateCreator<LocaleStoreProps> = (set, get) => ({
  locale: null,

  setLocale: (locale) => {
    set(() => ({ locale })); // 自动合并其他

    // 记录值
    sdk.config.locale = locale;
    localStorage.setItem(sdk.config.localeName, locale);

    // 设置作用域
    document.documentElement.setAttribute('data-lang', locale);

    // 设置 React Intl Universal 语言包
    const intlConfig = sdk.i18n.intlConfig;
    intl.init({ currentLocale: locale, locales: intlConfig });

    // 加载 Antd 语言包
    try {
      const localeData = sdk.i18n.loadLocale?.(locale) || undefined;
      sdk.config.antdConfig.locale = localeData;
    } catch (e) {
      console.error('Load antd locale error:', e);
    }
  },
});

export { createLocaleSlice, LocaleStoreProps };
