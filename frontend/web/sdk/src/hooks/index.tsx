import { RootProvider, useRoot } from './useRoot';

export interface HooksProps {
  /** 根组件 hook */
  useRoot: typeof useRoot;
}

export default {
  useRoot,
  RootProvider,
};
