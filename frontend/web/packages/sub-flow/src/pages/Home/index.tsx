import { sdk } from '@zxiaosi/sdk';
import { Button, Card, DatePicker, Space } from 'antd';
import { useIntl } from 'react-intl';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';
import './index.less';

const { RangePicker } = DatePicker;

/** 首页 */
const Home = () => {
  const { formatMessage } = useIntl();

  const [theme, setTheme, locale, setLocale] = useStore(
    sdk.store,
    useShallow((state) => [
      state.theme,
      state.setTheme,
      state.locale,
      state.setLocale,
    ]),
  );

  /** 跳转 */
  const handlePageTo = (url: string) => {
    sdk.app.navigate(url);
  };

  /** 更新主题 */
  const handleUpdateTheme = () => {
    setTheme?.(theme === 'light' ? 'dark' : 'light');
  };

  /** 更新语言包 */
  const handleUpdateLocale = () => {
    setLocale?.(locale === 'zh-CN' ? 'en-US' : 'zh-CN');
  };

  return (
    <div className="home-page">
      <div className="home-page-title">子应用 Flow - 首页</div>

      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Card title="测试 弹框位置">
          <RangePicker />
        </Card>

        <Card title="测试 跳转">
          <Space>
            <Button type="primary" onClick={() => handlePageTo('/')}>
              跳转到主应用
            </Button>
            <Button type="primary" onClick={() => handlePageTo('/system/user')}>
              跳转到子应用 System
            </Button>
            <Button type="primary" onClick={() => handlePageTo('/flow/detail')}>
              跳转到详情页
            </Button>
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
            {formatMessage({ id: 'test' })}
          </Space>
        </Card>

        <Card title="测试 CSS 变量 和 样式隔离">
          <div className="test-css-variable">CSS 变量</div>
          <div className="test-style-isolation">样式隔离</div>
        </Card>
      </Space>
    </div>
  );
};

export default Home;
