import { GlobalFullscreenProvider } from '@/hooks/useGlobalFullscreen';
import { Root } from '@zxiaosi/sdk';

function App() {
  return (
    <GlobalFullscreenProvider>
      <Root />
    </GlobalFullscreenProvider>
  );
}

export default App;
