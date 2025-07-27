import sdk from '@zxiaosi/sdk';
import './index.less';
/** 首页 */
const Dashboard = () => {
  console.log('Dashboard component rendered');

  return (
    <div className="dashboard-page">
      <h4>我是主应用 main</h4>
      <button
        onClick={() => {
          sdk.client.navigate?.('/user', { flushSync: true });
        }}
      >
        跳转到 user 子应用
      </button>
    </div>
  );
};

export default Dashboard;
