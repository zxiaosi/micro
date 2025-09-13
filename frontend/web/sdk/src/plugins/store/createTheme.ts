import { sdk } from '@/core';
import { ThemeProps } from '@/types';
import { theme as antdTheme } from 'antd';
import { StateCreator } from 'zustand';

const { defaultAlgorithm, darkAlgorithm } = antdTheme;

interface ThemeStoreProps {
  /** 主题 */
  theme: ThemeProps;
  /** 设置主题 */
  setTheme: (theme: ThemeProps) => void;
}

/** 主题状态切片 */
const createThemeSlice: StateCreator<ThemeStoreProps> = (set, get) => ({
  theme: null,

  setTheme: (theme) => {
    set(() => ({ theme })); // 自动合并其他

    // 记录值
    sdk.config.theme = theme;
    localStorage.setItem(sdk.config.themeName, theme);

    // 设置作用域
    document.documentElement.setAttribute('data-theme', theme);

    // 设置Antd主题算法
    const algorithm = theme === 'light' ? defaultAlgorithm : darkAlgorithm;
    sdk.config.antdConfig.theme.algorithm = algorithm;
  },
});

export { createThemeSlice, ThemeStoreProps };
