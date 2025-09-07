import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { sdk } from '@zxiaosi/sdk';
import { Segmented } from 'antd';
import { memo } from 'react';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';
import './index.less';

/** Header - 主题切换 */
const HeaderTheme = () => {
  const [theme, setTheme] = useStore(
    sdk.store,
    useShallow((state) => [state.theme, state.setTheme]),
  );

  /** 主题切换事件 */
  const handleThemeChange = (key: any) => {
    setTheme?.(key);
  };

  return (
    <Segmented
      shape="round"
      value={theme}
      onChange={handleThemeChange}
      options={[
        { value: 'light', icon: <SunOutlined /> },
        { value: 'dark', icon: <MoonOutlined /> },
      ]}
    />
  );
};

export default memo(HeaderTheme);
