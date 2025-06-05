import {
  InitialStateContext,
  type GlobalStateProps,
} from '@/hooks/useInitialState';
import { useEffect, useRef, useState } from 'react';

/** 全局变量Provide */
export const InitialStateProvide = ({
  children,
  setGlobalState,
  onGlobalStateChange,
}: Partial<any> & { children: any }) => {
  const actionsRef = useRef<Partial<any>>({});

  const [value, setValue] = useState<GlobalStateProps>({});

  useEffect(() => {
    actionsRef.current = { setGlobalState, onGlobalStateChange }; // 子应用

    actionsRef.current?.onGlobalStateChange?.(
      (state: GlobalStateProps, prev: GlobalStateProps) => {
        setValue(state);
      },
      true, // 这里要立即触发一次, 否则获取不到最新的全局变量
    );

    return () => {
      actionsRef.current?.offGlobalStateChange?.();
    };
  }, [setGlobalState]);

  /** 设置全局 state 事件 */
  const handleSetGlobalState = (state: any) => {
    actionsRef.current?.setGlobalState?.(state);
  };

  console.log('globalState-user', value);

  return (
    <InitialStateContext
      value={{ globalState: value, setGlobalState: handleSetGlobalState }}
    >
      {children}
    </InitialStateContext>
  );
};
