import * as React from 'react';
import { Container, List, ListItem, Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';

export type Artist = {
  id: string,
  name: string,
  images: Array<{ url: string }>,
  genres: Array<string>,
};

function ArtistPage() {
  const artist = useLoaderData() as Artist;

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
