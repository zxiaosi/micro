import { GlobalOutlined } from '@ant-design/icons';
import { sdk } from '@zxiaosi/sdk';
import { Dropdown } from 'antd';
import { memo } from 'react';
import { useStore } from 'zustand';
import './index.less';

/** Header - 国际化 */
const HeaderLocale = () => {
  const setLocale = useStore(sdk.store, (state) => state.setLocale);

  /** 语言切换事件 */
  const handleMenuClick = ({ key }: any) => {
    setLocale?.(key);
  };

  return (
    <Dropdown
      menu={{
        items: [
          { key: 'zh-CN', label: '中文' },
          { key: 'en-US', label: '英文' },
        ],
        onClick: handleMenuClick,
      }}
      placement="bottom"
      arrow={true}
    >
      <div className="header-locale">
        <GlobalOutlined />
      </div>
    </Dropdown>
  );
};

export default memo(HeaderLocale);
