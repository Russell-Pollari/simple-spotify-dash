import * as React from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import App from './components/App';
import Login from './components/Login';
import ArtistPage from './components/ArtistPage';
import TopArtists from './components/TopArtists';
import Favourites from './components/Favourites';
import store, { fetchFavourites } from './store';
import { setToken } from './store';

const dataLoader = async (url: string) => {
  const result = await fetch(url);
  const data = await result.json();

  // Auth error, go to login
  if (data?.error?.status === 400) {
    throw new Response('', {
      status: 302,
      headers: {
        Location: '/',
      },
    });
  }

  if (data.error) {
    throw new Response(data.error.message, {
      status: data.error.status || 500,
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
        element: <Login />,
        loader: async () => {
          if (store.getState().token.access_token) {
            return redirect('/dashboard');
          }

          const { token } = await dataLoader('/api/spotify-token');
          if (token) {
            store.dispatch(setToken(token));
            return redirect('/dashboard');
          }

          const data = await dataLoader('/api/auth-url');
          return { authUrl: data.url };
        },
      },
      {
        path: '/dashboard',
        element: <Favourites />,
        loader: async () => {
          store.dispatch(fetchFavourites());
          return null;
        },
      },
      {
        path: '/top-artists',
        element: <TopArtists />,
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
