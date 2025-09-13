import { GlobalFullscreenProvider } from '@/hooks/useGlobalFullscreen';
import { MainApp } from '@zxiaosi/sdk';

function App() {
  return (
    <GlobalFullscreenProvider>
      <MainApp />
    </GlobalFullscreenProvider>
  );
}

export default App;
