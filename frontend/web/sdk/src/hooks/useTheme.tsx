import { createContext, useContext, useState } from 'react';

interface Props {
  theme: string;
  setTheme: (theme: string) => void;
}

/** 主题上下文 */
const ThemeConext = createContext<Props>(null);

/** 主题 Provider */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeConext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeConext.Provider>
  );
};

/** 主题 hook */
export const useTheme = () => useContext(ThemeConext);
