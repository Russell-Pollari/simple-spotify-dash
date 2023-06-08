import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import Login from './components/Login';
import TopArtists from './components/TopArtists';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    fetch('/api/spotify-token')
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          setToken(data.token);
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

const root = createRoot(document.getElementById('root'));
root.render(<App />);
