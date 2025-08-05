import { SdkResult } from '@/global';
import { RootProvider, useRoot } from './useRoot';

interface Props {
  /** 根组件 hook */
  useRoot?: typeof useRoot;
  /** 根组件 provider */
  RootProvider?: typeof RootProvider;
}

interface Result extends Required<Readonly<Props>> {}

const createHooks = (sdk: SdkResult, opt: Props = {}): Result => {
  return {
    useRoot,

    RootProvider,
  };
};

export { createHooks, Props as HooksProps, Result as HooksResult };
