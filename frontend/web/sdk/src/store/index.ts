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

export type GlobalStore = Write<
  StoreApi<GlobalStoreProps>,
  StoreSubscribeWithSelector<GlobalStoreProps>
>;

/**
 * @name 全局状态
 * @example const { initialState } = useStore(globalStore, (state)=> state.initialState)
 * @example globalStore?.getState()?.setInitialState({})
 * @example globalStore.subscribe((state) => state.initialState, (initialState) => { console.log('initialState', initialState) }, { fireImmediately: true })
 */
const globalStore = createStore<GlobalStoreProps>()(
  subscribeWithSelector((set) => ({
    initialState: {
      temp: '123',
    },
    setInitialState: (newInitialState, replace = false) =>
      set((state) => ({
        initialState: {
          ...(!replace ? state.initialState : {}),
          ...newInitialState,
        },
      })),
  })),
);

export default globalStore;
