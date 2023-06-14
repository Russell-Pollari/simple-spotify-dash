import {
  Container,
  Typography,
  AppBar,
  CssBaseline,
  Toolbar,
  Button,
} from '@mui/material';
import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import type { RootState } from '../store';
import { unSet } from '../store';

function App() {
  const { access_token } = useSelector((state: RootState) => state.token);
  const dispatch = useDispatch();

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
          {access_token && (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container component="main">
        <Outlet />
      </Container>
    </>
  );
}

export default App;
