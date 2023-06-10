import * as React from 'react';
import { Box, Container, List, ListItem, Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';

import type { Artist, Album } from '../types';

function ArtistPage() {
  const { artist, albums } = useLoaderData() as {
    artist: Artist;
    albums: Album[];
  };

  return (
    <Container sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex' }}>
        <div>
          <img src={artist.images[0].url} alt={artist.name} height={256} />
          <Typography component="h2" variant="h6">
            {artist.name}
          </Typography>
          <Typography component="p" variant="body1">
            <List>
              {artist.genres.map((genre) => (
                <ListItem key={genre}>{genre}</ListItem>
              ))}
            </List>
          </Typography>
        </div>
        <Box sx={{ paddingLeft: 4 }}>
          <Typography component="h3" variant="h6">
            Albums
          </Typography>
          {albums
            .filter((album) => album.album_type === 'album')
            .sort(
              (a, b) =>
                new Date(b.release_date).getTime() -
                new Date(a.release_date).getTime()
            )
            .map((album) => {
              return (
                <Box key={album.id} sx={{ padding: 2, display: 'flex' }}>
                  <div>
                    <img
                      src={album.images[0].url}
                      alt={album.name}
                      height={128}
                    />
                  </div>
                  <Box sx={{ marginLeft: 2 }}>
                    <Typography component="h3" variant="h6">
                      {album.name}
                    </Typography>
                    <Typography component="p" variant="body1">
                      {album.release_date}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
        </Box>
      </Box>
    </Container>
  );
}

export default ArtistPage;
