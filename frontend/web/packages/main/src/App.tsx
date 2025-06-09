import { globalStore } from '@zxiaosi/sdk';
import { BrowserRouter, Link } from 'react-router';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

function App() {
  const { initialState, setInitialState } = useStore(
    globalStore,
    useShallow((state) => ({
      initialState: state.initialState,
      setInitialState: state.setInitialState,
    })),
  );

  return (
    <BrowserRouter>
      <div style={{ fontSize: 24 }}>main 主应用</div>

      <button
        onClick={() => {
          setInitialState({ age: Math.floor(Math.random() * 100) });
        }}
      >
        更新全局变量
      </button>
      <span style={{ marginLeft: 20 }}>{JSON.stringify(initialState)}</span>

      <br />
      <br />

      <Link to={'user'} style={{ marginRight: 20 }}>
        展示子应用
      </Link>
      <Link to={''}>回到主应用</Link>
      <main id="sub-app" />
    </BrowserRouter>
  );
}

export default App;
