import sdk from '@zxiaosi/sdk';
import { Link, Outlet } from 'react-router';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';
import './index.less';
/** 首页 */
const Dashboard = () => {
  const { initialState, setInitialState } = useStore(
    sdk.store,
    useShallow((state) => ({
      initialState: state.initialState,
      setInitialState: state.setInitialState,
    })),
  );

  return (
    <div className="dashboard-page">
      <div style={{ fontSize: 24 }}>main 主应用</div>
      <div className="test-css-variable">测试css变量</div>
      <button
        onClick={() => {
          setInitialState({ age: Math.floor(Math.random() * 100) });
        }}
      >
        更新全局变量
      </button>
      <span style={{ marginLeft: 20 }}>{JSON.stringify(initialState)}</span>
      <br />
      <Link to={'/'} style={{ marginRight: 20 }}>
        回首页
      </Link>
      <Link to={'/user'} style={{ marginRight: 20 }}>
        展示子应用
      </Link>
      <Link to={'/test'} style={{ marginRight: 20 }}>
        展示子模块
      </Link>
      <Link to={'/login'}>去登录页</Link>
      <Outlet />
      {/* 子应用挂载点 */}
      <main id="sub-app" />
    </div>
  );
};

export default Dashboard;
