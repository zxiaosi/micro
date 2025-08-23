import { GlobalFullscreenProvider } from '@/hooks/useGlobalFullscreen';
import { sdk } from '@zxiaosi/sdk';

function App() {
  const Root = sdk.instance.components.getRootComponent();

  return (
    <GlobalFullscreenProvider>
      <Root />
    </GlobalFullscreenProvider>
  );
}

export default App;
