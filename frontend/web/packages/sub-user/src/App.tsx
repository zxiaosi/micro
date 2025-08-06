import Home from '@/pages/Home';
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from 'react-router-dom';

function App({ basename }: any) {
  const routes: RouteObject[] = [{ path: '/', element: <Home /> }];

  return (
    <RouterProvider
      router={createBrowserRouter(routes, { basename: `/${basename}` })}
    />
  );
}

export default App;
