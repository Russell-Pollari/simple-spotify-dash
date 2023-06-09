import {
  Typography,
  Container,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

function ArtistCard({ artist = {} }) {
  return (
    <Card sx={{ maxWidth: 345, height: '100%' }}>
      <CardMedia
        image={artist.images[0].url}
        title={artist.name}
        sx={{ height: 140 }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {artist.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {artist.genres.join(', ')}
        </Typography>
      </CardContent>
    </Card>
  );
}

function TopArtists() {
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    fetch('/api/top-artists')
      .then((res) => res.json())
      .then((data) => {
        setTopArtists(data.items);
      });
  }, []);

  return (
    <Container sx={{ padding: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Your Top Artists
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: 4 }}>
        {topArtists.map((artist) => (
          <Grid item xs={4} key={artist.id}>
            <ArtistCard artist={artist} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default TopArtists;
