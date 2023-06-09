import {
  Container,
  Typography,
  AppBar,
  CssBaseline,
  Toolbar,
  Button,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '../actions';

import Login from './Login';
import TopArtists from './TopArtists';

function App() {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/api/spotify-token')
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          dispatch(setToken(data.token));
        }
      });
  }, []);

  const logout = () => {
    fetch('/api/logout');
    dispatch(setToken(null));
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography component="div" variant="h6" sx={{ flexGrow: 1 }}>
            Simple Spotify
          </Typography>
          {token && (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container component="main">
        {token ? <TopArtists /> : <Login />}
      </Container>
    </>
  );
}

export default App;
