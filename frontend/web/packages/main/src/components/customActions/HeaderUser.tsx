import { UserOutlined } from '@ant-design/icons';
import { sdk } from '@zxiaosi/sdk';
import { Dropdown } from 'antd';
import { memo } from 'react';
import './index.less';

/** Header - 用户 */
const HeaderUser = () => {
  /** 菜单点击事件 */
  const handleMenuClick = ({ key }: any) => {
    switch (key) {
      case 'logout':
        sdk.app = {
          ...sdk.app,
          menuData: [],
          settings: {},
          roles: [],
          permissions: [],
          user: {},
        };
        localStorage.removeItem('token'); // 清除本地存储
        sdk.client.navigate('/login'); // 跳转登录页
        break;
      default:
        break;
    }
  };

  return (
    <Dropdown
      menu={{
        items: [{ key: 'logout', label: '退出登录' }],
        onClick: handleMenuClick,
      }}
      placement="bottom"
      arrow={true}
    >
      <div className="header-user">
        <UserOutlined />
        {sdk.app.user?.nickName}
      </div>
    </Dropdown>
  );
};

export default memo(HeaderUser);
