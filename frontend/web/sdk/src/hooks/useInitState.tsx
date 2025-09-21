import { sdk } from '@/core';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

/** 初始化变量 */
const useInitState = () => {
  const [initState, setInitState] = useStore(
    sdk.store,
    useShallow((state) => [state.initState, state.setInitState]),
  );

  return { initState, setInitState };
};

export { useInitState };
