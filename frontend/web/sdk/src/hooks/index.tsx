import { SdkResult } from '@/global';
import { MicroStateProvider, useMicroState } from './useMicroState';
import { RootProvider, useRoot } from './useRoot';

interface Props {
  /** 根组件 hook */
  useRoot?: typeof useRoot;
  /** 根组件 provider */
  RootProvider?: typeof RootProvider;
  /** 子应用状态 hook */
  useMicroState?: typeof useMicroState;
  /** 子应用状态 provider */
  MicroStateProvider?: typeof MicroStateProvider;
}

interface Result extends Required<Readonly<Props>> {}

const createHooks = (sdk: SdkResult, opt: Props = {}): Result => {
  return {
    useRoot,
    RootProvider,

    useMicroState,
    MicroStateProvider,
  };
};

export { createHooks, Props as HooksProps, Result as HooksResult };
