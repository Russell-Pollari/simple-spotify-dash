import * as React from 'react';
import { useSelector } from 'react-redux';

import PageContainer from './PageContainer';
import ArtistGrid from './ArtistGrid';
import type { RootState } from '../store';

function Favourites() {
  const favourites = useSelector((state: RootState) => state.favourites);

  return (
    <PageContainer title="Favourites">
      <ArtistGrid artists={favourites} />
    </PageContainer>
  );
}

export default Favourites;
