import { LocaleProps } from '@/global';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRoot } from './useRoot';

interface Props {
  /** 国际化 */
  locale: LocaleProps;
  /** 设置国际化 */
  setLocale: (locale: LocaleProps) => void;
}

/** 获取默认值 */
const getDefaultValue = (sdk): LocaleProps => {
  // localStorage > sdk中主题 > 浏览器语言 > 默认

  // 1. localStorage
  const localLocale = localStorage.getItem('locale') as LocaleProps;
  if (localLocale) return localLocale;

  // 2. sdk中主题
  const sdkLocale = sdk.app.locale;
  if (sdkLocale) return sdkLocale;

  // 3. 浏览器语言
  const browserLocale = navigator.language.replace('-', '_') as LocaleProps;
  if (browserLocale) return browserLocale;

  // 4. 默认
  return 'zh_CN';
};

/** 国际化上下文 */
const LocaleConext = createContext<Props>(null);

/** 国际化 Provider */
const LocaleProvider = ({ children }: any) => {
  const sdk = useRoot();

  const defaultLocale = getDefaultValue(sdk);

  const [locale, setLocale] = useState<LocaleProps>(defaultLocale);

  useEffect(() => {
    if (!locale) return;
    // 注入属性
    sdk.register({ app: { locale } });
    localStorage.setItem('locale', locale);
  }, [locale]);

  return (
    <LocaleConext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleConext.Provider>
  );
};

/** 国际化 hook */
const useLocale = () => useContext(LocaleConext);

export { LocaleProvider, useLocale };
