import sdk from '@zxiaosi/sdk';

function App({ loading }: any) {
  const Root = sdk.getRootComponent();
  if (loading) return <>加载中...</>;
  return <Root />;
}

export default App;
