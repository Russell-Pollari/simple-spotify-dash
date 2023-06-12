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
    throw new Response(data.error.message, {
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
        errorElement: <ErrorBoundary />,
      },
      {
        path: '/artists/:artistId',
        element: <ArtistPage />,
        loader: async ({ params }) => {
          const artist = await dataLoader(`/api/artists/${params.artistId}`);
          const albums = await dataLoader(
            `/api/artist-albums/${params.artistId}`
          );
          return { artist, albums: albums.items };
        },
      },
    ],
  },
]);

export default router;
