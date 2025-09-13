import { StateCreator } from 'zustand';

interface AppStateStoreProps {
  /** 子应用加载状态 */
  microAppState: boolean;
  /** 设置子应用加载状态 */
  setMicroAppState: (state: boolean) => void;
}

/** 子应用状态切片 */
const createAppStateSlice: StateCreator<AppStateStoreProps> = (set, get) => ({
  microAppState: false,
  setMicroAppState: (microAppState) => set(() => ({ microAppState })),
});

export { createAppStateSlice, AppStateStoreProps };
