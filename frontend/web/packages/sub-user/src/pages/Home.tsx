import sdk from '@zxiaosi/sdk';
import { DatePicker } from 'antd';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

function Home() {
  const [theme, setTheme] = useStore(
    sdk.store,
    useShallow((state) => [state.theme, state.setTheme]),
  );

  return (
    <>
      <div style={{ fontSize: 24 }}>user 子应用</div>
      <div className="test-css-variable">测试css变量</div>

      <button
        onClick={() => {
          setTheme?.(theme === 'light' ? 'dark' : 'light');
        }}
      >
        更新主题
      </button>
      <div>
        <DatePicker />
      </div>
    </>
  );
}

export default Home;
