import sdk from '@zxiaosi/sdk';
import { Alert, Button, Card, DatePicker, Pagination, Space } from 'antd';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';
import './index.less';
/** 首页 */
const Dashboard = () => {
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
    setLocale?.(locale === 'zh_CN' ? 'en_US' : 'zh_CN');
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-title">我是主应用 main</div>

      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Card title="测试 Token 变量">
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Alert message="品牌色" type="info" />
            <Alert message="成功色" type="success" />
            <Alert message="警戒色" type="warning" />
            <Alert message="错误色" type="error" />
          </Space>
        </Card>

        <Card title="测试 国际化">
          <Space>
            <DatePicker />
            <Pagination defaultCurrent={1} total={50} showSizeChanger />
          </Space>
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
      </Space>
    </div>
  );
};

export default Dashboard;
