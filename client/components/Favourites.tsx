import * as React from 'react';
import { useSelector } from 'react-redux';

import PageContainer from './PageContainer';
import ArtistGrid from './ArtistGrid';
import type { RootState } from '../store';
import { Link } from 'react-router-dom';

function Favourites() {
  const favourites = useSelector((state: RootState) => state.favourites);

  return (
    <PageContainer title="Favourites">
      {favourites.length === 0 && (
        <p>
          You don&apos;t have any favourites yet. Go to the{' '}
          <Link to="/top-artists">Top Artists</Link> page to add some.
        </p>
      )}
      <ArtistGrid artists={favourites} />
    </PageContainer>
  );
}

export default Favourites;
