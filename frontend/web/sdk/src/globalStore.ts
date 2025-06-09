import { createStore, StoreApi } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

/** 变量类型 */
interface InitialStateProps {
  name?: string;
  [key: string]: any;
}

/** 全局变量类型 */
interface GlobalStoreProps {
  /** 初始化变量 */
  initialState: InitialStateProps;
  /**
   * 设置初始化变量
   * @param initialState 初始化变量(自定合并)
   * @param replace 是否替换(关闭自动合并)
   */
  setInitialState: (initialState: InitialStateProps, replace?: boolean) => void;
}

/** zustand Write 类型 */
type Write<T, U> = Omit<T, keyof U> & U;

/** zustand subscribeWithSelector 类型 */
type StoreSubscribeWithSelector<T> = {
  subscribe: {
    (
      listener: (selectedState: T, previousSelectedState: T) => void,
    ): () => void;
    <U>(
      selector: (state: T) => U,
      listener: (selectedState: U, previousSelectedState: U) => void,
      options?: {
        equalityFn?: (a: U, b: U) => boolean;
        fireImmediately?: boolean;
      },
    ): () => void;
  };
};

/** 定义 window 变量类型 */
declare global {
  interface Window {
    __ZUSTAND_STORE__: Write<
      StoreApi<GlobalStoreProps>,
      StoreSubscribeWithSelector<GlobalStoreProps>
    >;
  }
}

/** 创建 zustand store */
const store = createStore<GlobalStoreProps>()(
  subscribeWithSelector((set) => ({
    initialState: {},
    setInitialState: (newInitialState, replace = false) =>
      set((state) => ({
        initialState: {
          ...(!replace ? state.initialState : {}),
          ...newInitialState,
        },
      })),
  })),
);

if (!window.__ZUSTAND_STORE__) {
  /** 定义 window 变量 */
  Object.defineProperty(window, '__ZUSTAND_STORE__', {
    value: store,
    writable: false, // 禁止修改
    configurable: false, // 禁止删除
  });
}

/** 导出全局状态 */
const globalStore = window.__ZUSTAND_STORE__;

export { globalStore };
