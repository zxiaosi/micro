import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  GlobalOutlined,
  MoonOutlined,
  SunOutlined,
} from '@ant-design/icons';
import sdk from '@zxiaosi/sdk';
import { useFullscreen } from 'ahooks';
import { Segmented, Space } from 'antd';
import { useEffect, useRef } from 'react';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

/** Layout的操作功能列表，不同的 layout 会放到不同的位置 */
const CustomActions = (props) => {
  const fullscreenRef = useRef(document.documentElement);
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(fullscreenRef);

  const { initialState, setInitialState } = useStore(
    sdk.store,
    useShallow((state) => ({
      initialState: state.initialState,
      setInitialState: state.setInitialState,
    })),
  );

  /** 主题切换事件 */
  const handleThemeChange = (key: any) => {
    setInitialState({ theme: key });
  };

  /** 全屏切换事件 */
  const handleFullscreenChange = () => {
    toggleFullscreen();
    setInitialState({ isFullscreen, toggleFullscreen });
  };

  useEffect(() => {
    // 0. 默认
    let newTheme = 'light' as any;

    // 1. 外部设置
    if (sdk.app.theme) newTheme = sdk.app.theme;
    // 2. 系统主题
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const systemTheme = media.matches ? 'dark' : 'light';
    if (media.matches) newTheme = systemTheme;
    // 3. 从缓存获取
    const localTheme = localStorage.getItem('theme');
    if (localTheme) newTheme = localTheme;

    setInitialState({ theme: newTheme });
  }, []);

  useEffect(() => {
    const scribe = sdk.store.subscribe(
      (state) => state.initialState.theme,
      (theme: any) => {
        window.top?.document.documentElement.setAttribute('theme', theme);
        localStorage.setItem('theme', theme);
      },
    );

    return () => {
      scribe?.(); // 取消订阅
    };
  }, []);

  if (props.isMobile) return [];

  if (typeof window === 'undefined') return [];

  return (
    <Space size={'middle'}>
      <Segmented
        key="theme"
        shape="round"
        value={initialState.theme}
        onChange={handleThemeChange}
        options={[
          { value: 'light', icon: <SunOutlined /> },
          { value: 'dark', icon: <MoonOutlined /> },
        ]}
      />
      <GlobalOutlined key="GlobalOutlined" />
      <span key={'fullscreen'} onClick={handleFullscreenChange}>
        {isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
      </span>
    </Space>
  );
};

export default CustomActions;
