import * as React from 'react';
import { Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import ArtistGrid from './ArtistGrid';
import type { RootState } from '../store';

function Favourites() {
  const favourites = useSelector((state: RootState) => state.favourites);

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
