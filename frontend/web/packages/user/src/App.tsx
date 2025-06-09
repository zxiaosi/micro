import { globalStore } from '@zxiaosi/sdk';
import { useEffect, useState } from 'react';
import { shallow } from 'zustand/vanilla/shallow';

function App() {
  const [initialState, setInitialState] = useState({});

  useEffect(() => {
    globalStore?.subscribe(
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
      <h2>user 子应用</h2>
      <button
        onClick={() => {
          globalStore
            ?.getState()
            ?.setInitialState?.({ timeStamp: Date.now().valueOf() });
        }}
      >
        更新全局变量
      </button>
      <span style={{ marginLeft: 20 }}>{JSON.stringify(initialState)}</span>
    </>
  );
}

export default App;
