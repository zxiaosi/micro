import sdk from '@zxiaosi/sdk';
import { DatePicker } from 'antd';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

function Home() {
  const { initialState, setInitialState } = useStore(
    sdk.store,
    useShallow((state) => ({
      initialState: state.initialState,
      setInitialState: state.setInitialState,
    })),
  );

  return (
    <>
      <div style={{ fontSize: 24 }}>user 子应用</div>
      <div className="test-css-variable">测试css变量</div>

      <button
        onClick={() => {
          setInitialState?.({
            theme: initialState.theme === 'light' ? 'dark' : 'light',
          });
        }}
      >
        更新主题
      </button>
      <span style={{ marginLeft: 20 }}>{JSON.stringify(initialState)}</span>
      <DatePicker />
    </>
  );
}

export default Home;
