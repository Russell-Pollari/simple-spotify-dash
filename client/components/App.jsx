import { Container, Typography } from '@mui/material';
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

  return (
    <Container component="main">
      <Typography component="h1" variant="h6">
        Spotify dashboard
      </Typography>
      {token ? <TopArtists /> : <Login />}
    </Container>
  );
}

export default App;
