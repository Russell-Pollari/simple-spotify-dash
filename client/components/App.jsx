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
import { Link, Outlet } from 'react-router-dom';

import { setToken } from '../actions';
import Login from './Login';

function App() {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    // TODO: store and check tokern expiry
    if (!token) {
      fetch('/api/spotify-token')
        .then((res) => res.json())
        .then((data) => {
          if (data.token) {
            dispatch(setToken(data.token));
          }
        });
    }
  }, []);

  const logout = () => {
    fetch('/api/logout').then(() => dispatch(setToken(null)));
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
