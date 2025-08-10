import { ThemeProps } from '@/global';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRoot } from './useRoot';

interface Props {
  /** 主题 */
  theme: ThemeProps;
  /** 设置主题 */
  setTheme: (theme: ThemeProps) => void;
}

/** 获取默认值 */
const getDefaultValue = (sdk): ThemeProps => {
  // localStorage > sdk中主题 > 系统主题 > 默认

  // 1. localStorage
  const localTheme = localStorage.getItem('theme') as ThemeProps;
  if (localTheme) return localTheme;

  // 2. sdk中主题
  const sdkTheme = sdk.app.theme;
  if (sdkTheme) return sdkTheme;

  // 3. 系统主题
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  if (media.matches) return media.matches ? 'dark' : 'light';

  // 4. 默认
  return 'light';
};

/** 主题上下文 */
const ThemeConext = createContext<Props>(null);

/** 主题 Provider */
const ThemeProvider = ({ children }: any) => {
  const sdk = useRoot();

  const defaultTheme = getDefaultValue(sdk);

  const [theme, setTheme] = useState<ThemeProps>(defaultTheme);

  useEffect(() => {
    if (!theme) return;
    // 注入属性
    sdk.register({ app: { theme } });
    document.documentElement.setAttribute('theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeConext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeConext.Provider>
  );
};

/** 主题 hook */
const useTheme = () => useContext(ThemeConext);

export { ThemeProvider, useTheme };
