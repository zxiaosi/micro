import { useRoot } from '@/hooks/useRoot';
import { useTheme } from '@/hooks/useTheme';
import { ProConfigProvider, ProLayout } from '@ant-design/pro-components';
import { memo, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './index.css';
/** 首页 */
const BaseLayout = () => {
  const sdk = useRoot();

  const { theme } = useTheme();

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
    <ProConfigProvider dark={theme === 'dark'}>
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
    </ProConfigProvider>
  );
};

export default memo(BaseLayout);
