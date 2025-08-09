import { useRoot } from '@/hooks/useRoot';
import { ProLayout } from '@ant-design/pro-components';
import { ConfigProvider, theme } from 'antd';
import { memo, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from 'zustand';
/** 首页 */
const BaseLayout = () => {
  const sdk = useRoot();

  const storeTheme = useStore(sdk.store, (state) => state.initialState.theme);

  const navigate = useNavigate();
  const location = useLocation();

  /** 菜单点击事件 */
  const handleMenuClick = (item: any) => {
    navigate(item.path);
  };

  /** 菜单头点击事件 */
  const handleMenuHeaderClick = () => {
    navigate('/');
  };

  useEffect(() => {
    // 注入父组件的 navigate 方法到 SDK
    sdk.register({ client: { navigate, location } });
  }, [location]);

  return (
    <ConfigProvider
      prefixCls="zxiaosi"
      theme={{
        algorithm:
          storeTheme === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
      }}
    >
      <ProLayout
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
    </ConfigProvider>
  );
};

export default memo(BaseLayout);
