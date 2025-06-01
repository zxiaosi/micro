import { BrowserRouter, Link } from 'react-router';

function App() {
  return (
    <BrowserRouter>
      <h2>main 主应用</h2>
      <Link to={'user'}>展示子应用</Link>
      <main id="sub-app" />
    </BrowserRouter>
  );
}

export default App;
