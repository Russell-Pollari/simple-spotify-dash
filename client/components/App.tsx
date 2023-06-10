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

import { RootState } from '../store';
import { set, unSet } from '../store';
import Login from './Login';

function App() {
  const token = useSelector((state: RootState) => state.token);
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
      <Container component="main">{token ? <Outlet /> : <Login />}</Container>
    </>
  );
}

export default App;
