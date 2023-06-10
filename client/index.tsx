import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from './store';

import App from './components/App';
import ArtistPage from './components/ArtistPage';
import TopArtists from './components/TopArtists';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <TopArtists />,
        loader: async () =>
          fetch('/api/top-artists')
            .then((res) => res.json())
            .then((data) => data.items),
      },
      {
        path: '/artists/:artistId',
        element: <ArtistPage />,
        loader: async ({ params }) =>
          fetch(`/api/artists/${params.artistId}`).then((res) => res.json()),
      },
    ],
  },
]);

const root = createRoot(document.getElementById('root')!);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
