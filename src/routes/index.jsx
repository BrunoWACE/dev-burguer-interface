import { createBrowserRouter } from 'react-router-dom';

import { Login } from '../containers/login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
]);
