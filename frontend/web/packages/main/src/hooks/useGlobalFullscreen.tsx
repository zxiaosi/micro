import { useFullscreen } from 'ahooks';
import { createContext, useContext, useRef } from 'react';

interface Props {
  /** 全屏状态 */
  isFullscreen?: boolean;
  /** 退出全屏状态 */
  exitFullscreen?: () => void;
  /** 进入全屏状态 */
  enterFullscreen?: () => void;
  /** 全屏状态切换 */
  toggleFullscreen?: () => void;
}

/** 全屏状态 context */
const GlobalFullscreen = createContext<Props>({});

/** 全屏状态 provider */
const GlobalFullscreenProvider = ({ children }: any) => {
  const fullscreenRef = useRef(document.documentElement);

  const [isFullscreen, { toggleFullscreen, enterFullscreen, exitFullscreen }] =
    useFullscreen(fullscreenRef);

  return (
    <GlobalFullscreen.Provider
      value={{
        isFullscreen,
        enterFullscreen,
        exitFullscreen,
        toggleFullscreen,
      }}
    >
      {children}
    </GlobalFullscreen.Provider>
  );
};

/** 全屏状态 hooks */
const useGlobalFullscreen = () => useContext(GlobalFullscreen);

export { GlobalFullscreenProvider, useGlobalFullscreen };
