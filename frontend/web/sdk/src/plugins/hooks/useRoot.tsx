import { SdkProps } from '@/types';
import { getDefaultLocaleUtil, getDefaultThemeUtil } from '@/utils';
import { createContext, useContext, useEffect } from 'react';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

interface Props {
  /** sdk */
  sdk: SdkProps;
  /** 子组件 */
  children: React.ReactNode;
}

/** 根组件上下文 */
const RootConext = createContext<SdkProps>(null);

/** 根组件 Provider */
export const RootProvider = ({ sdk, children }: Props) => {
  const [setTheme, setLocale, setAntdConfig] = useStore(
    sdk.instance.store,
    useShallow((state) => [
      state.setTheme,
      state.setLocale,
      state.setAntdConfig,
    ])
  );

  useEffect(() => {
    const deafultTheme = getDefaultThemeUtil(sdk);
    setTheme(deafultTheme);

    const deafultLocale = getDefaultLocaleUtil(sdk);
    setLocale(deafultLocale);

    setAntdConfig(sdk.instance.app.antdConfig);

    return () => {
      sdk.unmount();
    };
  }, []);

  return <RootConext.Provider value={sdk}>{children}</RootConext.Provider>;
};

/** 根组件 hook */
export const useRoot = () => useContext(RootConext);
