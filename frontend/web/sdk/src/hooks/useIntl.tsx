import { sdk } from '@/core';
import { clone } from 'es-toolkit';
import { useMemo } from 'react';
import { useStore } from 'zustand';

/**
 * React Intl Universal
 * - 如果项目不使用 React Compiler, 可以直接使用 sdk.i18n.intl
 * - 不要解构使用, const { get } = useIntl() 会报错
 * @example const intl = useIntl(); intl.get(key).d(defaultValue)
 */
const useIntl = () => {
  const locale = useStore(sdk.store, (state) => state.locale);
  const intl = useMemo(() => clone(sdk.i18n.intl), [locale]);
  return intl;
};

export { useIntl };
