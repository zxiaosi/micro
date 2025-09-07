import { Space } from 'antd';
import { memo } from 'react';
import HeaderFullScreen from './HeaderFullScreen';
import HeaderLocale from './HeaderLocale';
import HeaderTheme from './HeaderTheme';
import HeaderUser from './HeaderUser';
import './index.less';

/** Layout的操作功能列表，不同的 layout 会放到不同的位置 */
const CustomActions = (props) => {
  if (props.isMobile) return [];

  if (typeof window === 'undefined') return [];

  return (
    <Space>
      <HeaderTheme key="theme" />

      <HeaderLocale key="locale" />

      <HeaderFullScreen key="fullscreen" />

      <HeaderUser key="user" />
    </Space>
  );
};

export default memo(CustomActions);
