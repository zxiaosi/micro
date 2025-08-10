import { theme as antdTheme, ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import { createContext, useContext, useMemo } from 'react';
import { useLocale } from './useLocale';
import { useRoot } from './useRoot';
import { useTheme } from './useTheme';

import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import 'dayjs/locale/en';
import 'dayjs/locale/zh';

interface Props {}

/** Antd配置上下文 */
const AntdConfigConext = createContext<Props>(null);

/** Antd配置 Provider */
const AntdConfigProvider = ({ children }: any) => {
  const sdk = useRoot();
  const { theme } = useTheme();
  const { locale } = useLocale();

  const algorithm = useMemo(() => {
    if (!theme) return;

    const algorithm =
      theme === 'light' ? antdTheme.defaultAlgorithm : antdTheme.darkAlgorithm;

    // 注入属性
    sdk.register({ app: { antdConfig: { theme: { algorithm } } } });

    return algorithm;
  }, [theme]);

  const antdLocale = useMemo(() => {
    if (!locale) return;

    // 语言前缀
    const localePrefix = locale.split('_')[0] || 'zh';
    dayjs.locale(localePrefix);

    switch (locale) {
      case 'zh_CN':
        return zhCN;
      case 'en_US':
        return enUS;
    }
  }, [locale]);

  return (
    <ConfigProvider
      {...sdk.app.antdConfig}
      locale={antdLocale}
      theme={{ ...sdk.app.antdConfig.theme, algorithm }}
    >
      {children}
    </ConfigProvider>
  );
};

/** Antd配置 hook */
const useAntdConfig = () => useContext(AntdConfigConext);

export { AntdConfigProvider, useAntdConfig };
