import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import store from './store';
import router from './routes';

const root = createRoot(document.getElementById('root')!);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
