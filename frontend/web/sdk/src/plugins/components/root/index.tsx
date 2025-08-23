import sdk from '@/core';
import { getDefaultLocaleUtil, getDefaultThemeUtil } from '@/utils';
import { ConfigProvider } from 'antd';
import { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

/** 根组件 */
const Root = () => {
  const RooterProvider = sdk.app.getComponent('Router');

  const [locale, setTheme, setLocale, antdConfig, setAntdConfig] = useStore(
    sdk.store,
    useShallow((state) => [
      state.locale,
      state.setTheme,
      state.setLocale,
      state.antdConfig,
      state.setAntdConfig,
    ]),
  );

  // 设置初始值
  useEffect(() => {
    const deafultTheme = getDefaultThemeUtil(sdk);
    setTheme(deafultTheme);

    const deafultLocale = getDefaultLocaleUtil(sdk);
    setLocale(deafultLocale);

    setAntdConfig(sdk.app.antdConfig);
  }, []);

  if (!locale || !antdConfig) return <>Loading...</>;

  return (
    <IntlProvider locale={locale} messages={sdk.i18n[locale]}>
      <ConfigProvider {...antdConfig}>
        <RooterProvider />
      </ConfigProvider>
    </IntlProvider>
  );
};

export default Root;
