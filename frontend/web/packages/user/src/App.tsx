import { globalStore } from '@zxiaosi/sdk';
import { useEffect } from 'react';
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

  // useEffect(() => {
  //   globalStore?.subscribe(
  //     (state) => state.initialState,
  //     (state: any, prev: any) => {
  //       console.log('bears change', state, prev);
  //       setInitialState(state);
  //     },
  //     {
  //       equalityFn: shallow,
  //       fireImmediately: true,
  //     },
  //   );
  // }, []);

  useEffect(() => {
    console.log('initialState', initialState);
  }, [initialState]);

  return (
    <>
      <div style={{ fontSize: 24 }}>user 子应用</div>

      <button
        onClick={() => {
          globalStore
            ?.getState()
            ?.setInitialState?.({ timeStamp: Date.now().valueOf() });
          // setInitialState?.({ timeStamp: Date.now().valueOf() });
        }}
      >
        更新全局变量
      </button>
      <span style={{ marginLeft: 20 }}>{JSON.stringify(initialState)}</span>
    </>
  );
}

export default App;
