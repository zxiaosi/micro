import sdk from '@/core';
import { replacePathUtil } from '@/utils';
import { ProLayout } from '@ant-design/pro-layout';
import { memo, Suspense } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from 'zustand';
/** 布局组件 */
const BaseLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const locale = useStore(sdk.store, (state) => state.locale);

  /** 菜单点击事件 */
  const handleMenuClick = (item: any) => {
    navigate(item.path);
  };

  /** 菜单头点击事件 */
  const handleMenuHeaderClick = () => {
    navigate('/');
  };

  return (
    <ProLayout
      {...sdk.app.proLayoutConfig}
      location={{ pathname: location.pathname }}
      menu={{
        request: async () => {
          return replacePathUtil(sdk.app.menuData) || [];
        },
      }}
      menuItemRender={(item, dom) => (
        <div onClick={() => handleMenuClick(item)}>{dom}</div>
      )}
      onMenuHeaderClick={handleMenuHeaderClick}
      locale={locale}
      formatMessage={sdk.i18n.intl.formatMessage}
    >
      <Suspense>
        <Outlet />
      </Suspense>
    </ProLayout>
  );
};

export default memo(BaseLayout);
