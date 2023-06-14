import * as React from 'react';
import { useLoaderData } from 'react-router-dom';

import { Container, Box, Button } from '@mui/material';

function Login() {
  const { authUrl } = useLoaderData() as { authUrl: string };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {authUrl && (
          <Button
            startIcon={
              <img
                src="static/spotify_icon.png"
                alt="Spotify Logo"
                width={24}
              />
            }
            variant="contained"
            href={authUrl}
          >
            Connect with Spotify
          </Button>
        )}
      </Box>
    </Container>
  );
}

export default Login;
