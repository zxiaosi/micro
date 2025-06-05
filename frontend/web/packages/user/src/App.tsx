import { useInitialState } from './hooks/useInitialState';
import { InitialStateProvide } from './provider/InitialStateContext';

function App() {
  const { globalState, setGlobalState } = useInitialState();
  return (
    <>
      <h2>user 子应用</h2>
      {/* 只能更新已经存在的变量 https://qiankun.umijs.org/zh/api#initglobalstatestate */}
      <button onClick={() => setGlobalState({ name: 'user', sex: '男' })}>
        更新全局变量
      </button>
      <span style={{ marginLeft: 20 }}>{JSON.stringify(globalState)}</span>
    </>
  );
}

function AppProvider({ microAppProps }: { microAppProps?: any }) {
  const { setGlobalState, onGlobalStateChange } = microAppProps;

  return (
    <InitialStateProvide
      setGlobalState={setGlobalState}
      onGlobalStateChange={onGlobalStateChange}
    >
      <App />
    </InitialStateProvide>
  );
}

export default AppProvider;
