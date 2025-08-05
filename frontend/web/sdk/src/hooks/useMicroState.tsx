import { createContext, useContext, useState } from 'react';

interface Props {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

/** 子应用状态上下文 */
const MicroStateConext = createContext<Props>(null);

/** 子应用状态 Provider */
export const MicroStateProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <MicroStateConext.Provider value={{ loading, setLoading }}>
      {children}
    </MicroStateConext.Provider>
  );
};

/** 子应用状态 hook */
export const useMicroState = () => useContext(MicroStateConext);
