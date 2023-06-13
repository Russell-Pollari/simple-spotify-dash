import {
  Container,
  Typography,
  AppBar,
  CssBaseline,
  Toolbar,
  Button,
} from '@mui/material';
import * as React from 'react';
import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import type { RootState } from '../store';
import { set, unSet } from '../store';
import Login from './Login';
import ArtistGrid from './ArtistGrid';
import type { Artist } from '../types';

function App() {
  const { token } = useSelector((state: RootState) => state.token);
  // TODO: store favourites in redux, and update when user adds/removes
  const [favourites, setFavourites] = React.useState<Artist[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // TODO: store and check token expiry
    if (!token) {
      fetch('/api/spotify-token')
        .then((res) => res.json())
        .then((data) => {
          if (data.token) {
            dispatch(set(data.token));
          }
        });
    }
    fetch('/api/favourites')
      .then((res) => res.json())
      .then((data) => {
        setFavourites(data.artists);
      });
  }, []);

  const logout = () => {
    fetch('/api/logout').then(() => dispatch(unSet()));
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography component="div" variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Simple Spotify
            </Link>
          </Typography>
          {token && (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container component="main">
        {token ? (
          <div>
            <Typography variant="h5" component="h2">
              Your Favourites
            </Typography>
            <ArtistGrid artists={favourites} />
            <Outlet />
          </div>
        ) : (
          <Login />
        )}
      </Container>
    </>
  );
}

export default App;
