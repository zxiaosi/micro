import { useGlobalFullscreen } from '@/hooks/useGlobalFullscreen';
import { CompressOutlined, ExpandOutlined } from '@ant-design/icons';
import { memo } from 'react';
import './index.less';

/** Header - 全屏 */
const HeaderFullscreen = () => {
  const { isFullscreen, toggleFullscreen } = useGlobalFullscreen();

  return (
    <span className="header-fullscreen" onClick={toggleFullscreen}>
      {isFullscreen ? <CompressOutlined /> : <ExpandOutlined />}
    </span>
  );
};

export default memo(HeaderFullscreen);
