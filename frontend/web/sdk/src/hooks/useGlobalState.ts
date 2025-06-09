import { create, type StoreApi, type UseBoundStore } from 'zustand';
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
    __ZUSTAND_STORE__: UseBoundStore<
      Write<
        StoreApi<GlobalStoreProps>,
        StoreSubscribeWithSelector<GlobalStoreProps>
      >
    >;
  }
}

/** 创建全局状态 */
const useGlobalStore = create<GlobalStoreProps>()(
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

/** 定义 window 变量 */
Object.defineProperty(window, '__ZUSTAND_STORE__', {
  value: useGlobalStore,
  writable: false, // 禁止修改
  configurable: false, // 禁止删除
});

/** 从主应用获取 zustand store */
const globalStore = window.__ZUSTAND_STORE__;

export { globalStore, useGlobalStore };
