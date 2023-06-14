import * as React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

import ArtistGrid from './ArtistGrid';
import type { Artist } from '../types';

function Favourites() {
  const { favourites } = useLoaderData() as { favourites: Artist[] };

  return (
    <Container sx={{ padding: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Favourites
      </Typography>
      <ArtistGrid artists={favourites} />
    </Container>
  );
}

export default Favourites;
