import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
} from '@mui/material';

import  { Artist } from '../types';

type Props = {
  artist: Artist;
};

function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Card sx={{ maxWidth: 345, height: '100%' }}>
      <CardActionArea component={Link} to={`/artists/${artist.id}`}>
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
      </CardActionArea>
    </Card>
  );
}

export default ArtistCard;
