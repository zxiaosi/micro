import { BrowserRouter, Link } from 'react-router';
import { useInitialState } from './hooks/useInitialState';
import { InitialStateProvide } from './provider/InitialStateContext';

function App() {
  const { globalState, setGlobalState } = useInitialState();
  return (
    <BrowserRouter>
      <h2>main 主应用</h2>

      <button
        onClick={() =>
          setGlobalState({ name: 'main', age: Math.floor(Math.random() * 100) })
        }
      >
        更新全局变量
      </button>
      <span style={{ marginLeft: 20 }}>{JSON.stringify(globalState)}</span>

      <br />
      <br />

      <Link to={'user'}>展示子应用</Link>
      <main id="sub-app" />
    </BrowserRouter>
  );
}

function AppProvider() {
  return (
    <InitialStateProvide>
      <App />
    </InitialStateProvide>
  );
}

export default AppProvider;
