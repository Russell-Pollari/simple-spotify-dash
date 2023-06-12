import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Typography,
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import ArtistCard from './ArtistCard';
import type { Artist } from '../types';

function TopArtists() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [timeRange, setTimeRange] = useState<string>('long_term');

  useEffect(() => {
    fetch(`/api/top-artists?time_range=${timeRange}`)
      .then((res) => res.json())
      .then((data) => {
        setArtists(data.items);
      });
  }, [timeRange]);

  return (
    <Container sx={{ padding: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Your Top Artists
      </Typography>
      <FormControl>
        <InputLabel id="time-range-label">Time Range</InputLabel>
        <Select
          labelId="time-range-label"
          id="time-range"
          value={timeRange}
          label="Time Range"
          onChange={(event) => setTimeRange(event.target.value as string)}
        >
          <MenuItem value="short_term">Last Month</MenuItem>
          <MenuItem value="medium_term">Last 6 Months</MenuItem>
          <MenuItem value="long_term">All Time</MenuItem>
        </Select>
      </FormControl>
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
