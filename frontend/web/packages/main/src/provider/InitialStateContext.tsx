import {
  InitialStateContext,
  type GlobalStateProps,
} from '@/hooks/useInitialState';
import { initGlobalState, type MicroAppStateActions } from 'qiankun';
import { useEffect, useRef, useState } from 'react';

/** 全局变量Provide */
export const InitialStateProvide = ({ children }: { children: any }) => {
  const actionsRef = useRef<Partial<MicroAppStateActions>>({});

  const [value, setValue] = useState<GlobalStateProps>({ name: 'qiankun' });

  useEffect(() => {
    actionsRef.current = initGlobalState(value); // 主应用

    actionsRef.current?.onGlobalStateChange?.(
      (state: GlobalStateProps, prev: GlobalStateProps) => {
        setValue(state);
      },
    );

    return () => {
      actionsRef.current?.offGlobalStateChange?.();
    };
  }, []);

  /** 设置全局 state 事件 */
  const handleSetGlobalState = (state: any) => {
    actionsRef.current?.setGlobalState?.(state);
  };

  console.log('globalState-main', value);

  return (
    <InitialStateContext
      value={{ globalState: value, setGlobalState: handleSetGlobalState }}
    >
      {children}
    </InitialStateContext>
  );
};
