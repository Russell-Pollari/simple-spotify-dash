import * as React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Typography, Container, Grid } from '@mui/material';

import { Artist } from './ArtistPage';
import ArtistCard from './ArtistCard';

function TopArtists() {
  const artists = [] = useLoaderData() as Artist[];

  return (
    <Container sx={{ padding: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Your Top Artists
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: 4 }}>
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
