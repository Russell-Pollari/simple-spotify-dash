import { Container, List, ListItem, Typography } from '@mui/material';
import React from 'react';
import { useLoaderData } from 'react-router-dom';

function ArtistPage() {
  const artist = useLoaderData();

  return (
    <Container sx={{ padding: 2 }}>
      <Typography component="h2" variant="h6">
        {artist.name}
      </Typography>
      <img src={artist.images[0].url} alt={artist.name} height={256} />
      <Typography component="h3" variant="h6">
        Genres
      </Typography>
      <Typography component="p" variant="body1">
        <List>
          {artist.genres.map((genre) => (
            <ListItem key={genre}>{genre}</ListItem>
          ))}
        </List>
      </Typography>
    </Container>
  );
}

export default ArtistPage;
