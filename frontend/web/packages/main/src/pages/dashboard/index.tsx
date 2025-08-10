import sdk from '@zxiaosi/sdk';
import { Button, DatePicker, Space } from 'antd';
import './index.less';
/** 首页 */
const Dashboard = () => {
  /** 点击事件 */
  const handleClick = () => {
    sdk.client.navigate?.('/detail');
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-title">我是主应用 main</div>

      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <div className="dashboard-page-test">测试 css 变量</div>

        <Button type="primary" onClick={handleClick}></Button>

        <div style={{ marginTop: 20 }}>
          <DatePicker />
        </div>
      </Space>
    </div>
  );
};

export default Dashboard;
