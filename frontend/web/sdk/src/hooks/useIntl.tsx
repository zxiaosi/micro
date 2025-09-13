import { sdk } from '@/core';
import clone from 'lodash/clone';
import { useMemo } from 'react';
import { useStore } from 'zustand';

/**
 * React Intl universal
 * - 如果项目不使用 React Compiler, 可以直接使用 sdk.i18n.intl
 * - 默认应该在根组件去监听 locale, 然后传给 IntlProvider, 但是 IntlProvider 不能有多个
 * - 直接返回 sdk.i18n.intl 会被 React Compiler 优化, 导致组件不刷新, 使用 sdk.store.intl 代替
 */
const useIntl = () => {
  const locale = useStore(sdk.store, (state) => state.locale);
  const intl = useMemo(() => clone(sdk.i18n.intl), [locale]);
  return intl;
};

export { useIntl };
