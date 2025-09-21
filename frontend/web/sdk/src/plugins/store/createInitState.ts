import { sdk } from '@/core';
import { UserInfo } from '@/types';
import { StateCreator } from 'zustand';

interface InitStateStoreProps {
  /** 初始变量 */
  initState: UserInfo;
  /** 设置初始变量 */
  setInitState: (initState: UserInfo) => void;
}

/** 初始变量切片 */
const createInitStateSlice: StateCreator<InitStateStoreProps> = (set, get) => ({
  initState: {},
  setInitState: (initState) => {
    set(() => ({ initState }));
    sdk.app = { ...sdk.app, ...initState };
  },
});

export { createInitStateSlice, InitStateStoreProps };
