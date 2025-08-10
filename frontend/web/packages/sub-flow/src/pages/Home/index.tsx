import sdk from '@zxiaosi/sdk';
import { DatePicker } from 'antd';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';
import './index.less';

function Home() {
  const [theme, setTheme] = useStore(
    sdk.store,
    useShallow((state) => [state.theme, state.setTheme]),
  );

  return (
    <>
      <div className="sub-app-title">flow 子应用</div>
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
