import * as React from 'react';
import { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setTimeRange } from '../store';

import PageContainer from './PageContainer';
import ArtistGrid from './ArtistGrid';
import { Artist, TimeRange } from '../types';
import type { RootState } from '../store';

function TopArtists() {
  const timeRange = useSelector((state: RootState) => state.timeRange);
  const dispatch = useDispatch();
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    fetch(`/api/top-artists?time_range=${timeRange}`)
      .then((res) => res.json())
      .then((data) => {
        setArtists(data.items || []);
      });
  }, [timeRange]);

  return (
    <PageContainer title="Top Artists">
      <FormControl>
        <InputLabel id="time-range-label">Time Range</InputLabel>
        <Select
          labelId="time-range-label"
          id="time-range"
          value={timeRange}
          label="Time Range"
          onChange={(event) =>
            dispatch(setTimeRange(event.target.value as TimeRange))
          }
        >
          <MenuItem value="short_term">Last Month</MenuItem>
          <MenuItem value="medium_term">Last 6 Months</MenuItem>
          <MenuItem value="long_term">All Time</MenuItem>
        </Select>
      </FormControl>
      <ArtistGrid artists={artists} />
    </PageContainer>
  );
}

export default TopArtists;
