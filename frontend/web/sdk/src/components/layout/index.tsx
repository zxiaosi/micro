import { useRoot } from '@/hooks/useRoot';
import {
  ExpandOutlined,
  GlobalOutlined,
  MoonOutlined,
  SunOutlined,
} from '@ant-design/icons';
import { ProConfigProvider, ProLayout } from '@ant-design/pro-components';
import { Segmented } from 'antd';
import { memo, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';
import './index.css';
/** 首页 */
const BaseLayout = () => {
  const sdk = useRoot();

  const navigate = useNavigate();
  const location = useLocation();

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

  /** 菜单点击事件 */
  const handleMenuClick = (item: any) => {
    navigate(item.path);
  };

  /** 菜单头点击事件 */
  const handleMenuHeaderClick = () => {
    navigate('/');
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
    // 注入父组件的 navigate 方法到 SDK
    sdk.register({ client: { navigate, location } });
  }, [location]);

  useEffect(() => {
    const theme = initialState.theme;
    if (!theme) return;

    window.top.document.documentElement.setAttribute('theme', theme);
    localStorage.setItem('theme', theme);
  }, [initialState.theme]);

  console.log('initialState', initialState);

  return (
    <ProConfigProvider dark={initialState?.theme === 'dark'}>
      <ProLayout
        actionsRender={(props) => {
          return [
            <Segmented
              size="small"
              shape="round"
              value={initialState?.theme}
              onChange={handleThemeChange}
              options={[
                { value: 'light', icon: <SunOutlined /> },
                { value: 'dark', icon: <MoonOutlined /> },
              ]}
            />,
            <GlobalOutlined key="GlobalOutlined" />,
            <ExpandOutlined key="ExpandOutlined" />,
          ];
        }}
        {...sdk.ui}
        location={{ pathname: location.pathname }}
        menu={{
          request: async () => {
            return sdk.router.menuData || [];
          },
        }}
        menuItemRender={(item, dom) => (
          <div onClick={() => handleMenuClick(item)}>{dom}</div>
        )}
        onMenuHeaderClick={handleMenuHeaderClick}
      >
        <Outlet />
      </ProLayout>
    </ProConfigProvider>
  );
};

export default memo(BaseLayout);
