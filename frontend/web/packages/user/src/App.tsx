import sdk from '@zxiaosi/sdk';
import { useEffect } from 'react';
import { useStore } from 'zustand';
import { shallow, useShallow } from 'zustand/shallow';

function App() {
  const { initialState, setInitialState } = useStore(
    sdk.globalStore,
    useShallow((state) => ({
      initialState: state.initialState,
      setInitialState: state.setInitialState,
    })),
  );

  useEffect(() => {
    sdk.globalStore?.subscribe(
      (state) => state.initialState,
      (state: any, prev: any) => {
        console.log('bears change', state, prev);
        setInitialState(state);
      },
      {
        equalityFn: shallow,
        fireImmediately: true,
      },
    );
  }, []);

  return (
    <>
      <div style={{ fontSize: 24 }}>user 子应用</div>
      <div className="test-css-variable">测试css变量</div>

      <button
        onClick={() => {
          setInitialState?.({ timeStamp: Date.now().valueOf() });
        }}
      >
        更新全局变量
      </button>
      <span style={{ marginLeft: 20 }}>{JSON.stringify(initialState)}</span>
    </>
  );
}

export default App;
