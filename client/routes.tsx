import * as React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import App from './components/App';
import ArtistPage from './components/ArtistPage';
import TopArtists from './components/TopArtists';

const dataLoader = async (url: string) => {
  const result = await fetch(url);
  const data = await result.json();
  if (data.error) {
    throw new Response('Bad request', {
      status: data.error.status || 400,
    });
  }
  return data;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <TopArtists />,
        loader: async () => {
          const result = await dataLoader('/api/top-artists');
          return result.items || [];
        },
        errorElement: <ErrorBoundary />,
      },
      {
        path: '/artists/:artistId',
        element: <ArtistPage />,
        loader: async ({ params }) => {
          return await dataLoader(`/api/artists/${params.artistId}`);
        },
      },
    ],
  },
]);

export default router;
