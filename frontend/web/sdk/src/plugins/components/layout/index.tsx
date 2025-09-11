// 按需引入
import set from 'lodash/set';

import sdk from '@/core';
import { ProLayout } from '@ant-design/pro-layout';
import { memo, Suspense, useState } from 'react';
import { Outlet, useLocation, useMatches, useNavigate } from 'react-router-dom';
import { useStore } from 'zustand';
/** 布局组件 */
const BaseLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const matches = useMatches();

  const locale = useStore(sdk.store, (state) => state.locale);

  const [isAuth, setIsAuth] = useState(false);

  /** 菜单点击事件 */
  const handleMenuClick = (item: any) => {
    navigate(item.path);
  };

  /** 菜单头点击事件 */
  const handleMenuHeaderClick = () => {
    navigate('/');
  };

  /** 页面切换事件 */
  const handlePageChange = (location) => {
    // 使用 set 防止赋值报错
    set(sdk, 'client', { location, matches, navigate });

    const pathName = location.pathname;

    // 是否有认证
    const token = localStorage.getItem(sdk.config.tokenName);
    if (!token) return sdk.app.pageToLogin();

    // 是否有权限
    setIsAuth(sdk.app.permissions.includes(pathName));
  };

  return (
    <ProLayout
      locale={locale}
      formatMessage={sdk.i18n.intl.formatMessage}
      location={location}
      menuItemRender={(item, dom) => (
        <div onClick={() => handleMenuClick(item)}>{dom}</div>
      )}
      onMenuHeaderClick={handleMenuHeaderClick}
      onPageChange={handlePageChange}
      {...sdk.config.proLayoutConfig}
      menu={{
        request: async () => sdk.app.menuData || [],
        ...sdk.config.proLayoutConfig.menu,
      }}
    >
      <Suspense fallback={<>Loading...</>}>
        {isAuth ? <Outlet /> : <>无权限</>}
      </Suspense>
    </ProLayout>
  );
};

export default memo(BaseLayout);
