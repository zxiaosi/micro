import { GlobalFullscreenProvider } from '@/hooks/useGlobalFullscreen';
import { sdk } from '@zxiaosi/sdk';
import { ComponentType } from 'react';

function App() {
  const Root = sdk.app.getRootComponent?.() as ComponentType;

  return (
    <GlobalFullscreenProvider>
      <Root />
    </GlobalFullscreenProvider>
  );
}

export default App;
