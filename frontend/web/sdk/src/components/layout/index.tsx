import { useRoot } from '@/hooks/useRoot';
import { ProLayout } from '@ant-design/pro-components';
import { memo, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
/** 首页 */
const BaseLayout = () => {
  const sdk = useRoot();

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
  );
};

export default memo(BaseLayout);
