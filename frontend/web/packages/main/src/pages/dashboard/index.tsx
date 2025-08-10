import sdk from '@zxiaosi/sdk';
import { DatePicker } from 'antd';
import './index.less';
/** 首页 */
const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <h4>我是主应用 main</h4>
      <button
        onClick={() => {
          sdk.client.navigate?.('/user');
        }}
      >
        跳转到 user 子应用
      </button>

      <div style={{ marginTop: 20 }}>
        <DatePicker />
      </div>
    </div>
  );
};

export default Dashboard;
