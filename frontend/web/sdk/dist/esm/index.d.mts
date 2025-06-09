import { StoreApi, UseBoundStore } from "zustand";

//#region src/hooks/useGlobalState.d.ts
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
    (listener: (selectedState: T, previousSelectedState: T) => void): () => void;
    <U>(selector: (state: T) => U, listener: (selectedState: U, previousSelectedState: U) => void, options?: {
      equalityFn?: (a: U, b: U) => boolean;
      fireImmediately?: boolean;
    }): () => void;
  };
};
/** 定义 window 变量类型 */
declare global {
  interface Window {
    __ZUSTAND_STORE__: UseBoundStore<Write<StoreApi<GlobalStoreProps>, StoreSubscribeWithSelector<GlobalStoreProps>>>;
  }
}
/** 创建全局状态 */
declare const useGlobalStore: UseBoundStore<Omit<StoreApi<GlobalStoreProps>, "subscribe"> & {
  subscribe: {
    (listener: (selectedState: GlobalStoreProps, previousSelectedState: GlobalStoreProps) => void): () => void;
    <U>(selector: (state: GlobalStoreProps) => U, listener: (selectedState: U, previousSelectedState: U) => void, options?: {
      equalityFn?: (a: U, b: U) => boolean;
      fireImmediately?: boolean;
    }): () => void;
  };
}>;
/** 从主应用获取 zustand store */
declare const globalStore: UseBoundStore<Write<StoreApi<GlobalStoreProps>, StoreSubscribeWithSelector<GlobalStoreProps>>>;
//#endregion
export { globalStore, useGlobalStore };
//# sourceMappingURL=index.d.mts.map