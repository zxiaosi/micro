import { useRoot } from '@/hooks/useRoot';
import { Link, Outlet, useNavigate } from 'react-router';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';
import './index.css';
/** 首页 */
const BaseLayout = () => {
  const sdk = useRoot();

  const navigate = useNavigate();
  sdk.inject({ client: { navigate } }); // 注入父组件的 navigate 方法到 SDK

  const { initialState, setInitialState } = useStore(
    sdk.store,
    useShallow((state) => ({
      initialState: state.initialState,
      setInitialState: state.setInitialState,
    })),
  );

  return (
    <div className="base-layout">
      <div style={{ fontSize: 24 }}>布局页面 Base Layout</div>
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
        主应用
      </Link>
      <span
        onClick={() => navigate('/user', { flushSync: true })}
        style={{ marginRight: 20, cursor: 'pointer' }}
      >
        子应用
      </span>

      <Link to={'/login'}>去登录页</Link>

      <Outlet />
    </div>
  );
};

export default BaseLayout;
