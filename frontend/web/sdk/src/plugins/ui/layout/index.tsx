import { sdk } from '@/core';
import { ProLayout } from '@ant-design/pro-layout';
import { memo, Suspense, useEffect, useState } from 'react';
import { Outlet, useLocation, useMatches, useNavigate } from 'react-router-dom';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

/** 布局组件 */
const BaseLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const matches = useMatches();

  const [locale, initState] = useStore(
    sdk.store,
    useShallow((state) => [state.locale, state.initState]),
  );

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
    sdk.client.location = location;

    const pathName = location.pathname;

    // 是否有用户信息
    if (!initState.user) return sdk.app.pageToLogin();

    // 是否有权限
    setIsAuth(sdk.app.permissions.includes(pathName));
  };

  useEffect(() => {
    sdk.client.navigate = navigate;
  }, []);

  useEffect(() => {
    sdk.client.matches = matches;
  }, [matches]);

  return (
    <ProLayout
      locale={locale}
      formatMessage={({ id, defaultMessage }) =>
        sdk.i18n.intl.get(id).d(defaultMessage)
      }
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
