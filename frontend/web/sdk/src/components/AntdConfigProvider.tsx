// 按需引入
import merge from 'lodash/merge';

import { sdk } from '@/core';
import { theme as antdTheme, ConfigProvider, ConfigProviderProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

const { defaultAlgorithm, darkAlgorithm } = antdTheme;

/**
 * Antd 配置
 * - 填充了 theme 和 locale 属性
 * - 详情参考: https://ant.design/components/config-provider-cn
 */
const AntdConfigProvider: React.FC<ConfigProviderProps> = (props) => {
  const { children } = props;

  const [theme, locale] = useStore(
    sdk.store,
    useShallow((state) => [state.theme, state.locale]),
  );

  const [config, setConfig] = useState<ConfigProviderProps>(
    sdk.config.antdConfig,
  );

  useEffect(() => {
    if (!theme) return;

    const oldConfig = sdk.config.antdConfig;

    const algorithm = theme === 'light' ? defaultAlgorithm : darkAlgorithm;
    const newConfig = merge({}, oldConfig, { theme: { algorithm } });
    setConfig(() => newConfig);

    sdk.config.antdConfig = newConfig;
  }, [theme]);

  useEffect(() => {
    if (!locale) return;

    try {
      const oldConfig = sdk.config.antdConfig;

      const localeData = sdk.i18n.loadLocale?.(locale) || undefined;
      const newConfig = merge({}, oldConfig, { locale: localeData });
      setConfig(() => newConfig);

      sdk.config.antdConfig = newConfig;
    } catch (e) {
      throw new Error('loadLocale -- 加载语言包失败', e);
    }
  }, [locale]);

  return (
    <ConfigProvider {...config} {...props}>
      {children}
    </ConfigProvider>
  );
};

export { AntdConfigProvider };
