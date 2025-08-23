import { useGlobalFullscreen } from '@/hooks/useGlobalFullscreen';
import {
  CompressOutlined,
  ExpandOutlined,
  GlobalOutlined,
  MoonOutlined,
  SunOutlined,
} from '@ant-design/icons';
import { sdk } from '@zxiaosi/sdk';
import { Dropdown, Segmented, Space } from 'antd';
import { memo } from 'react';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';
import './index.less';

/** Layout的操作功能列表，不同的 layout 会放到不同的位置 */
const CustomActions = (props) => {
  const [theme, setTheme, setLocale] = useStore(
    sdk.instance.store,
    useShallow((state) => [state.theme, state.setTheme, state.setLocale]),
  );

  const { isFullscreen, toggleFullscreen } = useGlobalFullscreen();

  /** 主题切换事件 */
  const handleThemeChange = (key: any) => {
    setTheme?.(key);
  };

  /** 语言切换事件 */
  const handleLocaleChange = ({ key }: any) => {
    setLocale?.(key);
  };

  /** 全屏切换事件 */
  const handleFullscreenChange = () => {
    toggleFullscreen?.();
  };

  if (props.isMobile) return [];

  if (typeof window === 'undefined') return [];

  return (
    <Space>
      <Segmented
        key="theme"
        shape="round"
        value={theme}
        onChange={handleThemeChange}
        options={[
          { value: 'light', icon: <SunOutlined /> },
          { value: 'dark', icon: <MoonOutlined /> },
        ]}
      />
      <Dropdown
        key={'i18n'}
        menu={{
          items: [
            { key: 'zh-CN', label: '中文' },
            { key: 'en-US', label: '英文' },
          ],
          onClick: handleLocaleChange,
        }}
        placement="bottom"
        arrow={true}
      >
        <div className="custom-actions-i18n">
          <GlobalOutlined />
        </div>
      </Dropdown>
      <span
        key={'fullscreen'}
        className="custom-actions-fullscreen"
        onClick={handleFullscreenChange}
      >
        {isFullscreen ? <CompressOutlined /> : <ExpandOutlined />}
      </span>
    </Space>
  );
};

export default memo(CustomActions);
