import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Button,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFavourites } from '../store';

import type { Artist } from '../types';
import type { RootState, AppDispatch } from '../store';

function ArtistCard({ artist }: { artist: Artist }) {
  const favourites = useSelector((state: RootState) => state.favourites);
  const dispatch = useDispatch<AppDispatch>();

  const isFavourite =
    favourites.filter(({ id }) => id === artist.id).length > 0;

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
      <Button
        onClick={async () => {
          await fetch(`/api/favourite/${artist.id}`, { method: 'POST' });
          dispatch(fetchFavourites());
        }}
      >
        {isFavourite ? 'Unfavourite' : 'Favourite'}
      </Button>
    </Card>
  );
}

export default ArtistCard;
