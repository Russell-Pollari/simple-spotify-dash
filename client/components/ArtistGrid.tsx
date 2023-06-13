import * as React from 'react';
import { Container, Grid } from '@mui/material';

import ArtistCard from './ArtistCard';
import type { Artist } from '../types';

function TopArtists({ artists = [] }: { artists: Artist[] }) {
  return (
    <Container sx={{ padding: 2 }}>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {artists.map((artist) => (
          <Grid item xs={4} key={artist.id}>
            <ArtistCard artist={artist} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default TopArtists;
