import { Crumb, sdk, useIntl } from '@zxiaosi/sdk';
import { Alert, Button, Card, DatePicker, Space } from 'antd';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';
import Chart from './chart';
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

  const intl = useIntl();

  /** 更新主题 */
  const handleChangeTheme = () => {
    setTheme?.(theme === 'light' ? 'dark' : 'light');
  };

  /** 更新语言包 */
  const handleChangeLocale = () => {
    setLocale?.(locale === 'zh-CN' ? 'en-US' : 'zh-CN');
  };

  return (
    <div className="dashboard">
      <Space direction="vertical" style={{ display: 'flex' }}>
        <Crumb />

        <Card title="CSS 变量、Token 变量">
          <Space wrap>
            <div style={{ color: 'var(--primary)' }}>CSS 变量</div>
            <Alert message="品牌色" type="info" />
            <Alert message="成功色" type="success" />
            <Alert message="警戒色" type="warning" />
            <Alert message="错误色" type="error" />
          </Space>
        </Card>

        <Card title="全局样式、样式隔离">
          <Space wrap>
            <div className="global-style">全局样式</div>
            <div className="postcss-prefix-selector">样式隔离</div>
          </Space>
        </Card>

        <Card title="Antd 语言包、React Intl 国际化">
          <Space>
            <DatePicker />
            {intl.get('hello')}
          </Space>
        </Card>

        <Card title="全局状态管理">
          <Space wrap>
            <Button type="dashed" danger onClick={handleChangeTheme}>
              更新主题
            </Button>

            <Button type="dashed" danger onClick={handleChangeLocale}>
              更新语言包
            </Button>
          </Space>
        </Card>

        <Card title="图表">
          <Chart />
        </Card>
      </Space>
    </div>
  );
};

export default Dashboard;
