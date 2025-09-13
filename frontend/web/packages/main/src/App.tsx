import { GlobalFullscreenProvider } from '@/hooks/useGlobalFullscreen';
import { sdk } from '@zxiaosi/sdk';

function App() {
  const Root = sdk.ui.getComponent?.('Root');
  return (
    <GlobalFullscreenProvider>
      <Root />
    </GlobalFullscreenProvider>
  );
}

export default App;
