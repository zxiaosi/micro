import { SdkResult } from '@/global';
import { getDefaultLocaleUtil, getDefaultThemeUtil } from '@/utils';
import { createContext, useContext, useEffect } from 'react';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

interface Props {
  /** sdk */
  sdk: SdkResult;
  /** 子组件 */
  children: React.ReactNode;
}

/** 根组件上下文 */
const RootConext = createContext<SdkResult>(null);

/** 根组件 Provider */
export const RootProvider = ({ sdk, children }: Props) => {
  const [setTheme, setLocale, setAntdConfig] = useStore(
    sdk.store,
    useShallow((state) => [
      state.setTheme,
      state.setLocale,
      state.setAntdConfig,
    ]),
  );

  useEffect(() => {
    const deafultTheme = getDefaultThemeUtil(sdk);
    setTheme(deafultTheme);

    const deafultLocale = getDefaultLocaleUtil(sdk);
    setLocale(deafultLocale);

    setAntdConfig(sdk.app.antdConfig);

    return () => {
      sdk.unmount();
    };
  }, []);

  return <RootConext.Provider value={sdk}>{children}</RootConext.Provider>;
};

/** 根组件 hook */
export const useRoot = () => useContext(RootConext);
