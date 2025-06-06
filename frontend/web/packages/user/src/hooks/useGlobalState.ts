import { type StoreApi, type UseBoundStore } from 'zustand';

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

/** 从主应用获取 zustand store */
const globalStore = window.__ZUSTAND_STORE__;

export default globalStore;
