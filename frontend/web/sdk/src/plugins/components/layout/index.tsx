import sdk from '@/core';
import { replacePathUtil } from '@/utils';
import { ProLayout } from '@ant-design/pro-components';
import { memo, Suspense, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
/** 首页 */
const BaseLayout = () => {
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
    sdk.register({ app: { navigate, location } });
  }, [location]);

  return (
    <ProLayout
      {...sdk.layout}
      location={{ pathname: location.pathname }}
      menu={{
        request: async () => {
          return replacePathUtil(sdk.router.menuData) || [];
        },
      }}
      menuItemRender={(item, dom) => (
        <div onClick={() => handleMenuClick(item)}>{dom}</div>
      )}
      onMenuHeaderClick={handleMenuHeaderClick}
    >
      <Suspense>
        <Outlet />
      </Suspense>
    </ProLayout>
  );
};

export default memo(BaseLayout);
