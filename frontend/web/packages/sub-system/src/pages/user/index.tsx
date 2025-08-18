import sdk from '@zxiaosi/sdk';
import { Button, Card, DatePicker, Space } from 'antd';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';
import './index.less';

const { RangePicker } = DatePicker;

/** 用户管理页面 */
const User = () => {
  const [theme, setTheme, locale, setLocale] = useStore(
    sdk.store,
    useShallow((state) => [
      state.theme,
      state.setTheme,
      state.locale,
      state.setLocale,
    ]),
  );

  /** 更新主题 */
  const handleUpdateTheme = () => {
    setTheme?.(theme === 'light' ? 'dark' : 'light');
  };

  /** 更新语言包 */
  const handleUpdateLocale = () => {
    setLocale?.(locale === 'zh-CN' ? 'en-US' : 'zh-CN');
  };

  return (
    <div className="user-page">
      <div className="user-page-title">子应用 System - 用户管理</div>

      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Card title="测试 css 变量">
          <div className="user-page-test">啦啦啦</div>
        </Card>

        <Card title="测试 全局变量">
          <Space>
            <Button type="dashed" danger onClick={handleUpdateTheme}>
              更新主题
            </Button>
            <Button type="dashed" danger onClick={handleUpdateLocale}>
              更新语言包
            </Button>
          </Space>
        </Card>

        <Card title="测试 弹框位置">
          <RangePicker />
        </Card>
      </Space>
    </div>
  );
};

export default User;
