import { createContext, useContext, useEffect, useState } from 'react';
import { useRoot } from './useRoot';

interface Props {
  /** 加载状态 */
  microAppState: boolean;
  /** 设置加载状态 */
  setMicroAppState: (microAppState: boolean) => void;
}

/** 子应用状态上下文 */
const MicroStateConext = createContext<Props>(null);

/** 子应用状态 Provider */
export const MicroStateProvider = ({ children }) => {
  const sdk = useRoot();

  const [microAppState, setMicroAppState] = useState(false);

  useEffect(() => {
    // 注入属性
    sdk.register({ router: { microAppState } });
  }, [microAppState]);

  return (
    <MicroStateConext.Provider value={{ microAppState, setMicroAppState }}>
      {children}
    </MicroStateConext.Provider>
  );
};

/** 子应用状态 hook */
export const useMicroState = () => useContext(MicroStateConext);
