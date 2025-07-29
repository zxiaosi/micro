import { SdkProps } from '@/global';
import { createContext, useContext } from 'react';

/** 根组件上下文 */
const RootConext = createContext<SdkProps>(null);

/** 根组件 Provider */
export const RootProvider = ({ sdk, children }) => {
  return <RootConext.Provider value={sdk}>{children}</RootConext.Provider>;
};

/** 根组件 hook */
export const useRoot = () => useContext(RootConext);
