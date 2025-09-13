// 按需引入
import merge from 'lodash/merge';

import { sdk } from '@/core';
import { ConfigProvider, ConfigProviderProps } from 'antd';
import React, { useMemo } from 'react';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

/**
 * Antd 配置
 * - 填充了 theme 和 locale 属性
 * - 详情参考: https://ant.design/components/config-provider-cn
 */
const AntdConfigProvider: React.FC<ConfigProviderProps> = (props) => {
  const { children } = props;

  const [locale, theme] = useStore(
    sdk.store,
    useShallow((state) => [state.locale, state.theme]),
  );

  const config = useMemo(() => {
    const antdConfig = sdk.config.antdConfig;
    return merge({}, antdConfig, props);
  }, [locale, theme]);

  return <ConfigProvider {...config}>{children}</ConfigProvider>;
};

export { AntdConfigProvider };
