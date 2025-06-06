import { create, type StoreApi, type UseBoundStore } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

// 适合封装成 npm 包

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
    initialState: { name: 'main' },
    setInitialState: (newInitialState, replace = false) =>
      set((state) => ({
        initialState: {
          ...(!replace ? state.initialState : {}),
          ...newInitialState,
        },
      })),
  })),
);

export default useGlobalStore;

// 暴露给子应用
window.__ZUSTAND_STORE__ = useGlobalStore;
